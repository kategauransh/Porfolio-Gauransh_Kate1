// Core Frontend Application Logic

// 1. DEFAULT RICH SAMPLE DATA (For instant wow-factor preview)
const defaultData = {
  personal: {
    name: "Alex Mercer",
    title: "Senior Full Stack Architect",
    bio: "Pioneering high-throughput web applications and elegant design architectures. Specialized in Next.js, distributed database scaling, and beautiful interactive UX frameworks.",
    email: "alex.mercer@dev.io",
    phone: "+1 (555) 234-5678",
    location: "Seattle, WA",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    github: "https://github.com/alexmercer-dev",
    linkedin: "https://linkedin.com/in/alexmercer",
    twitter: "https://twitter.com/alexmercer_code"
  },
  skills: ["React / Next.js", "Node.js / Express", "TypeScript", "PostgreSQL", "Tailwind CSS", "System Design", "WebSockets", "Docker / AWS"],
  experience: [
    {
      role: "Lead Platform Engineer",
      company: "Vortex Tech Systems",
      duration: "2023 - Present",
      description: "Spearheaded core dashboard redesign servicing 120k daily active users. Reduced visual page load latencies by 42% through aggressive caching configurations and responsive component rendering."
    },
    {
      role: "Senior Software Developer",
      company: "CloudBound Labs",
      duration: "2020 - 2023",
      description: "Designed robust RESTful API structures and websocket endpoints in Node/Express. Authored dynamic integration scripts that shortened partner onboarding cycles from weeks to minutes."
    }
  ],
  education: [
    {
      degree: "M.S. Computer Science & Engineering",
      school: "University of Washington",
      duration: "2018 - 2020",
      description: "Specialized in Distributed Ledger networks and advanced algorithms. Recipient of Dean's Research Grant for excellence."
    }
  ],
  projects: [
    {
      title: "OmniAnalytics Suite",
      description: "Real-time user engagement tracking system with rich charts and high-performance WebSockets.",
      link: "https://github.com/example/omnianalytics",
      tags: ["TypeScript", "Next.js", "Chart.js", "Redis"]
    },
    {
      title: "Nebula UI Component Library",
      description: "Highly accessible, customizable, and beautifully animated design elements for modern SaaS landing pages.",
      link: "https://github.com/example/nebula-ui",
      tags: ["React", "CSS Modules", "Storybook"]
    }
  ]
};

// Application State
let appState = {
  currentView: "landing", // landing, editor, success
  activeTab: "personal",
  currentTheme: "glassmorphic",
  viewportMode: "desktop",
  formData: JSON.parse(JSON.stringify(defaultData)), // Deep copy default
  deployedUrl: "",
  activeGateway: "razorpay" // Default to Razorpay in India
};

// 2. DOM CONTENT LOADING ROUTER
window.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // Bind Nav buttons
  document.getElementById('btn-get-started').addEventListener('click', () => switchView('editor'));
  document.getElementById('nav-build-btn').addEventListener('click', () => switchView('editor'));
  document.getElementById('btn-back-to-landing').addEventListener('click', () => switchView('landing'));
  
  // Bind Editor Tabs
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      switchTab(e.target.dataset.tab);
    });
  });

  // Bind Viewport Resizer Buttons
  const viewportBtns = document.querySelectorAll('.viewport-btn');
  viewportBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const mode = e.currentTarget.dataset.viewport;
      setViewport(mode);
    });
  });

  // Bind Theme Selector Cards
  const themeCards = document.querySelectorAll('.theme-select-card');
  themeCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const theme = e.currentTarget.dataset.theme;
      setTheme(theme);
    });
  });

  // Bind Stripe-Style Credit Card Inputs (Flip and Formatting)
  initCreditCardBindings();

  // Populate Editor Inputs with Current State Data
  populateFormInputs();

  // Bind dynamic event listeners to inputs
  bindInputSyncListeners();

  // Parse Resume button binding
  document.getElementById('btn-parse-resume').addEventListener('click', handleResumeParsing);

  // checkout actions
  document.getElementById('btn-checkout-trigger').addEventListener('click', openCheckoutModal);
  document.getElementById('btn-close-modal').addEventListener('click', closeCheckoutModal);
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') closeCheckoutModal();
  });
  document.getElementById('payment-form').addEventListener('submit', handlePaymentSubmit);

  // Success view actions
  document.getElementById('btn-copy-link').addEventListener('click', copyLinkToClipboard);
  document.getElementById('btn-download-html').addEventListener('click', downloadStandaloneHtml);
  document.getElementById('btn-restart').addEventListener('click', restartBuilder);

  // Dynamic row additions
  document.getElementById('btn-add-experience').addEventListener('click', () => addDynamicRow('experience'));
  document.getElementById('btn-add-education').addEventListener('click', () => addDynamicRow('education'));
  document.getElementById('btn-add-project').addEventListener('click', () => addDynamicRow('project'));

  // Gateway Selector Tabs
  document.getElementById('gate-btn-razorpay').addEventListener('click', () => setGateway('razorpay'));
  document.getElementById('gate-btn-stripe').addEventListener('click', () => setGateway('stripe'));

  // Intercept Redirect states from Stripe
  checkCheckoutRedirectParams();

  // Trigger initial live preview compile
  updatePreview();
}

// Check if client returned from successful or cancelled Stripe checkout redirect
function checkCheckoutRedirectParams() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('status')) {
    const status = urlParams.get('status');
    const finalUrl = urlParams.get('url');

    if (status === 'success' && finalUrl) {
      appState.deployedUrl = finalUrl;
      document.getElementById('deployed-url-text').innerText = finalUrl;
      document.getElementById('btn-visit-site').href = finalUrl;
      
      switchView('success');
      
      // Clean query parameters from URL address bar for aesthetics
      window.history.replaceState({}, document.title, window.location.pathname);
      
      setTimeout(() => {
        triggerConfetti();
        showToast("Portfolio successfully compiled and deployed live! 🚀", "success");
      }, 500);
    } else if (status === 'cancel') {
      switchView('editor');
      showToast("Stripe checkout session cancelled. We saved your draft details!", "info");
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (status === 'payment-failed') {
      switchView('editor');
      showToast("Card authorization was declined by your bank.", "error");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }
}

// 3. VIEW TRANSITION SYSTEM
function switchView(viewName) {
  appState.currentView = viewName;
  
  // Toggle Visibility
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(`view-${viewName}`).classList.add('active');

  // Specific Actions
  if (viewName === 'editor') {
    document.getElementById('nav-build-btn').style.display = 'none';
    updatePreview();
  } else if (viewName === 'landing') {
    document.getElementById('nav-build-btn').style.display = 'flex';
  }
}

function switchTab(tabId) {
  appState.activeTab = tabId;
  
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

  document.querySelectorAll('.form-section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(`sec-${tabId}`).classList.add('active');
}

function setViewport(mode) {
  appState.viewportMode = mode;
  
  document.querySelectorAll('.viewport-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-viewport="${mode}"]`).classList.add('active');

  const frame = document.getElementById('preview-frame-container');
  frame.className = 'device-frame'; // Reset
  if (mode !== 'desktop') {
    frame.classList.add(mode);
  }
}

function setTheme(themeName) {
  appState.currentTheme = themeName;
  
  document.querySelectorAll('.theme-select-card').forEach(card => card.classList.remove('active'));
  document.querySelector(`[data-theme="${themeName}"]`).classList.add('active');

  updatePreview();
  showToast(`Switched theme to ${Templates[themeName].name}! 🎨`, "success");
}

// 4. INTELLIGENT AI-STYLE RESUME PARSER (Client-side scanner)
function handleResumeParsing() {
  const pasteArea = document.getElementById('resume-paste-area');
  const text = pasteArea.value.trim();

  if (!text) {
    showToast("Please paste some resume text first!", "error");
    return;
  }

  // Visual parsing animation trigger
  const btn = document.getElementById('btn-parse-resume');
  const origText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = "🤖 Parsing profile & extracting structures...";

  // 1.5s visual lag to simulate smart deep analyzer
  setTimeout(() => {
    try {
      const parsed = parseResumeHeuristics(text);
      
      // Update appState
      appState.formData = parsed;
      
      // Re-populate editor fields
      populateFormInputs();
      
      // Sync list components (experience, projects, skills)
      rebuildDynamicRows();
      
      // Update preview instantly
      updatePreview();

      showToast("Resume parsed successfully! Form & live preview updated. 🚀", "success");
      pasteArea.value = ""; // Clear text area
    } catch (e) {
      console.error(e);
      showToast("Heuristics parsing encountered an issue. Let's enter details manually!", "error");
    } finally {
      btn.disabled = false;
      btn.innerHTML = origText;
    }
  }, 1500);
}

function parseResumeHeuristics(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l !== "");
  
  // Setup data layout
  const data = {
    personal: {
      name: "Parsed Developer",
      title: "Full Stack Engineer",
      bio: "Crafting highly performant web products with modern interfaces.",
      email: "hello@parsed.io",
      phone: "",
      location: "",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Parsed",
      github: "",
      linkedin: "",
      twitter: ""
    },
    skills: [],
    experience: [],
    education: [],
    projects: []
  };

  // 1. Extract Name (Heuristic: First non-empty short line)
  if (lines.length > 0) {
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      if (lines[i].length > 3 && lines[i].length < 25 && !lines[i].includes('@') && !lines[i].includes(':')) {
        data.personal.name = lines[i];
        break;
      }
    }
  }

  // 2. Email parser
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) data.personal.email = emailMatch[0];

  // 3. Phone parser
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) data.personal.phone = phoneMatch[0];

  // 4. Social Links
  const githubMatch = text.match(/(github\.com\/[a-zA-Z0-9_-]+)/i);
  if (githubMatch) data.personal.github = "https://" + githubMatch[0].toLowerCase();

  const linkedinMatch = text.match(/(linkedin\.com\/in\/[a-zA-Z0-9_-]+)/i);
  if (linkedinMatch) data.personal.linkedin = "https://" + linkedinMatch[0].toLowerCase();

  const twitterMatch = text.match(/(twitter\.com\/[a-zA-Z0-9_-]+)/i);
  if (twitterMatch) data.personal.twitter = "https://" + twitterMatch[0].toLowerCase();

  // 5. Bio extraction (Heuristic: Lines near the top containing "passionate", "experience in", "seeking", "focused on")
  const bioTriggers = ["passionate", "developer focused on", "experienced in", "engineer specialized in", "building scalable"];
  for (let line of lines) {
    if (bioTriggers.some(trigger => line.toLowerCase().includes(trigger)) && line.length > 30 && line.length < 200) {
      data.personal.bio = line;
      break;
    }
  }

  // Try to parse section blocks
  let currentSection = "";
  let sectionLines = [];

  const sectionHeaders = {
    experience: ["experience", "work history", "employment", "professional background"],
    education: ["education", "academic qualification", "schooling"],
    skills: ["skills", "technical expertise", "core competencies", "technologies"],
    projects: ["projects", "personal projects", "selected works", "featured systems"]
  };

  for (let line of lines) {
    const lowerLine = line.toLowerCase();
    
    // Check if line is a header
    let isHeader = false;
    for (let key in sectionHeaders) {
      if (sectionHeaders[key].some(header => lowerLine.includes(header) && line.length < 30)) {
        currentSection = key;
        isHeader = true;
        break;
      }
    }

    if (isHeader) continue;

    // Collect skills if skills section is active
    if (currentSection === 'skills') {
      const splitSkills = line.split(/[,,|/;\s]/).map(s => s.trim().replace(/[\[\]\(\)]/g, '')).filter(s => s.length > 1 && s.length < 20);
      data.skills.push(...splitSkills);
    } 
    // Collect experience
    else if (currentSection === 'experience') {
      if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
        if (data.experience.length > 0) {
          data.experience[data.experience.length - 1].description += " " + line.substring(1).trim();
        }
      } else {
        const parts = line.split(/[|\-|–]/).map(p => p.trim());
        if (parts.length >= 2) {
          data.experience.push({
            role: parts[0],
            company: parts[1],
            duration: parts[2] || "2022 - Present",
            description: ""
          });
        }
      }
    }
    // Collect education
    else if (currentSection === 'education') {
      const parts = line.split(/[|\-|–]/).map(p => p.trim());
      if (parts.length >= 2) {
        data.education.push({
          degree: parts[0],
          school: parts[1],
          duration: parts[2] || "Graduated",
          description: ""
        });
      }
    }
    // Collect projects
    else if (currentSection === 'projects') {
      const parts = line.split(/[|\-|–]/).map(p => p.trim());
      if (parts.length >= 2 && parts[0].length < 30) {
        data.projects.push({
          title: parts[0],
          description: parts[1],
          link: "",
          tags: ["Parsed"]
        });
      }
    }
  }

  // Fallbacks if lists are empty
  if (data.skills.length === 0) data.skills = ["JavaScript", "HTML/CSS", "React"];
  else data.skills = [...new Set(data.skills)].slice(0, 8); // unique skills capped to 8

  if (data.experience.length === 0) {
    data.experience.push({
      role: "Software Developer",
      company: "Company Inc",
      duration: "2022 - Present",
      description: "Full stack engineering developing enterprise business dashboards."
    });
  }

  if (data.projects.length === 0) {
    data.projects.push({
      title: "Portfolio Webapp",
      description: "Dynamic landing page showcasing software development services.",
      link: "",
      tags: ["HTML", "JS"]
    });
  }

  return data;
}

// 5. EDITOR FORM SYNCHRONIZER
function populateFormInputs() {
  const p = appState.formData.personal;
  document.getElementById('input-name').value = p.name || '';
  document.getElementById('input-title').value = p.title || '';
  document.getElementById('input-bio').value = p.bio || '';
  document.getElementById('input-email').value = p.email || '';
  document.getElementById('input-phone').value = p.phone || '';
  document.getElementById('input-location').value = p.location || '';
  document.getElementById('input-avatar').value = p.avatar || '';
  document.getElementById('input-github').value = p.github || '';
  document.getElementById('input-linkedin').value = p.linkedin || '';
  document.getElementById('input-twitter').value = p.twitter || '';

  // Skills input is list csv
  document.getElementById('input-skills').value = (appState.formData.skills || []).join(', ');
}

function bindInputSyncListeners() {
  const personalFields = ['name', 'title', 'bio', 'email', 'phone', 'location', 'avatar', 'github', 'linkedin', 'twitter'];
  personalFields.forEach(field => {
    const el = document.getElementById(`input-${field}`);
    el.addEventListener('input', (e) => {
      appState.formData.personal[field] = e.target.value;
      updatePreview();
    });
  });

  // Skills Listener
  document.getElementById('input-skills').addEventListener('input', (e) => {
    const val = e.target.value;
    appState.formData.skills = val.split(',').map(s => s.trim()).filter(s => s !== "");
    updatePreview();
  });
}

// Rebuild lists of experiences/projects/education
function rebuildDynamicRows() {
  // Clear lists
  document.getElementById('experience-rows').innerHTML = '';
  document.getElementById('education-rows').innerHTML = '';
  document.getElementById('project-rows').innerHTML = '';

  appState.formData.experience.forEach((item, index) => renderRowHtml('experience', item, index));
  appState.formData.education.forEach((item, index) => renderRowHtml('education', item, index));
  appState.formData.projects.forEach((item, index) => renderRowHtml('project', item, index));
}

function renderRowHtml(type, item, index) {
  const container = document.getElementById(`${type}-rows`);
  const card = document.createElement('div');
  card.className = 'dynamic-item-card';
  card.dataset.index = index;

  let fieldsHtml = '';
  if (type === 'experience') {
    fieldsHtml = `
      <div class="form-group">
        <label>Role / Position</label>
        <input type="text" class="row-input" data-field="role" value="${item.role || ''}">
      </div>
      <div class="form-group">
        <label>Company / Organization</label>
        <input type="text" class="row-input" data-field="company" value="${item.company || ''}">
      </div>
      <div class="form-group">
        <label>Duration (e.g. 2022 - Present)</label>
        <input type="text" class="row-input" data-field="duration" value="${item.duration || ''}">
      </div>
      <div class="form-group">
        <label>Job Accomplishments & Description</label>
        <textarea class="row-input" data-field="description" rows="3">${item.description || ''}</textarea>
      </div>
    `;
  } else if (type === 'education') {
    fieldsHtml = `
      <div class="form-group">
        <label>Degree / Certificate</label>
        <input type="text" class="row-input" data-field="degree" value="${item.degree || ''}">
      </div>
      <div class="form-group">
        <label>School / University</label>
        <input type="text" class="row-input" data-field="school" value="${item.school || ''}">
      </div>
      <div class="form-group">
        <label>Duration (e.g. 2018 - 2022)</label>
        <input type="text" class="row-input" data-field="duration" value="${item.duration || ''}">
      </div>
      <div class="form-group">
        <label>Academics & Context</label>
        <textarea class="row-input" data-field="description" rows="2">${item.description || ''}</textarea>
      </div>
    `;
  } else if (type === 'project') {
    fieldsHtml = `
      <div class="form-group">
        <label>Project Title</label>
        <input type="text" class="row-input" data-field="title" value="${item.title || ''}">
      </div>
      <div class="form-group">
        <label>Brief Description</label>
        <textarea class="row-input" data-field="description" rows="2">${item.description || ''}</textarea>
      </div>
      <div class="form-group">
        <label>Project Link (GitHub/Live)</label>
        <input type="text" class="row-input" data-field="link" value="${item.link || ''}">
      </div>
      <div class="form-group">
        <label>Tech Stack Tags (Comma separated)</label>
        <input type="text" class="row-input" data-field="tags" value="${(item.tags || []).join(', ')}">
      </div>
    `;
  }

  card.innerHTML = `
    <button type="button" class="remove-row-btn" onclick="removeDynamicRow('${type}', ${index})">✕</button>
    ${fieldsHtml}
  `;

  // Bind change listeners to input elements inside this row card
  card.querySelectorAll('.row-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const fieldName = e.target.dataset.field;
      let val = e.target.value;

      if (fieldName === 'tags') {
        val = val.split(',').map(s => s.trim()).filter(s => s !== "");
      }

      if (type === 'experience') {
        appState.formData.experience[index][fieldName] = val;
      } else if (type === 'education') {
        appState.formData.education[index][fieldName] = val;
      } else if (type === 'project') {
        appState.formData.projects[index][fieldName] = val;
      }
      
      updatePreview();
    });
  });

  container.appendChild(card);
}

function addDynamicRow(type) {
  let emptyItem = {};
  if (type === 'experience') {
    emptyItem = { role: "", company: "", duration: "", description: "" };
    appState.formData.experience.push(emptyItem);
    renderRowHtml('experience', emptyItem, appState.formData.experience.length - 1);
  } else if (type === 'education') {
    emptyItem = { degree: "", school: "", duration: "", description: "" };
    appState.formData.education.push(emptyItem);
    renderRowHtml('education', emptyItem, appState.formData.education.length - 1);
  } else if (type === 'project') {
    emptyItem = { title: "", description: "", link: "", tags: [] };
    appState.formData.projects.push(emptyItem);
    renderRowHtml('project', emptyItem, appState.formData.projects.length - 1);
  }

  updatePreview();
  showToast(`Added new ${type} card. Complete the details! 📝`, "info");
}

window.removeDynamicRow = function(type, index) {
  if (type === 'experience') {
    appState.formData.experience.splice(index, 1);
  } else if (type === 'education') {
    appState.formData.education.splice(index, 1);
  } else if (type === 'project') {
    appState.formData.projects.splice(index, 1);
  }

  rebuildDynamicRows();
  updatePreview();
  showToast(`Removed ${type} row.`, "info");
};

// 6. LIVE COMPILING PREVIEW INJECTOR
function updatePreview() {
  const theme = appState.currentTheme;
  const data = appState.formData;
  
  if (!Templates[theme]) {
    console.error(`Theme ${theme} template function is missing!`);
    return;
  }

  try {
    // Generate compiled code based on details and selected theme
    const compiledCode = Templates[theme].generate(data);
    
    // Inject directly into client-side preview frame
    const iframe = document.getElementById('preview-iframe');
    iframe.srcdoc = compiledCode;

    // Keep compiled code available for download
    appState.compiledHtml = compiledCode;
  } catch (error) {
    console.error('Failed to compile theme preview:', error);
  }
}

// 7. STRIPE MOCK CHECKOUT ENGINE
function openCheckoutModal() {
  // Reset payment card fields
  document.getElementById('card-number').value = '';
  document.getElementById('card-name').value = '';
  document.getElementById('card-expiry').value = '';
  document.getElementById('card-cvc').value = '';
  
  document.getElementById('card-disp-num').innerText = '•••• •••• •••• ••••';
  document.getElementById('card-disp-name').innerText = 'CARDHOLDER NAME';
  document.getElementById('card-disp-expiry').innerText = 'MM/YY';
  document.getElementById('card-disp-cvc').innerText = '•••';

  // Show Modal Overlay
  document.getElementById('modal-overlay').classList.add('active');
  document.getElementById('payment-form').style.display = 'block';
  document.getElementById('payment-loader').style.display = 'none';
  document.getElementById('checkout-card-holder').classList.remove('flipped');
}

function closeCheckoutModal() {
  document.getElementById('modal-overlay').classList.remove('active');
}

function initCreditCardBindings() {
  const cardNum = document.getElementById('card-number');
  const cardName = document.getElementById('card-name');
  const cardExpiry = document.getElementById('card-expiry');
  const cardCvc = document.getElementById('card-cvc');
  const creditCardEl = document.getElementById('checkout-card-holder');

  // Input Formatting & Display Updates
  if(cardNum) {
    cardNum.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      val = val.substring(0, 16);
      let formatted = val.match(/.{1,4}/g)?.join(' ') || '';
      e.target.value = formatted;
      document.getElementById('card-disp-num').innerText = formatted || '•••• •••• •••• ••••';
    });
  }

  if(cardName) {
    cardName.addEventListener('input', (e) => {
      const val = e.target.value.toUpperCase();
      document.getElementById('card-disp-name').innerText = val || 'CARDHOLDER NAME';
    });
  }

  if(cardExpiry) {
    cardExpiry.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      val = val.substring(0, 4);
      if (val.length >= 2) {
        val = val.substring(0, 2) + '/' + val.substring(2);
      }
      e.target.value = val;
      document.getElementById('card-disp-expiry').innerText = val || 'MM/YY';
    });
  }

  if(cardCvc) {
    cardCvc.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 3);
      e.target.value = val;
      document.getElementById('card-disp-cvc').innerText = val || '•••';
    });

    // Flip card when focusing CVV
    cardCvc.addEventListener('focus', () => {
      creditCardEl.classList.add('flipped');
    });
    cardCvc.addEventListener('blur', () => {
      creditCardEl.classList.remove('flipped');
    });
  }
}

// Redirects client to secure checkout portal based on chosen gateway
function handlePaymentSubmit(e) {
  e.preventDefault();

  // Show secure loader
  document.getElementById('payment-form').style.display = 'none';
  const loader = document.getElementById('payment-loader');
  const statusMsg = document.getElementById('payment-status-message');
  loader.style.display = 'flex';

  const data = {
    html: appState.compiledHtml,
    name: appState.formData.personal.name,
    email: appState.formData.personal.email
  };

  // 1. STRIPE SECURE REDIRECT FLOW
  if (appState.activeGateway === 'stripe') {
    statusMsg.innerHTML = "Provisioning secure Stripe cloud session...";

    fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(resData => {
      if (resData.success) {
        statusMsg.innerHTML = "Redirecting securely to Stripe Portal...";
        setTimeout(() => {
          window.location.href = resData.url;
        }, 800);
      } else {
        showToast(resData.error || "Checkout redirect failed. Please verify credentials.", "error");
        openCheckoutModal();
      }
    })
    .catch(err => {
      console.error('Stripe redirect failed:', err);
      showToast("Checkout server is currently offline. Standalone exports are still active!", "error");
      closeCheckoutModal();
    });
  } 
  // 2. RAZORPAY INDIVIDUAL POPUP FLOW (UPI / NetBanking / Cards)
  else if (appState.activeGateway === 'razorpay') {
    statusMsg.innerHTML = "Provisioning secure Razorpay order token...";

    fetch('/api/create-razorpay-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(resData => {
      if (resData.success) {
        if (resData.sandbox) {
          statusMsg.innerHTML = "Staging sandbox INR authorization...";
          setTimeout(() => {
            window.location.href = resData.url;
          }, 800);
        } else {
          // Hide loader overlay to present Razorpay widget smoothly
          loader.style.display = 'none';
          
          const options = {
            key: resData.keyId,
            amount: resData.amount,
            currency: "INR",
            name: "Portfolio Magic",
            description: `${resData.name}'s Custom Portfolio Website & Hosting`,
            order_id: resData.orderId,
            prefill: {
              name: resData.name,
              email: resData.email,
              contact: appState.formData.personal.phone || ""
            },
            theme: {
              color: "#a855f7"
            },
            handler: function (response) {
              // Capture and cryptographically verify signature on payment success
              showToast("Payment captured. Cryptographically validating signature...", "info");
              
              // Bring back loading screen
              document.getElementById('payment-form').style.display = 'none';
              loader.style.display = 'flex';
              statusMsg.innerHTML = "Finalizing cloud server directory release...";

              fetch('/api/verify-razorpay-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  draftId: resData.draftId
                })
              })
              .then(verifyRes => verifyRes.json())
              .then(verifyData => {
                if (verifyData.success) {
                  closeCheckoutModal();
                  appState.deployedUrl = verifyData.url;
                  document.getElementById('deployed-url-text').innerText = verifyData.url;
                  document.getElementById('btn-visit-site').href = verifyData.url;
                  switchView('success');
                  showToast("Portfolio cryptographically verified and deployed live! 🚀", "success");
                  triggerConfetti();
                } else {
                  showToast("Signature verification failed. Order flagged.", "error");
                  openCheckoutModal();
                }
              })
              .catch(err => {
                console.error('Razorpay verify call failed:', err);
                showToast("Verification timeout.", "error");
                openCheckoutModal();
              });
            },
            modal: {
              ondismiss: function() {
                openCheckoutModal();
                showToast("Payment window closed.", "info");
              }
            }
          };

          const rzp1 = new Razorpay(options);
          rzp1.open();
        }
      } else {
        showToast(resData.error || "Failed to initialize Razorpay order.", "error");
        openCheckoutModal();
      }
    })
    .catch(err => {
      console.error('Razorpay order call failed:', err);
      showToast("Checkout server is currently offline. Standalone exports are still active!", "error");
      closeCheckoutModal();
    });
  }
}

// Visual gateway state switcher
function setGateway(gateName) {
  appState.activeGateway = gateName;
  
  const razorBtn = document.getElementById('gate-btn-razorpay');
  const stripeBtn = document.getElementById('gate-btn-stripe');
  
  const priceText = document.getElementById('checkout-total-price');
  const submitBtn = document.getElementById('btn-submit-payment');
  const badgeMsg = document.getElementById('checkout-badge-message');

  if (gateName === 'razorpay') {
    razorBtn.className = 'btn btn-secondary active';
    razorBtn.style.borderColor = 'var(--accent-purple)';
    razorBtn.style.background = 'rgba(168, 85, 247, 0.05)';
    razorBtn.style.color = 'white';

    stripeBtn.className = 'btn btn-secondary';
    stripeBtn.style.borderColor = 'var(--panel-border)';
    stripeBtn.style.background = 'rgba(255,255,255,0.05)';
    stripeBtn.style.color = 'var(--text-main)';

    priceText.innerText = '₹299.00 INR';
    submitBtn.innerText = '💳 Pay ₹299.00 via Razorpay (UPI / NetBanking / Card)';
    badgeMsg.innerText = '🇮🇳 Secured and powered by Razorpay. Supports Google Pay, PhonePe, Paytm, and NetBanking.';
  } else if (gateName === 'stripe') {
    stripeBtn.className = 'btn btn-secondary active';
    stripeBtn.style.borderColor = 'var(--accent-purple)';
    stripeBtn.style.background = 'rgba(168, 85, 247, 0.05)';
    stripeBtn.style.color = 'white';

    razorBtn.className = 'btn btn-secondary';
    razorBtn.style.borderColor = 'var(--panel-border)';
    razorBtn.style.background = 'rgba(255,255,255,0.05)';
    razorBtn.style.color = 'var(--text-main)';

    priceText.innerText = '$4.99 USD';
    submitBtn.innerText = '💳 Proceed to Stripe Secure Checkout ($4.99)';
    badgeMsg.innerText = '🌍 Secure SSL transaction processed directly via Stripe hosted portal.';
  }
}

// 8. DOWNLOAD STANDALONE HTML FILE (Client packager utility)
function downloadStandaloneHtml() {
  const html = appState.compiledHtml;
  if (!html) {
    showToast("Portfolio code compilation was not completed.", "error");
    return;
  }

  const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${appState.formData.personal.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.html`;
  document.body.appendChild(a);
  a.click();
  
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("Standalone HTML downloaded. You can upload this directly to Netlify or Github Pages! 💾", "success");
}

function copyLinkToClipboard() {
  const link = appState.deployedUrl;
  navigator.clipboard.writeText(link).then(() => {
    showToast("Deployment link copied to clipboard! 📋", "success");
  }).catch(() => {
    showToast("Copy failed. Highlight and copy manually.", "error");
  });
}

function restartBuilder() {
  appState.formData = JSON.parse(JSON.stringify(defaultData));
  populateFormInputs();
  rebuildDynamicRows();
  updatePreview();
  switchView('landing');
}

// 9. HELPER TOAST NOTIFICATION SYSTEM
function showToast(message, type = "info") {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = '💡';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '❌';

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  // Auto remove toast after 4s
  setTimeout(() => {
    toast.style.animation = 'slide-in 0.3s reverse';
    setTimeout(() => {
      container.removeChild(toast);
    }, 280);
  }, 4000);
}

// 10. CONFETTI Visual Effects
function triggerConfetti() {
  const count = 80;
  
  for(let i=0; i<count; i++) {
    const p = document.createElement('div');
    p.style.position = 'fixed';
    p.style.width = Math.random()*8 + 4 + 'px';
    p.style.height = Math.random()*8 + 4 + 'px';
    p.style.background = ['#a855f7', '#06b6d4', '#22c55e', '#ff007f', '#ffde47'][Math.floor(Math.random()*5)];
    p.style.top = '100vh';
    p.style.left = Math.random()*100 + 'vw';
    p.style.borderRadius = '50%';
    p.style.zIndex = 3000;
    p.style.opacity = Math.random();
    document.body.appendChild(p);
    
    const speed = Math.random()*2 + 1;
    const peak = Math.random()*60 + 20;
    const drift = (Math.random() - 0.5) * 15;
    
    let top = 100;
    let left = parseFloat(p.style.left);
    
    const anim = setInterval(() => {
      top -= speed;
      left += drift * 0.05;
      p.style.top = top + 'vh';
      p.style.left = left + 'vw';
      p.style.opacity = top/100;
      
      if (top <= peak) {
        clearInterval(anim);
        document.body.removeChild(p);
      }
    }, 16);
  }
}
