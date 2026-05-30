// Premium Portfolio Themes Generator
const Templates = {
  // 1. GLASSMORPHIC CREATIVE
  glassmorphic: {
    name: "Glassmorphic Creative",
    description: "Vibrant glowing backgrounds with modern frosted glass panels.",
    generate: (data) => {
      const skillsHtml = (data.skills || []).map(skill => `<span class="skill-tag">${skill}</span>`).join('');
      
      const expHtml = (data.experience || []).map(exp => `
        <div class="glass-card timeline-item">
          <span class="date">${exp.duration}</span>
          <h3>${exp.role}</h3>
          <h4>${exp.company}</h4>
          <p>${exp.description}</p>
        </div>
      `).join('');

      const eduHtml = (data.education || []).map(edu => `
        <div class="glass-card timeline-item">
          <span class="date">${edu.duration}</span>
          <h3>${edu.degree}</h3>
          <h4>${edu.school}</h4>
          <p>${edu.description}</p>
        </div>
      `).join('');

      const projHtml = (data.projects || []).map(proj => {
        const tags = (proj.tags || []).map(t => `<span class="proj-tag">${t}</span>`).join('');
        return `
          <div class="glass-card project-card">
            <h3>${proj.title}</h3>
            <p>${proj.description}</p>
            <div class="proj-tags">${tags}</div>
            ${proj.link ? `<a href="${proj.link}" target="_blank" class="proj-link">View Project <span class="arrow">→</span></a>` : ''}
          </div>
        `;
      }).join('');

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.personal.name} | Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #c084fc;
      --secondary: #6366f1;
      --accent: #22d3ee;
      --bg: #0b0f19;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --glass-bg: rgba(255, 255, 255, 0.05);
      --glass-border: rgba(255, 255, 255, 0.08);
      --glass-shadow: rgba(0, 0, 0, 0.3);
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      line-height: 1.6;
    }
    
    /* Animated Gradient Blobs */
    .blob {
      position: fixed;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      filter: blur(80px);
      z-index: -1;
      opacity: 0.45;
      animation: float 20s infinite alternate;
    }
    .blob-1 {
      background: var(--primary);
      top: -10%;
      left: -10%;
      animation-delay: 0s;
    }
    .blob-2 {
      background: var(--secondary);
      bottom: -10%;
      right: -10%;
      animation-delay: 5s;
    }
    .blob-3 {
      background: var(--accent);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation-delay: 10s;
      width: 300px;
      height: 300px;
      opacity: 0.25;
    }
    
    @keyframes float {
      0% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(50px, 30px) scale(1.1); }
      100% { transform: translate(-30px, -50px) scale(0.9); }
    }
    
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    /* Header/Nav */
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 0;
      border-bottom: 1px solid var(--glass-border);
      margin-bottom: 4rem;
    }
    .logo {
      font-family: 'Outfit', sans-serif;
      font-size: 1.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #fff, var(--primary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .social-links {
      display: flex;
      gap: 1rem;
    }
    .social-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.95rem;
      transition: color 0.3s;
    }
    .social-links a:hover {
      color: var(--primary);
    }
    
    /* Glassmorphism card */
    .glass-card {
      background: var(--glass-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--glass-border);
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 8px 32px 0 var(--glass-shadow);
      transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
    }
    .glass-card:hover {
      transform: translateY(-4px);
      border-color: rgba(255, 255, 255, 0.15);
      box-shadow: 0 12px 40px 0 rgba(192, 132, 252, 0.15);
    }
    
    /* Hero Section */
    .hero {
      display: grid;
      grid-template-columns: 1fr 150px;
      gap: 2rem;
      align-items: center;
      margin-bottom: 5rem;
    }
    .hero-content h1 {
      font-family: 'Outfit', sans-serif;
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #fff, var(--primary), var(--accent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-content h2 {
      font-family: 'Outfit', sans-serif;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--accent);
      margin-bottom: 1.5rem;
    }
    .hero-content p {
      font-size: 1.1rem;
      color: var(--text-muted);
      max-width: 600px;
    }
    .hero-avatar img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 4px solid var(--glass-border);
      box-shadow: 0 8px 32px var(--glass-shadow);
      object-fit: cover;
    }
    
    /* Section Defaults */
    section {
      margin-bottom: 5rem;
    }
    section h2.sec-title {
      font-family: 'Outfit', sans-serif;
      font-size: 2.2rem;
      font-weight: 800;
      margin-bottom: 2rem;
      position: relative;
      display: inline-block;
    }
    section h2.sec-title::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -6px;
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, var(--primary), var(--accent));
      border-radius: 2px;
    }
    
    /* Skills */
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .skill-tag {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--glass-border);
      color: var(--text);
      padding: 0.6rem 1.2rem;
      border-radius: 50px;
      font-size: 0.95rem;
      font-weight: 600;
      transition: background 0.3s, transform 0.3s;
      cursor: default;
    }
    .skill-tag:hover {
      background: rgba(192, 132, 252, 0.15);
      border-color: var(--primary);
      transform: scale(1.05);
    }
    
    /* Timeline Experience / Education */
    .timeline {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .timeline-item {
      position: relative;
    }
    .timeline-item .date {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 1px;
      display: block;
      margin-bottom: 0.5rem;
    }
    .timeline-item h3 {
      font-family: 'Outfit', sans-serif;
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 0.2rem;
    }
    .timeline-item h4 {
      font-weight: 600;
      color: var(--primary);
      font-size: 1rem;
      margin-bottom: 0.8rem;
    }
    .timeline-item p {
      color: var(--text-muted);
      font-size: 0.95rem;
    }
    
    /* Projects */
    .projects-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }
    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
      .hero {
        grid-template-columns: 1fr;
        text-align: center;
      }
      .hero-avatar {
        order: -1;
      }
    }
    .project-card h3 {
      font-family: 'Outfit', sans-serif;
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 0.8rem;
    }
    .project-card p {
      color: var(--text-muted);
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }
    .proj-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    .proj-tag {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--glass-border);
      color: var(--primary);
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.3rem 0.8rem;
      border-radius: 4px;
    }
    .proj-link {
      color: var(--accent);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      display: inline-flex;
      align-items: center;
      transition: color 0.3s;
    }
    .proj-link .arrow {
      margin-left: 0.3rem;
      transition: transform 0.3s;
    }
    .proj-link:hover {
      color: var(--primary);
    }
    .proj-link:hover .arrow {
      transform: translateX(4px);
    }
    
    /* Contact */
    .contact-card {
      text-align: center;
      padding: 3rem;
    }
    .contact-card h3 {
      font-family: 'Outfit', sans-serif;
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }
    .contact-card p {
      color: var(--text-muted);
      margin-bottom: 2rem;
    }
    .btn-contact {
      display: inline-block;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
      text-decoration: none;
      padding: 0.8rem 2rem;
      border-radius: 50px;
      font-weight: 600;
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .btn-contact:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
    }
    
    footer {
      text-align: center;
      padding: 3rem 0;
      border-top: 1px solid var(--glass-border);
      color: var(--text-muted);
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="blob blob-3"></div>

  <div class="container">
    <header>
      <div class="logo">${data.personal.name.split(' ')[0] || 'Portfolio'}.</div>
      <div class="social-links">
        ${data.personal.github ? `<a href="${data.personal.github}" target="_blank">Github</a>` : ''}
        ${data.personal.linkedin ? `<a href="${data.personal.linkedin}" target="_blank">LinkedIn</a>` : ''}
        ${data.personal.twitter ? `<a href="${data.personal.twitter}" target="_blank">Twitter</a>` : ''}
      </div>
    </header>

    <section class="hero">
      <div class="hero-content">
        <h2>Hello, I'm</h2>
        <h1>${data.personal.name}</h1>
        <h2>${data.personal.title}</h2>
        <p>${data.personal.bio}</p>
      </div>
      <div class="hero-avatar">
        <img src="${data.personal.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + encodeURIComponent(data.personal.name)}" alt="${data.personal.name}">
      </div>
    </section>

    ${data.skills && data.skills.length > 0 ? `
    <section id="skills">
      <h2 class="sec-title">My Skills</h2>
      <div class="skills-grid">
        ${skillsHtml}
      </div>
    </section>
    ` : ''}

    ${data.projects && data.projects.length > 0 ? `
    <section id="projects">
      <h2 class="sec-title">Featured Projects</h2>
      <div class="projects-grid">
        ${projHtml}
      </div>
    </section>
    ` : ''}

    ${data.experience && data.experience.length > 0 ? `
    <section id="experience">
      <h2 class="sec-title">Work Experience</h2>
      <div class="timeline">
        ${expHtml}
      </div>
    </section>
    ` : ''}

    ${data.education && data.education.length > 0 ? `
    <section id="education">
      <h2 class="sec-title">Education</h2>
      <div class="timeline">
        ${eduHtml}
      </div>
    </section>
    ` : ''}

    <section id="contact">
      <div class="glass-card contact-card">
        <h3>Let's build something together!</h3>
        <p>Get in touch for projects, collabs, or just a virtual coffee.</p>
        <a href="mailto:${data.personal.email}" class="btn-contact">Say Hello</a>
        <div style="margin-top: 1.5rem; color: var(--text-muted); font-size: 0.9rem;">
          ${data.personal.phone ? `<div>Phone: ${data.personal.phone}</div>` : ''}
          ${data.personal.location ? `<div>Location: ${data.personal.location}</div>` : ''}
        </div>
      </div>
    </section>

    <footer>
      <p>&copy; ${new Date().getFullYear()} ${data.personal.name}. Built with Portfolio Magic.</p>
    </footer>
  </div>
</body>
</html>`;
    }
  },

  // 2. MINIMALIST PROFESSIONAL
  minimalist: {
    name: "Minimalist Professional",
    description: "Elegant serif typography, heavy spacing, stark luxury.",
    generate: (data) => {
      const skillsHtml = (data.skills || []).map(skill => `<span class="skill-tag">${skill}</span>`).join('');
      
      const expHtml = (data.experience || []).map(exp => `
        <div class="timeline-item">
          <div class="time-meta">
            <span class="date">${exp.duration}</span>
            <span class="company">${exp.company}</span>
          </div>
          <div class="time-body">
            <h3>${exp.role}</h3>
            <p>${exp.description}</p>
          </div>
        </div>
      `).join('');

      const eduHtml = (data.education || []).map(edu => `
        <div class="timeline-item">
          <div class="time-meta">
            <span class="date">${edu.duration}</span>
            <span class="company">${edu.school}</span>
          </div>
          <div class="time-body">
            <h3>${edu.degree}</h3>
            <p>${edu.description}</p>
          </div>
        </div>
      `).join('');

      const projHtml = (data.projects || []).map(proj => {
        const tags = (proj.tags || []).map(t => `<span class="proj-tag">${t}</span>`).join(' / ');
        return `
          <div class="project-card">
            <div class="proj-header">
              <h3>${proj.title}</h3>
              ${proj.link ? `<a href="${proj.link}" target="_blank" class="proj-link">→</a>` : ''}
            </div>
            <div class="proj-tags">${tags}</div>
            <p>${proj.description}</p>
          </div>
        `;
      }).join('');

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.personal.name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #faf9f6;
      --text: #1a1a1a;
      --text-muted: #666666;
      --border: #e0deda;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      line-height: 1.7;
      padding: 4rem 2rem;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--border);
      margin-bottom: 4rem;
    }
    
    header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 1.8rem;
      font-weight: 600;
    }
    
    header .nav-links {
      display: flex;
      gap: 1.5rem;
    }
    
    header .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.2s;
    }
    header .nav-links a:hover {
      color: var(--text);
    }
    
    /* Hero */
    .hero {
      margin-bottom: 6rem;
    }
    .hero h2 {
      font-family: 'Playfair Display', serif;
      font-size: 3rem;
      font-weight: 400;
      line-height: 1.25;
      margin-bottom: 2rem;
      font-style: italic;
    }
    .hero p {
      font-size: 1.1rem;
      color: var(--text-muted);
      max-width: 650px;
    }
    
    /* Section Defaults */
    section {
      margin-bottom: 6rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border);
    }
    
    .sec-header {
      margin-bottom: 3rem;
    }
    
    .sec-header h2 {
      font-family: 'Playfair Display', serif;
      font-size: 1.8rem;
      font-weight: 400;
    }
    
    /* Skills */
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
    }
    .skill-tag {
      background: none;
      border: 1px solid var(--border);
      color: var(--text);
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      border-radius: 2px;
      transition: all 0.2s;
    }
    .skill-tag:hover {
      background: var(--text);
      color: var(--bg);
      border-color: var(--text);
    }
    
    /* Timeline */
    .timeline {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }
    .timeline-item {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 2rem;
    }
    @media (max-width: 600px) {
      .timeline-item {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
      .hero h2 {
        font-size: 2.2rem;
      }
    }
    .time-meta {
      display: flex;
      flex-direction: column;
      font-size: 0.9rem;
      color: var(--text-muted);
    }
    .time-meta .date {
      font-weight: 600;
      color: var(--text);
    }
    .time-body h3 {
      font-size: 1.15rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .time-body p {
      color: var(--text-muted);
      font-size: 0.95rem;
    }
    
    /* Projects */
    .projects-grid {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }
    .project-card {
      padding-bottom: 2rem;
      border-bottom: 1px dashed var(--border);
    }
    .project-card:last-child {
      border: none;
      padding-bottom: 0;
    }
    .proj-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.3rem;
    }
    .proj-header h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.4rem;
      font-weight: 600;
    }
    .proj-link {
      text-decoration: none;
      color: var(--text);
      font-size: 1.3rem;
      transition: transform 0.2s;
    }
    .proj-link:hover {
      transform: translateX(4px);
    }
    .proj-tags {
      font-size: 0.8rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 1rem;
    }
    .project-card p {
      color: var(--text-muted);
      font-size: 0.95rem;
    }
    
    /* Contact */
    .contact-content {
      max-width: 500px;
    }
    .contact-content h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }
    .contact-content p {
      color: var(--text-muted);
      margin-bottom: 2rem;
    }
    .email-link {
      font-family: 'Playfair Display', serif;
      font-size: 1.8rem;
      color: var(--text);
      text-decoration: none;
      border-bottom: 1.5px solid var(--text);
      transition: color 0.2s, border-color 0.2s;
      font-style: italic;
    }
    .email-link:hover {
      color: var(--text-muted);
      border-color: var(--text-muted);
    }
    .contact-meta {
      margin-top: 2rem;
      font-size: 0.9rem;
      color: var(--text-muted);
    }
    
    footer {
      margin-top: 6rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      color: var(--text-muted);
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${data.personal.name}</h1>
      <div class="nav-links">
        ${data.personal.github ? `<a href="${data.personal.github}" target="_blank">Github</a>` : ''}
        ${data.personal.linkedin ? `<a href="${data.personal.linkedin}" target="_blank">LinkedIn</a>` : ''}
        ${data.personal.twitter ? `<a href="${data.personal.twitter}" target="_blank">Twitter</a>` : ''}
      </div>
    </header>

    <div class="hero">
      <h2>I specialize in designing and engineering high-fidelity web platforms as a ${data.personal.title}.</h2>
      <p>${data.personal.bio}</p>
    </div>

    ${data.skills && data.skills.length > 0 ? `
    <section id="skills">
      <div class="sec-header">
        <h2>Expertise</h2>
      </div>
      <div class="skills-grid">
        ${skillsHtml}
      </div>
    </section>
    ` : ''}

    ${data.projects && data.projects.length > 0 ? `
    <section id="projects">
      <div class="sec-header">
        <h2>Selected Works</h2>
      </div>
      <div class="projects-grid">
        ${projHtml}
      </div>
    </section>
    ` : ''}

    ${data.experience && data.experience.length > 0 ? `
    <section id="experience">
      <div class="sec-header">
        <h2>Professional Journey</h2>
      </div>
      <div class="timeline">
        ${expHtml}
      </div>
    </section>
    ` : ''}

    ${data.education && data.education.length > 0 ? `
    <section id="education">
      <div class="sec-header">
        <h2>Education</h2>
      </div>
      <div class="timeline">
        ${eduHtml}
      </div>
    </section>
    ` : ''}

    <section id="contact">
      <div class="contact-content">
        <h3>Connect</h3>
        <p>I am always open to exploring challenging opportunities and collaborative efforts.</p>
        <a href="mailto:${data.personal.email}" class="email-link">${data.personal.email}</a>
        
        <div class="contact-meta">
          ${data.personal.phone ? `<div>Phone: ${data.personal.phone}</div>` : ''}
          ${data.personal.location ? `<div>Location: ${data.personal.location}</div>` : ''}
        </div>
      </div>
    </section>

    <footer>
      <span>&copy; ${new Date().getFullYear()} ${data.personal.name}</span>
      <span>Built in Simplicity</span>
    </footer>
  </div>
</body>
</html>`;
    }
  },

  // 3. NEO-BRUTALIST DEVELOPER
  neobrutalist: {
    name: "Neo-Brutalist Developer",
    description: "High-contrast thick black borders, flat heavy shadows, primary colors.",
    generate: (data) => {
      const skillsHtml = (data.skills || []).map(skill => `<span class="skill-tag">${skill}</span>`).join('');
      
      const expHtml = (data.experience || []).map(exp => `
        <div class="neo-card timeline-item">
          <span class="date-badge">${exp.duration}</span>
          <h3>${exp.role}</h3>
          <h4>${exp.company}</h4>
          <p>${exp.description}</p>
        </div>
      `).join('');

      const eduHtml = (data.education || []).map(edu => `
        <div class="neo-card timeline-item">
          <span class="date-badge">${edu.duration}</span>
          <h3>${edu.degree}</h3>
          <h4>${edu.school}</h4>
          <p>${edu.description}</p>
        </div>
      `).join('');

      const projHtml = (data.projects || []).map(proj => {
        const tags = (proj.tags || []).map(t => `<span class="proj-tag">${t}</span>`).join('');
        return `
          <div class="neo-card project-card">
            <h3>${proj.title}</h3>
            <p>${proj.description}</p>
            <div class="proj-tags">${tags}</div>
            ${proj.link ? `<a href="${proj.link}" target="_blank" class="neo-btn btn-sm">VIEW REPO</a>` : ''}
          </div>
        `;
      }).join('');

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.personal.name} // Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #fffeee;
      --text: #000000;
      --primary: #ffde47;
      --secondary: #45ffca;
      --accent: #fe6244;
      --border-thickness: 4px;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Space Grotesk', sans-serif;
      line-height: 1.5;
      padding: 2rem;
    }
    
    .container {
      max-width: 950px;
      margin: 0 auto;
    }
    
    /* Navigation Bar */
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      background: white;
      border: var(--border-thickness) solid #000;
      box-shadow: 6px 6px 0px #000;
      margin-bottom: 4rem;
    }
    .logo {
      font-family: 'Syne', sans-serif;
      font-size: 1.8rem;
      font-weight: 800;
      letter-spacing: -1px;
    }
    .social-links {
      display: flex;
      gap: 1rem;
    }
    .social-links a {
      color: #000;
      text-decoration: none;
      font-weight: 700;
      padding: 0.4rem 0.8rem;
      background: var(--secondary);
      border: 2px solid #000;
      box-shadow: 2px 2px 0px #000;
      font-size: 0.9rem;
      transition: all 0.15s;
    }
    .social-links a:hover {
      transform: translate(-2px, -2px);
      box-shadow: 4px 4px 0px #000;
    }
    .social-links a:active {
      transform: translate(2px, 2px);
      box-shadow: 0px 0px 0px #000;
    }
    
    /* Hero */
    .hero {
      display: grid;
      grid-template-columns: 1fr 200px;
      gap: 2rem;
      align-items: center;
      background: var(--primary);
      border: var(--border-thickness) solid #000;
      padding: 3rem;
      box-shadow: 8px 8px 0px #000;
      margin-bottom: 4rem;
    }
    @media (max-width: 768px) {
      .hero {
        grid-template-columns: 1fr;
        padding: 2rem;
      }
      .hero-avatar {
        order: -1;
        justify-self: center;
      }
      .projects-grid {
        grid-template-columns: 1fr !important;
      }
    }
    .hero-content h1 {
      font-family: 'Syne', sans-serif;
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1rem;
    }
    .hero-content h2 {
      font-size: 1.6rem;
      font-weight: 700;
      background: white;
      display: inline-block;
      padding: 0.2rem 0.8rem;
      border: 2px solid #000;
      margin-bottom: 1.5rem;
    }
    .hero-content p {
      font-size: 1.15rem;
      font-weight: 500;
    }
    .hero-avatar img {
      width: 200px;
      height: 200px;
      border: var(--border-thickness) solid #000;
      box-shadow: 6px 6px 0px #000;
      object-fit: cover;
      background: white;
    }
    
    /* Section Defaults */
    section {
      margin-bottom: 4rem;
    }
    section h2.sec-title {
      font-family: 'Syne', sans-serif;
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 2rem;
      background: #000;
      color: white;
      display: inline-block;
      padding: 0.2rem 1.2rem;
      transform: rotate(-1deg);
    }
    
    /* Neo Brutalism Card */
    .neo-card {
      background: white;
      border: var(--border-thickness) solid #000;
      padding: 2rem;
      box-shadow: 6px 6px 0px #000;
      transition: all 0.2s;
      margin-bottom: 2rem;
    }
    .neo-card:hover {
      transform: translate(-4px, -4px);
      box-shadow: 10px 10px 0px #000;
    }
    
    /* Buttons */
    .neo-btn {
      display: inline-block;
      text-decoration: none;
      color: #000;
      background: var(--accent);
      color: white;
      font-weight: 700;
      font-family: 'Syne', sans-serif;
      padding: 0.8rem 2rem;
      border: var(--border-thickness) solid #000;
      box-shadow: 4px 4px 0px #000;
      transition: all 0.15s;
      cursor: pointer;
    }
    .neo-btn:hover {
      transform: translate(-3px, -3px);
      box-shadow: 7px 7px 0px #000;
    }
    .neo-btn:active {
      transform: translate(3px, 3px);
      box-shadow: 0px 0px 0px #000;
    }
    .btn-sm {
      padding: 0.4rem 1rem;
      font-size: 0.85rem;
      box-shadow: 3px 3px 0px #000;
    }
    .btn-sm:hover {
      box-shadow: 5px 5px 0px #000;
    }
    
    /* Skills */
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .skill-tag {
      background: var(--secondary);
      border: 3px solid #000;
      color: #000;
      font-weight: 700;
      padding: 0.6rem 1.2rem;
      box-shadow: 4px 4px 0px #000;
    }
    
    /* Timeline / Work Experience */
    .timeline {
      display: flex;
      flex-direction: column;
    }
    .timeline-item {
      position: relative;
    }
    .date-badge {
      display: inline-block;
      background: #000;
      color: white;
      font-weight: 700;
      font-size: 0.85rem;
      padding: 0.1rem 0.6rem;
      margin-bottom: 1rem;
    }
    .timeline-item h3 {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 0.2rem;
    }
    .timeline-item h4 {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 1rem;
    }
    .timeline-item p {
      font-weight: 500;
    }
    
    /* Projects */
    .projects-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
    .project-card h3 {
      font-family: 'Syne', sans-serif;
      font-size: 1.5rem;
      margin-bottom: 0.8rem;
    }
    .project-card p {
      font-weight: 500;
      margin-bottom: 1.5rem;
    }
    .proj-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    .proj-tag {
      background: var(--bg);
      border: 2px solid #000;
      padding: 0.2rem 0.6rem;
      font-size: 0.8rem;
      font-weight: 700;
    }
    
    /* Contact */
    .contact-card {
      text-align: center;
      background: var(--secondary);
    }
    .contact-card h3 {
      font-family: 'Syne', sans-serif;
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    .contact-card p {
      font-size: 1.1rem;
      font-weight: 500;
      margin-bottom: 2rem;
    }
    .contact-details {
      margin-top: 1.5rem;
      font-weight: 700;
      font-size: 0.95rem;
    }
    
    footer {
      text-align: center;
      padding: 2rem 0;
      border-top: var(--border-thickness) solid #000;
      font-weight: 700;
      margin-top: 4rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo">${data.personal.name.toUpperCase()}</div>
      <div class="social-links">
        ${data.personal.github ? `<a href="${data.personal.github}" target="_blank">GITHUB</a>` : ''}
        ${data.personal.linkedin ? `<a href="${data.personal.linkedin}" target="_blank">LINKEDIN</a>` : ''}
        ${data.personal.twitter ? `<a href="${data.personal.twitter}" target="_blank">TWITTER</a>` : ''}
      </div>
    </header>

    <section class="hero">
      <div class="hero-content">
        <h2>HI! I AM A ${data.personal.title.toUpperCase()}</h2>
        <h1>${data.personal.name}</h1>
        <p>${data.personal.bio}</p>
      </div>
      <div class="hero-avatar">
        <img src="${data.personal.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + encodeURIComponent(data.personal.name)}" alt="${data.personal.name}">
      </div>
    </section>

    ${data.skills && data.skills.length > 0 ? `
    <section id="skills">
      <h2 class="sec-title">CORE EXPERTISE</h2>
      <div class="skills-grid">
        ${skillsHtml}
      </div>
    </section>
    ` : ''}

    ${data.projects && data.projects.length > 0 ? `
    <section id="projects">
      <h2 class="sec-title">FEATURED WORK</h2>
      <div class="projects-grid">
        ${projHtml}
      </div>
    </section>
    ` : ''}

    ${data.experience && data.experience.length > 0 ? `
    <section id="experience">
      <h2 class="sec-title">WORK HISTORY</h2>
      <div class="timeline">
        ${expHtml}
      </div>
    </section>
    ` : ''}

    ${data.education && data.education.length > 0 ? `
    <section id="education">
      <h2 class="sec-title">EDUCATION</h2>
      <div class="timeline">
        ${eduHtml}
      </div>
    </section>
    ` : ''}

    <section id="contact">
      <div class="neo-card contact-card">
        <h3>LET'S WORK TOGETHER!</h3>
        <p>I am currently available for full-time contracts, consulting, or general inquiries.</p>
        <a href="mailto:${data.personal.email}" class="neo-btn">EMAIL ME NOW</a>
        
        <div class="contact-details">
          ${data.personal.phone ? `<div>TEL: ${data.personal.phone}</div>` : ''}
          ${data.personal.location ? `<div>LOC: ${data.personal.location}</div>` : ''}
        </div>
      </div>
    </section>

    <footer>
      <p>&copy; ${new Date().getFullYear()} ${data.personal.name.toUpperCase()} // ALL RIGHTS RESERVED.</p>
    </footer>
  </div>
</body>
</html>`;
    }
  },

  // 4. CYBERPUNK TECH
  cyberpunk: {
    name: "Cyberpunk Tech",
    description: "Monospace code grids, glitch highlights, glowing cyber neon style.",
    generate: (data) => {
      const skillsHtml = (data.skills || []).map(skill => `<span class="skill-tag">[${skill}]</span>`).join('');
      
      const expHtml = (data.experience || []).map(exp => `
        <div class="cyber-panel timeline-item">
          <div class="item-header">
            <span class="date">// ${exp.duration}</span>
            <span class="company">SYS.NODE: ${exp.company.toUpperCase()}</span>
          </div>
          <h3>> ${exp.role.toUpperCase()}</h3>
          <p>${exp.description}</p>
        </div>
      `).join('');

      const eduHtml = (data.education || []).map(edu => `
        <div class="cyber-panel timeline-item">
          <div class="item-header">
            <span class="date">// ${edu.duration}</span>
            <span class="company">INST: ${edu.school.toUpperCase()}</span>
          </div>
          <h3>> ${edu.degree.toUpperCase()}</h3>
          <p>${edu.description}</p>
        </div>
      `).join('');

      const projHtml = (data.projects || []).map(proj => {
        const tags = (proj.tags || []).map(t => `<span class="proj-tag">[${t}]</span>`).join(' ');
        return `
          <div class="cyber-panel project-card">
            <div class="card-glow"></div>
            <h3>// FILE: ${proj.title.toUpperCase()}</h3>
            <p>${proj.description}</p>
            <div class="proj-tags">${tags}</div>
            ${proj.link ? `<a href="${proj.link}" target="_blank" class="proj-link">EXECUTE_REPOSIT()</a>` : ''}
          </div>
        `;
      }).join('');

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>USER://${data.personal.name.replace(/\s+/g, '').toUpperCase()}/SYSTEM</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Fira+Code:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0a0a16;
      --grid: rgba(0, 240, 255, 0.03);
      --text: #c0caf5;
      --neon-cyan: #00f0ff;
      --neon-pink: #ff007f;
      --panel-bg: rgba(16, 16, 32, 0.7);
      --border: #1a1a3a;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      background-color: var(--bg);
      background-image: 
        linear-gradient(to right, var(--grid) 1px, transparent 1px),
        linear-gradient(to bottom, var(--grid) 1px, transparent 1px);
      background-size: 25px 25px;
      color: var(--text);
      font-family: 'Share Tech Mono', monospace;
      line-height: 1.6;
      padding: 3rem 1.5rem;
      overflow-x: hidden;
    }
    
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    
    /* CRT Scanline effect */
    body::before {
      content: " ";
      display: block;
      position: fixed;
      top: 0; left: 0; bottom: 0; right: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
      z-index: 9999;
      background-size: 100% 4px, 6px 100%;
      pointer-events: none;
      opacity: 0.85;
    }
    
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      background: var(--panel-bg);
      border: 1px solid var(--neon-cyan);
      box-shadow: 0 0 15px rgba(0, 240, 255, 0.15);
      margin-bottom: 4rem;
      position: relative;
    }
    header::after {
      content: '';
      position: absolute;
      bottom: -4px;
      right: 10px;
      width: 40px;
      height: 3px;
      background: var(--neon-pink);
    }
    
    .logo {
      font-size: 1.6rem;
      font-weight: bold;
      color: var(--neon-cyan);
      text-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
    }
    .social-links a {
      color: var(--neon-pink);
      text-decoration: none;
      border: 1px solid var(--neon-pink);
      padding: 0.3rem 0.8rem;
      transition: all 0.3s;
      font-size: 0.9rem;
    }
    .social-links a:hover {
      background: var(--neon-pink);
      color: #000;
      box-shadow: 0 0 10px var(--neon-pink);
    }
    
    /* Hero */
    .hero {
      display: grid;
      grid-template-columns: 1fr 160px;
      gap: 2rem;
      align-items: center;
      background: var(--panel-bg);
      border: 1px solid var(--border);
      border-left: 4px solid var(--neon-pink);
      padding: 3rem;
      margin-bottom: 4rem;
      box-shadow: 0 8px 20px rgba(0,0,0,0.5);
    }
    @media (max-width: 768px) {
      .hero {
        grid-template-columns: 1fr;
        padding: 2rem;
      }
      .hero-avatar {
        order: -1;
        justify-self: center;
      }
      .projects-grid {
        grid-template-columns: 1fr !important;
      }
    }
    .hero-content h2 {
      font-size: 1.2rem;
      color: var(--neon-pink);
      letter-spacing: 2px;
      margin-bottom: 0.5rem;
    }
    .hero-content h1 {
      font-size: 3.2rem;
      color: #fff;
      text-shadow: 0 0 10px rgba(255,255,255,0.2);
      margin-bottom: 0.5rem;
      line-height: 1;
    }
    .hero-content h3 {
      font-size: 1.4rem;
      color: var(--neon-cyan);
      margin-bottom: 1.5rem;
    }
    .hero-content p {
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      color: var(--text);
    }
    .hero-avatar img {
      width: 160px;
      height: 160px;
      border: 1px solid var(--neon-cyan);
      filter: grayscale(1) contrast(1.2) sepia(1) hue-rotate(140deg);
      box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
      object-fit: cover;
    }
    
    /* Section Defaults */
    section {
      margin-bottom: 5rem;
    }
    section h2.sec-title {
      font-size: 1.8rem;
      color: var(--neon-cyan);
      margin-bottom: 2rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      display: flex;
      align-items: center;
    }
    section h2.sec-title::after {
      content: '';
      flex-grow: 1;
      height: 1px;
      background: linear-gradient(90deg, var(--neon-cyan), transparent);
      margin-left: 1.5rem;
    }
    
    /* Cyber Panel */
    .cyber-panel {
      background: var(--panel-bg);
      border: 1px solid var(--border);
      padding: 2rem;
      margin-bottom: 1.5rem;
      position: relative;
      overflow: hidden;
      transition: all 0.3s;
    }
    .cyber-panel:hover {
      border-color: var(--neon-cyan);
      box-shadow: 0 0 15px rgba(0, 240, 255, 0.1);
    }
    .cyber-panel::before {
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 4px;
      height: 10px;
      background: var(--neon-cyan);
    }
    
    /* Skills */
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      background: var(--panel-bg);
      border: 1px solid var(--border);
      padding: 2.5rem;
    }
    .skill-tag {
      color: var(--neon-cyan);
      font-family: 'Fira Code', monospace;
      font-weight: bold;
      transition: all 0.2s;
      cursor: pointer;
    }
    .skill-tag:hover {
      color: var(--neon-pink);
      text-shadow: 0 0 8px var(--neon-pink);
    }
    
    /* Timeline / Work Exp */
    .timeline {
      display: flex;
      flex-direction: column;
    }
    .timeline-item h3 {
      font-size: 1.3rem;
      color: var(--neon-cyan);
      margin-bottom: 0.5rem;
    }
    .timeline-item p {
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      border-bottom: 1px dashed var(--border);
      padding-bottom: 0.5rem;
    }
    .item-header .date {
      color: var(--neon-pink);
    }
    .item-header .company {
      color: var(--text);
    }
    
    /* Projects */
    .projects-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }
    .project-card h3 {
      font-size: 1.25rem;
      color: #fff;
      margin-bottom: 0.8rem;
    }
    .project-card p {
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
    .proj-tags {
      margin-bottom: 1.5rem;
      font-size: 0.85rem;
      color: var(--neon-pink);
    }
    .proj-tag {
      margin-right: 0.5rem;
    }
    .proj-link {
      font-size: 0.9rem;
      color: var(--neon-cyan);
      text-decoration: none;
      border-bottom: 1px solid var(--neon-cyan);
      transition: all 0.3s;
    }
    .proj-link:hover {
      color: var(--neon-pink);
      border-color: var(--neon-pink);
      text-shadow: 0 0 5px var(--neon-pink);
    }
    
    /* Contact */
    .contact-panel {
      text-align: center;
      padding: 3.5rem;
      border: 1px solid var(--neon-pink);
      box-shadow: 0 0 15px rgba(255, 0, 127, 0.15);
    }
    .contact-panel h3 {
      font-size: 2rem;
      color: var(--neon-pink);
      margin-bottom: 1rem;
      text-shadow: 0 0 8px rgba(255, 0, 127, 0.3);
    }
    .contact-panel p {
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      margin-bottom: 2rem;
    }
    .btn-action {
      display: inline-block;
      text-decoration: none;
      background: none;
      color: var(--neon-cyan);
      border: 1px solid var(--neon-cyan);
      padding: 0.8rem 2.2rem;
      font-size: 1.1rem;
      font-weight: bold;
      transition: all 0.3s;
      cursor: pointer;
    }
    .btn-action:hover {
      background: var(--neon-cyan);
      color: #000;
      box-shadow: 0 0 15px var(--neon-cyan);
    }
    .contact-details {
      margin-top: 2rem;
      font-size: 0.9rem;
      font-family: 'Fira Code', monospace;
    }
    .contact-details div {
      margin-bottom: 0.3rem;
    }
    
    footer {
      text-align: center;
      padding: 3rem 0;
      border-top: 1px solid var(--border);
      color: var(--border);
      font-size: 0.85rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo">SYS.INIT://${data.personal.name.split(' ')[0].toUpperCase()}</div>
      <div class="social-links">
        ${data.personal.github ? `<a href="${data.personal.github}" target="_blank">NET.GITHUB</a>` : ''}
        ${data.personal.linkedin ? `<a href="${data.personal.linkedin}" target="_blank">NET.LINKEDIN</a>` : ''}
        ${data.personal.twitter ? `<a href="${data.personal.twitter}" target="_blank">NET.TWITTER</a>` : ''}
      </div>
    </header>

    <div class="hero">
      <div class="hero-content">
        <h2>// INTRODUCING DIRECTORY ENTRY:</h2>
        <h1>${data.personal.name.toUpperCase()}</h1>
        <h3>TITLE: ${data.personal.title.toUpperCase()}</h3>
        <p>${data.personal.bio}</p>
      </div>
      <div class="hero-avatar">
        <img src="${data.personal.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + encodeURIComponent(data.personal.name)}" alt="${data.personal.name}">
      </div>
    </div>

    ${data.skills && data.skills.length > 0 ? `
    <section id="skills">
      <h2 class="sec-title">SYS.CAPABILITIES()</h2>
      <div class="skills-grid">
        ${skillsHtml}
      </div>
    </section>
    ` : ''}

    ${data.projects && data.projects.length > 0 ? `
    <section id="projects">
      <h2 class="sec-title">CORE.REPOSITORIES()</h2>
      <div class="projects-grid">
        ${projHtml}
      </div>
    </section>
    ` : ''}

    ${data.experience && data.experience.length > 0 ? `
    <section id="experience">
      <h2 class="sec-title">SYS.EXPERIENCE_LOG()</h2>
      <div class="timeline">
        ${expHtml}
      </div>
    </section>
    ` : ''}

    ${data.education && data.education.length > 0 ? `
    <section id="education">
      <h2 class="sec-title">SYS.EDUCATION_METRIC()</h2>
      <div class="timeline">
        ${eduHtml}
      </div>
    </section>
    ` : ''}

    <section id="contact">
      <div class="cyber-panel contact-panel">
        <h3>// INTERFACE.ESTABLISH_LINK()</h3>
        <p>Awaiting connection... Channel available for incoming developer transmissions.</p>
        <a href="mailto:${data.personal.email}" class="btn-action">INITIALIZE_COMMS()</a>
        
        <div class="contact-details">
          ${data.personal.phone ? `<div>PORT_PHONE: ${data.personal.phone}</div>` : ''}
          ${data.personal.location ? `<div>PORT_LOC: ${data.personal.location.toUpperCase()}</div>` : ''}
        </div>
      </div>
    </section>

    <footer>
      <p>SYS.SECURE_VERSION: 1.0.42 // &copy; ${new Date().getFullYear()} ${data.personal.name.toUpperCase()}.</p>
    </footer>
  </div>
</body>
</html>`;
    }
  }
};

// Node module export fallback for backend compilation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Templates;
}
