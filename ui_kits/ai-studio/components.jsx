/* NLACE AI Studio — shared UI components.
   Exposes: Button, Badge, Card, Input, Icon, Sidebar, Topbar, StatCard,
            ProjectRow, ChatMessage, Composer, Banner.
*/

const Icon = ({ name, size = 18, stroke = 1.75, className = "" }) => {
  // Ref callback — Lucide will hydrate the <i> when lucide.createIcons() runs.
  return React.createElement("i", {
    "data-lucide": name,
    style: { width: size, height: size, display: "inline-flex" },
    className,
  });
};

const Button = ({ variant = "primary", size = "md", icon, children, className = "", ...props }) => {
  const cls = ["btn", variant, size !== "md" ? size : "", className].filter(Boolean).join(" ");
  return (
    <button className={cls} {...props}>
      {icon && <Icon name={icon} size={size === "sm" ? 14 : 16} />}
      {children}
    </button>
  );
};

const Badge = ({ variant = "primary", children }) => (
  <span className={`bdg ${variant}`}>{children}</span>
);

const Card = ({ accent, hover, className = "", children, ...props }) => (
  <div className={`card ${accent ? "accent" : ""} ${hover ? "hover" : ""} ${className}`} {...props}>
    {children}
  </div>
);

const Input = ({ label, hint, error, id, ...props }) => {
  const _id = id || `in-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <div className="field">
      {label && <label htmlFor={_id}>{label}</label>}
      <input id={_id} className="input" {...props} />
      {error ? <span className="err">{error}</span> : hint ? <span className="hint">{hint}</span> : null}
    </div>
  );
};

const Sidebar = ({ active, onNav, projectCount }) => {
  const items = [
    { id: "home",     icon: "home",        label: "Inicio" },
    { id: "projects", icon: "layers",      label: "Proyectos", count: projectCount },
    { id: "models",   icon: "sparkles",    label: "Modelos" },
    { id: "assets",   icon: "image",       label: "Assets" },
    { id: "data",     icon: "database",    label: "Datasets" },
  ];
  const secondary = [
    { id: "team",     icon: "users",       label: "Equipo" },
    { id: "billing",  icon: "credit-card", label: "Facturación" },
    { id: "settings", icon: "settings",    label: "Configuración" },
  ];
  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="../../assets/nlace-black.svg" alt="NLACE"/>
        <span className="bdg solid-dark" style={{ fontSize: 10, padding: "2px 8px" }}>AI&nbsp;Studio</span>
      </div>
      <div className="nav-section">Workspace</div>
      {items.map(it => (
        <div key={it.id}
             className={`nav-item ${active === it.id ? "active" : ""}`}
             onClick={() => onNav?.(it.id)}>
          <Icon name={it.icon}/>
          <span>{it.label}</span>
          {it.count != null && <span className="count">{it.count}</span>}
        </div>
      ))}
      <div className="nav-section">Cuenta</div>
      {secondary.map(it => (
        <div key={it.id}
             className={`nav-item ${active === it.id ? "active" : ""}`}
             onClick={() => onNav?.(it.id)}>
          <Icon name={it.icon}/>
          <span>{it.label}</span>
        </div>
      ))}
      <div style={{ flex: 1 }}/>
      <div style={{ padding: "12px 10px", borderTop: "1px solid var(--nl-border-soft)", display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:32, height:32, borderRadius:10, background:"#5869f7", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--nl-font-display)", fontWeight:800 }}>V</div>
        <div style={{ fontSize: 13 }}>
          <div style={{ fontWeight: 600 }}>Valeria Díaz</div>
          <div style={{ color: "var(--nl-500)", fontSize: 11.5 }}>NLACE · Admin</div>
        </div>
      </div>
    </aside>
  );
};

const Topbar = ({ search, setSearch, onNew }) => (
  <div className="topbar">
    <div className="search">
      <Icon name="search"/>
      <input placeholder="Buscar proyectos, modelos, datasets…"
             value={search} onChange={e => setSearch(e.target.value)}/>
    </div>
    <div style={{ flex: 1 }}/>
    <Button variant="ghost" icon="bell" className="icon" aria-label="Notificaciones"/>
    <Button variant="ghost" icon="help-circle" className="icon" aria-label="Ayuda"/>
    <Button variant="primary" icon="plus" onClick={onNew}>Nuevo proyecto</Button>
  </div>
);

const StatCard = ({ label, value, delta, down }) => (
  <div className="stat">
    <div className="label">{label}</div>
    <div className="value">{value}</div>
    {delta && <div className={`delta ${down ? "down" : ""}`}>{down ? "↓" : "↑"} {delta}</div>}
  </div>
);

const ProjectRow = ({ p, onOpen }) => (
  <div className="project-row" onClick={() => onOpen?.(p)}>
    <div className="thumb" style={{ background: p.color }}>{p.initial}</div>
    <div>
      <div className="name">{p.name}</div>
      <div className="sub">{p.sub}</div>
    </div>
    <div className="meta">{p.model}</div>
    <div className="meta">{p.updated}</div>
    <div style={{ textAlign: "right" }}><Badge variant={p.statusVariant}>{p.status}</Badge></div>
  </div>
);

const ChatMessage = ({ role, children }) => (
  <div className={`msg ${role}`}>
    <div className="avatar">{role === "user" ? "V" : "n."}</div>
    <div className="bubble">{children}</div>
  </div>
);

const Composer = ({ value, setValue, onSend, busy }) => {
  const send = () => { if (value.trim() && !busy) onSend?.(); };
  return (
    <div className="composer">
      <textarea
        rows={2}
        placeholder="Describe lo que necesitas construir…"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send(); }}
      />
      <div className="composer-row">
        <Button variant="ghost" icon="paperclip" size="sm" className="icon" aria-label="Adjuntar"/>
        <Button variant="ghost" icon="image" size="sm" className="icon" aria-label="Imagen"/>
        <Button variant="ghost" icon="mic" size="sm" className="icon" aria-label="Voz"/>
        <span className="mono" style={{ fontSize: 11, color: "var(--nl-500)", marginLeft: 6 }}>
          {busy ? "Generando…" : "⌘ + Enter para enviar"}
        </span>
        <div className="spacer"/>
        <Badge variant="neutral">nlace-sonnet</Badge>
        <Button variant="accent" size="sm" onClick={send} disabled={busy || !value.trim()}>
          {busy ? <><span className="spinner"/> Enviando</> : <>Enviar <Icon name="arrow-right" size={14}/></>}
        </Button>
      </div>
    </div>
  );
};

const Banner = ({ onPrimary }) => (
  <div className="banner">
    <div className="banner-content">
      <span className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>NLACE AI Studio · v2.1</span>
      <h2>Construimos herramientas de IA para tu equipo.</h2>
      <p>Crea, entrena y despliega modelos sobre tus datos en una sola superficie.
         Compatible con el ecosistema NLACE.</p>
    </div>
    <div className="banner-actions">
      <Button variant="accent" onClick={onPrimary}>Empezar un proyecto</Button>
      <button className="btn outlineLight">Ver documentación</button>
    </div>
  </div>
);

Object.assign(window, { Icon, Button, Badge, Card, Input, Sidebar, Topbar, StatCard, ProjectRow, ChatMessage, Composer, Banner });
