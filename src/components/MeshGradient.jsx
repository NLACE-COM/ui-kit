import React, { useEffect, useRef } from 'react'

// MeshGradient — fondo animado WebGL con la paleta de marca NLACE.
// Mesh gradient de 4 focos en movimiento + realce cálido + oscurecido inferior + grano.
// Pensado como capa de fondo (colócalo absoluto/fixed detrás del contenido).
//
//   <div style={{ position:'relative' }}>
//     <MeshGradient style={{ position:'absolute', inset:0, zIndex:0 }} />
//     <div style={{ position:'relative', zIndex:1 }}>…contenido…</div>
//   </div>
//
// Props:
//   speed/intensity/grain — parámetros del shader (live: cambian sin reiniciar el contexto).
//   colors  — [primary, accent, pink, magenta, deep] en hex (default = marca NLACE).
//   highlight — color del realce cálido (default = accent-warm).

const DEFAULT_COLORS = ['#5869f7', '#fc624b', '#f76dee', '#b717af', '#1a1a5e']
const DEFAULT_HIGHLIGHT = '#ff8c42'

function hexToRGB(hex) {
  const h = String(hex).replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

const VERT = 'attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }'
const FRAG = [
  'precision highp float;',
  'uniform vec2 u_res; uniform float u_time; uniform float u_speed; uniform float u_intensity; uniform float u_grain;',
  'uniform vec3 u_primary, u_accent, u_pink, u_magenta, u_deep, u_highlight;',
  'float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123); }',
  'float grain(vec2 uv){ return hash(uv*vec2(1031.0,1973.0)+fract(u_time)); }',
  'void main(){',
  '  vec2 uv = gl_FragCoord.xy/u_res.xy;',
  '  float t = u_time*0.16*u_speed;',
  '  vec2 p0=vec2(0.24+0.18*sin(t*1.1), 0.30+0.14*cos(t*0.9));',
  '  vec2 p1=vec2(0.80+0.14*cos(t*0.8), 0.26+0.16*sin(t*1.2));',
  '  vec2 p2=vec2(0.56+0.20*sin(t*0.7), 0.76+0.12*cos(t*0.85));',
  '  vec2 p3=vec2(0.16+0.15*cos(t*1.3), 0.70+0.13*sin(t*0.75));',
  '  float e=1.9;',
  '  float w0=pow(1.0/(distance(uv,p0)+0.05),e);',
  '  float w1=pow(1.0/(distance(uv,p1)+0.05),e);',
  '  float w2=pow(1.0/(distance(uv,p2)+0.05),e);',
  '  float w3=pow(1.0/(distance(uv,p3)+0.05),e);',
  '  float ws=w0+w1+w2+w3;',
  '  vec3 col=(u_accent*w0 + u_pink*w1 + u_primary*w2 + u_magenta*w3)/ws;',
  '  col = mix(col, u_highlight, 0.10*u_intensity*sin(t+uv.x*3.0));',
  '  col = mix(col, u_deep, smoothstep(0.45,1.15,uv.y)*0.16);',
  '  col += (grain(uv)-0.5)*0.04*u_grain;',
  '  gl_FragColor=vec4(col,1.0);',
  '}',
].join('\n')

export function MeshGradient({
  speed = 10,
  intensity = 2,
  grain = 0.75,
  colors = DEFAULT_COLORS,
  highlight = DEFAULT_HIGHLIGHT,
  className = '',
  style,
  ...props
}) {
  const ref = useRef(null)
  // Params en vivo: el loop los lee de aquí, así cambian sin reiniciar el contexto.
  const params = useRef({ speed, intensity, grain, colors, highlight })
  params.current = { speed, intensity, grain, colors, highlight }

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: true, alpha: false })
    if (!gl) {
      canvas.style.background = (params.current.colors && params.current.colors[0]) || DEFAULT_COLORS[0]
      return
    }

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s))
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aLoc = gl.getAttribLocation(prog, 'a')
    gl.enableVertexAttribArray(aLoc)
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0)

    const u = (n) => gl.getUniformLocation(prog, n)
    const uRes = u('u_res'), uTime = u('u_time'), uSpeed = u('u_speed'), uInt = u('u_intensity'), uGrain = u('u_grain')
    const uPrimary = u('u_primary'), uAccent = u('u_accent'), uPink = u('u_pink'), uMagenta = u('u_magenta'), uDeep = u('u_deep'), uHighlight = u('u_highlight')

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
    }
    window.addEventListener('resize', resize)

    const t0 = performance.now()
    let raf = 0
    const frame = () => {
      if (gl.isContextLost()) return
      const p = params.current
      const c = p.colors || DEFAULT_COLORS
      resize()
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
      gl.uniform2f(uRes, gl.drawingBufferWidth, gl.drawingBufferHeight)
      gl.uniform1f(uTime, (performance.now() - t0) / 1000)
      gl.uniform1f(uSpeed, p.speed)
      gl.uniform1f(uInt, p.intensity)
      gl.uniform1f(uGrain, p.grain)
      gl.uniform3fv(uPrimary, hexToRGB(c[0]))
      gl.uniform3fv(uAccent, hexToRGB(c[1]))
      gl.uniform3fv(uPink, hexToRGB(c[2]))
      gl.uniform3fv(uMagenta, hexToRGB(c[3]))
      gl.uniform3fv(uDeep, hexToRGB(c[4]))
      gl.uniform3fv(uHighlight, hexToRGB(p.highlight))
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    // No liberamos el contexto (loseContext): bajo React StrictMode el efecto se
    // monta/limpia/monta y un contexto liberado dejaría el segundo montaje en negro.
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
      aria-hidden="true"
      {...props}
    />
  )
}
