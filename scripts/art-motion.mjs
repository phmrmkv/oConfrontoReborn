#!/usr/bin/env node
// Ícones com movimento: as regiões de caça e os poderes da luta.
// Os originais (PNG de 512 px, fundo transparente, pintados no gerador local) ficam em art/regions e art/powers. Este módulo
// monta a versão de site de cada um como WebP animado em loop: a pintura fica parada e ganha movimento por cima (redemoinho
// girando, chama tremendo, brasas, neve, bolhas, vaga-lumes, névoa, fumaça, brilho pulsando). Tudo é periódico no tempo do
// loop, então a volta não dá pulo. Chamado por scripts/art.mjs (`npm run art`, `npm run build`).
//   frontend/public/assets/regions/<chave>.webp   (ui/RegionIcon.tsx; sem o WebP, o SVG antigo continua valendo)
//   frontend/public/assets/powers/<nome>.webp      (ui/PowerIcon.tsx)
// Com as animações desligadas, a tela mostra só o primeiro quadro (StillFrame do ui/GameIcon.tsx).
//   node scripts/art-motion.mjs            refaz o que mudou (art/motion.json guarda o SHA-256 de cada original e a receita)
//   node scripts/art-motion.mjs --refazer  refaz tudo
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

// Mude ao alterar os efeitos ou a compressão: tudo é refeito no próximo build.
const RECIPE = 6;
const WORK = 384, OUT = 128, FRAME_MS = 150;

// Posições em fração do quadro (0 a 1), medidas no original de cada região depois de recortado.
// Toda região flutua de leve (o portal da 4ª Era respira), para o movimento aparecer mesmo no ícone pequeno da lista.
// Movimento do desenho inteiro (aplicado por último, com os efeitos já desenhados): bob (flutua para cima e para baixo), breathe (cresce e encolhe de
// leve), sway (balança girando poucos graus). Efeitos: spin (gira o miolo de um disco), flame (chama tremendo numa caixa), glow (brilho pulsando), pulse (a pintura
// clareia e escurece num disco), sparks (partículas: ember sobe, snow cai, bubble sobe devagar, firefly vagueia, dust sobe e
// some, star cintila parada), mist (faixa de névoa andando de lado), smoke (fumaça subindo e abrindo).
export const regionMotion = {
  frames: 24,
  // Campos do Amanhecer: o sol pulsa atrás do morro e a chaminé solta fumaça.
  outskirts: [{ fx: 'glow', x: .47, y: .33, r: .24, color: [255, 214, 120], amp: .45 }, { fx: 'smoke', x: .6, y: .27, color: [200, 195, 190] }],
  // Pedreira dos Gigantes: poeira subindo das pedras.
  quarry: [{ fx: 'sparks', kind: 'dust', box: [.15, .35, .85, .75], n: 10, color: [215, 205, 185] }, { fx: 'sparks', kind: 'star', box: [.4, .1, .75, .35], n: 3, color: [255, 255, 240] }],
  // Ruínas Flamejantes: a fogueira entre as colunas treme e solta brasas.
  ruins: [{ fx: 'flame', box: [.34, .28, .66, .74] }, { fx: 'glow', x: .5, y: .6, r: .22, color: [255, 150, 50], amp: .4, speed: 2 }, { fx: 'sparks', kind: 'ember', box: [.34, .08, .66, .6], n: 14, color: [255, 170, 60] }],
  // Acampamento Orc: fogueira tremendo e fumaça.
  orc_camp: [{ fx: 'flame', box: [.32, .56, .46, .76] }, { fx: 'glow', x: .39, y: .67, r: .13, color: [255, 160, 60], amp: .5, speed: 2 }, { fx: 'smoke', x: .39, y: .58, color: [140, 130, 120] }],
  // Labirinto dos Minotauros: as duas tochas piscam.
  labyrinth: [{ fx: 'glow', x: .35, y: .39, r: .1, color: [255, 170, 70], amp: .7, speed: 3 }, { fx: 'glow', x: .61, y: .52, r: .1, color: [255, 170, 70], amp: .7, speed: 3, phase: .4 }, { fx: 'sparks', kind: 'ember', box: [.3, .2, .66, .5], n: 5, color: [255, 190, 90] }],
  // Portões do Abismo: a lava dentro do arco ferve, pulsa e solta brasas.
  abyss: [{ fx: 'flame', box: [.33, .38, .6, .82] }, { fx: 'pulse', x: .47, y: .6, r: .2, amp: .35 }, { fx: 'sparks', kind: 'ember', box: [.3, .2, .62, .7], n: 12, color: [255, 120, 40] }],
  // Terras Geladas: neve caindo.
  frost: [{ fx: 'sparks', kind: 'snow', box: [.05, .02, .95, .85], n: 24, color: [250, 252, 255] }, { fx: 'glow', x: .5, y: .2, r: .2, color: [200, 240, 255], amp: .3 }],
  // Pântano Sombrio: bolhas na água e vaga-lumes.
  swamp: [{ fx: 'sparks', kind: 'bubble', box: [.2, .58, .8, .8], n: 7, color: [170, 210, 150] }, { fx: 'sparks', kind: 'firefly', box: [.1, .15, .9, .6], n: 7, color: [230, 255, 120] }],
  // Cripta Esquecida: névoa no chão e a lamparina piscando.
  crypt: [{ fx: 'mist', y0: .62, y1: .85, color: [225, 228, 238] }, { fx: 'glow', x: .69, y: .62, r: .12, color: [255, 200, 110], amp: .6, speed: 2 }],
  // Cidadela dos Renegados: as janelas acesas piscam.
  citadel: [{ fx: 'pulse', x: .42, y: .37, r: .06, amp: .9, speed: 2 }, { fx: 'pulse', x: .58, y: .37, r: .06, amp: .9, speed: 2, phase: .5 }, { fx: 'glow', x: .42, y: .37, r: .08, color: [255, 190, 90], amp: .9, speed: 2 }, { fx: 'glow', x: .58, y: .37, r: .08, color: [255, 190, 90], amp: .9, speed: 2, phase: .5 }],
  // Santuário Elemental: orbes cintilando.
  sanctuary: [{ fx: 'glow', x: .21, y: .28, r: .1, color: [255, 120, 50], amp: .7, phase: 0 }, { fx: 'glow', x: .39, y: .13, r: .1, color: [80, 170, 255], amp: .7, phase: .25 },
    { fx: 'glow', x: .62, y: .15, r: .1, color: [90, 230, 110], amp: .7, phase: .5 }, { fx: 'glow', x: .8, y: .28, r: .1, color: [230, 240, 255], amp: .7, phase: .75 },
    { fx: 'sparks', kind: 'star', box: [.12, .02, .88, .38], n: 6, color: [255, 255, 230] }],
  // Ruínas da 1ª Era: a runa dourada pulsa.
  era1: [{ fx: 'pulse', x: .53, y: .48, r: .12, amp: .45 }, { fx: 'glow', x: .53, y: .48, r: .17, color: [255, 210, 100], amp: .5 }, { fx: 'sparks', kind: 'star', box: [.35, .3, .7, .65], n: 5, color: [255, 235, 160] }],
  // Geleiras da 2ª Era: a caverna brilha e cai neve.
  era2: [{ fx: 'glow', x: .48, y: .6, r: .2, color: [140, 230, 255], amp: .5 }, { fx: 'sparks', kind: 'snow', box: [.05, .02, .95, .85], n: 14, color: [240, 252, 255] }],
  // Cidadela da 3ª Era: o selo arcano sobre a porta pulsa.
  era3: [{ fx: 'pulse', x: .52, y: .38, r: .08, amp: .5 }, { fx: 'glow', x: .52, y: .38, r: .13, color: [200, 150, 255], amp: .6 }],
  // Abismo da 4ª Era: o redemoinho do portal gira dentro do anel de runas, que fica parado; o centro brilha.
  era4: [{ fx: 'spin', x: .5, y: .48, r: .31 }, { fx: 'glow', x: .5, y: .48, r: .17, color: [255, 170, 255], amp: .5, speed: 2 }, { fx: 'sparks', kind: 'star', box: [.25, .22, .75, .74], n: 6, color: [255, 220, 255] }],
  // Vale da Perdição: o orbe vermelho pulsa e uma névoa vermelha corre pelo vale.
  capriel: [{ fx: 'pulse', x: .5, y: .21, r: .08, amp: .5 }, { fx: 'glow', x: .5, y: .21, r: .13, color: [255, 60, 50], amp: .6 }, { fx: 'mist', y0: .5, y1: .78, color: [200, 50, 50] }],
};
// Poderes: brilho na cor do próprio desenho e faíscas em volta; ajustes por nome quando o automático não basta.
const powerMotion = {
  frames: 16,
  default: (color) => [{ fx: 'bob', amp: .025 }, { fx: 'glow', x: .5, y: .5, r: .38, color, amp: .45 }, { fx: 'sparks', kind: 'star', box: [.08, .08, .92, .92], n: 9, color: color.map(c => Math.min(255, c + 70)) }],
  's-raio-congelante': c => [{ fx: 'sway', deg: 4 }, { fx: 'glow', x: .5, y: .5, r: .32, color: c, amp: .3 }, { fx: 'sparks', kind: 'snow', box: [.1, .05, .9, .9], n: 12, color: [235, 250, 255] }],
  's1-explosao': c => [{ fx: 'breathe', amp: .06 }, { fx: 'sway', deg: 6 }, { fx: 'pulse', x: .5, y: .5, r: .3, amp: .35 }, { fx: 'sparks', kind: 'ember', box: [.15, .1, .85, .8], n: 12, color: [255, 170, 60] }],
  'k2-furia-berserker': c => [{ fx: 'breathe', amp: .04 }, { fx: 'glow', x: .5, y: .5, r: .35, color: [255, 60, 40], amp: .4 }, { fx: 'sparks', kind: 'ember', box: [.15, .1, .85, .85], n: 12, color: [255, 90, 60] }],
  'p-flecha-envenenada': c => [{ fx: 'bob', amp: .03 }, { fx: 'glow', x: .5, y: .5, r: .3, color: [120, 255, 90], amp: .3 }, { fx: 'sparks', kind: 'bubble', box: [.2, .2, .8, .8], n: 7, color: [150, 255, 110] }],
  meditar: c => [{ fx: 'bob', amp: .035 }, { fx: 'glow', x: .5, y: .5, r: .35, color: [130, 180, 255], amp: .35 }, { fx: 'sparks', kind: 'firefly', box: [.1, .1, .9, .9], n: 8, color: [190, 220, 255] }],
  'd-raizes': c => [{ fx: 'breathe', amp: .03 }, { fx: 'glow', x: .5, y: .6, r: .3, color: [140, 220, 90], amp: .3 }, { fx: 'sparks', kind: 'firefly', box: [.1, .2, .9, .9], n: 7, color: [210, 255, 140] }],
};

const TAU = Math.PI * 2;
// Ruído determinístico: o mesmo original dá sempre a mesma animação (o build não muda arquivos à toa).
const rand = seed => () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const clamp = v => v < 0 ? 0 : v > 255 ? 255 : v;

// Pinta um ponto suave: 'add' clareia (luz), 'over' cobre (neve, fumaça).
function blob(px, x, y, rad, [r, g, b], alpha, mode = 'add', clip = null) {
  const x0 = Math.max(0, Math.floor(x - rad)), x1 = Math.min(WORK - 1, Math.ceil(x + rad)), y0 = Math.max(0, Math.floor(y - rad)), y1 = Math.min(WORK - 1, Math.ceil(y + rad));
  for (let yy = y0; yy <= y1; yy++) for (let xx = x0; xx <= x1; xx++) {
    const d = Math.hypot(xx - x, yy - y) / rad; if (d >= 1) continue;
    const i = (yy * WORK + xx) * 4, k = alpha * (1 - d) * (1 - d) * (clip ? clip[i + 3] / 255 : 1), a0 = px[i + 3] / 255;
    if (!k) continue;
    if (mode === 'add') {
      px[i] = clamp(px[i] * a0 + r * k + px[i] * 0); px[i + 1] = clamp(px[i + 1] * a0 + g * k); px[i + 2] = clamp(px[i + 2] * a0 + b * k);
      const a = Math.min(1, a0 + k * .9);
      if (a > 0) { px[i] = clamp(px[i] / a); px[i + 1] = clamp(px[i + 1] / a); px[i + 2] = clamp(px[i + 2] / a); }
      px[i + 3] = Math.round(a * 255);
    } else {
      const a = k + a0 * (1 - k);
      if (a > 0) { px[i] = clamp((r * k + px[i] * a0 * (1 - k)) / a); px[i + 1] = clamp((g * k + px[i + 1] * a0 * (1 - k)) / a); px[i + 2] = clamp((b * k + px[i + 2] * a0 * (1 - k)) / a); }
      px[i + 3] = Math.round(a * 255);
    }
  }
}

// Desenho inteiro deslocado, girado e com zoom em torno do centro (amostragem bilinear).
function affine(base, scale, rot, dx, dy) {
  const S = WORK, out = Buffer.alloc(base.length), c = Math.cos(-rot) / scale, s = Math.sin(-rot) / scale, h = S / 2;
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const X = x - h - dx, Y = y - h - dy, sx = h + X * c - Y * s, sy = h + X * s + Y * c;
    if (sx < 0 || sy < 0 || sx >= S - 1 || sy >= S - 1) continue;
    const ix = Math.floor(sx), iy = Math.floor(sy), fx = sx - ix, fy = sy - iy, i = (y * S + x) * 4;
    for (let ch = 0; ch < 4; ch++) out[i + ch] = Math.round(base[(iy * S + ix) * 4 + ch] * (1 - fx) * (1 - fy) + base[(iy * S + ix + 1) * 4 + ch] * fx * (1 - fy) + base[((iy + 1) * S + ix) * 4 + ch] * (1 - fx) * fy + base[((iy + 1) * S + ix + 1) * 4 + ch] * fx * fy);
  }
  return out;
}

function render(base0, effects, t, seed) {
  const S = WORK;
  let scale = 1, rot = 0, dy = 0;
  for (const e of effects) {
    if (e.fx === 'bob') dy += Math.sin(t * TAU) * (e.amp ?? .025) * S;
    if (e.fx === 'breathe') scale *= 1 + Math.sin(t * TAU) * (e.amp ?? .03);
    if (e.fx === 'sway') rot += Math.sin(t * TAU) * (e.deg ?? 3) * Math.PI / 180;
  }
  const base = base0, px = Buffer.from(base);
  for (const [n, e] of effects.entries()) {
    const rnd = rand(seed + n * 977);
    if (e.fx === 'spin') {
      // Gira o miolo do disco uma volta por loop; a borda (anel de pedra) fica parada, com uma transição suave.
      const cx = e.x * S, cy = e.y * S, R = e.r * S, ang = -t * TAU, c = Math.cos(ang), s = Math.sin(ang);
      for (let y = Math.floor(cy - R); y <= cy + R; y++) for (let x = Math.floor(cx - R); x <= cx + R; x++) {
        const d = Math.hypot(x - cx, y - cy); if (d >= R || x < 0 || y < 0 || x >= S || y >= S) continue;
        const sx = cx + (x - cx) * c - (y - cy) * s, sy = cy + (x - cx) * s + (y - cy) * c;
        const ix = Math.min(S - 2, Math.max(0, Math.floor(sx))), iy = Math.min(S - 2, Math.max(0, Math.floor(sy))), fx = sx - ix, fy = sy - iy;
        const w = d > R * .82 ? (R - d) / (R * .18) : 1, i = (y * S + x) * 4;
        for (let ch = 0; ch < 4; ch++) {
          const v = base[(iy * S + ix) * 4 + ch] * (1 - fx) * (1 - fy) + base[(iy * S + ix + 1) * 4 + ch] * fx * (1 - fy) + base[((iy + 1) * S + ix) * 4 + ch] * (1 - fx) * fy + base[((iy + 1) * S + ix + 1) * 4 + ch] * fx * fy;
          px[i + ch] = Math.round(v * w + base[i + ch] * (1 - w));
        }
      }
    } else if (e.fx === 'flame') {
      // Chama: cada linha da caixa balança de lado (mais no alto) e a cor pisca um pouco.
      const [bx0, by0, bx1, by1] = e.box.map(v => Math.round(v * S)), h = by1 - by0;
      const copy = Buffer.from(px);
      for (let y = by0; y < by1; y++) {
        const up = 1 - (y - by0) / h, shift = Math.sin(t * TAU * 2 + y * .09) * 3.2 * up + Math.sin(t * TAU * 3 + y * .21) * 1.4 * up;
        for (let x = bx0; x < bx1; x++) {
          const sx = Math.min(S - 1, Math.max(0, Math.round(x - shift))), i = (y * S + x) * 4, j = (y * S + sx) * 4;
          const warm = copy[j] > 150 && copy[j] > copy[j + 2] + 40;
          for (let ch = 0; ch < 4; ch++) px[i + ch] = warm || copy[i] > 150 && copy[i] > copy[i + 2] + 40 ? copy[j + ch] : px[i + ch];
          if (warm) { const k = 1 + .12 * Math.sin(t * TAU * 4 + x * .05); px[i] = clamp(px[i] * k); px[i + 1] = clamp(px[i + 1] * k); }
        }
      }
    } else if (e.fx === 'glow' || e.fx === 'pulse') {
      const k = .5 + .5 * Math.sin((t * (e.speed ?? 1) + (e.phase ?? 0)) * TAU);
      if (e.fx === 'glow') blob(px, e.x * S, e.y * S, e.r * S, e.color, (e.amp ?? .4) * (.35 + .65 * k));
      else {
        const cx = e.x * S, cy = e.y * S, R = e.r * S, gain = 1 + (e.amp ?? .3) * (k - .3);
        for (let y = Math.floor(cy - R); y <= cy + R; y++) for (let x = Math.floor(cx - R); x <= cx + R; x++) {
          if (x < 0 || y < 0 || x >= S || y >= S) continue; const d = Math.hypot(x - cx, y - cy) / R; if (d >= 1) continue;
          const g = 1 + (gain - 1) * (1 - d * d), i = (y * S + x) * 4; px[i] = clamp(px[i] * g); px[i + 1] = clamp(px[i + 1] * g); px[i + 2] = clamp(px[i + 2] * g);
        }
      }
    } else if (e.fx === 'sparks') {
      const [x0, y0, x1, y1] = e.box.map(v => v * S), W = x1 - x0, H = y1 - y0;
      for (let p = 0; p < e.n; p++) {
        const ph = rnd(), px0 = rnd(), sz = .6 + rnd() * .8, wob = rnd() * TAU, u = (t + ph) % 1;
        let x, y, a, rad;
        if (e.kind === 'snow') { x = x0 + ((px0 + Math.sin(u * TAU + wob) * .04) % 1) * W; y = y0 + u * H; a = Math.sin(u * Math.PI); rad = 6.5 * sz; blob(px, x, y, rad * 1.45, [60, 100, 160], a * .7, 'over'); blob(px, x, y, rad, e.color, a, 'over'); continue; }
        if (e.kind === 'ember') { x = x0 + px0 * W + Math.sin(u * TAU * 2 + wob) * 5; y = y1 - u * H; a = Math.sin(u * Math.PI) * .95; rad = 5 * sz; }
        else if (e.kind === 'bubble') { x = x0 + px0 * W; y = y1 - u * H * .5; a = Math.sin(u * Math.PI) * .7; rad = (4 + u * 6) * sz; blob(px, x, y, rad, e.color, a * .6, 'over'); blob(px, x - rad * .3, y - rad * .3, rad * .4, [255, 255, 255], a * .5); continue; }
        else if (e.kind === 'firefly') { x = x0 + (px0 + .08 * Math.sin(t * TAU + wob)) * W; y = y0 + (rnd() + .1 * Math.cos(t * TAU * 2 + wob)) * H; a = .35 + .65 * Math.max(0, Math.sin((t + ph) * TAU * 2)); rad = 7 * sz; }
        else if (e.kind === 'dust') { x = x0 + px0 * W + u * 8; y = y1 - u * H * .4; a = Math.sin(u * Math.PI) * .45; rad = (6 + u * 9) * sz; blob(px, x, y, rad, e.color, a, 'over'); continue; }
        else { x = x0 + px0 * W; y = y0 + rnd() * H; a = Math.max(0, Math.sin((t + ph) * TAU)) ** 3; rad = 6 * sz; }
        blob(px, x, y, rad * 2.2, e.color, a * .35); blob(px, x, y, rad, e.color, a);
      }
    } else if (e.fx === 'mist') {
      const y0 = e.y0 * S, y1 = e.y1 * S;
      for (let p = 0; p < 6; p++) { const ph = rnd(), yy = y0 + rnd() * (y1 - y0), x = ((ph + t) % 1) * (S * 1.4) - S * .2; blob(px, x, yy, S * (.1 + rnd() * .06), e.color, .3, 'over', base); }
    } else if (e.fx === 'smoke') {
      for (let p = 0; p < 4; p++) { const u = (t + p / 4) % 1; blob(px, e.x * S + Math.sin(u * TAU) * 6 + u * 10, e.y * S - u * S * .25, (9 + u * 20), e.color, .6 * Math.sin(u * Math.PI), 'over'); }
    }
  }
  // O desenho inteiro (já com os efeitos) flutua, cresce ou balança: o brilho e a chama andam junto com a pintura.
  return scale === 1 && !rot && !dy ? px : affine(px, scale, rot, 0, dy);
}

async function animate(sharp, file, effects, frames, seed) {
  const base = await sharp(file).ensureAlpha().resize(WORK, WORK, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' }).raw().toBuffer();
  const list = [];
  for (let f = 0; f < frames; f++) list.push(await sharp(render(base, effects, f / frames, seed), { raw: { width: WORK, height: WORK, channels: 4 } }).resize(OUT, OUT, { kernel: 'lanczos3' }).png().toBuffer());
  return sharp(list, { join: { animated: true } }).webp({ quality: 80, alphaQuality: 90, effort: 6, loop: 0, delay: list.map(() => FRAME_MS) }).toBuffer();
}

// Cor dominante (pixels saturados e visíveis) para o brilho dos poderes.
async function mainColor(sharp, file) {
  const { data } = await sharp(file).ensureAlpha().resize(64, 64).raw().toBuffer({ resolveWithObject: true });
  let r = 0, g = 0, b = 0, n = 0;
  for (let i = 0; i < data.length; i += 4) { if (data[i + 3] < 200) continue; const mx = Math.max(data[i], data[i + 1], data[i + 2]), mn = Math.min(data[i], data[i + 1], data[i + 2]); if (mx - mn < 60) continue; r += data[i]; g += data[i + 1]; b += data[i + 2]; n++; }
  if (!n) return [255, 230, 160];
  const m = Math.max(r, g, b) / n || 1; return [r, g, b].map(v => Math.round(v / n * 255 / m));
}

export async function buildMotion(root, { log = console.log, force = false } = {}) {
  let sharp; try { sharp = (await import('sharp')).default; } catch { log('Movimento: a biblioteca sharp não está instalada; os ícones já gravados continuam valendo.'); return; }
  const manifestFile = path.join(root, 'art/motion.json');
  const manifest = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')) : {};
  if (manifest.recipe !== RECIPE) { force = true; }
  const jobs = [
    ['regions', 'frontend/public/assets/regions', name => regionMotion[name] && [name === 'era4' ? { fx: 'breathe', amp: .035 } : { fx: 'bob', amp: .035 }, ...regionMotion[name]], regionMotion.frames],
    ['powers', 'frontend/public/assets/powers', null, powerMotion.frames],
  ];
  let made = 0; const next = { recipe: RECIPE };
  for (const [dir, outDir, pick, frames] of jobs) {
    const src = path.join(root, 'art', dir); if (!fs.existsSync(src)) continue;
    fs.mkdirSync(path.join(root, outDir), { recursive: true });
    for (const f of fs.readdirSync(src).filter(f => f.endsWith('.png')).sort()) {
      const name = f.slice(0, -4), file = path.join(src, f), out = path.join(root, outDir, `${name}.webp`);
      const effects = pick ? pick(name) : (powerMotion[name] ?? powerMotion.default)(await mainColor(sharp, file));
      if (!effects) { log(`Movimento: ${dir}/${f} sem efeitos definidos; ficou de fora.`); continue; }
      const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).update(JSON.stringify(effects)).digest('hex'), key = `${dir}/${name}`;
      next[key] = hash;
      if (!force && manifest[key] === hash && fs.existsSync(out)) continue;
      const seed = parseInt(hash.slice(0, 8), 16);
      // No Windows o arquivo às vezes fica preso por um instante (antivírus, servidor lendo): tenta de novo antes de desistir.
      const buf = await animate(sharp, file, effects, frames, seed);
      for (let tries = 0; ; tries++) { try { fs.writeFileSync(out, buf); break; } catch (err) { if (tries >= 5) throw err; await new Promise(r => setTimeout(r, 400)); } }
      made++;
    }
  }
  fs.writeFileSync(manifestFile, JSON.stringify(next, null, 2) + '\n');
  if (made) log(`Movimento: ${made} ícone(s) animado(s) gravado(s) (regiões e poderes).`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await buildMotion(path.join(path.dirname(fileURLToPath(import.meta.url)), '..'), { force: process.argv.includes('--refazer') });
}
