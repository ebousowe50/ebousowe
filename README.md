# Ebou A. Sowe — Academic Profile

Academic website for Ebou A. Sowe, doctoral student at the School of Artificial Intelligence, Wuhan University of Technology, under the supervision of Prof. Junwei Zhou.

Website address after GitHub Pages is enabled: https://ebousowe50.github.io/ebousowe/

## Enable GitHub Pages

In this repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select **main** and **/ (root)**, and save. Wait for the Pages deployment to complete.

## Edit the site

- `index.html`: biography, selected publications, professional experience, education, academic service, courses, and contact information.
- `publications.html`: full citations, DOI and reading links, and topic filters. The homepage links to each paper by its section ID.
- `cv.html`: print-friendly academic CV.
- `assets/config.js`: GitHub and optional Google Scholar profile links.
- `assets/style.css`: responsive layout and print styles.
- `assets/main.js`: mobile navigation and publication filters.
- `assets/portrait.jpeg`: profile photograph.

All local links are relative, so the site works under the repository path. No build tools, external services, or secrets are required. `.nojekyll` makes GitHub Pages serve the static files directly.

Use the print button on the academic CV to save a PDF.
