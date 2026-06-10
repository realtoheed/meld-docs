"use client";

import {
  Archive, Bold, Check, ChevronDown, Clock3, Cloud,
  Download, File, FileText, Folder, Heading1,
  Heading2, Highlighter, History, Image as ImageIcon, Italic, Link2, List, ListOrdered,
  LockKeyhole, MessageSquare, MoreHorizontal, Plus, Quote, Redo2, Search,
  Send, Share2, ShieldCheck, Sparkles, Strikethrough, Underline,
  Undo2, Users, X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const documents = [
  { title: "Q3 Brand Campaign", meta: "Edited just now", active: true },
  { title: "Product Launch Brief", meta: "Edited 2h ago" },
  { title: "Website Copy", meta: "Edited yesterday" },
  { title: "Customer Interview Notes", meta: "Edited Mon" },
];

const versions = [
  { time: "Today, 10:42 AM", author: "You", note: "Refined campaign goals", color: "#7458d6" },
  { time: "Today, 10:18 AM", author: "Maya Chen", note: "Added audience section", color: "#e18b4b" },
  { time: "Yesterday, 4:31 PM", author: "Noah Williams", note: "Initial campaign outline", color: "#399d83" },
];

type Panel = "comments" | "history" | null;

export default function Home() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState<Panel>("comments");
  const [mode, setMode] = useState("Editing");
  const [saved, setSaved] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { name: "Maya Chen", initials: "MC", time: "8m", text: "Should we call out the customer research behind this direction?", color: "#e18b4b" },
    { name: "Noah Williams", initials: "NW", time: "2m", text: "I can add the supporting metrics here before the review.", color: "#399d83" },
  ]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const savedContent = localStorage.getItem("meld-document");
    if (savedContent && editorRef.current) editorRef.current.innerHTML = savedContent;
  }, []);

  const format = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleInput = () => {
    setSaved(false);
    window.clearTimeout(Number(document.body.dataset.saveTimer));
    const timer = window.setTimeout(() => {
      if (editorRef.current) localStorage.setItem("meld-document", editorRef.current.innerHTML);
      setSaved(true);
    }, 650);
    document.body.dataset.saveTimer = String(timer);
  };

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const addComment = () => {
    if (!comment.trim()) return;
    setComments((current) => [...current, { name: "You", initials: "JD", time: "now", text: comment.trim(), color: "#7458d6" }]);
    setComment("");
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><FileText size={20} /></div><span>Meld</span></div>
        <button className="new-document"><Plus size={18} /> New document</button>
        <div className="search"><Search size={16} /><input aria-label="Search documents" placeholder="Search" /><kbd>⌘ K</kbd></div>
        <nav className="primary-nav" aria-label="Workspace">
          <button className="nav-item active"><FileText size={17} /> All documents <span>12</span></button>
          <button className="nav-item"><Users size={17} /> Shared with me <span>4</span></button>
          <button className="nav-item"><Clock3 size={17} /> Recent</button>
          <button className="nav-item"><Archive size={17} /> Archive</button>
        </nav>
        <div className="section-label"><span>Workspace</span><Plus size={15} /></div>
        <button className="folder-row"><ChevronDown size={15} /><Folder size={17} /> Northstar Studio</button>
        <div className="document-list">
          {documents.map((doc) => (
            <button className={`document-row ${doc.active ? "active" : ""}`} key={doc.title}>
              <File size={15} /><span><b>{doc.title}</b><small>{doc.meta}</small></span>
            </button>
          ))}
        </div>
        <div className="sidebar-footer">
          <button className="storage-card"><Cloud size={18} /><span><b>Self-hosted</b><small>All data stays on your server</small></span><ShieldCheck size={17} /></button>
          <button className="user-card"><span className="avatar purple">JD</span><span><b>Jordan Davis</b><small>Northstar Studio</small></span><MoreHorizontal size={18} /></button>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="doc-identity"><FileText size={20} /><div><input aria-label="Document title" defaultValue="Q3 Brand Campaign" /><span><LockKeyhole size={12} /> Private workspace</span></div></div>
          <div className="top-actions">
            <span className={`save-status ${saved ? "" : "saving"}`}>{saved ? <Check size={14} /> : <Cloud size={14} />}{saved ? "Saved" : "Saving..."}</span>
            <div className="avatar-stack" aria-label="3 collaborators online"><span className="avatar orange">MC</span><span className="avatar green">NW</span><span className="avatar purple">JD</span></div>
            <button className="icon-button" aria-label="Open comments" onClick={() => setPanel(panel === "comments" ? null : "comments")}><MessageSquare size={18} /><i>{comments.length}</i></button>
            <button className="share-button" onClick={() => notify("Private share link copied")}><Share2 size={16} /> Share</button>
            <button className="icon-button" aria-label="More options"><MoreHorizontal size={20} /></button>
          </div>
        </header>

        <div className="toolbar" role="toolbar" aria-label="Text formatting">
          <div className="tool-group"><button aria-label="Undo" onClick={() => format("undo")}><Undo2 size={17} /></button><button aria-label="Redo" onClick={() => format("redo")}><Redo2 size={17} /></button></div>
          <div className="tool-group"><button className="select-tool" onClick={() => format("formatBlock", "p")}>Paragraph <ChevronDown size={14} /></button></div>
          <div className="tool-group">
            <button aria-label="Bold" onClick={() => format("bold")}><Bold size={17} /></button><button aria-label="Italic" onClick={() => format("italic")}><Italic size={17} /></button>
            <button aria-label="Underline" onClick={() => format("underline")}><Underline size={17} /></button><button aria-label="Strikethrough" onClick={() => format("strikeThrough")}><Strikethrough size={17} /></button>
          </div>
          <div className="tool-group"><button aria-label="Heading one" onClick={() => format("formatBlock", "h1")}><Heading1 size={18} /></button><button aria-label="Heading two" onClick={() => format("formatBlock", "h2")}><Heading2 size={18} /></button></div>
          <div className="tool-group"><button aria-label="Bulleted list" onClick={() => format("insertUnorderedList")}><List size={18} /></button><button aria-label="Numbered list" onClick={() => format("insertOrderedList")}><ListOrdered size={18} /></button><button aria-label="Quote" onClick={() => format("formatBlock", "blockquote")}><Quote size={17} /></button></div>
          <div className="tool-group"><button aria-label="Text color"><span className="text-color">A</span></button><button aria-label="Highlight" onClick={() => format("hiliteColor", "#fff0a6")}><Highlighter size={17} /></button><button aria-label="Insert link" onClick={() => format("createLink", prompt("Enter URL") || "")}><Link2 size={17} /></button><button aria-label="Insert image"><ImageIcon size={17} /></button></div>
          <div className="toolbar-spacer" />
          <button className="mode-select" onClick={() => setMode(mode === "Editing" ? "Suggesting" : "Editing")}><Sparkles size={15} /> {mode}<ChevronDown size={14} /></button>
          <button className="history-button" aria-label="Version history" onClick={() => setPanel(panel === "history" ? null : "history")}><History size={18} /></button>
          <button className="export-button" onClick={() => window.print()}><Download size={15} /> Export<ChevronDown size={14} /></button>
        </div>

        <div className="editor-stage">
          <div className="page-wrap">
            <div className="presence-label maya"><span /> Maya is editing</div>
            <article ref={editorRef} className="document-page" contentEditable suppressContentEditableWarning onInput={handleInput}>
              <p className="eyebrow">NORTHSTAR STUDIO / CAMPAIGN BRIEF</p>
              <h1>Q3 Brand Campaign</h1>
              <p className="lead">Building a more human connection between ambitious teams and the work they are proud to put into the world.</p>
              <hr />
              <h2>Campaign overview</h2>
              <p>This campaign introduces Northstar&apos;s evolved brand story through a clear, confident point of view: better work begins when teams have the space, clarity, and trust to make meaningful progress together.</p>
              <div className="callout"><span><Sparkles size={18} /></span><p><strong>Core idea</strong>We are not selling another productivity tool. We are creating the conditions for work that feels focused, collaborative, and genuinely worthwhile.</p></div>
              <h2>Objectives</h2>
              <ul>
                <li><strong>Strengthen brand recognition</strong> among creative and product-led teams.</li>
                <li><strong>Increase qualified demand</strong> by connecting our product to meaningful outcomes.</li>
                <li><strong>Build emotional relevance</strong> through stories grounded in real work.</li>
              </ul>
              <h2>Primary audience</h2>
              <p>Team leads, operators, and makers at growing companies who care deeply about craft, but feel the drag of fragmented tools and scattered communication.</p>
              <blockquote>&ldquo;Our best work happens when the tools disappear and the team can think together.&rdquo;<cite>Customer interview, May 2026</cite></blockquote>
              <h2>Message pillars</h2>
              <div className="pillar-grid">
                <div><b>01</b><strong>Clarity over noise</strong><span>One calm place for the work that matters.</span></div>
                <div><b>02</b><strong>Built for trust</strong><span>Private, transparent, and owned by your team.</span></div>
                <div><b>03</b><strong>Momentum together</strong><span>Ideas become decisions without losing context.</span></div>
              </div>
            </article>
            <div className="presence-label noah"><span /> Noah is here</div>
          </div>
        </div>
      </section>

      {panel && <aside className="right-panel">
        <div className="panel-header"><div><button className={panel === "comments" ? "active" : ""} onClick={() => setPanel("comments")}>Comments</button><button className={panel === "history" ? "active" : ""} onClick={() => setPanel("history")}>History</button></div><button aria-label="Close panel" onClick={() => setPanel(null)}><X size={18} /></button></div>
        {panel === "comments" ? (
          <>
            <div className="comment-context"><span>Open comments</span><button>All <ChevronDown size={13} /></button></div>
            <div className="comments-list">
              {comments.map((item, index) => <div className="comment-card" key={`${item.name}-${index}`}><div className="comment-meta"><span className="avatar" style={{background: item.color}}>{item.initials}</span><span><b>{item.name}</b><small>{item.time} ago</small></span><button aria-label="Comment options"><MoreHorizontal size={17} /></button></div><p>{item.text}</p>{index === 0 && <div className="quoted-text">“better work begins when teams have the space...”</div>}<button className="resolve"><Check size={14} /> Resolve</button></div>)}
            </div>
            <div className="comment-compose"><div className="compose-input"><textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Add a comment..." aria-label="Add a comment" /><button aria-label="Send comment" onClick={addComment}><Send size={16} /></button></div><small>Use <kbd>@</kbd> to mention someone</small></div>
          </>
        ) : (
          <div className="history-list"><div className="history-intro"><History size={20} /><div><b>Version history</b><span>Changes are saved automatically</span></div></div>{versions.map((version, index) => <button className={`version-row ${index === 0 ? "active" : ""}`} key={version.time}><span className="version-dot" style={{background: version.color}} /><div><b>{version.time}</b><span>{version.author} · {version.note}</span></div>{index === 0 && <small>Current</small>}</button>)}<button className="restore-button" onClick={() => notify("Version restored")}>Restore selected version</button></div>
        )}
      </aside>}
      {toast && <div className="toast" role="status"><Check size={17} />{toast}</div>}
    </main>
  );
}
