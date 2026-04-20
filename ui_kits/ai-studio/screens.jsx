/* NLACE AI Studio — Screens: Home, Projects, Chat */

const sampleProjects = [
  { id: 1, initial: "A",  color: "linear-gradient(135deg,#3f58ea,#2f2f81)", name: "Agrointegral · Clasificador de cultivos",   sub: "Visión · 12 modelos entrenados", model: "nlace-vision-1", updated: "hace 2 h",  status: "Activo",   statusVariant: "success" },
  { id: 2, initial: "E",  color: "linear-gradient(135deg,#ff6143,#ff8c42)", name: "Evo · Evaluación de impacto",                sub: "Texto · 3 datasets",             model: "nlace-sonnet",    updated: "hace 1 d",  status: "Entrenando", statusVariant: "primary" },
  { id: 3, initial: "M",  color: "linear-gradient(135deg,#6be8b0,#34d399)", name: "Mutualidades · Extractor de pólizas",        sub: "Documentos · PDF → JSON",        model: "nlace-docs-2",    updated: "hace 3 d",  status: "En revisión", statusVariant: "accent" },
  { id: 4, initial: "C",  color: "linear-gradient(135deg,#18181b,#2f2f81)", name: "Cotizador NLACE · Asistente",                sub: "Conversacional · chat widget",    model: "nlace-sonnet",    updated: "hace 5 d",  status: "Activo",   statusVariant: "success" },
  { id: 5, initial: "F",  color: "linear-gradient(135deg,#3f58ea,#a5f3fc)", name: "Firmas · Validador de firmas digitales",     sub: "Visión + OCR",                   model: "nlace-vision-1",  updated: "hace 1 sem", status: "Borrador", statusVariant: "neutral" },
];

const HomeScreen = ({ goProjects, startProject }) => (
  <>
    <Banner onPrimary={startProject}/>

    <div className="stat-grid">
      <StatCard label="Proyectos activos"   value="12"        delta="3 esta semana"/>
      <StatCard label="Modelos entrenados"  value="48"        delta="8%"/>
      <StatCard label="Llamadas · 30d"      value="284 K"     delta="22%"/>
      <StatCard label="Costo · 30d"         value="$312"      delta="5%" down/>
    </div>

    <div className="section-head">
      <h2>Proyectos recientes</h2>
      <Button variant="secondary" size="sm" onClick={goProjects}>Ver todos <Icon name="arrow-right" size={14}/></Button>
    </div>
    <div style={{ display:"flex", flexDirection:"column", gap: 10 }}>
      {sampleProjects.slice(0, 3).map(p => <ProjectRow key={p.id} p={p}/>)}
    </div>
  </>
);

const ProjectsScreen = ({ filter, setFilter }) => {
  const [tab, setTab] = React.useState("all");
  const filtered = sampleProjects
    .filter(p => tab === "all" ? true : p.status.toLowerCase().startsWith(tab))
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()) ||
                 p.sub.toLowerCase().includes(filter.toLowerCase()));
  return (
    <>
      <div className="section-head">
        <div>
          <div className="eyebrow">Workspace · NLACE</div>
          <h2 style={{ fontSize: 28, marginTop: 4 }}>Proyectos</h2>
        </div>
        <div className="tabs">
          <button className={tab === "all" ? "active" : ""} onClick={() => setTab("all")}>Todos</button>
          <button className={tab === "activo" ? "active" : ""} onClick={() => setTab("activo")}>Activos</button>
          <button className={tab === "entrenando" ? "active" : ""} onClick={() => setTab("entrenando")}>Entrenando</button>
          <button className={tab === "borrador" ? "active" : ""} onClick={() => setTab("borrador")}>Borradores</button>
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap: 10 }}>
        {filtered.map(p => <ProjectRow key={p.id} p={p}/>)}
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign:"center", color: "var(--nl-500)" }}>
            No hay proyectos que coincidan con “{filter}”.
          </div>
        )}
      </div>
    </>
  );
};

const ChatScreen = ({ onBack }) => {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const suggestions = [
    { eyebrow: "Documentos", text: "Extrae campos clave de un contrato en PDF a JSON." },
    { eyebrow: "Datos",      text: "Clasifica las reseñas por sentimiento (positivo, negativo, neutro)." },
    { eyebrow: "Visión",     text: "Detecta defectos visibles en fotos de productos de línea." },
    { eyebrow: "Chat",       text: "Asistente interno que responde sobre nuestra documentación." },
  ];

  const send = (text) => {
    const t = text ?? input;
    if (!t.trim()) return;
    const userMsg = { id: Date.now(), role: "user", content: t };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setBusy(true);
    setTimeout(() => {
      setMessages(m => [...m, {
        id: Date.now() + 1, role: "ai",
        content: (
          <>
            <p style={{ margin: 0 }}>Listo. Propongo un plan en tres pasos:</p>
            <ol style={{ margin: "8px 0 0 18px", padding: 0 }}>
              <li>Ingestar los PDFs en el dataset <code>contratos/2026-q1</code>.</li>
              <li>Entrenar con el modelo base <code>nlace-docs-2</code>.</li>
              <li>Desplegar como endpoint <code>/api/extract-contract</code>.</li>
            </ol>
            <p style={{ margin: "8px 0 0", color: "var(--nl-500)", fontSize: 13 }}>¿Lo creo como proyecto nuevo?</p>
          </>
        )
      }]);
      setBusy(false);
    }, 900);
  };

  if (messages.length === 0) {
    return (
      <>
        <button className="btn ghost sm" onClick={onBack} style={{ marginBottom: 16 }}>
          <Icon name="arrow-left" size={14}/> Volver
        </button>
        <div className="hero">
          <span className="eyebrow" style={{ color: "var(--nl-primary)" }}>Nuevo proyecto</span>
          <h1>¿Qué vamos a <span className="text-gradient">construir</span> hoy?</h1>
          <p>Describe lo que necesitas en español natural. NLACE AI Studio te propone un plan y los modelos adecuados.</p>
        </div>
        <Composer value={input} setValue={setInput} onSend={() => send()} busy={busy}/>
        <div className="suggest-grid">
          {suggestions.map((s, i) => (
            <button key={i} className="suggest" onClick={() => send(s.text)}>
              <div className="eyebrow">{s.eyebrow}</div>
              {s.text}
            </button>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <button className="btn ghost sm" onClick={onBack} style={{ marginBottom: 16 }}>
        <Icon name="arrow-left" size={14}/> Volver
      </button>
      <div className="chat">
        {messages.map(m => (
          <ChatMessage key={m.id} role={m.role}>{m.content}</ChatMessage>
        ))}
        {busy && (
          <div className="msg ai">
            <div className="avatar">n.</div>
            <div className="bubble" style={{ display:"inline-flex", alignItems:"center", gap:10 }}>
              <span className="spinner"/> Pensando…
            </div>
          </div>
        )}
      </div>
      <Composer value={input} setValue={setInput} onSend={() => send()} busy={busy}/>
    </>
  );
};

Object.assign(window, { HomeScreen, ProjectsScreen, ChatScreen, sampleProjects });
