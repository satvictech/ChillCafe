import * as THREE from "three";

function canvas(size: number) {
  const el = document.createElement("canvas");
  el.width = size;
  el.height = size;
  return { el, ctx: el.getContext("2d")! };
}

function finish(el: HTMLCanvasElement, repeat: [number, number]) {
  const tex = new THREE.CanvasTexture(el);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(...repeat);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export function checkerTexture() {
  const { el, ctx } = canvas(256);
  ctx.fillStyle = "#e8e4dc";
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = "#232323";
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillRect(128, 128, 128, 128);
  return finish(el, [7, 6]);
}

export function chalkboardTexture() {
  const { el, ctx } = canvas(512);
  ctx.fillStyle = "#0e0d0c";
  ctx.fillRect(0, 0, 512, 512);

  const words = ["Café", "COFFEE", "All Day", "Espresso", "Latte", "Chill"];
  ctx.textBaseline = "middle";

  for (let row = 0; row < 11; row++) {
    for (let col = 0; col < 4; col++) {
      const word = words[(row * 4 + col) % words.length];
      const italic = word === "Café" || word === "Chill";
      ctx.font = `${italic ? "italic " : ""}${italic ? 27 : 19}px Georgia, serif`;
      ctx.fillStyle = `rgba(236,224,209,${0.24 + ((row + col) % 3) * 0.1})`;
      ctx.fillText(word, 14 + col * 126, 26 + row * 46);
    }
  }

  ctx.strokeStyle = "rgba(236,224,209,0.14)";
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 9; i++) {
    ctx.beginPath();
    ctx.arc(60 + (i % 3) * 170, 70 + Math.floor(i / 3) * 165, 13, 0, Math.PI * 2);
    ctx.stroke();
  }

  return finish(el, [2, 2]);
}

export function brickTexture() {
  const { el, ctx } = canvas(256);
  ctx.fillStyle = "#d9d2c6";
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = "#efe9df";

  const h = 32;
  for (let row = 0; row < 256 / h; row++) {
    const offset = row % 2 ? 32 : 0;
    for (let col = -1; col < 5; col++) {
      ctx.fillRect(col * 64 + offset + 2, row * h + 2, 60, h - 4);
    }
  }
  return finish(el, [4, 3]);
}

export function marbleTexture() {
  const { el, ctx } = canvas(256);
  ctx.fillStyle = "#f2eee8";
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = "rgba(120,118,114,0.34)";

  for (let i = 0; i < 22; i++) {
    ctx.lineWidth = 0.6 + (i % 3) * 0.7;
    ctx.beginPath();
    let x = (i * 37) % 256;
    let y = -10;
    ctx.moveTo(x, y);
    while (y < 266) {
      x += Math.sin(y * 0.06 + i) * 9;
      y += 16;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  return finish(el, [1, 1]);
}
