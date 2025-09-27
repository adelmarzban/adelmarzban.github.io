🌐 Adel Marzban | Tissue Innovation, Data Science & Biomedical AI
This repository hosts the source code for the personal and professional website of Adel Marzban, a multipotential scientist, physician, researcher, and entrepreneur. The site bridges expertise in Regenerative Medicine/Tissue Engineering with Biomedical AI/Data Science.

The website is hosted using GitHub Pages and utilizes the Jekyll static site generator for the blog functionality.

✨ Vision and Design
Overall Goal: To function as a professional portfolio, business hub, and thought leadership platform, showcasing depth in biomedical innovation and breadth in digital transformation.

Design: Clean, modern, minimalist with a "Glass-Liquid" aesthetic.
Color Palette: Optimized using custom CSS variables (Tailwind configuration) for a medical and tech vibe.

Deep Teal (#006D77): Primary brand color (Science, Trust).

Bright Cyan (#00B4D8): Tech Accent (Digital Innovation).

Warm Coral (#FF6B6B): CTA Accent (Humanity, Energy).

🛠️ Technology Stack
Hosting: GitHub Pages

Static Site Generator: Jekyll (for the /blog.html and posts)

Front-End: Pure HTML5, CSS3, JavaScript

Styling Framework: Tailwind CSS (via CDN)

Icons: Font Awesome (via CDN)

📂 Repository Structure
The project follows a standard Jekyll structure to enable blog post generation and asset management.

adelmarzban.github.io/
├── index.html            <-- Main Portfolio Landing Page (Single Page App)
├── blog.html             <-- Jekyll Blog Index / Archive
├── _config.yml           <-- Jekyll Configuration File
├── _layouts/             <-- Templates for dynamic content (e.g., blog posts)
│   └── default.html      <-- Wrapper for all Markdown pages
├── _posts/               <-- Contains all blog articles in Markdown (.md) format
│   └── YYYY-MM-DD-title.md
├── assets/
│   ├── img/              <-- Images (Hero background, profile pics, etc.)
│   └── pdfs/             <-- Downloadable Resources (Papers, Case Studies, Pitches)
└── README.md             <-- This file

📝 How to Add Content
1. Daily Blog Posts
To add a new article to the blog section:

Create a new file inside the _posts/ directory.

Name the file using the format: YYYY-MM-DD-your-post-title.md.

Ensure the file starts with the following Jekyll Front Matter, replacing the values as needed:

---
layout: default
title: "Your New Blog Post Title"
author: Adel Marzban
categories: [Topic 1, Topic 2]
---

## Start Writing Here

This is the body of your post, written in Markdown format.

2. Update Downloadable Resources
Place new documents (PDFs, PPTs, etc.) into the assets/pdfs/ folder.

Update the href links in index.html (specifically in the Tissue Engineering and Entrepreneurship sections) to point to the new file path.

🚀 Getting Started (Local Development)
While the site runs entirely on GitHub Pages, if you wish to run it locally (especially to preview blog posts using Jekyll):

Install Ruby and Jekyll: Follow the official Jekyll documentation for your operating system.

Clone the Repository:

git clone [https://github.com/adelmarzban/adelmarzban.github.io.git](https://github.com/adelmarzban/adelmarzban.github.io.git)
cd adelmarzban.github.io

Install Dependencies:

bundle install

Run Locally:

bundle exec jekyll serve

View the site at http://localhost:4000.

🔍 SEO & Verification
The site is configured for SEO best practices.

Google Search Console: The verification meta tag is placed in both index.html and _layouts/default.html for site-wide verification. Remember to replace YOUR_UNIQUE_CODE_FROM_GOOGLE with your actual code.

Sitemap: Jekyll automatically generates a sitemap.xml file which you can submit to Google Search Console for improved indexi
