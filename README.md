# Discharge Summary Builder (DS Builder)

A fast, lightweight, and offline-first Progressive Web Application (PWA) designed for doctors, junior residents, and medical officers to quickly build, format, and share standardized clinical discharge summaries directly from desktop or mobile devices.

---

## ⚡ Key Features

- **A4 Smart Auto-Fit Engine**: Automatic space-occupying algorithm adjusting layout density (`relaxed`, `compact`, `compact2`) and matching the View summary guides to A4 browser/Microsoft Print to PDF page geometry.
- **Offline-First PWA**: Built with Service Workers (`sw.js`) and Web App Manifest (`manifest.json`) for seamless offline operation in hospital wards and OPDs.
- **Native PDF Generation & Sharing**: On-device PDF rendering using `html2pdf.js` with direct mobile file sharing (`navigator.share`) for WhatsApp, Gmail, or Drive.
- **Clinical Workflows & Quick Bundles**:
  - Pre-built treatment and prescription bundles for CAD, HFrEF, COPD, CAP, T2DM, and SHTN.
  - One-tap course templates for common clinical scenarios (Dengue, Pneumonia, DKA, Stroke, AGE, etc.).
  - Dynamic investigation table editor with common lab panel auto-fill (CBC, RFT, LFT, Coagulation).
- **Persistent Local Storage**: Real-time auto-saving through IndexedDB with `localStorage` fallback, plus an optional browser persistent-storage request for mobile and desktop.
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
├── index.html          # Page structure and form markup
├── styles.css          # Form, A4 preview, responsive, and print styles
├── app.js              # State, rendering, persistence, and actions
├── manifest.json       # Web App Manifest for mobile installation
├── sw.js               # Service Worker for offline caching
├── icon-192.png        # App icon (192x192)
├── icon-512.png        # App icon (512x512)
└── README.md           # Project documentation
```

The application remains a dependency-free vanilla JavaScript app. Keeping the
markup, styles, and behavior in separate files makes print-layout changes and
clinical form updates easier to review without changing the runtime architecture.

The summary preview uses the same 210mm × 297mm page canvas as printing. Its A4
guides account for the 7mm left/right print margins, a 6.825mm first-page top
margin (0.65 × the 10.5mm later-page margin), the 16mm first-page bottom
margin, and 10.5mm vertical margins on later pages. Summary headings use print
break rules that keep the heading with the beginning of its content; signatures
may use the bottom margin when needed.
The fill form sections are numbered and each section has its own Clear action.
Persistent storage requests are user-triggered and may be granted or denied
silently by the browser after the app confirmation.

On desktop, Print / PDF uses the browser's native print flow, including
Microsoft Print to PDF on Windows. On mobile, where that printer service is not
available, Print / PDF generates an A4 PDF in the browser and downloads it;
Share / Send PDF uses the same generated file and shares it when supported.

🛡️ Medical & Privacy Disclaimer
Data Privacy: All patient information entered into DS Builder stays strictly on the client device in browser local storage. No health data is stored or transmitted to remote servers.

Clinical Verification: Generated discharge summaries must be reviewed, verified, and signed by a qualified medical officer before official issuance.
