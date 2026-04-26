# Personal Portfolio

This repository contains a personal portfolio website. It is a static front-end site with multiple sections, including About, Resume, Portfolio, Photography, and Contact.

## Features

- Responsive portfolio layout with sidebar navigation.
- About section with a short bio and current focus areas.
- Resume section with education, experience, and skills.
- Portfolio section with category filtering for web applications and academic work.
- Photography section that loads its gallery data from `assets/js/photo-items.js`.
- Photography search, category filtering, and pagination.
- Contact section with an embedded map and contact form UI.
- Firebase-based GitHub authentication for admin access.
- Admin-only controls for adding portfolio items and photo items.

## Tech Stack

- HTML5
- CSS3
- JavaScript modules
- Firebase Authentication
- Firebase Storage setup in the client code
- Ionicons for icons

## Project Structure

```text
index.html
assets/
  css/
    style.css
  images/
  js/
    firebase.js
    photo-items.js
    script.js
wall/
  index.html
  wall_photos/
```

## Wall Page

The `wall/` folder contains a separate wall page that showcases photos in a dedicated layout. It is linked from the main portfolio and uses its own `index.html` entry point plus the images stored in `wall_photos/`.

## Photography Data

The photography gallery is populated from the array exported in `assets/js/photo-items.js`. Each item includes:

- scientific title
- category
- image path
- display name
- iNaturalist link
- icon name

The current photo upload modal in `assets/js/script.js` is a UI placeholder. It collects data, but the actual upload to Firebase Storage and persistence to Firestore still needs to be implemented.

## Notes

- The site is currently configured for GitHub Pages-style static hosting.
- Some external resources are loaded from CDNs, including Google Fonts, Firebase modules, and Ionicons.