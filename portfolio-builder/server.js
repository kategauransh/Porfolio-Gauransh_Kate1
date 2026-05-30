require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 1. Initialize Stripe
const stripeSecret = process.env.STRIPE_SECRET_KEY;
const isStripeConfigured = stripeSecret && !stripeSecret.includes('YourRealSecretKey') && stripeSecret.startsWith('sk_');
const stripe = isStripeConfigured ? require('stripe')(stripeSecret) : null;

// 2. Initialize Razorpay (Indian Payment Gateway)
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
const isRazorpayConfigured = razorpayKeyId && !razorpayKeyId.includes('your_real_key_id') && 
                             razorpayKeySecret && !razorpayKeySecret.includes('your_real_key_secret') &&
                             razorpayKeyId.startsWith('rzp_');
const razorpay = isRazorpayConfigured ? new (require('razorpay'))({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
}) : null;

const app = express();
const PORT = process.env.PORT || 5000;

// Body parser with size limits for rich templates
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ensure public and deployed directories exist
const publicDir = path.join(__dirname, 'public');
const deployedDir = path.join(publicDir, 'deployed');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
if (!fs.existsSync(deployedDir)) {
  fs.mkdirSync(deployedDir, { recursive: true });
}

// Serve static assets from public folder
app.use(express.static(publicDir));

// ==========================================================================
// 1. STRIPE API ENDPOINTS (Global USD Checkout)
// ==========================================================================
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { html, name } = req.body;
    
    if (!html) {
      return res.status(400).json({ success: false, error: 'HTML content is required.' });
    }

    const draftId = crypto.randomUUID();
    const draftFilename = `draft-${draftId}.html`;
    const draftPath = path.join(deployedDir, draftFilename);
    fs.writeFileSync(draftPath, html, 'utf8');

    // Fallback if Stripe is not configured
    if (!stripe) {
      console.log(`[Stripe Sandbox Mode] Simulating mock checkout redirect...`);
      const finalFilename = `${draftId}.html`;
      const finalPath = path.join(deployedDir, finalFilename);
      if (fs.existsSync(draftPath)) {
        fs.renameSync(draftPath, finalPath);
      }
      const mockUrl = `http://localhost:${PORT}/deployed/${finalFilename}`;
      return res.json({
        success: true,
        sandbox: true,
        url: `/?status=success&url=${encodeURIComponent(mockUrl)}`
      });
    }

    console.log(`[Stripe Live] Initializing USD checkout session for: ${name || 'User'}`);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${name || 'User'}'s Custom Portfolio Website & Hosting`,
            description: 'Static website compile, domain registration, and hosting provisioning fee.',
          },
          unit_amount: 499, // $4.99 USD
        },
        quantity: 1,
      }],
      mode: 'payment',
      metadata: {
        draftId: draftId,
        name: name || 'Anonymous'
      },
      success_url: `http://localhost:${PORT}/api/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:${PORT}/?status=cancel`,
    });

    res.json({
      success: true,
      sandbox: false,
      url: session.url
    });
  } catch (error) {
    console.error('Stripe session creation error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to create checkout session.' });
  }
});

app.get('/api/checkout-success', async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id || !stripe) {
      return res.redirect('/?status=payment-failed');
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status === 'paid') {
      const { draftId, name } = session.metadata;
      
      const draftPath = path.join(deployedDir, `draft-${draftId}.html`);
      const finalPath = path.join(deployedDir, `${draftId}.html`);

      if (fs.existsSync(draftPath)) {
        fs.renameSync(draftPath, finalPath);
        console.log(`[Stripe Paid] Finalized deployment of: ${name} -> http://localhost:${PORT}/deployed/${draftId}.html`);
        const finalUrl = `http://localhost:${PORT}/deployed/${draftId}.html`;
        res.redirect(`/?status=success&url=${encodeURIComponent(finalUrl)}`);
      } else {
        res.redirect('/?status=file-error');
      }
    } else {
      res.redirect('/?status=payment-failed');
    }
  } catch (error) {
    console.error('Stripe checkout success error:', error);
    res.status(500).send('An error occurred during payment verification.');
  }
});

// ==========================================================================
// 2. RAZORPAY API ENDPOINTS (Indian INR UPI / NetBanking / Cards)
// ==========================================================================
app.post('/api/create-razorpay-order', async (req, res) => {
  try {
    const { html, name } = req.body;
    if (!html) {
      return res.status(400).json({ success: false, error: 'HTML content is required.' });
    }

    const draftId = crypto.randomUUID();
    const draftFilename = `draft-${draftId}.html`;
    const draftPath = path.join(deployedDir, draftFilename);
    fs.writeFileSync(draftPath, html, 'utf8');

    // 1. Fallback if Razorpay is not configured
    if (!razorpay) {
      console.log(`[Razorpay Sandbox Mode] Simulating mock Indian order deployment...`);
      
      // Auto-deploy draft
      const finalFilename = `${draftId}.html`;
      const finalPath = path.join(deployedDir, finalFilename);
      if (fs.existsSync(draftPath)) {
        fs.renameSync(draftPath, finalPath);
      }
      
      const mockUrl = `http://localhost:${PORT}/deployed/${finalFilename}`;
      return res.json({
        success: true,
        sandbox: true,
        url: `/?status=success&url=${encodeURIComponent(mockUrl)}`
      });
    }

    // 2. Spawn real Razorpay Order
    console.log(`[Razorpay Live] Spawning INR order for: ${name || 'User'}`);
    const options = {
      amount: 29900, // ₹299.00 INR (amount in Indian paise)
      currency: "INR",
      receipt: `receipt_${draftId.substring(0, 8)}`,
      notes: {
        draftId: draftId,
        name: name || 'User'
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      sandbox: false,
      orderId: order.id,
      keyId: razorpayKeyId,
      amount: order.amount,
      draftId: draftId,
      name: name || 'User',
      email: req.body.email || 'hello@portfolio.me'
    });

  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to initialize Razorpay order.' });
  }
});

// Endpoint cryptographically verifying Razorpay payment signature
app.post('/api/verify-razorpay-payment', (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, draftId } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !draftId) {
      return res.status(400).json({ success: false, error: 'Verification signatures missing.' });
    }

    if (!razorpay) {
      return res.status(400).json({ success: false, error: 'Razorpay is not configured.' });
    }

    // Cryptographic validation of signature via HMAC-SHA256
    const text = razorpay_order_id + "|" + razorpay_payment_id;
    const generatedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(text)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      // Signature verified -> Finalize and Release Draft Website
      const draftFilename = `draft-${draftId}.html`;
      const draftPath = path.join(deployedDir, draftFilename);
      
      const finalFilename = `${draftId}.html`;
      const finalPath = path.join(deployedDir, finalFilename);

      if (fs.existsSync(draftPath)) {
        fs.renameSync(draftPath, finalPath);
        const finalUrl = `http://localhost:${PORT}/deployed/${finalFilename}`;
        console.log(`[Razorpay Paid] Cryptographically verified signature. Portfolio released! -> ${finalUrl}`);
        
        res.json({
          success: true,
          url: finalUrl
        });
      } else {
        res.status(404).json({ success: false, error: 'Draft portfolio not found on disk.' });
      }
    } else {
      console.log(`[Razorpay Signature Failed] Verification mismatch for order: ${razorpay_order_id}`);
      res.status(400).json({ success: false, error: 'Cryptographic signature mismatch.' });
    }

  } catch (error) {
    console.error('Razorpay verification error:', error);
    res.status(500).json({ success: false, error: 'Internal signature verification failed.' });
  }
});

// Root Route fallback
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(` PORTFOLIO BUILDER SYSTEM IS ONLINE AND DEPLOYED`);
  console.log(` Dashboard URL:   http://localhost:${PORT}`);
  console.log(` Stripe Status:   ${isStripeConfigured ? '🟢 ACTIVE (USD Payments)' : '🟡 SANDBOX (Staging Mock)'}`);
  console.log(` Razorpay Status: ${isRazorpayConfigured ? '🟢 ACTIVE (INR UPI Payments)' : '🟡 SANDBOX (Staging Mock)'}`);
  if (!isStripeConfigured && !isRazorpayConfigured) {
    console.log(` Hint: Configure credentials in your .env file to enable live checkout.`);
  }
  console.log(`==================================================`);
});
