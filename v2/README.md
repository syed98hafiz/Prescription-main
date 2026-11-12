# Discharge Summary Builder — v2 (Experimental Mirror + Dashboard + Supabase)

`v2/` is a completely isolated mirror of the main Discharge Summary Builder designed for testing new features (starting with the **Patient Dashboard** and **Supabase Authentication & Cloud Draft Sync**) without risking or modifying the live main website at `/`.

## Safety & Isolation Guarantees
- **Separate Storage**: Uses IndexedDB `"ds-builder-v2"` and `ds-v2:*` keys in `localStorage` so experiments in `v2/` never overwrite or corrupt drafts/defaults saved in the main website (`ds-builder`).
- **Separate Service Worker & Manifest**: `v2/sw.js` and `v2/manifest.json` are strictly scoped to `./` (`/v2/`) and only cache `./` `v2` static assets (never root `/` files and never Supabase Auth/REST requests).

## Setting Up Supabase (Cloud Login & Sync)
1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query** in your Supabase Dashboard, paste the contents of [`supabase-schema.sql`](./supabase-schema.sql), and click **Run**.
   - Creates `public.discharge_summaries` and `public.user_settings` with strict Row Level Security (`auth.uid() = user_id`).
3. In **Authentication → Providers → Email**, make sure Email/Password auth is enabled (and in **Authentication → URL Configuration**, add your `/v2/` URL under **Redirect URLs**, e.g. `https://<username>.github.io/<repo>/v2/`).
4. Copy your **Project URL** and **Anon (public) Key** from **Project Settings → API**:
   - Either paste them into [`supabase-config.js`](./supabase-config.js) and push, **OR**
   - Open `v2/` in your browser → click **Cloud Setup** on the Dashboard → paste your URL & Key → **Save & Connect**.

## Features in v2
- **Dashboard-First Workflow** (Desktop cards/table views + Mobile card layout):
  - Create, search, filter (`All`, `Incomplete`, `Completed`), sort, duplicate, preview/print, and resume patient summaries anytime.
  - Visual completion indicator and explicit `Incomplete` ↔ `Completed` status toggle.
- **Offline-First + Cloud Auto-Sync**:
  - Works offline in hospital wards; automatically queues unsynced edits/deletes locally and syncs with Supabase when logged in and online.
  - Per-user local cache isolation on shared ward computers when signing out.
- **Full Main Builder Parity**:
  - Universal `DD.MM.YYYY` dates with numeric keypad support, A4 smart pagination (`relaxed` / `compact` / `compact2`), signature pin toggle, empty-lines spacing, print & mobile PDF sharing.

