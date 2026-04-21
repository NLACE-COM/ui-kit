const fs = await import("node:fs/promises");
const path = await import("node:path");
const { Presentation, PresentationFile } = await import("@oai/artifact-tool");

const W = 1280;
const H = 720;

const OUT_DIR = "/Users/cristianlabarca/REPOS/ui-kit/outputs/nlace-credenciales-2026-redesign";
const SCRATCH_DIR = "/Users/cristianlabarca/REPOS/ui-kit/tmp/slides/nlace-credenciales-2026-redesign";
const PREVIEW_DIR = path.join(SCRATCH_DIR, "preview");
const PPTX_PATH = path.join(OUT_DIR, "output.pptx");
const LOCAL_ASSET = (...parts) => path.join(OUT_DIR, "assets", ...parts);

const ROOT = "/Users/cristianlabarca/REPOS/ui-kit";
const ASSET = (...parts) => path.join(ROOT, ...parts);

const COLORS = {
  ink: "#0F1011",
  white: "#FFFFFF",
  paper: "#EFEFEF",
  paperSoft: "#F7F7F5",
  primary: "#5869F7",
  primaryDark: "#2D3BC4",
  accent: "#FC624B",
  pink: "#F76DEE",
  magenta: "#B717AF",
  success: "#42CF8A",
  surface: "#DBDCD7",
  border: "#C6C7C2",
  muted: "#71717A",
  mutedSoft: "#A1A1AA",
  overlayDark: "#0F101173",
  overlayBlue: "#5869F7B8",
};

const FONT = {
  display: "Space Grotesk",
  body: "Inter",
  mono: "JetBrains Mono",
};

const PHOTOS = {
  cover: ASSET("assets", "photos", "team-meeting-02.jpg"),
  speaking: ASSET("assets", "photos", "portrait-speaking.jpg"),
  duo: ASSET("assets", "photos", "portrait-duo.jpg"),
  group: ASSET("assets", "photos", "team-group-laptop.jpg"),
  notes: ASSET("assets", "photos", "hands-notes.jpg"),
  writing: ASSET("assets", "photos", "hands-writing.jpg"),
  laptop: ASSET("assets", "photos", "collab-laptop.jpg"),
  light: ASSET("assets", "photos", "hands-laptop-light.jpg"),
  portrait: ASSET("assets", "photos", "team-portrait-02.jpg"),
};

const LOGO_BLACK = ASSET("assets", "nlace-black.svg");
const LOGO_WHITE = ASSET("assets", "nlace-white.svg");
const BRAND_GRADIENT = LOCAL_ASSET("brand-gradient.svg");
const ICONS = {
  flow: LOCAL_ASSET("icon-flow.svg"),
  shield: LOCAL_ASSET("icon-shield.svg"),
  grid: LOCAL_ASSET("icon-grid.svg"),
  spark: LOCAL_ASSET("icon-spark.svg"),
};

async function ensureDirs() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(PREVIEW_DIR, { recursive: true });
}

async function readImageBlob(filePath) {
  const bytes = await fs.readFile(filePath);
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

function line(fill = "#00000000", width = 0) {
  return { style: "solid", fill, width };
}

function addShape(slide, geometry, left, top, width, height, fill, stroke = "#00000000", strokeWidth = 0) {
  return slide.shapes.add({
    geometry,
    position: { left, top, width, height },
    fill,
    line: line(stroke, strokeWidth),
  });
}

function applyText(shape, text, {
  fontSize = 24,
  color = COLORS.ink,
  bold = false,
  typeface = FONT.body,
  alignment = "left",
  verticalAlignment = "top",
  insets = { left: 0, right: 0, top: 0, bottom: 0 },
} = {}) {
  shape.text = text;
  shape.text.fontSize = fontSize;
  shape.text.color = color;
  shape.text.bold = bold;
  shape.text.typeface = typeface;
  shape.text.alignment = alignment;
  shape.text.verticalAlignment = verticalAlignment;
  shape.text.insets = insets;
  return shape;
}

function addText(slide, text, left, top, width, height, options = {}) {
  const shape = addShape(slide, "rect", left, top, width, height, options.fill || "#00000000", options.stroke || "#00000000", options.strokeWidth || 0);
  return applyText(shape, text, options);
}

async function addImage(slide, filePath, left, top, width, height, fit = "cover") {
  const image = slide.images.add({
    blob: await readImageBlob(filePath),
    fit,
    alt: path.basename(filePath),
  });
  image.position = { left, top, width, height };
  return image;
}

async function addFramedImage(slide, filePath, left, top, width, height) {
  const image = await addImage(slide, filePath, left, top, width, height, "cover");
  return image;
}

async function addLogo(slide, variant, left, top, width, height) {
  const filePath = variant === "white" ? LOGO_WHITE : LOGO_BLACK;
  return addImage(slide, filePath, left, top, width, height, "contain");
}

async function addGradientBackground(slide, opacity = null) {
  await addImage(slide, BRAND_GRADIENT, 0, 0, W, H, "cover");
  if (opacity) addShape(slide, "rect", 0, 0, W, H, opacity);
}

async function addIcon(slide, kind, left, top, size, colorFill = COLORS.white, iconColor = COLORS.ink) {
  const bg = addShape(slide, "roundRect", left, top, size, size, colorFill, "#00000000", 0);
  bg.adjustmentList = [{ name: "adj", formula: "val 35000" }];
  const icon = await addImage(slide, ICONS[kind], left + 10, top + 10, size - 20, size - 20, "contain");
  icon.tint = iconColor;
  return { bg, icon };
}

function addFooter(slide, page, light = false) {
  const color = light ? "rgba(255,255,255,0.6)" : COLORS.mutedSoft;
  addText(slide, `Credenciales 2026`, 68, 680, 220, 18, {
    fontSize: 11,
    color,
    typeface: FONT.mono,
  });
  addText(slide, String(page).padStart(2, "0"), 1180, 680, 42, 18, {
    fontSize: 11,
    color,
    typeface: FONT.mono,
    alignment: "right",
  });
}

function addEyebrow(slide, text, left, top, color = COLORS.primary) {
  return addText(slide, text, left, top, 300, 18, {
    fontSize: 11,
    color,
    typeface: FONT.mono,
  });
}

function card(slide, left, top, width, height, fill = COLORS.white, stroke = COLORS.border, strokeWidth = 1) {
  return addShape(slide, "roundRect", left, top, width, height, fill, stroke, strokeWidth);
}

function chip(slide, text, left, top, width, fill, color) {
  const shape = addShape(slide, "roundRect", left, top, width, 34, fill, "#00000000", 0);
  applyText(shape, text, {
    fontSize: 12,
    color,
    bold: true,
    typeface: FONT.body,
    alignment: "center",
    verticalAlignment: "middle",
    insets: { left: 12, right: 12, top: 0, bottom: 0 },
  });
}

async function slide1(presentation) {
  const slide = presentation.slides.add();
  addShape(slide, "rect", 0, 0, W, H, COLORS.paper);
  await addFramedImage(slide, PHOTOS.cover, 664, 0, 616, 720);
  addShape(slide, "rect", 664, 0, 616, 720, "#5869F799");
  await addLogo(slide, "black", 72, 54, 132, 28);
  addEyebrow(slide, "ENERO 2026", 72, 110, COLORS.mutedSoft);
  addText(slide, "Credenciales\nNLACE 2026", 72, 154, 350, 120, {
    fontSize: 56,
    color: COLORS.ink,
    bold: true,
    typeface: FONT.display,
  });
  addText(slide, "Estrategia, tecnología y contenido para empresas que están redefiniendo cómo comunican, venden y aprenden.", 72, 306, 470, 110, {
    fontSize: 24,
    color: "#3F3F46",
    typeface: FONT.body,
  });
  await addIcon(slide, "spark", 72, 516, 54, COLORS.primary, COLORS.white);
  addText(slide, "Sistemas comerciales, automatización e IA aplicada.", 142, 524, 360, 34, {
    fontSize: 18,
    color: COLORS.ink,
    bold: true,
    typeface: FONT.body,
    verticalAlignment: "middle",
  });
  card(slide, 708, 84, 472, 92, "#FFFFFF1C", "#FFFFFF2F", 1);
  addText(slide, "Conectamos lo que tu empresa necesita para vender mejor.", 736, 110, 400, 40, {
    fontSize: 25,
    color: COLORS.white,
    bold: true,
    typeface: FONT.display,
    verticalAlignment: "middle",
  });

  const chips = [
    ["marketing y ventas", COLORS.white, COLORS.ink, 708, 536, 150],
    ["software propio", "#FFFFFF1F", COLORS.white, 870, 536, 140],
    ["automatización", "#FFFFFF1F", COLORS.white, 1022, 536, 132],
    ["IA aplicada", COLORS.accent, COLORS.white, 708, 580, 118],
    ["contenido y sistemas", "#FFFFFF1F", COLORS.white, 838, 580, 176],
  ];
  for (const [label, fill, color, left, top, width] of chips) {
    chip(slide, label, left, top, width, fill, color);
  }
  addFooter(slide, 1);
}

async function slide2(presentation) {
  const slide = presentation.slides.add();
  addShape(slide, "rect", 0, 0, W, H, COLORS.white);
  addEyebrow(slide, "QUÉ HACEMOS", 72, 66);
  addText(slide, "Conectamos marketing,\nventas y datos en\nsistemas comerciales.", 72, 102, 510, 170, {
    fontSize: 40,
    color: COLORS.ink,
    bold: true,
    typeface: FONT.display,
  });
  addText(slide, "Combinamos estrategia, software propio e inteligencia artificial para convertir procesos comerciales dispersos en una operación más clara, medible y escalable.", 72, 294, 490, 108, {
    fontSize: 20,
    color: "#3F3F46",
  });

  const blocks = [
    ["01", "Ordenamos tu proceso comercial", "Detectamos fricciones, prioridades y puntos de decisión para construir un sistema con lógica de negocio."],
    ["02", "Instalamos tecnología que automatiza", "Integramos herramientas, datos, CRM, ERP y agentes para reducir tiempos, errores y dependencia operativa."],
    ["03", "Acompañamos la ejecución", "No dejamos la solución sola. Medimos, ajustamos y acompañamos la adopción hasta generar resultados sostenibles."],
  ];
  for (let i = 0; i < blocks.length; i += 1) {
    const top = 92 + i * 184;
    card(slide, 640, top, 566, 156, i === 0 ? COLORS.paper : COLORS.white, COLORS.border, 1);
    addText(slide, blocks[i][0], 672, top + 26, 60, 54, {
      fontSize: 42,
      color: i === 0 ? COLORS.primary : COLORS.mutedSoft,
      bold: true,
      typeface: FONT.display,
    });
    addText(slide, blocks[i][1], 748, top + 28, 390, 38, {
      fontSize: 25,
      color: COLORS.ink,
      bold: true,
      typeface: FONT.display,
    });
    addText(slide, blocks[i][2], 748, top + 78, 410, 54, {
      fontSize: 17,
      color: COLORS.muted,
    });
  }
  addFooter(slide, 2);
}

async function slide3(presentation) {
  const slide = presentation.slides.add();
  addShape(slide, "rect", 0, 0, W, H, COLORS.paper);
  addEyebrow(slide, "IMPACTO", 72, 66);
  addText(slide, "Eficiencia que genera valor.", 72, 106, 540, 56, {
    fontSize: 42,
    color: COLORS.ink,
    bold: true,
    typeface: FONT.display,
  });
  addText(slide, "No se trata de hacer más con menos. Se trata de hacer lo necesario con inteligencia.", 72, 176, 520, 58, {
    fontSize: 20,
    color: COLORS.muted,
  });

  const stats = [
    [COLORS.primary, COLORS.white, "Reducimos costos operativos", "Automatizamos tareas, optimizamos recursos y eliminamos fricciones en procesos digitales."],
    [COLORS.accent, COLORS.white, "Aumentamos ingresos", "Diseñamos sistemas que fortalecen adquisición, conversión y retención de clientes."],
    [COLORS.success, COLORS.ink, "Mejoramos servicios y experiencias", "Creamos plataformas y flujos que hacen más fácil, rápido y claro interactuar con tu empresa."],
  ];
  for (let i = 0; i < stats.length; i += 1) {
    const left = 72 + i * 380;
    card(slide, left, 304, 356, 286, stats[i][0], "#00000000", 0);
    addText(slide, stats[i][0] === COLORS.success ? "03" : String(i + 1).padStart(2, "0"), left + 30, 332, 70, 42, {
      fontSize: 34,
      color: stats[i][1],
      bold: true,
      typeface: FONT.mono,
    });
    addText(slide, stats[i][2], left + 30, 392, 292, 78, {
      fontSize: 28,
      color: stats[i][1],
      bold: true,
      typeface: FONT.display,
    });
    addText(slide, stats[i][3], left + 30, 486, 292, 74, {
      fontSize: 16,
      color: stats[i][1] === COLORS.white ? "rgba(255,255,255,0.86)" : "rgba(15,16,17,0.78)",
    });
  }
  addFooter(slide, 3);
}

async function slide4(presentation) {
  const slide = presentation.slides.add();
  addShape(slide, "rect", 0, 0, W, H, COLORS.white);
  addEyebrow(slide, "OFERTA", 72, 64);
  addText(slide, "Tres studios para activar\ndemanda, conocimiento y productos digitales.", 72, 104, 650, 106, {
    fontSize: 38,
    color: COLORS.ink,
    bold: true,
    typeface: FONT.display,
  });

  const studios = [
    ["Demand Studio", COLORS.primary, "Generación de demanda y marketing con IA", ["Consultoría en marketing B2B", "Estrategia y contenido digital", "Generación y nutrición de leads", "Automatización comercial y de marketing"]],
    ["IA Studio", COLORS.accent, "Gestión y activación del conocimiento con IA", ["Plataformas privadas de conocimiento", "Integración de procesos y datos", "Autogestión y soporte interno", "Agentes inteligentes entrenados en tu negocio"]],
    ["Digital Studio", COLORS.paper, "Proyectos y productos digitales", ["Dashboards y métricas digitales", "Avatares y producción con IA", "Microservicios y productos digitales", "Sitios web y plataformas integradas"]],
  ];
  for (let i = 0; i < studios.length; i += 1) {
    const left = 72 + i * 382;
    card(slide, left, 272, 350, 336, studios[i][1], i === 2 ? COLORS.border : "#00000000", i === 2 ? 1 : 0);
    addText(slide, studios[i][0], left + 28, 304, 250, 34, {
      fontSize: 28,
      color: i === 2 ? COLORS.ink : COLORS.white,
      bold: true,
      typeface: FONT.display,
    });
    addText(slide, studios[i][2], left + 28, 350, 284, 58, {
      fontSize: 17,
      color: i === 2 ? COLORS.muted : "rgba(255,255,255,0.84)",
      bold: true,
      typeface: FONT.body,
    });
    for (let j = 0; j < studios[i][3].length; j += 1) {
      addText(slide, `• ${studios[i][3][j]}`, left + 28, 432 + j * 40, 286, 26, {
        fontSize: 15,
        color: i === 2 ? COLORS.ink : COLORS.white,
        typeface: FONT.body,
      });
    }
  }
  addFooter(slide, 4);
}

async function slide5(presentation) {
  const slide = presentation.slides.add();
  addShape(slide, "rect", 0, 0, W, H, COLORS.paper);
  await addFramedImage(slide, PHOTOS.speaking, 0, 0, 442, 720);
  addShape(slide, "rect", 0, 0, 442, 720, "#0F101155");
  addEyebrow(slide, "PARTNERS", 66, 76, "rgba(255,255,255,0.65)");
  addText(slide, "Combinamos estrategia,\ndiseño y tecnología.", 66, 126, 300, 102, {
    fontSize: 32,
    color: COLORS.white,
    bold: true,
    typeface: FONT.display,
  });
  addText(slide, "Tecnología responsable, decisiones transparentes y soluciones medibles para el negocio.", 66, 286, 286, 72, {
    fontSize: 16,
    color: "rgba(255,255,255,0.84)",
  });
  await addIcon(slide, "shield", 66, 570, 54, "#FFFFFF20", COLORS.white);
  addText(slide, "Ética y confianza\ncomo base de implementación", 136, 572, 214, 54, {
    fontSize: 16,
    color: COLORS.white,
    bold: true,
    typeface: FONT.body,
    verticalAlignment: "middle",
  });

  addEyebrow(slide, "TECNOLOGÍA RESPONSABLE", 492, 74);
  addText(slide, "Nos regimos por principios alineados con la recomendación de la UNESCO sobre ética de la IA.", 492, 108, 638, 62, {
    fontSize: 22,
    color: COLORS.ink,
    bold: true,
    typeface: FONT.display,
  });

  const principles = [
    ["Transparencia y explicabilidad", "Aseguramos que los sistemas sean comprensibles para clientes y equipos."],
    ["Privacidad y seguridad", "Protegemos los datos y resguardamos la operación en cada integración."],
    ["Equidad y no discriminación", "Diseñamos soluciones que evitan sesgos y promueven un uso responsable."],
    ["Responsabilidad y rendición de cuentas", "Asumimos el impacto de la tecnología que implementamos."],
  ];
  for (let i = 0; i < principles.length; i += 1) {
    const x = 492 + (i % 2) * 324;
    const y = 212 + Math.floor(i / 2) * 176;
    card(slide, x, y, 292, 144, COLORS.white, COLORS.border, 1);
    await addIcon(slide, i === 0 ? "spark" : i === 1 ? "shield" : i === 2 ? "grid" : "flow", x + 22, y + 28, 42, COLORS.paper, COLORS.primary);
    addText(slide, principles[i][0], x + 78, y + 28, 186, 50, {
      fontSize: 19,
      color: COLORS.ink,
      bold: true,
      typeface: FONT.display,
      verticalAlignment: "middle",
    });
    addText(slide, principles[i][1], x + 24, y + 88, 244, 34, {
      fontSize: 15,
      color: COLORS.muted,
      verticalAlignment: "middle",
    });
  }
  addFooter(slide, 5);
}

async function slide6(presentation) {
  const slide = presentation.slides.add();
  addShape(slide, "rect", 0, 0, W, H, COLORS.white);
  addEyebrow(slide, "NUESTRO DÍA A DÍA", 72, 64);
  addText(slide, "Algunos ejemplos de cómo\nse ve nuestro trabajo en operación.", 72, 106, 560, 96, {
    fontSize: 38,
    color: COLORS.ink,
    bold: true,
    typeface: FONT.display,
  });

  const items = [
    ["Equipo de marketing externo", COLORS.primary, "Somos el equipo de marketing externo de empresas B2B. Desarrollamos estrategia, contenidos, sitios, campañas y seguimiento de leads en HubSpot."],
    ["Automatización de procesos", COLORS.accent, "Creamos procesos de gestión automatizados, agentes GPT y flujos de prospección conectados a sistemas y plataformas."],
    ["Dashboards personalizados", COLORS.success, "Hacemos seguimiento a KPI, construimos métricas calculadas y armamos dashboards hechos para cada operación."],
    ["Contenido generado con IA", COLORS.paper, "Diseñamos experiencias audiovisuales asistidas por IA: avatares, videos, guiones y materiales interactivos."],
  ];
  for (let i = 0; i < items.length; i += 1) {
    const x = 72 + (i % 2) * 568;
    const y = 260 + Math.floor(i / 2) * 178;
    card(slide, x, y, 536, 148, items[i][1], items[i][1] === COLORS.paper ? COLORS.border : "#00000000", items[i][1] === COLORS.paper ? 1 : 0);
    addText(slide, items[i][0], x + 26, y + 24, 288, 34, {
      fontSize: 24,
      color: items[i][1] === COLORS.paper || items[i][1] === COLORS.success ? COLORS.ink : COLORS.white,
      bold: true,
      typeface: FONT.display,
    });
    addText(slide, items[i][2], x + 26, y + 70, 470, 48, {
      fontSize: 16,
      color: items[i][1] === COLORS.paper || items[i][1] === COLORS.success ? "rgba(15,16,17,0.78)" : "rgba(255,255,255,0.84)",
    });
  }
  addFooter(slide, 6);
}

async function slide7(presentation) {
  const slide = presentation.slides.add();
  addShape(slide, "rect", 0, 0, W, H, COLORS.paper);
  addEyebrow(slide, "CAPACIDADES APLICADAS", 72, 64);
  addText(slide, "Estrategia, automatización y ejecución\naterrizadas a frentes concretos.", 72, 104, 620, 94, {
    fontSize: 38,
    color: COLORS.ink,
    bold: true,
    typeface: FONT.display,
  });

  await addFramedImage(slide, PHOTOS.duo, 728, 72, 480, 576);
  addShape(slide, "rect", 728, 72, 480, 576, "#0F101118");
  card(slide, 72, 270, 286, 162, COLORS.white, COLORS.border, 1);
  card(slide, 378, 270, 286, 162, COLORS.white, COLORS.border, 1);
  card(slide, 72, 456, 286, 162, COLORS.primary, "#00000000", 0);
  card(slide, 378, 456, 286, 162, COLORS.accent, "#00000000", 0);

  const blocks = [
    [72, 270, "flow", "Marketing externo", "Estrategia de generación de demanda, contenidos, campañas, sitios y seguimiento comercial."],
    [378, 270, "grid", "Automatización", "Prospección, soporte y operación conectada a CRM, ERP y procesos internos."],
    [72, 456, "spark", "Dashboards", "Seguimiento de KPI, métricas calculadas y reportes accionables para cada cliente."],
    [378, 456, "shield", "IA audiovisual", "Avatares, video, guiones y experiencias interactivas asistidas por IA."],
  ];
  for (let i = 0; i < blocks.length; i += 1) {
    const isDark = i >= 2;
    await addIcon(slide, blocks[i][2], blocks[i][0] + 24, blocks[i][1] + 22, 42, isDark ? "#FFFFFF20" : COLORS.paper, isDark ? COLORS.white : COLORS.primary);
    addText(slide, blocks[i][3], blocks[i][0] + 82, blocks[i][1] + 22, 176, 42, {
      fontSize: 21,
      color: isDark ? COLORS.white : COLORS.ink,
      bold: true,
      typeface: FONT.display,
      verticalAlignment: "middle",
    });
    addText(slide, blocks[i][4], blocks[i][0] + 24, blocks[i][1] + 80, 232, 46, {
      fontSize: 14,
      color: isDark ? "rgba(255,255,255,0.84)" : COLORS.muted,
      verticalAlignment: "middle",
    });
  }
  addFooter(slide, 7);
}

async function slide8(presentation) {
  const slide = presentation.slides.add();
  addShape(slide, "rect", 0, 0, W, H, COLORS.paper);
  await addGradientBackground(slide, "#FFFFFFD6");
  addEyebrow(slide, "PROYECTOS WEB", 72, 64);
  addText(slide, "Desarrollamos sitios, plataformas\nintegradas y productos conectados.", 72, 104, 620, 86, {
    fontSize: 35,
    color: COLORS.ink,
    bold: true,
    typeface: FONT.display,
  });
  addText(slide, "Desarrollo a medida, integraciones con CRM y ERP, y arquitecturas listas para escalar sin rehacer todo.", 72, 300, 560, 34, {
    fontSize: 17,
    color: COLORS.muted,
  });
  await addFramedImage(slide, PHOTOS.group, 786, 68, 422, 302);
  addShape(slide, "rect", 786, 68, 422, 302, "#5869F726");

  const names = [
    "Monch Monch", "Intermec Chile", "DNX Consultora", "SprinTEC",
    "Agrointegral", "QR Agro", "Cogrowers", "Naviera GV", "Mutualidades de Chile",
  ];
  for (let i = 0; i < names.length; i += 1) {
    const x = 72 + (i % 3) * 182;
    const y = 360 + Math.floor(i / 3) * 62;
    chip(slide, names[i], x, y, 162, i % 3 === 0 ? "#FFFFFFCC" : "#FFFFFF9A", COLORS.ink);
  }
  card(slide, 740, 430, 468, 186, COLORS.white, "#FFFFFFC0", 1);
  await addIcon(slide, "grid", 770, 452, 48, COLORS.paper, COLORS.primary);
  addText(slide, "Qué construimos", 834, 456, 210, 28, {
    fontSize: 26,
    color: COLORS.ink,
    bold: true,
    typeface: FONT.display,
    verticalAlignment: "middle",
  });
  const bullets = [
    "Catálogos, CMS y APIs conectadas",
    "Frontends desacoplados y flexibles",
    "Integraciones comerciales y operativas",
    "Iteración rápida con uso real",
  ];
  for (let i = 0; i < bullets.length; i += 1) {
    card(slide, 798, 504 + i * 24, 360, 20, "#F7F7F7", "#00000000", 0);
    addText(slide, bullets[i], 820, 507 + i * 24, 322, 14, {
      fontSize: 13,
      color: COLORS.muted,
      verticalAlignment: "middle",
    });
    addShape(slide, "ellipse", 778, 511 + i * 24, 10, 10, i % 2 === 0 ? COLORS.primary : COLORS.accent);
  }
  addFooter(slide, 8);
}

async function slide9(presentation) {
  const slide = presentation.slides.add();
  addShape(slide, "rect", 0, 0, W, H, COLORS.paper);
  addEyebrow(slide, "FORMA DE TRABAJAR", 72, 64);
  addText(slide, "Trabajamos cerca de los equipos,\ncon foco en claridad, iteración y entrega continua.", 72, 104, 620, 92, {
    fontSize: 38,
    color: COLORS.ink,
    bold: true,
    typeface: FONT.display,
  });
  await addFramedImage(slide, PHOTOS.notes, 864, 64, 344, 228);
  const steps = [
    ["01", "Diagnóstico rápido y alineación estratégica", "Entendemos el contexto del negocio y priorizamos acciones de impacto inmediato."],
    ["02", "Prototipado y validación temprana", "Convertimos ideas en versiones funcionales para probar rápido y aprender antes de escalar."],
    ["03", "Implementación en ciclos cortos", "Desarrollamos por etapas, entregando avances medibles y ajustables."],
    ["04", "Medición y acompañamiento operativo", "Seguimos el desempeño de cada entrega para asegurar adopción y continuidad."],
    ["05", "Mejora continua y escalamiento", "Extendemos soluciones a más áreas, usuarios o mercados manteniendo eficiencia y control."],
  ];
  for (let i = 0; i < steps.length; i += 1) {
    const top = 304 + i * 74;
    card(slide, 72, top - 8, 1136, 58, "#FFFFFFA8", "#FFFFFFA8", 1);
    addText(slide, steps[i][0], 92, top + 6, 44, 18, {
      fontSize: 15,
      color: COLORS.primary,
      bold: true,
      typeface: FONT.mono,
      verticalAlignment: "middle",
    });
    addText(slide, steps[i][1], 158, top + 2, 406, 24, {
      fontSize: 21,
      color: COLORS.ink,
      bold: true,
      typeface: FONT.display,
      verticalAlignment: "middle",
    });
    addText(slide, steps[i][2], 596, top + 2, 560, 26, {
      fontSize: 14,
      color: COLORS.muted,
      verticalAlignment: "middle",
    });
  }
  addFooter(slide, 9);
}

async function slide10(presentation) {
  const slide = presentation.slides.add();
  addShape(slide, "rect", 0, 0, W, H, COLORS.white);
  addEyebrow(slide, "POR QUÉ NLACE", 72, 64);
  addText(slide, "Cuatro razones para trabajar\ncon nosotros.", 72, 104, 520, 90, {
    fontSize: 40,
    color: COLORS.ink,
    bold: true,
    typeface: FONT.display,
  });

  const reasons = [
    ["Resultados sostenibles", COLORS.primary, COLORS.white, "Medimos impacto, ajustamos y acompañamos cada proceso de mejora."],
    ["Confianza y cercanía", COLORS.accent, COLORS.white, "Trabajamos como parte de tu equipo, con foco en objetivos concretos."],
    ["Visión estratégica", COLORS.paper, COLORS.ink, "Alineamos la tecnología al negocio, no al revés."],
    ["Ejecución real", COLORS.success, COLORS.ink, "Diseñamos, desarrollamos y operamos soluciones que funcionan en la práctica."],
  ];
  for (let i = 0; i < reasons.length; i += 1) {
    const x = 72 + (i % 2) * 568;
    const y = 248 + Math.floor(i / 2) * 190;
    card(slide, x, y, 536, 160, reasons[i][1], reasons[i][1] === COLORS.paper ? COLORS.border : "#00000000", reasons[i][1] === COLORS.paper ? 1 : 0);
    addText(slide, reasons[i][0], x + 28, y + 26, 220, 32, {
      fontSize: 28,
      color: reasons[i][2],
      bold: true,
      typeface: FONT.display,
    });
    addText(slide, reasons[i][3], x + 28, y + 76, 454, 48, {
      fontSize: 16,
      color: reasons[i][2] === COLORS.white ? "rgba(255,255,255,0.84)" : "rgba(15,16,17,0.78)",
    });
  }
  addFooter(slide, 10);
}

function addCaseGrid(slide, title, eyebrow, cases, page, accent = COLORS.primary) {
  addShape(slide, "rect", 0, 0, W, H, COLORS.paper);
  addEyebrow(slide, eyebrow, 72, 64, accent);
  addText(slide, title, 72, 106, 720, 88, {
    fontSize: 38,
    color: COLORS.ink,
    bold: true,
    typeface: FONT.display,
  });
  for (let i = 0; i < cases.length; i += 1) {
    const x = 72 + (i % 2) * 568;
    const y = 238 + Math.floor(i / 2) * 194;
    card(slide, x, y, 536, 166, COLORS.white, COLORS.border, 1);
    addText(slide, cases[i].name, x + 24, y + 22, 360, 54, {
      fontSize: 24,
      color: COLORS.ink,
      bold: true,
      typeface: FONT.display,
      verticalAlignment: "middle",
    });
    addText(slide, cases[i].url, x + 24, y + 74, 420, 18, {
      fontSize: 11,
      color: accent,
      typeface: FONT.mono,
      verticalAlignment: "middle",
    });
    addText(slide, cases[i].body, x + 24, y + 102, 482, 42, {
      fontSize: 14,
      color: COLORS.muted,
      verticalAlignment: "middle",
    });
  }
  addFooter(slide, page);
}

async function slide11(presentation) {
  const slide = presentation.slides.add();
  await addGradientBackground(slide, "#5869F7F0");
  await addFramedImage(slide, PHOTOS.laptop, 742, 0, 538, 720);
  addShape(slide, "rect", 0, 0, 742, 720, "#5869F7D9");
  addEyebrow(slide, "EXPERIENCIA REAL", 72, 72, "rgba(255,255,255,0.72)");
  addText(slide, "Nuestros últimos proyectos.", 72, 112, 520, 60, {
    fontSize: 42,
    color: COLORS.white,
    bold: true,
    typeface: FONT.display,
  });
  addText(slide, "Seleccionamos algunos ejemplos que muestran cómo se materializa nuestra mezcla de estrategia, integración y producto.", 72, 238, 498, 44, {
    fontSize: 17,
    color: "rgba(255,255,255,0.84)",
  });
  const cats = [
    [72, 314, "grid", "eCommerce", "Tiendas, sistemas comerciales y experiencias conectadas."],
    [324, 314, "flow", "SaaS", "Herramientas que automatizan la operación y mejoran conversión."],
    [72, 456, "shield", "Plataformas internas", "Soluciones propias para gestión, reporting y soporte."],
  ];
  for (let i = 0; i < cats.length; i += 1) {
    card(slide, cats[i][0], cats[i][1], 232, 126, "#FFFFFF14", "#FFFFFF30", 1);
    await addIcon(slide, cats[i][2], cats[i][0] + 20, cats[i][1] + 22, 42, "#FFFFFF18", COLORS.white);
    addText(slide, cats[i][3], cats[i][0] + 74, cats[i][1] + 24, 132, 26, { fontSize: 22, color: COLORS.white, bold: true, typeface: FONT.display, verticalAlignment: "middle" });
    addText(slide, cats[i][4], cats[i][0] + 24, cats[i][1] + 70, 180, 34, { fontSize: 14, color: "rgba(255,255,255,0.82)", verticalAlignment: "middle" });
  }
  addFooter(slide, 11, true);
}

async function slide12(presentation) {
  const slide = presentation.slides.add();
  addCaseGrid(slide, "Proyectos destacados I", "CASOS", [
    {
      name: "Monch Monch",
      url: "https://monchmonch.shop/",
      body: "Diseñamos y desarrollamos su eCommerce en Shopify, integrado vía API a su ecosistema comercial para operar ventas en EE.UU. y Canadá.",
    },
    {
      name: "Intermec Chile",
      url: "http://intermec.cl/",
      body: "Nuevo sitio con frontend desacoplado desde un CMS headless, sincronizado con catálogo de productos vía API desde Ingram Micro.",
    },
    {
      name: "Brand Factory",
      url: "https://brandfactory.nlace.com/",
      body: "Sistema construido junto a BrandFactory para desarrollar Brand DNA, relato e insights con un motor de IA propio llamado Brand Core.",
    },
    {
      name: "Cierro.app",
      url: "https://www.cierro.app/",
      body: "SaaS para generar propuestas comerciales con IA a partir del conocimiento de la empresa y hacer seguimiento comercial de cada envío.",
    },
  ], 12);
}

async function slide13(presentation) {
  const slide = presentation.slides.add();
  addCaseGrid(slide, "Proyectos destacados II", "PLATAFORMAS", [
    {
      name: "firmo.email",
      url: "https://www.firmo.email/",
      body: "Herramienta gratuita para crear y administrar firmas de correo. Resuelve una necesidad operativa y además funciona como lead magnet para NLACE.",
    },
    {
      name: "Agentes de WhatsApp",
      url: "Plataforma propia",
      body: "Sistema multi LLM para atención, ventas, prospección y nutrición de leads, conectado a CRM, ERP y plataformas hechas a medida.",
    },
    {
      name: "Inteligencia inmobiliaria",
      url: "Proyecto propio",
      body: "Sistema de recopilación y seguimiento de datos inmobiliarios para crear reportes y apoyar decisiones comerciales con IA.",
    },
    {
      name: "Mission Control",
      url: "Sistema interno",
      body: "Plataforma que consolida múltiples fuentes, genera informes automatizados y redacta comunicaciones para seguimiento de KPI y objetivos.",
    },
  ], 13, COLORS.accent);
}

async function slide14(presentation) {
  const slide = presentation.slides.add();
  await addGradientBackground(slide, "#FFFFFFD9");
  addEyebrow(slide, "ACTIVOS PROPIOS", 72, 64, COLORS.magenta);
  addText(slide, "También construimos productos,\nframeworks y sistemas internos que fortalecen la ejecución.", 72, 106, 700, 92, {
    fontSize: 38,
    color: COLORS.ink,
    bold: true,
    typeface: FONT.display,
  });
  await addFramedImage(slide, PHOTOS.light, 850, 68, 358, 232);
  addShape(slide, "rect", 850, 68, 358, 232, "#FFFFFF1A");

  const products = [
    ["Diagnóstico de adopción IA", COLORS.paper, COLORS.ink, "Sistema basado en metodologías comprobadas para evaluar madurez y generar oportunidades comerciales calificadas."],
    ["NLACE UI Kit", COLORS.primary, COLORS.white, "Sistema de diseño propio para construir productos digitales con Tailwind y skills para agentes de IA."],
    ["Casas Chile", COLORS.accent, COLORS.white, "Plataforma de atención y tickets conectada a agentes de WhatsApp para resolver consultas y derivar casos al equipo humano."],
    ["Ecosistema conectado", COLORS.success, COLORS.ink, "Productos y herramientas que comparten datos, automatizan seguimiento y amplifican el aprendizaje entre proyectos."],
  ];
  for (let i = 0; i < products.length; i += 1) {
    const x = 72 + (i % 2) * 568;
    const y = 324 + Math.floor(i / 2) * 156;
    card(slide, x, y, 536, 126, products[i][1], products[i][1] === COLORS.paper ? COLORS.border : "#00000000", products[i][1] === COLORS.paper ? 1 : 0);
    await addIcon(slide, i === 0 ? "shield" : i === 1 ? "grid" : i === 2 ? "flow" : "spark", x + 24, y + 22, 44, products[i][1] === COLORS.paper ? COLORS.white : "#FFFFFF18", products[i][2]);
    addText(slide, products[i][0], x + 84, y + 22, 250, 40, {
      fontSize: 22,
      color: products[i][2],
      bold: true,
      typeface: FONT.display,
      verticalAlignment: "middle",
    });
    addText(slide, products[i][3], x + 24, y + 74, 472, 32, {
      fontSize: 14,
      color: products[i][2] === COLORS.white ? "rgba(255,255,255,0.84)" : "rgba(15,16,17,0.78)",
      verticalAlignment: "middle",
    });
  }
  addFooter(slide, 14);
}

async function slide15(presentation) {
  const slide = presentation.slides.add();
  await addGradientBackground(slide, "#FFFFFFCC");
  await addFramedImage(slide, PHOTOS.writing, 736, 34, 510, 652);
  addShape(slide, "rect", 34, 34, 660, 652, "#FFFFFFD6");
  addEyebrow(slide, "CIERRE ESTRATÉGICO", 72, 76, COLORS.primary);
  addText(slide, "Pasamos de iniciativas\nsueltas a un sistema\ncomercial conectado.", 72, 118, 458, 154, {
    fontSize: 42,
    color: COLORS.ink,
    bold: true,
    typeface: FONT.display,
  });
  addText(slide, "Eso permite vender mejor, operar con menos fricción y aprender más rápido.", 72, 294, 446, 56, {
    fontSize: 19,
    color: COLORS.muted,
  });

  const points = [
    "Claridad sobre qué procesos mover primero.",
    "Tecnología conectada al negocio real.",
    "Automatización útil, no cosmética.",
    "Acompañamiento para sostener resultados.",
  ];
  for (let i = 0; i < points.length; i += 1) {
    const y = 386 + i * 66;
    card(slide, 72, y, 566, 50, "#FFFFFFB8", "#FFFFFFF0", 1);
    addText(slide, String(i + 1).padStart(2, "0"), 96, y + 16, 34, 16, {
      fontSize: 14,
      color: COLORS.primary,
      bold: true,
      typeface: FONT.mono,
      verticalAlignment: "middle",
    });
    addText(slide, points[i], 154, y + 11, 440, 22, {
      fontSize: 20,
      color: COLORS.ink,
      bold: true,
      typeface: FONT.display,
      verticalAlignment: "middle",
    });
  }
  addFooter(slide, 15);
}

async function slide16(presentation) {
  const slide = presentation.slides.add();
  await addGradientBackground(slide, "#5869F7B8");
  card(slide, 54, 54, 1172, 612, "#FFFFFF14", "#FFFFFF22", 1);
  card(slide, 72, 520, 1136, 126, "#FC624BD9", "#00000000", 0);
  await addLogo(slide, "white", 72, 70, 148, 30);
  addEyebrow(slide, "NLACE", 72, 132, "rgba(255,255,255,0.68)");
  addText(slide, "Estrategia, tecnología\ny contenido para empresas\nque están redefiniendo\ncómo comunican, venden y aprenden.", 72, 164, 620, 220, {
    fontSize: 42,
    color: COLORS.white,
    bold: true,
    typeface: FONT.display,
  });
  await addIcon(slide, "spark", 72, 560, 44, "#FFFFFF18", COLORS.white);
  addText(slide, "Sigamos la conversación.", 128, 558, 344, 36, {
    fontSize: 30,
    color: COLORS.white,
    bold: true,
    typeface: FONT.display,
    verticalAlignment: "middle",
  });
  addText(slide, "n l a c e . c o m", 72, 608, 220, 20, {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    typeface: FONT.mono,
    verticalAlignment: "middle",
  });
  addText(slide, "Sistema comercial, automatización, IA aplicada, plataformas y contenido.", 728, 554, 420, 48, {
    fontSize: 17,
    color: "rgba(255,255,255,0.88)",
    verticalAlignment: "middle",
  });
  chip(slide, "marketing y ventas", 728, 604, 152, "#FFFFFF1C", COLORS.white);
  chip(slide, "software propio", 892, 604, 142, "#FFFFFF1C", COLORS.white);
  chip(slide, "IA aplicada", 1046, 604, 118, "#FFFFFF1C", COLORS.white);
  addFooter(slide, 16, true);
}

async function createDeck() {
  const presentation = Presentation.create({ slideSize: { width: W, height: H } });
  await slide1(presentation);
  await slide2(presentation);
  await slide3(presentation);
  await slide4(presentation);
  await slide5(presentation);
  await slide6(presentation);
  await slide7(presentation);
  await slide8(presentation);
  await slide9(presentation);
  await slide10(presentation);
  await slide11(presentation);
  await slide12(presentation);
  await slide13(presentation);
  await slide14(presentation);
  await slide15(presentation);
  await slide16(presentation);
  return presentation;
}

async function saveBlobToFile(blob, filePath) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  await fs.writeFile(filePath, bytes);
}

async function exportDeck(presentation) {
  for (let i = 0; i < presentation.slides.items.length; i += 1) {
    const preview = await presentation.export({
      slide: presentation.slides.items[i],
      format: "png",
      scale: 1,
    });
    await saveBlobToFile(preview, path.join(PREVIEW_DIR, `slide-${String(i + 1).padStart(2, "0")}.png`));
  }
  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(PPTX_PATH);
}

await ensureDirs();
const presentation = await createDeck();
await exportDeck(presentation);
console.log(PPTX_PATH);
