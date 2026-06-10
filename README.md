# Meld

A collaborative document editor that combines the simplicity of rich-text editing with the power of real-time collaboration, version history, and structured review workflows.

## Features

- **Rich-Text Editing** — Bold, italic, headings, lists, and more with browser-local autosave
- **Collaborator Presence** — See who else is viewing or editing a document
- **Comments & Suggestions** — Discuss inline and track changes with suggestion mode
- **Version History** — Browse, restore, and attribute changes to collaborators
- **Document Navigation** — Organize with document list and quick search
- **Export** — Print and PDF export support
- **Responsive** — Works on all screen sizes

## Tech Stack

- **Framework:** Next.js 16 (React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Font:** Geist

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Architecture (Planned)

- **Frontend:** Next.js (React) — this editor dashboard
- **Sync Engine:** Rust service using Axum WebSockets for real-time operational transforms
- **Database:** PostgreSQL for documents, comments, and version history
- **Storage:** S3-compatible for document snapshots

## Status

Frontend collaboration UI prototype. The editor interface, comments panel, version history, and presence indicators are fully built. Ready for real-time sync backend integration.
