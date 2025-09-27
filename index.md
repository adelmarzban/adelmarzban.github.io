<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Adel Marzban | Physician, Scientist, Data Scientist</title>
  <style>
    /* ===== BRAND COLORS ===== */
    :root {
      --teal: #006D77;
      --cyan: #00B4D8;
      --coral: #FF6B6B;
      --gray: #2E2E2E;
      --silver: #E0E0E0;
      --white: #FFFFFF;
    }

    body {
      font-family: 'Inter', sans-serif;
      margin: 0;
      background-color: var(--white);
      color: var(--gray);
      line-height: 1.6;
    }

    header {
      background: var(--teal);
      color: var(--white);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    nav a {
      color: var(--white);
      margin: 0 1rem;
      text-decoration: none;
      font-weight: 600;
    }

    nav a:hover {
      color: var(--cyan);
    }

    .hero {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4rem 2rem;
      background: var(--teal);
      color: var(--white);
    }

    .hero h1 { font-size: 2.5rem; }
    .hero p { font-size: 1.2rem; }

    .btn-primary {
      background: var(--cyan);
      color: var(--white);
      padding: 0.8rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
    }
    .btn-primary:hover { background: var(--coral); }

    section {
      padding: 4rem 2rem;
    }

    .section-alt { background: var(--silver); }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .card {
      background: var(--white);
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    footer {
      background: var(--gray);
      color: var(--white);
      text-align: center;
      padding: 2rem 1rem;
    }
  </style>
</head>
<body>
  <!-- HEADER -->
  <header>
    <h2>Adel Marzban</h2>
    <nav>
      <a href="#about">About</a>
      <a href="#research">Research</a>
      <a href="#datasci">Data Science</a>
      <a href="#blog">Blog</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <!-- HERO -->
  <section class="hero">
    <div>
      <h1>Physician, Scientist, Data Scientist</h1>
      <p>Innovating at the intersection of tissue engineering and data science.</p>
      <a href="#about" class="btn-primary">Explore My Work</a>
    </div>
  </section>

  <!-- ABOUT -->
  <section id="about">
    <h2>About Me</h2>
    <p>I am a physician, researcher, and data scientist with expertise in tissue engineering, allograft processing, and healthcare innovation. My passion lies in bridging science with practical solutions for patient recovery while also applying data-driven methods to accelerate healthcare advancements.</p>
  </section>

  <!-- RESEARCH -->
  <section id="research" class="section-alt">
    <h2>Research & Healthcare Projects</h2>
    <div class="grid">
      <div class="card"><h3>Skin Allograft Processing</h3><p>Innovative preparation and clinical application studies.</p></div>
      <div class="card"><h3>Acellular Dermis Membranes</h3><p>Development of biocompatible scaffolds for wound care and maxillofacial surgery.</p></div>
      <div class="card"><h3>Collagen-Based Biomaterials</h3><p>Injectable fillers and powders designed for regenerative medicine.</p></div>
    </div>
  </section>

  <!-- DATA SCIENCE -->
  <section id="datasci">
    <h2>Data Science & Coding</h2>
    <div class="grid">
      <div class="card"><h3>Predictive Models</h3><p>Machine learning for healthcare risk assessment.</p></div>
      <div class="card"><h3>GitHub Projects</h3><p>Open-source tools in Python, ML, and healthcare data analysis.</p></div>
    </div>
  </section>

  <!-- BLOG -->
  <section id="blog" class="section-alt">
    <h2>Blog</h2>
    <div class="grid">
      <div class="card"><h3>First Blog Post</h3><p>Welcome to my research and coding journey.</p></div>
      <div class="card"><h3>Tissue Banking Insights</h3><p>Exploring challenges and innovations in graft preparation.</p></div>
    </div>
  </section>

  <!-- CONTACT -->
  <section id="contact">
    <h2>Contact</h2>
    <p>Let’s connect — research, collaboration, or innovation.</p>
    <p>
      <a href="https://linkedin.com" class="btn-primary">LinkedIn</a>
      <a href="https://github.com" class="btn-primary">GitHub</a>
      <a href="mailto:your-email@example.com" class="btn-primary">Email</a>
    </p>
  </section>

  <!-- FOOTER -->
  <footer>
    <p>© 2025 Adel Marzban | All Rights Reserved</p>
  </footer>
</body>
</html>
