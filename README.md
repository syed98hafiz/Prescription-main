# Discharge Summary Builder (DS Builder)

A fast, lightweight, and offline-first Progressive Web Application (PWA) designed for doctors, junior residents, and medical officers to quickly build, format, and share standardized clinical discharge summaries directly from desktop or mobile devices.

---

## ⚡ Key Features

- **A4 Smart Auto-Fit Engine**: Automatic space-occupying algorithm adjusting layout density (`relaxed`, `compact`, `compact2`) and print page boundaries to fit summaries cleanly on A4 sheets.
- **Offline-First PWA**: Built with Service Workers (`sw.js`) and Web App Manifest (`manifest.json`) for seamless offline operation in hospital wards and OPDs.
- **Native PDF Generation & Sharing**: On-device PDF rendering using `html2pdf.js` with direct mobile file sharing (`navigator.share`) for WhatsApp, Gmail, or Drive.
- **Clinical Workflows & Quick Bundles**:
  - Pre-built treatment and prescription bundles for CAD, HFrEF, COPD, CAP, T2DM, and SHTN.
  - One-tap course templates for common clinical scenarios (Dengue, Pneumonia, DKA, Stroke, AGE, etc.).
  - Dynamic investigation table editor with common lab panel auto-fill (CBC, RFT, LFT, Coagulation).
- **Persistent Local Storage**: Real-time auto-saving (`localStorage`) so drafts survive browser refreshes or accidental tab closures.
- **Customizable Institution Defaults**: Save hospital header, logo, unit prefix, and unit chief defaults once—automatically populated for every new patient.
- **Privacy-First Architecture**: 100% client-side execution; no patient data is ever transmitted to external servers.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Modern CSS3 (CSS Grid, Flexbox, `@media print`, CSS Variables)
- **Logic**: Pure Vanilla JavaScript (ES6+)
- **Libraries**: [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) for client-side PDF rendering
- **PWA**: Custom Service Worker (`sw.js`) and Web App Manifest (`manifest.json`)
- **Deployment**: GitHub Pages

---

## 📂 Project Structure

```text
.
├── index.html          # Core single-page application (UI, Form, Preview & Scripts)
├── manifest.json       # Web App Manifest for mobile installation
├── sw.js               # Service Worker for offline caching
├── icon-192.png        # App icon (192x192)
├── icon-512.png        # App icon (512x512)
└── README.md           # Project documentation

🛡️ Medical & Privacy Disclaimer
Data Privacy: All patient information entered into DS Builder stays strictly on the client device in browser local storage. No health data is stored or transmitted to remote servers.

Clinical Verification: Generated discharge summaries must be reviewed, verified, and signed by a qualified medical officer before official issuance.
