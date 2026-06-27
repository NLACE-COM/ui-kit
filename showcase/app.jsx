// NLACE Design System — Showcase (GitHub Pages)
// Importa los componentes REALES del paquete (no recreaciones) desde dist/.
// Se compila con scripts/build-showcase.mjs (esbuild) a docs/assets/app.js.

import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Button, Card, Badge, Input, Alert, Spinner, Skeleton, NlaceLogo, NlaceAvatar,
  Tabs, Switch, Tooltip, Modal, Dropdown, Table,
  BarChart, LineChart, AreaChart, PieChart, DonutChart,
  MeshGradient, NL_CHART_PALETTE,
} from '../dist/index.mjs'

const REPO = 'https://github.com/NLACE-COM/ui-kit'
const FIGMA = 'https://www.figma.com/design/hboE6NgrEkFXgC9B0M5B18/NLACE-Design-System?node-id=2-1677'
const DESIGN = 'https://claude.ai/design/p/c5a5c609-4609-4047-bd2b-0b87b32ddb4c'

// Imagery servido directamente desde el repo (assets/ ya versionado en main).
const IMG = 'https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets'
const ai = (n) => `${IMG}/imagery/ai-${n}.png`
const photo = (name) => `${IMG}/photos/${name}.jpg`
const HERO_IMG = ai('22')

// Selección curada de imágenes AI (grupos temáticos del CATALOG).
const GALLERY = ['01', '05', '08', '12', '22', '39', '46', '49', '53', '60', '84', '100']
const PHOTOS = ['team-meeting-01', 'collab-laptop', 'portrait-smile', 'hands-laptop-light', 'team-group-laptop', 'hands-writing']

/* ───────────────────────── helpers de presentación ───────────────────────── */

function Demo({ title, code, tint, block, children }) {
  const [show, setShow] = useState(false)
  const [copied, setCopied] = useState(false)
  const stage = 'sc-demo-stage' + (tint ? ' sc-tint' : '') + (block ? ' sc-block' : '')
  return (
    <div className="sc-demo">
      <div className={stage}>{children}</div>
      <div className="sc-demo-bar">
        <span className="sc-name">{title}</span>
        <span className="sc-spacer" />
        {code && (
          <>
            <button
              className="sc-btn-mini"
              onClick={() => {
                navigator.clipboard?.writeText(code)
                setCopied(true)
                setTimeout(() => setCopied(false), 1200)
              }}
            >
              {copied ? 'Copiado ✓' : 'Copiar'}
            </button>
            <button className="sc-btn-mini" onClick={() => setShow((s) => !s)}>
              {show ? 'Ocultar código' : 'Código'}
            </button>
          </>
        )}
      </div>
      {show && code && <pre className="sc-code">{code}</pre>}
    </div>
  )
}

function Section({ id, kicker, title, intro, children }) {
  return (
    <section id={id} className="sc-section">
      {kicker && <div className="sc-kicker">{kicker}</div>}
      <h2>{title}</h2>
      {intro && <p className="sc-intro">{intro}</p>}
      {children}
    </section>
  )
}

/* ───────────────────────── datos de demostración ───────────────────────── */

const PALETTE = [
  ['Primary', '--nl-primary', '#5869f7'],
  ['Primary dark', '--nl-primary-dark', '#2d3bc4'],
  ['Accent', '--nl-accent', '#fc624b'],
  ['Accent warm', '--nl-accent-warm', '#ff8c42'],
  ['Success', '--nl-success', '#42cf8a'],
  ['Magenta', '--nl-magenta', '#b717af'],
  ['Pink', '--nl-pink', '#f76dee'],
  ['Cyan', '--nl-cyan', '#a5f3fc'],
  ['Tinta', '--nl-text', '#0f1011'],
  ['Gris 700', '--nl-700', '#3f3f46'],
  ['Gris 500', '--nl-500', '#71717a'],
  ['Fondo', '--nl-bg', '#efefef'],
  ['Superficie', '--nl-surface', '#dbdcd7'],
  ['Blanco', '--nl-white', '#ffffff'],
]

const GRADIENTS = [
  ['--nl-grad-hero', 'linear-gradient(135deg,#5869f7 0%,#b717af 60%,#f76dee 100%)'],
  ['--nl-grad-brand', 'linear-gradient(90deg,#5869f7 0%,#fc624b 100%)'],
  ['--nl-grad-primary', 'linear-gradient(135deg,#5869f7 0%,#2d3bc4 100%)'],
  ['--nl-grad-accent', 'linear-gradient(135deg,#fc624b 0%,#f76dee 100%)'],
  ['--nl-grad-mint', 'linear-gradient(135deg,#42cf8a 0%,#2ba36a 100%)'],
  ['--nl-grad-dark', 'linear-gradient(180deg,#0f1011 0%,#2d3bc4 100%)'],
]

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']

/* ───────────────────────── wrappers con estado ───────────────────────── */

function ModalDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Abrir modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirmar publicación"
        description="El agente quedará disponible para todos los usuarios de tu workspace."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Publicar
            </Button>
          </>
        }
      >
        <p style={{ margin: 0, color: 'var(--nl-700)', lineHeight: 1.55 }}>
          Revisá la configuración antes de continuar. Podés revertir la publicación en
          cualquier momento desde el panel de control.
        </p>
      </Modal>
    </>
  )
}

function TabsDemo() {
  const [tab, setTab] = useState('resumen')
  return (
    <div style={{ width: '100%' }}>
      <Tabs
        value={tab}
        onChange={setTab}
        variant="underline"
        items={[
          { id: 'resumen', label: 'Resumen' },
          { id: 'actividad', label: 'Actividad', badge: <Badge variant="primary">12</Badge> },
          { id: 'ajustes', label: 'Ajustes' },
          { id: 'archivado', label: 'Archivado', disabled: true },
        ]}
      />
      <div style={{ paddingTop: 18, color: 'var(--nl-700)' }}>
        Pestaña activa: <b>{tab}</b>
      </div>
    </div>
  )
}

function SwitchDemo() {
  const [on, setOn] = useState(true)
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 360 }}>
      <Switch
        checked={on}
        onChange={setOn}
        label="Respuestas automáticas"
        description="El agente responde fuera del horario laboral."
      />
      <Switch defaultChecked={false} size="sm" label="Modo compacto" />
    </div>
  )
}

function DropdownDemo() {
  const [last, setLast] = useState(null)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <Dropdown
        trigger={<Button variant="secondary">Acciones ▾</Button>}
        onSelect={setLast}
        items={[
          { id: 'edit', label: 'Editar' },
          { id: 'dup', label: 'Duplicar', shortcut: '⌘D' },
          { divider: true },
          { id: 'del', label: 'Eliminar', danger: true },
        ]}
      />
      {last && <span style={{ color: 'var(--nl-500)', fontSize: '.9rem' }}>Elegiste: {last}</span>}
    </div>
  )
}

/* ───────────────────────── ejemplo aplicado (dashboard) ───────────────────────── */

function Stat({ label, value, delta, tone }) {
  return (
    <Card padding="" style={{ padding: 20 }}>
      <div style={{ font: '600 .72rem/1 var(--nl-font-body)', letterSpacing: 'var(--nl-tracking-ui)', textTransform: 'uppercase', color: 'var(--fg-3)' }}>
        {label}
      </div>
      <div style={{ font: '700 2rem/1.1 var(--nl-font-display)', margin: '10px 0 6px', letterSpacing: '-.03em' }}>
        {value}
      </div>
      <Badge variant={tone}>{delta}</Badge>
    </Card>
  )
}

function Dashboard() {
  const rows = [
    { id: 1, cliente: 'Agrointegral', plan: 'Enterprise', estado: 'Activo', uso: '84%' },
    { id: 2, cliente: 'Evo Retail', plan: 'Pro', estado: 'Activo', uso: '61%' },
    { id: 3, cliente: 'Forge Labs', plan: 'Pro', estado: 'En riesgo', uso: '23%' },
    { id: 4, cliente: 'Cotizador SpA', plan: 'Starter', estado: 'Activo', uso: '47%' },
  ]
  const estadoTone = { Activo: 'success', 'En riesgo': 'danger' }
  return (
    <div style={{ background: 'var(--nl-bg)', border: '1px solid var(--line-soft)', borderRadius: 'var(--nl-radius-card)', padding: 'clamp(18px,3vw,28px)' }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22, flexWrap: 'wrap' }}>
        <NlaceLogo variant="black" width={108} />
        <Badge variant="solidPrimary">AI Studio</Badge>
        <span style={{ flex: 1 }} />
        <Tooltip label="3 alertas nuevas" placement="bottom">
          <Button variant="secondary" size="sm">Notificaciones</Button>
        </Tooltip>
        <NlaceAvatar size={36} />
      </div>

      <h3 style={{ margin: '0 0 4px', letterSpacing: '-.03em' }}>Panel de cuentas</h3>
      <p className="nl-lead" style={{ margin: '0 0 22px', fontSize: 16 }}>Resumen de uso de los agentes desplegados este mes.</p>

      {/* stats */}
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', marginBottom: 20 }}>
        <Stat label="Conversaciones" value="48.2k" delta="+12.4%" tone="success" />
        <Stat label="Cuentas activas" value="312" delta="+8" tone="primary" />
        <Stat label="Tasa resolución" value="91%" delta="+3.1%" tone="success" />
        <Stat label="En riesgo" value="4" delta="Atención" tone="danger" />
      </div>

      {/* charts row */}
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', marginBottom: 20 }}>
        <Card>
          <h4 style={{ margin: '0 0 14px' }}>Conversaciones por mes</h4>
          <BarChart
            labels={MONTHS}
            legend
            series={[
              { name: 'Resueltas', values: [820, 932, 901, 1290, 1330, 1520] },
              { name: 'Escaladas', values: [120, 132, 101, 134, 90, 110] },
            ]}
            height={200}
          />
        </Card>
        <Card>
          <h4 style={{ margin: '0 0 14px' }}>Mix de planes</h4>
          <DonutChart
            size={180}
            centerLabel="Cuentas"
            centerValue="312"
            data={[
              { label: 'Enterprise', value: 48 },
              { label: 'Pro', value: 156 },
              { label: 'Starter', value: 108 },
            ]}
          />
        </Card>
      </div>

      {/* alert + table */}
      <div style={{ marginBottom: 18 }}>
        <Alert variant="warning" title="1 cuenta requiere atención">
          Forge Labs bajó su uso a 23%. Considerá agendar una sesión de onboarding.
        </Alert>
      </div>
      <Card padding="" style={{ padding: 0, overflow: 'hidden' }}>
        <Table
          rowKey="id"
          columns={[
            { key: 'cliente', header: 'Cliente' },
            { key: 'plan', header: 'Plan' },
            { key: 'estado', header: 'Estado', render: (r) => <Badge variant={estadoTone[r.estado] || 'neutral'}>{r.estado}</Badge> },
            { key: 'uso', header: 'Uso', align: 'right' },
          ]}
          rows={rows}
        />
      </Card>
    </div>
  )
}

/* ───────────────────────── redes sociales ───────────────────────── */

function SocialPost({ ratio, w, img, eyebrow, title, tag, label }) {
  return (
    <figure style={{ margin: 0 }}>
      <div
        data-nl-surface="dark"
        style={{ position: 'relative', width: w, aspectRatio: ratio, borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--nl-shadow-hover)' }}
      >
        <img src={img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="nl-overlay-dark" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', padding: 22, boxSizing: 'border-box' }}>
          <NlaceLogo variant="white" width={70} />
          <div style={{ flex: 1 }} />
          {eyebrow && <span className="nl-eyebrow" style={{ color: '#fff', opacity: 0.92, marginBottom: 10 }}>{eyebrow}</span>}
          <h3 style={{ margin: 0, fontSize: 'clamp(1.15rem,1.5vw,1.6rem)', lineHeight: 1.06, letterSpacing: '-.03em' }}>{title}</h3>
          {tag && <div style={{ marginTop: 14 }}><Badge variant="solidPrimary">{tag}</Badge></div>}
          <div style={{ marginTop: 16, font: '600 .8rem/1 var(--nl-font-body)', opacity: 0.88 }}>nlace.com</div>
        </div>
      </div>
      <figcaption style={{ marginTop: 10, fontFamily: 'var(--nl-font-mono)', fontSize: '.74rem', color: 'var(--fg-3)', textAlign: 'center' }}>{label}</figcaption>
    </figure>
  )
}

/* ───────────────────────── deck 16:9 ───────────────────────── */

function DeckFrame({ children, surface, style }) {
  return (
    <div
      data-nl-surface={surface ? 'dark' : undefined}
      style={{
        width: 'min(700px, 88vw)', aspectRatio: '16 / 9', borderRadius: 18, overflow: 'hidden',
        boxShadow: 'var(--nl-shadow-card)', border: '1px solid var(--line-soft)', flex: '0 0 auto',
        position: 'relative', boxSizing: 'border-box', ...style,
      }}
    >
      {children}
    </div>
  )
}

function Deck() {
  return (
    <div style={{ display: 'flex', gap: 20, overflowX: 'auto', padding: '6px 2px 18px', scrollSnapType: 'x mandatory' }}>
      {/* Portada */}
      <DeckFrame surface style={{ scrollSnapAlign: 'start' }}>
        <img src={ai('84')} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="nl-overlay-dark" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'relative', height: '100%', padding: 40, display: 'flex', flexDirection: 'column' }}>
          <NlaceLogo variant="white" width={120} />
          <div style={{ flex: 1 }} />
          <span className="nl-eyebrow" style={{ color: '#fff', opacity: 0.9 }}>Presentación corporativa</span>
          <h2 style={{ margin: '10px 0 0', fontSize: 'clamp(1.6rem,3vw,2.6rem)', letterSpacing: '-.03em', maxWidth: '16ch' }}>
            Agentes de IA para empresas que no pueden esperar.
          </h2>
        </div>
      </DeckFrame>

      {/* Contenido / grid */}
      <DeckFrame style={{ background: 'var(--nl-white)', scrollSnapAlign: 'start' }}>
        <div style={{ height: '100%', padding: 40, display: 'flex', flexDirection: 'column' }}>
          <span className="nl-eyebrow" style={{ color: 'var(--nl-primary)' }}>Qué hacemos</span>
          <h3 style={{ margin: '8px 0 22px' }}>Tres frentes, una plataforma</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, flex: 1 }}>
            {[['Automatización', 'Agentes que resuelven conversaciones de punta a punta.'], ['Integración', 'Conectados a tus sistemas y datos en horas, no meses.'], ['Medición', 'Tableros con resolución, uso y ahorro en tiempo real.']].map(([t, d], i) => (
              <div key={i} style={{ background: 'var(--nl-bg)', borderRadius: 14, padding: 18 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--nl-grad-brand)', marginBottom: 12 }} />
                <h5 style={{ margin: '0 0 6px' }}>{t}</h5>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--nl-500)' }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </DeckFrame>

      {/* Datos */}
      <DeckFrame style={{ background: 'var(--nl-grad-surface)', scrollSnapAlign: 'start' }}>
        <div style={{ height: '100%', padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span className="nl-eyebrow" style={{ color: 'var(--nl-primary)' }}>Impacto</span>
          <h3 style={{ margin: '8px 0 24px' }}>Resultados que se notan</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {[['91%', 'resolución autónoma'], ['-46%', 'tiempo de respuesta'], ['48k', 'conversaciones / mes']].map(([n, l], i) => (
              <div key={i}>
                <div className="nl-text-gradient" style={{ font: '700 clamp(2rem,4vw,3.2rem)/1 var(--nl-font-display)', letterSpacing: '-.03em' }}>{n}</div>
                <div style={{ marginTop: 6, color: 'var(--nl-700)', fontSize: 14 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </DeckFrame>

      {/* Cierre */}
      <DeckFrame surface style={{ background: 'var(--nl-grad-hero)', scrollSnapAlign: 'start' }}>
        <div style={{ height: '100%', padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(1.8rem,3.4vw,3rem)', letterSpacing: '-.03em', maxWidth: '15ch' }}>
            Hablemos de tu próximo agente.
          </h2>
          <div style={{ marginTop: 24 }}><NlaceLogo variant="white" width={120} /></div>
          <div style={{ marginTop: 10, font: '600 1rem/1 var(--nl-font-body)', opacity: 0.9 }}>nlace.com</div>
        </div>
      </DeckFrame>
    </div>
  )
}

/* ───────────────────────── app ───────────────────────── */

function App() {
  return (
    <>
      {/* TOPBAR — siempre arriba (logo arriba a la izquierda) */}
      <nav className="sc-topbar">
        <NlaceLogo variant="black" width={92} />
        <span className="sc-spacer" />
        <a className="sc-ghost" href="#agentes">Agentes</a>
        <a className="sc-ghost" href="#fundamentos">Fundamentos</a>
        <a className="sc-ghost" href="#componentes">Componentes</a>
        <a className="sc-ghost" href="#imagery">Imagery</a>
        <a className="sc-ghost" href="#aplicado">Aplicado</a>
        <a className="sc-ghost" href={REPO} target="_blank" rel="noreferrer">GitHub ↗</a>
      </nav>

      {/* HERO — imagen de fondo del imagery + overlay de marca */}
      <header className="sc-hero" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="sc-hero-inner">
          <NlaceLogo variant="white" width={150} />
          <h1>El sistema de diseño de NLACE, aplicado.</h1>
          <p>
            Tokens, tipografía y 21 componentes React listos para producción — la misma
            fuente de verdad que usan nuestros productos y los agentes de IA.
          </p>
          <div className="sc-hero-cta">
            <a href="#agentes"><Button variant="secondary" size="lg">Usar con agentes</Button></a>
            <a href={REPO} target="_blank" rel="noreferrer"><Button variant="outlineLight" size="lg">Ver en GitHub</Button></a>
          </div>
          <div className="sc-pillrow">
            <span className="sc-pill">21 componentes</span>
            <span className="sc-pill">Tokens W3C DTCG</span>
            <span className="sc-pill">React + Tailwind</span>
            <span className="sc-pill">@nlace/ui-kit</span>
          </div>
        </div>
      </header>

      <div className="sc-shell">
        {/* NAV lateral */}
        <aside className="sc-nav">
          <h6>Empezar</h6>
          <a href="#agentes">Uso con agentes</a>
          <a href="#instalar">Instalación</a>
          <h6>Fundamentos</h6>
          <a href="#colores">Colores</a>
          <a href="#tipografia">Tipografía</a>
          <a href="#gradientes">Gradientes</a>
          <a href="#tokens">Radios · Sombras</a>
          <h6>Componentes</h6>
          <a href="#botones">Botones</a>
          <a href="#badges">Badges</a>
          <a href="#cards">Cards</a>
          <a href="#forms">Formularios</a>
          <a href="#feedback">Feedback</a>
          <a href="#overlays">Overlays</a>
          <a href="#nav">Navegación</a>
          <a href="#charts">Gráficos</a>
          <a href="#marca">Marca</a>
          <a href="#imagery">Imagery</a>
          <h6>Aplicado</h6>
          <a href="#aplicado">Dashboard</a>
          <a href="#deck">Deck 16:9</a>
          <a href="#social">Redes sociales</a>
        </aside>

        <main className="sc-main">
          {/* USO CON AGENTES */}
          <Section
            id="agentes"
            kicker="Para agentes de IA"
            title="Diseñar con NLACE desde un agente"
            intro="Este design system está sincronizado con Claude Design, así que cualquier agente que diseñe UI lo hace con nuestros componentes reales — no genéricos. Para construir en código, instalá el paquete."
          >
            <div className="sc-steps">
              <div className="sc-step">
                <div className="n">1</div>
                <h4>Claude Design</h4>
                <p>El proyecto <b>NLACE Design System</b> ya está vinculado. El agente compone con los 21 componentes reales y respeta los tokens de marca. <a href={DESIGN} target="_blank" rel="noreferrer">Abrir proyecto ↗</a></p>
              </div>
              <div className="sc-step">
                <div className="n">2</div>
                <h4>Re-sincronizar</h4>
                <p>Tras tocar el código, corré <code>/design-sync</code>. El diff sube solo lo que cambió; lo demás se reutiliza.</p>
              </div>
              <div className="sc-step">
                <div className="n">3</div>
                <h4>Reglas de marca</h4>
                <p>Nunca usar negro como fondo de relleno. Logo siempre arriba-izquierda. La fuente de verdad vive en <code>DESIGN.md</code> y los tokens.</p>
              </div>
            </div>

            <h3 className="sc-sub" id="instalar">Instalación y uso en código</h3>
            <pre className="sc-pre"><span className="c"># 1. Instalar</span>{'\n'}npm install @nlace/ui-kit{'\n\n'}<span className="c">// 2. Importar los tokens una vez (entry del proyecto)</span>{'\n'}<span className="k">import</span> <span className="s">'@nlace/ui-kit/tokens'</span>{'\n\n'}<span className="c">// 3. Usar los componentes</span>{'\n'}<span className="k">import</span> {'{ Card, Button, Badge }'} <span className="k">from</span> <span className="s">'@nlace/ui-kit'</span></pre>

            <Alert variant="info" title="Estilá tu propio layout con las variables CSS">
              El entorno no procesa Tailwind: para tu glue usá las variables del sistema
              (<code style={{ fontFamily: 'var(--nl-font-mono)' }}>var(--nl-primary)</code>, <code style={{ fontFamily: 'var(--nl-font-mono)' }}>var(--nl-radius-card)</code>…), no clases utilitarias arbitrarias.
            </Alert>
          </Section>

          {/* COLORES */}
          <Section id="colores" kicker="Fundamentos" title="Colores" intro="Paleta canónica de marca y neutros. Cada color es una variable CSS en :root — usá la variable, no el hex.">
            <div className="sc-grid sc-swatches">
              {PALETTE.map(([name, v, hex]) => (
                <div className="sc-swatch" key={v}>
                  <div className="chip" style={{ background: hex, borderBottom: '1px solid var(--line-soft)' }} />
                  <div className="meta">
                    <b>{name}</b>
                    <span>{v}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* TIPOGRAFÍA */}
          <Section id="tipografia" kicker="Fundamentos" title="Tipografía" intro="Display en Space Grotesk, cuerpo en Inter, código en JetBrains Mono. Los headings ya aplican la fuente display automáticamente.">
            <Demo
              title="Escala tipográfica"
              code={'<h1>Heading display</h1>\n<p className="nl-lead">Párrafo destacado…</p>\n<p>Cuerpo en Inter.</p>\n<span className="nl-eyebrow">Eyebrow</span>'}
              block
            >
              <div style={{ display: 'grid', gap: 10 }}>
                <span className="nl-eyebrow" style={{ color: 'var(--nl-primary)' }}>Eyebrow · Space Grotesk</span>
                <h1 style={{ margin: 0, fontSize: '2.6rem', letterSpacing: '-.04em' }}>Diseño con intención</h1>
                <h3 style={{ margin: 0 }}>Subtítulo en display</h3>
                <p className="nl-lead" style={{ margin: 0 }}>Párrafo lead — Inter 20px para introducir secciones.</p>
                <p style={{ margin: 0, color: 'var(--nl-700)', maxWidth: '60ch' }}>
                  Texto de cuerpo en Inter. La jerarquía se construye con peso, tamaño y el
                  tracking ajustado de cada familia.
                </p>
                <code style={{ fontFamily: 'var(--nl-font-mono)', color: 'var(--nl-primary-dark)' }}>const tokens = '@nlace/ui-kit/tokens'</code>
              </div>
            </Demo>
          </Section>

          {/* GRADIENTES */}
          <Section id="gradientes" kicker="Fundamentos" title="Gradientes" intro="Gradientes de marca disponibles como variables. El hero de esta página usa MeshGradient, una versión WebGL animada.">
            <div className="sc-grid sc-grads">
              {GRADIENTS.map(([v, css]) => (
                <div className="sc-grad" key={v} style={{ background: css }}>{v}</div>
              ))}
            </div>
          </Section>

          {/* RADIOS / SOMBRAS */}
          <Section id="tokens" kicker="Fundamentos" title="Radios, sombras y motion" intro="Tokens de forma y profundidad consistentes en todo el sistema.">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 96, height: 96, background: 'var(--nl-white)', borderRadius: 'var(--nl-radius-card)', boxShadow: 'var(--nl-shadow-card)' }} />
                <div style={{ marginTop: 10, fontFamily: 'var(--nl-font-mono)', fontSize: '.74rem', color: 'var(--fg-3)' }}>radius-card · shadow-card</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 96, height: 96, background: 'var(--nl-white)', borderRadius: 'var(--nl-radius-input)', boxShadow: 'var(--nl-shadow-hover)' }} />
                <div style={{ marginTop: 10, fontFamily: 'var(--nl-font-mono)', fontSize: '.74rem', color: 'var(--fg-3)' }}>radius-input · shadow-hover</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 160, height: 96, background: 'var(--nl-primary)', borderRadius: 'var(--nl-radius-pill)' }} />
                <div style={{ marginTop: 10, fontFamily: 'var(--nl-font-mono)', fontSize: '.74rem', color: 'var(--fg-3)' }}>radius-pill</div>
              </div>
            </div>
          </Section>

          {/* COMPONENTES — header */}
          <Section id="componentes" kicker="Biblioteca" title="Componentes" intro="Los 21 componentes del paquete, renderizados aquí con el código real de @nlace/ui-kit. Tocá “Código” en cada bloque para ver el uso." />

          {/* BOTONES */}
          <Section id="botones" title="Botones">
            <Demo
              title="Variantes"
              code={'<Button variant="primary">Primary</Button>\n<Button variant="accent">Accent</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="success">Success</Button>\n<Button variant="danger">Danger</Button>'}
            >
              <Button variant="primary">Primary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="danger">Danger</Button>
              <span style={{ background: 'var(--nl-text)', padding: 8, borderRadius: 12 }}>
                <Button variant="outlineLight">outlineLight</Button>
              </span>
            </Demo>
            <Demo
              title="Tamaños y estado"
              code={'<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>\n<Button disabled>Disabled</Button>'}
            >
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </Demo>
          </Section>

          {/* BADGES */}
          <Section id="badges" title="Badges">
            <Demo
              title="Variantes suaves y sólidas"
              code={'<Badge variant="primary">Primary</Badge>\n<Badge variant="success">Activo</Badge>\n<Badge variant="danger">Error</Badge>\n<Badge variant="solidPrimary">Solid</Badge>\n<Badge variant="solidDark">Dark</Badge>'}
            >
              <Badge variant="primary">Primary</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="success">Activo</Badge>
              <Badge variant="danger">Error</Badge>
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="solidPrimary">solidPrimary</Badge>
              <Badge variant="solidAccent">solidAccent</Badge>
              <Badge variant="solidDark">solidDark</Badge>
            </Demo>
          </Section>

          {/* CARDS */}
          <Section id="cards" title="Cards">
            <Demo
              title="Card simple, con acento y con hover"
              code={'<Card>Contenido…</Card>\n<Card accent>Con borde de acento</Card>\n<Card hover>Eleva al pasar el mouse</Card>'}
            >
              <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', width: '100%' }}>
                <Card>
                  <h4 style={{ margin: '0 0 8px' }}>Estándar</h4>
                  <p style={{ margin: 0, color: 'var(--nl-500)' }}>Superficie blanca, radio y sombra de marca.</p>
                </Card>
                <Card accent>
                  <h4 style={{ margin: '0 0 8px' }}>Con acento</h4>
                  <p style={{ margin: 0, opacity: 0.9 }}>Fondo de marca con texto en blanco — contraste garantizado por el sistema.</p>
                </Card>
                <Card hover>
                  <h4 style={{ margin: '0 0 8px' }}>Interactiva</h4>
                  <p style={{ margin: 0, color: 'var(--nl-500)' }}>Pasá el mouse para ver la elevación.</p>
                </Card>
              </div>
            </Demo>
          </Section>

          {/* FORMULARIOS */}
          <Section id="forms" title="Formularios">
            <Demo
              title="Inputs: label, hint, error y éxito"
              code={'<Input label="Correo" placeholder="tu@ejemplo.com" hint="Te enviaremos un código." />\n<Input label="RUT" error="Formato inválido" />\n<Input label="Empresa" success defaultValue="NLACE" />'}
              block
            >
              <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
                <Input label="Correo electrónico" placeholder="tu@ejemplo.com" hint="Te enviaremos un código." />
                <Input label="RUT" error="Formato inválido" defaultValue="12.345.678" />
                <Input label="Empresa" success defaultValue="NLACE" />
                <Input label="Deshabilitado" placeholder="—" disabled />
              </div>
            </Demo>
            <Demo title="Switch" code={'<Switch checked={on} onChange={setOn}\n  label="Respuestas automáticas"\n  description="Responde fuera de horario." />'}>
              <SwitchDemo />
            </Demo>
          </Section>

          {/* FEEDBACK */}
          <Section id="feedback" title="Feedback">
            <Demo
              title="Alerts"
              code={'<Alert variant="info" title="Info">…</Alert>\n<Alert variant="success" title="Listo">…</Alert>\n<Alert variant="warning" title="Atención">…</Alert>\n<Alert variant="error" title="Error">…</Alert>'}
              block
            >
              <div style={{ display: 'grid', gap: 12 }}>
                <Alert variant="info" title="Sincronización en curso">Tus tokens se están actualizando.</Alert>
                <Alert variant="success" title="Cambios guardados">Todo quedó actualizado correctamente.</Alert>
                <Alert variant="warning" title="Cuota al 80%">Considerá ampliar tu plan.</Alert>
                <Alert variant="error" title="No se pudo conectar">Reintentá en unos minutos.</Alert>
              </div>
            </Demo>
            <Demo title="Spinner y Skeleton" code={'<Spinner size="md" />\n<Skeleton style={{ width: 220, height: 16 }} />'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
                <div style={{ display: 'grid', gap: 8, flex: 1, minWidth: 180 }}>
                  <Skeleton style={{ width: '90%', height: 14 }} />
                  <Skeleton style={{ width: '70%', height: 14 }} />
                  <Skeleton style={{ width: '50%', height: 14 }} />
                </div>
              </div>
            </Demo>
          </Section>

          {/* OVERLAYS */}
          <Section id="overlays" title="Overlays">
            <Demo title="Modal" code={'<Modal open={open} onClose={close}\n  title="Confirmar publicación"\n  description="…"\n  footer={<><Button…/></>}>\n  …\n</Modal>'}>
              <ModalDemo />
            </Demo>
            <Demo title="Dropdown" code={'<Dropdown\n  trigger={<Button variant="secondary">Acciones ▾</Button>}\n  onSelect={setLast}\n  items={[{ id: "edit", label: "Editar" },\n          { divider: true },\n          { id: "del", label: "Eliminar", danger: true }]} />'}>
              <DropdownDemo />
            </Demo>
            <Demo title="Tooltip" code={'<Tooltip label="Más información" placement="top">\n  <Button variant="secondary">Pasá el mouse</Button>\n</Tooltip>'}>
              <Tooltip label="Información contextual" placement="top">
                <Button variant="secondary">Tooltip arriba</Button>
              </Tooltip>
              <Tooltip label="A la derecha" placement="right">
                <Button variant="secondary">Tooltip derecha</Button>
              </Tooltip>
            </Demo>
          </Section>

          {/* NAVEGACIÓN */}
          <Section id="nav" title="Navegación">
            <Demo title="Tabs" code={'<Tabs value={tab} onChange={setTab} variant="underline"\n  items={[{ id: "resumen", label: "Resumen" },\n          { id: "actividad", label: "Actividad", badge: <Badge>12</Badge> }]} />'}>
              <TabsDemo />
            </Demo>
          </Section>

          {/* GRÁFICOS */}
          <Section id="charts" title="Gráficos" intro="SVG livianos, sin dependencias. Comparten la paleta NL_CHART_PALETTE de marca.">
            <Demo
              title="BarChart (apilable)"
              code={'<BarChart labels={MONTHS} legend\n  series={[{ name: "Resueltas", values: [...] },\n          { name: "Escaladas", values: [...] }]} />'}
              tint block
            >
              <BarChart
                labels={MONTHS}
                legend
                series={[
                  { name: 'Resueltas', values: [820, 932, 901, 1290, 1330, 1520] },
                  { name: 'Escaladas', values: [120, 132, 101, 134, 90, 110] },
                ]}
                height={220}
              />
            </Demo>
            <div style={{ display: 'grid', gap: 0, gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
              <Demo title="LineChart" code={'<LineChart labels={MONTHS} showDots\n  series={[{ name: "MRR", values: [...] }]} />'} tint block>
                <LineChart labels={MONTHS} showDots legend series={[{ name: 'MRR', values: [12, 19, 17, 25, 31, 38] }]} height={200} />
              </Demo>
              <Demo title="AreaChart" code={'<AreaChart labels={MONTHS}\n  series={[{ name: "Sesiones", values: [...] }]} />'} tint block>
                <AreaChart labels={MONTHS} series={[{ name: 'Sesiones', values: [40, 52, 49, 71, 84, 96] }]} height={200} />
              </Demo>
              <Demo title="PieChart" code={'<PieChart data={[{ label: "A", value: 48 }, …]} />'} tint block>
                <PieChart size={200} legend data={[{ label: 'Enterprise', value: 48 }, { label: 'Pro', value: 156 }, { label: 'Starter', value: 108 }]} />
              </Demo>
              <Demo title="DonutChart" code={'<DonutChart centerLabel="Cuentas" centerValue="312"\n  data={[{ label: "Pro", value: 156 }, …]} />'} tint block>
                <DonutChart size={200} centerLabel="Cuentas" centerValue="312" data={[{ label: 'Enterprise', value: 48 }, { label: 'Pro', value: 156 }, { label: 'Starter', value: 108 }]} />
              </Demo>
            </div>
          </Section>

          {/* MARCA */}
          <Section id="marca" title="Marca" intro="Logo, avatar y el fondo MeshGradient — los activos de identidad del kit.">
            <Demo title="Logo y avatar" code={'<NlaceLogo variant="black" width={160} />\n<NlaceLogo variant="white" width={160} />\n<NlaceAvatar size={48} />'}>
              <NlaceLogo variant="black" width={150} />
              <span style={{ background: 'var(--nl-primary)', padding: '14px 20px', borderRadius: 16 }}>
                <NlaceLogo variant="white" width={150} />
              </span>
              <NlaceAvatar size={48} />
              <NlaceAvatar size={64} />
            </Demo>
            <Demo title="MeshGradient (WebGL animado)" code={'<MeshGradient\n  colors={["#5869f7","#2d3bc4","#b717af","#fc624b","#f76dee"]}\n  highlight="#a5f3fc" speed={0.6} intensity={1.05} grain={0.12} />'} block>
              <div style={{ position: 'relative', height: 240, borderRadius: 18, overflow: 'hidden', background: 'var(--nl-grad-hero)' }}>
                <MeshGradient colors={['#5869f7', '#2d3bc4', '#b717af', '#fc624b', '#f76dee']} highlight="#a5f3fc" speed={0.6} intensity={1.05} grain={0.12} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="nl-eyebrow" style={{ color: '#fff' }}>Fondo de marca</span>
                </div>
              </div>
            </Demo>
          </Section>

          {/* IMAGERY */}
          <Section
            id="imagery"
            kicker="Activos de marca"
            title="Imagery"
            intro="El set visual de NLACE: 130 imágenes IA con un mismo lenguaje (Midjourney) y 14 fotografías de equipo. Se sirven directo desde el repo."
          >
            <h3 className="sc-sub">Imágenes IA</h3>
            <div className="sc-imagery">
              {GALLERY.map((n) => (
                <img key={n} src={ai(n)} alt={`NLACE imagery ai-${n}`} loading="lazy" />
              ))}
            </div>
            <p style={{ margin: '14px 0 0', fontSize: '.9rem', color: 'var(--fg-3)' }}>
              Set completo (ai-01 → ai-130) e índice temático en{' '}
              <a href={`${REPO}/blob/main/assets/imagery/CATALOG.md`} target="_blank" rel="noreferrer">CATALOG.md</a>.
            </p>

            <h3 className="sc-sub">Fotografía de equipo</h3>
            <div className="sc-photos">
              {PHOTOS.map((p) => (
                <img key={p} src={photo(p)} alt={`NLACE foto ${p}`} loading="lazy" />
              ))}
            </div>
          </Section>

          {/* APLICADO */}
          <Section
            id="aplicado"
            kicker="Todo junto"
            title="Ejemplo aplicado — Dashboard"
            intro="Un panel real compuesto solo con componentes y tokens del sistema: logo, avatar, badges, stats, gráficos, alerta y tabla — la prueba de que todo encaja."
          >
            <Dashboard />
          </Section>

          {/* DECK */}
          <Section
            id="deck"
            kicker="Aplicado"
            title="Deck 16:9"
            intro="La plantilla de presentación del sistema (templates/deck-nlace): portada con imagery, grid de contenido, slide de datos y cierre de marca. Deslizá horizontalmente."
          >
            <Deck />
          </Section>

          {/* REDES SOCIALES */}
          <Section
            id="social"
            kicker="Aplicado"
            title="Redes sociales"
            intro="El sistema aplicado a los formatos de redes (templates/plantillas-sociales): feed, retrato, story y wide — siempre con imagery, logo arriba-izquierda y tipografía de marca."
          >
            <div className="sc-social">
              <SocialPost ratio="1 / 1" w={300} img={ai('22')} label="Feed · 1:1" eyebrow="Inteligencia aplicada" title="Tu empresa, con un agente que no duerme." tag="Nuevo" />
              <SocialPost ratio="4 / 5" w={264} img={ai('49')} label="Retrato · 4:5" eyebrow="Caso de éxito" title="−46% en tiempo de respuesta." tag="Resultados" />
              <SocialPost ratio="9 / 16" w={210} img={ai('08')} label="Story · 9:16" eyebrow="Webinar" title="IA para empresas chilenas." tag="En vivo" />
              <SocialPost ratio="16 / 9" w={420} img={ai('100')} label="Wide · 16:9" eyebrow="Producto" title="AI Studio: del prompt a producción." />
            </div>
          </Section>
        </main>
      </div>

      <footer className="sc-footer">
        <div style={{ marginBottom: 10 }}><NlaceLogo variant="black" width={84} /></div>
        NLACE Design System · <a href={REPO} target="_blank" rel="noreferrer">GitHub</a> · <a href={FIGMA} target="_blank" rel="noreferrer">Figma</a> · <a href={DESIGN} target="_blank" rel="noreferrer">Claude Design</a>
        <div style={{ marginTop: 8, fontSize: '.8rem', color: 'var(--fg-4)' }}>Construido con los componentes reales de @nlace/ui-kit · Apache-2.0</div>
      </footer>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
