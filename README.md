# Meld

Meld is the Project 13 MVP for a private, self-hosted collaborative document platform.

## Included in this prototype

- Rich-text document editing and browser-local autosave
- Document navigation and collaborator presence UI
- Comments, suggestions-mode toggle, and version-history interactions
- Print/PDF export
- Responsive desktop, tablet, and mobile layouts

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production architecture

The next implementation phase should split the system into:

- **Web:** Next.js/TypeScript, a ProseMirror-based editor, and Yjs bindings
- **Sync service:** Rust with Axum, Tokio, WebSockets, and durable Yjs-compatible updates
- **API:** Rust/Axum for auth, workspaces, documents, comments, permissions, and exports
- **Database:** PostgreSQL for metadata, ACLs, comments, and version checkpoints
- **Storage:** S3-compatible object storage for attachments and generated exports
- **Jobs:** isolated PDF/DOCX conversion workers

The current presence and version controls are interactive UI prototypes. Real multi-user synchronization requires the sync service, awareness protocol, authentication, and durable update log described above.
