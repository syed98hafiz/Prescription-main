# Discharge Summary Generator — Web App

A single self-contained page. Doctors open it, tick options, and click
**Download PDF** — the PDF is generated in the browser. Nothing is uploaded or
stored anywhere; there is no backend or database.

## Publish it (pick one)

**Easiest — Netlify Drop:** go to https://app.netlify.com/drop and drag the
`discharge-web` folder in. You get a public link in seconds.

**GitHub Pages:** create a repo, add `index.html`, then Settings → Pages →
deploy from the main branch. Your link becomes `https://<user>.github.io/<repo>/`.

**Your hospital web server:** just copy `index.html` into any folder served
over the web. It needs an internet connection the first time it loads (it pulls
the PDF library from a CDN).

## Configure before publishing

Open `index.html` and edit the `CONFIG` block near the top of the script:

```js
const CONFIG = {
  hospital: "Tirunelveli Medical College Hospital",
  department: "Department of General Medicine — M-IV Unit",
  logoDataUrl: null   // optional: paste a "data:image/png;base64,..." to bake in a logo
};
```

If you leave `logoDataUrl: null`, users can still upload a logo in-app
(Institution → Upload logo). To bake the logo in permanently so every user
sees it without uploading, convert your logo to a base64 data URL
(e.g. https://www.base64-image.de/) and paste the whole `data:image/...` string.

## Add / change headings

All headings live in the `SECTIONS` array (just below `CONFIG`). Each entry is
one heading on the PDF, in the order listed. Copy an entry, give it a new `id`,
`title`, and `options`. Types: `multi` (tick many), `single` (pick one),
`phrases` (editable paragraph), `meds`, `followup`. For `multi`, `join` can be
`'bullets'`, `'commas'`, or `'dots'`.

Drug / dose / frequency / duration lists are the `DRUGS`, `DOSE`, `FREQ`,
`DUR` arrays a little further down.
