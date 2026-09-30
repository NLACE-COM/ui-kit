# Catálogo de videos — `assets/videos/`

Videos oficiales de NLACE para piezas audiovisuales: reels, anuncios, videos explicativos,
presentaciones y cualquier video de marca. **Cuando un agente haga un video para NLACE, usa
estos clips como b-roll y cierra siempre con el video de cierre oficial.**

**Base URL:** `https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/videos/`

| Carpeta | Contenido |
|---|---|
| `abstractos/` | 34 clips abstractos generados con IA (`abstracto-01.mp4` → `abstracto-34.mp4`) |
| `abstractos/posters/` | Un fotograma JPG por clip (mismo nombre, `.jpg`), para previsualizar o usar como `poster=` |
| `cierre/` | Cierre oficial de marca: `cierre-horizontal.mp4` (16:9) y `cierre-vertical.mp4` (9:16) |
| `cierre/posters/` | Fotograma final de cada cierre |

---

## Videos de cierre — `cierre/`

El cierre es la firma de todo video de NLACE. **Va siempre al final, completo y sin editar**
(no recortar, no cambiar colores, no superponer texto ni logo).

| Archivo | Formato | Duración | Audio |
|---|---|---|---|
| `cierre-horizontal.mp4` | 1920×1080 (16:9), 30 fps, H.264 | 9,8 s | Sí (AAC) |
| `cierre-vertical.mp4` | 1080×1920 (9:16), 30 fps, H.264 | 9,8 s | Sí (AAC) |

**Secuencia:** carrusel de servicios con pastillas de color sobre fondo tinta ("Capacitación
en IA", "Agentes a medida", "Consultoría en IA", "Inteligencia comercial", "Webs y
plataformas", "Software a medida") → logo `nlace.` con anillo → gradiente azul de marca con
logo, claim *"Diseñamos, implementamos y operamos con IA."* y botón coral **Hablemos →**.

**Cuál usar:** el que coincida con la relación de aspecto del video.
- 16:9 (YouTube, LinkedIn horizontal, presentaciones, web) → `cierre-horizontal.mp4`
- 9:16 (Reels, Stories, TikTok, Shorts) → `cierre-vertical.mp4`
- 1:1 o 4:5 (feed) → `cierre-vertical.mp4` centrado y recortado arriba/abajo con `object-fit: cover`
  cuidando que el logo, el claim y el botón queden dentro del encuadre; si no caben, usa el
  horizontal con relleno del gradiente azul. Nunca deformar.

El cierre trae su propio audio: al unirlo, baja la música del cuerpo del video con un
fundido de ~0,5 s para que no se pise con la del cierre.

---

## Videos abstractos — `abstractos/`

**Formato:** clips cortos sin audio, H.264, 24 fps.
- `abstracto-01`–`abstracto-33`: 832×464 (≈16:9), 5,2 s (salvo `abstracto-23` y
  `abstracto-25`: 5,0 s; `abstracto-24`: 9,0 s).
- `abstracto-34`: 1936×1080 (≈16:9), 5,0 s — la única en alta resolución.

Mismo ADN visual que las imágenes de `assets/imagery/` (ver `DESIGN.md` § Imágenes AI):
bicromía coral/naranja contra lavanda, arquitectura metafísica, umbrales, suelos espejo,
figuras anónimas y calma monumental — ahora con movimiento de cámara lento.

### Reglas de uso

- **Son b-roll.** Van debajo de titulares, datos o voz en off; nunca como pieza única.
- **Resolución baja (832×464).** Escalar a 1080p es aceptable como fondo a pantalla
  completa con texto encima, pero no para 4K ni recortes agresivos. Para verticales (9:16)
  recorta el centro con `object-fit: cover` y elige clips con el sujeto centrado
  (p. ej. `03`, `04`, `06`, `15`, `20`, `21`, `29`). Si necesitas nitidez, prefiere
  `abstracto-34`.
- **Texto encima:** usa scrim (`.nl-overlay-dark` / `.nl-overlay-brand`) o sitúa el texto
  sobre el cielo lavanda, que es el espacio negativo del clip.
- **Sin audio:** la música o locución la pone la pieza.
- **Cortes:** 2–4 s por clip suele bastar; los clips son lentos y aguantan crossfades
  suaves. No encadenar dos variantes del mismo grupo seguidas.
- **Nunca** aplicar filtros de color, glitch o velocidad acelerada que rompan la calma del set.
- `abstracto-13` y `abstracto-14` son casi idénticos (mismo prompt, misma semilla visual):
  usa solo uno por pieza.

### Grupos temáticos

Cada grupo corresponde a un prompt de origen (Midjourney, *"imagen abstracta de…"*); los
títulos entre comillas están truncados como venían en el archivo original.

| Tema / concepto del prompt original | Videos |
|---|---|
| Hombre adulto transformándose (en IA) | `01` |
| Escalera y una persona (ascenso, progreso) | `02`–`06` |
| Red social vs. un lugar vacío (dualidad, pantalla dividida) | `07`–`09` |
| "Que muestre a la inteligencia artificial…" | `10`–`11` |
| "Que refleje a la inteligencia artificial…" | `12`–`16` |
| Empresas agobiadas por los procesos | `17`–`18` |
| Empresas estancadas / humanidad | `19` |
| La confianza y la humanidad | `20` |
| Nuevos trabajos tecnológicos | `21`–`22` |
| Empresas y el uso de la IA (genérico) | `23`–`25`, `34` |
| 3 empresas dominando la inteligencia artificial | `26` |
| Jóvenes vs. viejos en un mundo digital | `27` |
| "La inteligencia artificial vend…" (humano + máquina) | `28`–`30` |
| Una empresa enfrentándose a una (crisis / cambio) | `31`–`32` |
| Una mano tomando un control remoto (control, automatización) | `33` |

### Índice rápido por uso

| Necesitas… | Videos sugeridos |
|---|---|
| Apertura / hook tranquilo con horizonte | `02`, `19`, `20`, `23`, `24` |
| Transformación con IA, persona ↔ máquina | `01`, `12`, `21`, `26`, `28`, `29`, `30` |
| Crecimiento, avanzar, dar el paso | `03`, `04`, `05`, `06`, `16`, `34` |
| Problema: procesos, estancamiento, presión | `17`, `18`, `31`, `32` |
| Automatización / control / efecto dominó | `33` |
| Equipos, personas, sociedad | `05`, `11`, `19`, `20`, `27` |
| Dualidad, antes/después, comparación | `07`, `08`, `09`, `27` |
| Fondo neutro para texto largo (poco sujeto) | `23`, `24`, `25` |

### Descripción por video

| Archivo | Duración | Descripción |
|---|---|---|
| `abstracto-01` | 5,2 s | Busto de hombre con barba sobre fondo coral; su cabeza se disuelve en cubos blancos que crecen y una malla digital le recorre el rostro. Transformación humano → IA. |
| `abstracto-02` | 5,2 s | Persona sentada al pie de una escalinata-pirámide coral junto a un muro con puerta, sobre mar lavanda; se levanta y comienza a subir. |
| `abstracto-03` | 5,2 s | Figura de blanco camina por una plataforma sobre el mar hacia una escalera que asciende a un portal alto; cámara se acerca mientras sube. Horizonte rosado. |
| `abstracto-04` | 5,2 s | Variante de `03`: mismo portal y escalera sobre el mar, la figura llega y sube; encuadre más centrado. |
| `abstracto-05` | 5,2 s | Contrapicado de una gran escalinata coral contra cielo lavanda; una figura de naranja arriba y otra de lavanda subiendo; terminan encontrándose en la cima. |
| `abstracto-06` | 5,2 s | Escalera curva que asciende por un volumen coral; una persona sube de espaldas hacia la cima, atardecer rosa-lavanda. |
| `abstracto-07` | 5,2 s | Pantalla dividida: a la izquierda muro y escalera blancos con pequeñas siluetas; a la derecha bloque coral con escalera y árbol naranja. Vacío vs. vida. |
| `abstracto-08` | 5,2 s | Pantalla dividida: árbol naranja solitario sobre llano lavanda / muro coral con escalera y una persona subiendo; zoom lento al árbol. |
| `abstracto-09` | 5,2 s | Hombre de abrigo naranja camina hacia cámara por un corredor de monolitos coral sobre suelo espejo; muros con textura aparecen al fondo. |
| `abstracto-10` | 5,2 s | Tres cabezas monumentales lavanda en fila junto a muros con puerta; figuras diminutas al horizonte; la cámara avanza hasta un plano coral. |
| `abstracto-11` | 5,2 s | Personas con túnicas lavanda y naranja caminan entre muros coral perforados por vanos de luz; travelling lateral. |
| `abstracto-12` | 5,2 s | Cabeza de robot blanca y árbol naranja sobre una lámina de agua espejo, monolitos coral y figura diminuta; la cabeza gira hacia cámara. |
| `abstracto-13` | 5,2 s | Muro coral con vano estrecho sobre suelo espejo; hombres de traje caminan y se reflejan. Casi idéntico a `14`. |
| `abstracto-14` | 5,2 s | Casi idéntico a `13` (mismo prompt). Usar uno de los dos. |
| `abstracto-15` | 5,2 s | Portal coral con una vitrina que contiene una cabeza-cerebro blanca; una persona la contempla; la cámara entra por el portal. |
| `abstracto-16` | 5,2 s | Hombre cruza un portal coral sobre un muelle en un lago espejo con juncos naranjas y montañas lavanda; entra a la luz. |
| `abstracto-17` | 5,2 s | Figura solitaria camina hacia un gran portal coral donde espera un grupo de personas; llano lavanda y suelo espejo. |
| `abstracto-18` | 5,2 s | Hombre sentado con laptop dentro de un vano coral, horizonte de mar al fondo; zoom lento hasta primer plano. Trabajo, carga, pausa. |
| `abstracto-19` | 5,2 s | Procesión de figuras en naranja sobre un muelle en el mar, junto a un portal-monolito altísimo; montañas lavanda, atardecer. |
| `abstracto-20` | 5,2 s | Disco coral gigante con puerta sobre el mar; procesión de figuras llega a un muelle y una familia cruza el umbral. Confianza, comunidad. |
| `abstracto-21` | 5,2 s | Rostro lavanda con audífonos coral y un tocado de barras verticales que se reorganizan; plano gira a perfil. Nuevo trabajo, foco, tecnología. |
| `abstracto-22` | 5,2 s | Esferas blancas gigantes sobre un llano de arbustos naranjas y un muro inclinado coral; figuras de blanco caminan entre ellas. |
| `abstracto-23` | 5,0 s | Portales coral sobre suelo espejo con nubes blancas bajas al horizonte; cámara flota entre marcos y monolitos. |
| `abstracto-24` | 9,0 s | Travelling por un corredor de monolitos coral en fuga sobre suelo blanco y agua espejo; un monolito pasa a primer plano. El clip más largo, ideal de fondo. |
| `abstracto-25` | 5,0 s | Volúmenes coral y naranja con arcos, nubes blancas detrás; cámara lenta entre bloques. Fondo neutro. |
| `abstracto-26` | 5,2 s | Tres bustos (coral/lavanda) de perfil; aparecen redes de nodos sobre sus cabezas y la cámara se acerca a uno. Poder, datos, conexión. |
| `abstracto-27` | 5,2 s | Columnas coral altísimas; personas jóvenes y mayores caminan al pie en ambas direcciones, cielo lavanda-rosa. |
| `abstracto-28` | 5,2 s | Mano humana y mano robótica se acercan y se estrechan sobre fondo coral. Alianza humano-IA. |
| `abstracto-29` | 5,2 s | Rostro lavanda con tocado de varillas coral que se abre en abanico; una mano aparece y se aparta del rostro. |
| `abstracto-30` | 5,2 s | Variante de `29`: el tocado de varillas se eleva y abre como corona; mano en gesto delicado. |
| `abstracto-31` | 5,2 s | Hombre de traje ante un gran muro coral con un árbol naranja y un busto monumental; camina hacia el busto. |
| `abstracto-32` | 5,2 s | Variante de `31`: mismo escenario, al final aparece una rama seca/grieta. Tensión, crisis. |
| `abstracto-33` | 5,2 s | Mano gigante presiona un control remoto sobre una fila de casas coral tipo dominó. Automatización, control, efecto en cadena. |
| `abstracto-34` | 5,0 s | **Alta resolución (1936×1080).** Hombre con maletín camina bajo un portal rojo, nubes naranjas y suelo espejo; paso de muros en primer plano. |

---

## Cómo usarlos en un video

Ruta local dentro del repo: `assets/videos/…`. Desde fuera, vía raw de GitHub:

```html
<video
  src="https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/videos/abstractos/abstracto-24.mp4"
  poster="https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/videos/abstractos/posters/abstracto-24.jpg"
  autoplay muted loop playsinline
  style="width:100%;height:100%;object-fit:cover;"
></video>
```

Unir cuerpo + cierre con ffmpeg (misma resolución y fps que el cierre):

```bash
# 1) normaliza el cuerpo a 1920x1080 @30fps con pista de audio
ffmpeg -i cuerpo.mp4 -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30" \
  -c:v libx264 -pix_fmt yuv420p -c:a aac -ar 48000 cuerpo-norm.mp4
# 2) concatena con el cierre oficial
ffmpeg -i cuerpo-norm.mp4 -i assets/videos/cierre/cierre-horizontal.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" \
  -c:v libx264 -pix_fmt yuv420p -c:a aac final.mp4
```

Si el cuerpo no tiene audio, añade una pista silenciosa antes de concatenar
(`-f lavfi -i anullsrc=r=48000:cl=stereo -shortest`).

En HyperFrames / Remotion / onetake: referencia el `.mp4` como clip de video y coloca el
cierre como último segmento con su duración completa (9,8 s).

## Agregar videos nuevos

- Abstractos: `abstracto-35.mp4` en adelante (numeración secuencial), con su poster en
  `abstractos/posters/` (fotograma a ~2,5 s) y una fila en este catálogo (grupo + descripción).
- Deben cumplir el ADN visual de `DESIGN.md` § Imágenes AI.
- Actualiza los conteos en `DESIGN.md`, `README.md` y `SKILL.md`.
