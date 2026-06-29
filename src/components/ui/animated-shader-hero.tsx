"use client"

import React, { useEffect, useRef } from 'react'

class WebGLRendererClass {
  canvas: HTMLCanvasElement
  gl: WebGL2RenderingContext
  program: WebGLProgram | null = null
  vs: WebGLShader | null = null
  fs: WebGLShader | null = null
  buffer: WebGLBuffer | null = null
  scale: number
  shaderSource: string
  mouseMove: [number, number] = [0, 0]
  mouseCoords: [number, number] = [0, 0]
  pointerCoords: number[] = [0, 0]
  nbrOfPointers = 0

  vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`

  vertices = [-1, 1, -1, -1, 1, 1, 1, -1]

  constructor(canvas: HTMLCanvasElement, scale: number, shaderSource: string) {
    this.canvas = canvas
    this.scale = scale
    this.gl = canvas.getContext('webgl2')!
    this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale)
    this.shaderSource = shaderSource
  }

  updateShader(source: string) {
    this.reset()
    this.shaderSource = source
    this.setup()
    this.init()
  }

  updateMove(deltas: number[]) { this.mouseMove = [deltas[0] || 0, deltas[1] || 0] }
  updateMouse(coords: number[]) { this.mouseCoords = [coords[0] || 0, coords[1] || 0] }
  updatePointerCoords(coords: number[]) { this.pointerCoords = coords }
  updatePointerCount(nbr: number) { this.nbrOfPointers = nbr }
  updateScale(scale: number) {
    this.scale = scale
    this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale)
  }

  compile(shader: WebGLShader, source: string) {
    const gl = this.gl
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(shader))
    }
  }

  test(source: string) {
    const gl = this.gl
    const shader = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    const result = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
      ? null
      : gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    return result
  }

  reset() {
    const gl = this.gl
    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) { gl.detachShader(this.program, this.vs); gl.deleteShader(this.vs) }
      if (this.fs) { gl.detachShader(this.program, this.fs); gl.deleteShader(this.fs) }
      gl.deleteProgram(this.program)
    }
  }

  setup() {
    const gl = this.gl
    this.vs = gl.createShader(gl.VERTEX_SHADER)!
    this.fs = gl.createShader(gl.FRAGMENT_SHADER)!
    this.compile(this.vs, this.vertexSrc)
    this.compile(this.fs, this.shaderSource)
    this.program = gl.createProgram()!
    gl.attachShader(this.program, this.vs)
    gl.attachShader(this.program, this.fs)
    gl.linkProgram(this.program)
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program))
    }
  }

  init() {
    const gl = this.gl
    const program = this.program!
    this.buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
    ;(program as any).resolution = gl.getUniformLocation(program, 'resolution')
    ;(program as any).time = gl.getUniformLocation(program, 'time')
    ;(program as any).move = gl.getUniformLocation(program, 'move')
    ;(program as any).touch = gl.getUniformLocation(program, 'touch')
    ;(program as any).pointerCount = gl.getUniformLocation(program, 'pointerCount')
    ;(program as any).pointers = gl.getUniformLocation(program, 'pointers')
  }

  render(now = 0) {
    const gl = this.gl
    const program = this.program
    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.uniform2f((program as any).resolution, this.canvas.width, this.canvas.height)
    gl.uniform1f((program as any).time, now * 1e-3)
    gl.uniform2f((program as any).move, ...this.mouseMove)
    gl.uniform2f((program as any).touch, ...this.mouseCoords)
    gl.uniform1i((program as any).pointerCount, this.nbrOfPointers)
    gl.uniform2fv((program as any).pointers, this.pointerCoords)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
}

class PointerHandler {
  private scale: number
  private active = false
  private pointers = new Map<number, number[]>()
  private lastCoords = [0, 0]
  private moves = [0, 0]

  constructor(element: HTMLCanvasElement, scale: number) {
    this.scale = scale
    const map = (el: HTMLCanvasElement, s: number, x: number, y: number) =>
      [x * s, el.height - y * s]

    element.addEventListener('pointerdown', (e) => {
      this.active = true
      this.pointers.set(e.pointerId, map(element, this.scale, e.clientX, e.clientY))
    })
    element.addEventListener('pointerup', (e) => {
      if (this.pointers.size === 1) this.lastCoords = this.first
      this.pointers.delete(e.pointerId)
      this.active = this.pointers.size > 0
    })
    element.addEventListener('pointerleave', (e) => {
      if (this.pointers.size === 1) this.lastCoords = this.first
      this.pointers.delete(e.pointerId)
      this.active = this.pointers.size > 0
    })
    element.addEventListener('pointermove', (e) => {
      if (!this.active) return
      this.lastCoords = [e.clientX, e.clientY]
      this.pointers.set(e.pointerId, map(element, this.scale, e.clientX, e.clientY))
      this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY]
    })
  }

  updateScale(s: number) { this.scale = s }
  get count() { return this.pointers.size }
  get move() { return this.moves }
  get coords() {
    return this.pointers.size > 0 ? Array.from(this.pointers.values()).flat() : [0, 0]
  }
  get first(): number[] {
    return this.pointers.values().next().value || this.lastCoords
  }
}

const SHADER = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}

float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) { t+=a*noise(p); p*=2.*m; a*=.5; }
  return t;
}

float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a); d=a; p*=2./(i+1.);
  }
  return t;
}

void main(void) {
  vec2 uv=(FC-.5*R)/MN, st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    float b=noise(i+p+bg*1.731);
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }
  O=vec4(col,1);
}`

export interface AnimatedShaderHeroProps {
  trustBadge?: { text: string; icon?: string } | undefined
  headline: { line1: string; line2: string }
  subtitle: string
  buttons?: {
    primary?: { text: string; onClick?: () => void }
    secondary?: { text: string; onClick?: () => void }
  }
  className?: string
}

export default function AnimatedShaderHero({
  trustBadge,
  headline,
  subtitle,
  buttons,
  className = '',
}: AnimatedShaderHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const rendererRef = useRef<WebGLRendererClass | null>(null)
  const pointersRef = useRef<PointerHandler | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.max(1, 0.5 * window.devicePixelRatio)
    rendererRef.current = new WebGLRendererClass(canvas, dpr, SHADER)
    pointersRef.current = new PointerHandler(canvas, dpr)
    rendererRef.current.setup()
    rendererRef.current.init()

    const resize = () => {
      if (!canvas || !rendererRef.current) return
      const d = Math.max(1, 0.5 * window.devicePixelRatio)
      canvas.width = window.innerWidth * d
      canvas.height = window.innerHeight * d
      rendererRef.current.updateScale(d)
    }

    const loop = (now: number) => {
      const r = rendererRef.current
      const p = pointersRef.current
      if (!r || !p) return
      r.updateMouse(p.first)
      r.updatePointerCount(p.count)
      r.updatePointerCoords(p.coords)
      r.updateMove(p.move)
      r.render(now)
      rafRef.current = requestAnimationFrame(loop)
    }

    resize()
    if (rendererRef.current.test(SHADER) === null) {
      rendererRef.current.updateShader(SHADER)
    }
    loop(0)
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
      rendererRef.current?.reset()
    }
  }, [])

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-black ${className}`}>
      <style>{`
        @keyframes hero-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-up { opacity: 0; animation: hero-up 0.8s ease-out forwards; }
        .delay-1 { animation-delay: 0.15s; }
        .delay-2 { animation-delay: 0.30s; }
        .delay-3 { animation-delay: 0.50s; }
        .delay-4 { animation-delay: 0.68s; }
        .delay-5 { animation-delay: 0.82s; }
      `}</style>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full touch-none"
        style={{ background: 'black' }}
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-6">
        <div className="text-center max-w-4xl mx-auto space-y-6">

          {trustBadge && (
            <div className="hero-up delay-1 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm">
              {trustBadge.icon && <span>{trustBadge.icon}</span>}
              <span>{trustBadge.text}</span>
            </div>
          )}

          <div className="space-y-1">
            <h1 className="hero-up delay-2 text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight">
              {headline.line1}
            </h1>
            <h1 className="hero-up delay-3 text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              {headline.line2}
            </h1>
          </div>

          <p className="hero-up delay-4 text-lg md:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {buttons && (
            <div className="hero-up delay-5 flex flex-wrap items-center justify-center gap-4 pt-2">
              {buttons.primary && (
                <button
                  onClick={buttons.primary.onClick}
                  className="h-12 px-8 rounded-full bg-white text-black font-semibold text-[15px] tracking-tight transition hover:opacity-85 active:scale-[0.97]"
                >
                  {buttons.primary.text}
                </button>
              )}
              {buttons.secondary && (
                <button
                  onClick={buttons.secondary.onClick}
                  className="h-12 px-8 rounded-full border border-white/30 text-white font-medium text-[15px] transition hover:border-white/60 hover:bg-white/5 active:scale-[0.97]"
                >
                  {buttons.secondary.text}
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
