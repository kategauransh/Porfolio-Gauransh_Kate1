import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { api } from './services/api';

function AppContent() {
  const { user, loading, error, register, login, logout, clearError } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  
  // Form States
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  
  // Dashboard Interactive States
  const [fetchedUserData, setFetchedUserData] = useState(null);
  const [fetchedAdminData, setFetchedAdminData] = useState(null);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');
  const [decodedToken, setDecodedToken] = useState(null);

  // Parse JWT Token Claims dynamically on user change
  useEffect(() => {
    if (user?.token) {
      try {
        const payloadBase64 = user.token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        
        // Convert exp and iat to readable times
        const expDate = new Date(decodedPayload.exp * 1000).toLocaleString();
        const iatDate = new Date(decodedPayload.iat * 1000).toLocaleString();
        
        setDecodedToken({
          header: { alg: "HS256", typ: "JWT" },
          payload: { ...decodedPayload, iat_readable: iatDate, exp_readable: expDate }
        });
      } catch (err) {
        console.error("Token decoding error:", err);
        setDecodedToken(null);
      }
    } else {
      setDecodedToken(null);
    }
  }, [user]);

  // Clear alerts when switching views
  const handleViewToggle = () => {
    setIsLoginView(!isLoginView);
    setFormError('');
    setFormSuccess('');
    clearError();
    setUsername('');
    setEmail('');
    setPassword('');
    setRole('USER');
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    
    if (!username || !email || !password) {
      setFormError('Please fill in all fields');
      return;
    }
    
    try {
      await register(username, email, password, role);
      setFormSuccess('Registration successful! Welcome to the secure space.');
    } catch (err) {
      // Error is already managed inside AuthContext but we catch it to prevent unhandled rejections
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    
    if (!username || !password) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      await login(username, password);
      setFormSuccess('Access Granted. Redirecting to workspace...');
    } catch (err) {
      // Managed in AuthContext
    }
  };

  // Live REST API Demonstration Handlers
  const fetchUserEndpoint = async () => {
    setApiError('');
    setApiSuccess('');
    setFetchedUserData(null);
    try {
      const data = await api.getUserDashboard();
      setFetchedUserData(data);
      setApiSuccess('Successfully fetched standard User Protected API Endpoint!');
    } catch (err) {
      setApiError(`Access Denied! ${err.message}`);
    }
  };

  const fetchAdminEndpoint = async () => {
    setApiError('');
    setApiSuccess('');
    setFetchedAdminData(null);
    try {
      const data = await api.getAdminDashboard();
      setFetchedAdminData(data);
      setApiSuccess('Successfully fetched restricted Admin Protected API Endpoint!');
    } catch (err) {
      setApiError(`Forbidden Access! ${err.message} (Role ADMIN required)`);
    }
  };

  const handleLogoutAction = () => {
    logout();
    setFetchedUserData(null);
    setFetchedAdminData(null);
    setApiError('');
    setApiSuccess('');
  };

  // 1. Rendering Loading Spinner
  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p style={{ fontFamily: 'Outfit', fontWeight: 600 }}>Securing session layer...</p>
      </div>
    );
  }

  // 2. Rendering Anonymous User View (Login / Register)
  if (!user) {
    return (
      <div className="app-container">
        <div className="ambient-glows">
          <div className="glow-1"></div>
          <div className="glow-2"></div>
        </div>
        
        <header className="navbar">
          <div className="logo">
            <span style={{ fontSize: '1.75rem' }}>🛡️</span> SecureAuth.IO
          </div>
          <div className="nav-links">
            <button className="btn-outline" onClick={handleViewToggle}>
              {isLoginView ? 'Create Account' : 'Sign In'}
            </button>
          </div>
        </header>

        <main className="main-content">
          <div className="glass-panel">
            <div className="glowing-badge">
              <span className="glowing-dot"></span> Full-Stack Security Demo
            </div>
            
            <h1 className="title-main">{isLoginView ? 'Welcome Back' : 'Get Started'}</h1>
            <p className="subtitle">
              {isLoginView 
                ? 'Sign in to access your role-based JWT protected dashboards.' 
                : 'Register a custom profile with specified security roles to test database flow.'}
            </p>

            {/* Error alerts */}
            {(formError || error) && (
              <div className="alert-container alert-error">
                <span>⚠️</span>
                <div>{formError || error}</div>
              </div>
            )}

            {/* Success alerts */}
            {formSuccess && (
              <div className="alert-container alert-success">
                <span>✅</span>
                <div>{formSuccess}</div>
              </div>
            )}

            {isLoginView ? (
              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <div className="input-container">
                    <span className="input-icon">👤</span>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Enter username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-container">
                    <span className="input-icon">🔒</span>
                    <input 
                      type="password" 
                      className="form-input" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-premium">
                  <span>Sign In Securely</span> ➔
                </button>
                
                {/* Preconfigured Test Logins for Recruiters */}
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(9,10,15,0.4)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>
                    Recruiter Quick-Test Credentials:
                  </p>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div>Create your own account, or use:</div>
                    <div style={{ fontFamily: 'monospace' }}>• Username: <strong>user</strong> / Password: <strong>password</strong> <span className="badge badge-user" style={{ fontSize: '0.6rem', padding: '0.1rem 0.3rem' }}>USER</span></div>
                    <div style={{ fontFamily: 'monospace' }}>• Username: <strong>admin</strong> / Password: <strong>password</strong> <span className="badge badge-admin" style={{ fontSize: '0.6rem', padding: '0.1rem 0.3rem' }}>ADMIN</span></div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontStyle: 'italic' }}>
                    Note: Pre-seeded users will be auto-generated in PostgreSQL if they don't exist yet!
                  </div>
                </div>

                <p className="footer-text">
                  New to this framework?{' '}
                  <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); handleViewToggle(); }}>
                    Create an account
                  </a>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit}>
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <div className="input-container">
                    <span className="input-icon">👤</span>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Create username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-container">
                    <span className="input-icon">✉️</span>
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder="yourname@gmail.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-container">
                    <span className="input-icon">🔒</span>
                    <input 
                      type="password" 
                      className="form-input" 
                      placeholder="At least 6 characters" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Security Clearance Role</label>
                  <div className="select-wrapper">
                    <span className="input-icon" style={{ zIndex: 1 }}>🛡️</span>
                    <select 
                      className="form-select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      style={{ paddingLeft: '2.75rem' }}
                    >
                      <option value="USER">Standard User (ROLE_USER)</option>
                      <option value="ADMIN">Administrator (ROLE_ADMIN)</option>
                    </select>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem', lineHeight: '1.4' }}>
                    ADMIN accounts receive elevated access to restrictive Spring Security endpoints.
                  </p>
                </div>

                <button type="submit" className="btn-premium">
                  <span>Register Account</span> ➔
                </button>

                <p className="footer-text">
                  Already have an account?{' '}
                  <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); handleViewToggle(); }}>
                    Sign In
                  </a>
                </p>
              </form>
            )}
          </div>
        </main>
      </div>
    );
  }

  // 3. Rendering Authenticated Dashboard
  return (
    <div className="app-container">
      <div className="ambient-glows">
        <div className="glow-1"></div>
        <div className="glow-2"></div>
      </div>

      <header className="navbar">
        <div className="logo" onClick={() => window.location.reload()}>
          <span>🛡️</span> SecureAuth.IO
        </div>
        <div className="nav-links">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Session: <strong style={{ color: 'var(--text-primary)' }}>{user.username}</strong>
            </span>
            <span className={`badge ${user.role === 'ADMIN' ? 'badge-admin' : 'badge-user'}`}>
              {user.role}
            </span>
          </div>
          <button className="btn-outline" onClick={handleLogoutAction} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
            Logout
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="glass-panel dashboard-panel">
          <div className="dashboard-grid">
            
            {/* Sidebar View */}
            <div className="dashboard-sidebar">
              <div className="user-profile-card">
                <div className="avatar-glow">
                  {user.username.substring(0, 2).toUpperCase()}
                </div>
                <div className="profile-username">{user.username}</div>
                <div className="profile-email">{user.email}</div>
                <span className={`badge ${user.role === 'ADMIN' ? 'badge-admin' : 'badge-user'}`} style={{ marginTop: '0.5rem' }}>
                  ROLE_{user.role}
                </span>
              </div>

              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Security Monitor
                </p>
                <div className="monitor-bar-container">
                  <div className="monitor-label">
                    <span>Database Connection</span>
                    <span style={{ color: 'var(--secondary)' }}>Active (PostgreSQL)</span>
                  </div>
                  <div className="monitor-bar"><div className="monitor-bar-fill" style={{ width: '100%' }}></div></div>
                </div>
                <div className="monitor-bar-container">
                  <div className="monitor-label">
                    <span>Token State</span>
                    <span style={{ color: 'var(--secondary)' }}>Validated</span>
                  </div>
                  <div className="monitor-bar"><div className="monitor-bar-fill" style={{ width: '100%', background: 'var(--secondary)' }}></div></div>
                </div>
                <div className="monitor-bar-container">
                  <div className="monitor-label">
                    <span>Access Level Clearance</span>
                    <span>{user.role === 'ADMIN' ? 'Level-2 (Admin)' : 'Level-1 (User)'}</span>
                  </div>
                  <div className="monitor-bar"><div className="monitor-bar-fill" style={{ width: user.role === 'ADMIN' ? '100%' : '50%', background: user.role === 'ADMIN' ? 'var(--accent)' : 'var(--primary)' }}></div></div>
                </div>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <button className="btn-premium btn-danger" onClick={handleLogoutAction}>
                  Terminated Session
                </button>
              </div>
            </div>

            {/* Main Interactive Board */}
            <div className="dashboard-main">
              
              {/* Alert Notification for dashboard operations */}
              {apiSuccess && (
                <div className="alert-container alert-success" style={{ marginBottom: '0' }}>
                  <span>🚀</span>
                  <div>{apiSuccess}</div>
                </div>
              )}
              {apiError && (
                <div className="alert-container alert-error" style={{ marginBottom: '0' }}>
                  <span>🚫</span>
                  <div>{apiError}</div>
                </div>
              )}

              {/* Card 1: API Endpoint Demonstrator */}
              <div className="console-card">
                <div className="console-header">
                  <h2 className="console-title">
                    <span>🔌</span> Live API Endpoint Demonstrator
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    Trigger secure endpoints to show how Spring Security filter intercepts and validates the token.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  <button className="btn-premium" style={{ flex: 1, minWidth: '180px' }} onClick={fetchUserEndpoint}>
                    🔓 Fetch User Resource
                  </button>
                  <button className="btn-premium" style={{ flex: 1, minWidth: '180px', background: 'linear-gradient(135deg, var(--accent) 0%, #b5179e 100%)', boxShadow: '0 4px 12px rgba(217, 70, 239, 0.3)' }} onClick={fetchAdminEndpoint}>
                    🔒 Fetch Admin Resource
                  </button>
                </div>

                {/* Display Fetched Resource Outputs */}
                {(fetchedUserData || fetchedAdminData) && (
                  <div style={{ background: 'rgba(9, 10, 15, 0.6)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: 600 }}>
                      <span style={{ color: fetchedAdminData ? 'var(--accent)' : 'var(--secondary)' }}>
                        {fetchedAdminData ? 'REST Endpoint: /api/dashboard/admin' : 'REST Endpoint: /api/dashboard/user'}
                      </span>
                      <span style={{ color: 'var(--success)' }}>HTTP 200 OK</span>
                    </div>
                    <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.85rem', color: '#a5b4fc', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
                      {JSON.stringify(fetchedAdminData || fetchedUserData, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* Card 2: Interactive JWT Token Inspector */}
              {decodedToken && (
                <div className="console-card">
                  <div className="console-header">
                    <h2 className="console-title">
                      <span>🕵️</span> Interactive JWT Inspector
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                      Decoded in real-time on the client-side. This token is attached to the <code>Authorization: Bearer</code> header for every API request.
                    </p>
                  </div>

                  <div>
                    <label className="form-label" style={{ marginBottom: '0.25rem' }}>Raw Token String (Stored in LocalStorage)</label>
                    <div className="token-container">
                      <span className="copy-badge" onClick={() => {
                        navigator.clipboard.writeText(user.token);
                        alert('Token copied to clipboard!');
                      }}>Copy</span>
                      {user.token}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                      {/* JWT Header */}
                      <div>
                        <label className="form-label" style={{ color: 'var(--accent)' }}>JWT Header</label>
                        <div style={{ background: '#090a0f', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem' }}>
                          <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.8rem', color: '#f472b6' }}>
                            {JSON.stringify(decodedToken.header, null, 2)}
                          </pre>
                        </div>
                      </div>

                      {/* JWT Claims Payload */}
                      <div>
                        <label className="form-label" style={{ color: 'var(--secondary)' }}>JWT Claims Payload</label>
                        <div style={{ background: '#090a0f', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem' }}>
                          <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.8rem', color: '#2dd4bf', whiteSpace: 'pre-wrap' }}>
                            {JSON.stringify(decodedToken.payload, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
