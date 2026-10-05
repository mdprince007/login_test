# 📚 3D Interactive Codex & Web Showcase

A collection of 3D Three.js interactive library shelf landing pages and login interfaces, powered by a zero-dependency Node.js HTTP server.

---

## 🌐 Available Live Pages

- ⚖️ **The Jurisprudence Codex (Law Firm 3D Shelf):** [http://localhost:5842/law](http://localhost:5842/law) (or `/firm`)
  - 18 interactive leather-bound legal tomes across 3 chambers (Constitutional, Corporate M&A, White-Collar Defense)
  - Draggable 3D wooden library shelf with inertia physics, candle & emerald banker's lamp glow
  - Click to draw out books, open leather covers, and turn 3D parchment leaves with synthesized audio feedback
  - Floating chamber navigation bar & confidential counsel consultation modal
  - Editorial law firm showcase with 130 years of jurisprudence, partner directory, and landmark precedent digests

- 📚 **Workshop Codex Shelf:** [http://localhost:5842/shelf](http://localhost:5842/shelf) (or `/`)
  - The complete 3D interactive leather-bound library shelf for workshops & digital courses
  - Procedural Canvas 2D morocco, calf, and vellum textures with gold foil stamping
  - Full editorial curriculum sheet with deckle-edge paper and Garamond typography

- 🔑 **Interactive Login Experiences:**
  - **Login 1 (Glassmorphism Sign In):** [http://localhost:5842/login](http://localhost:5842/login)
  - **Login 2 (Interactive SVG Avatar):** [http://localhost:5842/login2](http://localhost:5842/login2)
  - **Login 3 (Interactive Huddle Characters):** [http://localhost:5842/login3](http://localhost:5842/login3)

---

## 📁 Project Structure

- `law.html` -> 3D Law Firm Jurisprudence Codex landing page
- `shelf.html` -> 3D Workshop Codex Shelf landing page
- `index.html` -> Login 1 (Glassmorphism Sign In)
- `login2.html` -> Login 2 (Interactive SVG Avatar)
- `login3.html` -> Login 3 (Interactive Huddle Characters)
- `server.js` -> Zero-dependency Node.js static & API server
- `start.bat` -> 1-click launcher for Windows
- `shelf-preview.jpg` -> Visual preview of the 3D library shelf

---

## 🚀 How to Run

Double-click `start.bat` or run:
```bash
node server.js
```
Open [http://localhost:5842/law](http://localhost:5842/law) or [http://localhost:5842/shelf](http://localhost:5842/shelf) in any modern browser.
