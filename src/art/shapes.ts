/** Small reusable shape helpers so stars and hearts look identical everywhere. */

export function starPoints(cx: number, cy: number, r: number, inner = 0.45): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rad = i % 2 === 0 ? r : r * inner;
    pts.push(`${(cx + Math.cos(a) * rad).toFixed(1)},${(cy + Math.sin(a) * rad).toFixed(1)}`);
  }
  return pts.join(' ');
}

export function heartPath(cx: number, cy: number, s: number): string {
  return (
    `M ${cx} ${cy + s * 0.8} ` +
    `C ${cx - s * 1.35} ${cy - s * 0.3} ${cx - s * 0.6} ${cy - s * 1.15} ${cx} ${cy - s * 0.3} ` +
    `C ${cx + s * 0.6} ${cy - s * 1.15} ${cx + s * 1.35} ${cy - s * 0.3} ${cx} ${cy + s * 0.8} Z`
  );
}

/** Costume motifs — one definition each so a paw is the same paw everywhere. */

export function paw(cx: number, cy: number, r: number): string {
  const pad = `M ${cx} ${cy + r * 0.15} m ${-r * 0.7} 0 a ${r * 0.7} ${r * 0.6} 0 1 0 ${r * 1.4} 0 a ${
    r * 0.7
  } ${r * 0.6} 0 1 0 ${-r * 1.4} 0 Z`;
  let toes = '';
  for (let i = 0; i < 4; i++) {
    const tx = cx + (i - 1.5) * r * 0.52;
    const ty = cy - r * 0.62 - (i === 1 || i === 2 ? r * 0.14 : 0);
    toes += `M ${tx} ${ty} m ${-r * 0.2} 0 a ${r * 0.2} ${r * 0.26} 0 1 0 ${r * 0.4} 0 a ${r * 0.2} ${
      r * 0.26
    } 0 1 0 ${-r * 0.4} 0 Z `;
  }
  return pad + ' ' + toes;
}

export function bat(cx: number, cy: number, s: number): string {
  return (
    `M ${cx} ${cy - s * 0.3} ` +
    `C ${cx - s * 0.3} ${cy - s * 0.7} ${cx - s * 0.7} ${cy - s * 0.7} ${cx - s} ${cy - s * 0.2} ` +
    `L ${cx - s * 0.72} ${cy - s * 0.05} L ${cx - s * 0.82} ${cy + s * 0.32} ` +
    `L ${cx - s * 0.4} ${cy + s * 0.1} L ${cx} ${cy + s * 0.45} ` +
    `L ${cx + s * 0.4} ${cy + s * 0.1} L ${cx + s * 0.82} ${cy + s * 0.32} ` +
    `L ${cx + s * 0.72} ${cy - s * 0.05} L ${cx + s} ${cy - s * 0.2} ` +
    `C ${cx + s * 0.7} ${cy - s * 0.7} ${cx + s * 0.3} ${cy - s * 0.7} ${cx} ${cy - s * 0.3} Z`
  );
}

export function bone(cx: number, cy: number, s: number): string {
  return (
    `M ${cx - s} ${cy} m 0 ${-s * 0.34} a ${s * 0.34} ${s * 0.34} 0 1 0 0 ${s * 0.68} ` +
    `L ${cx + s} ${cy + s * 0.34} a ${s * 0.34} ${s * 0.34} 0 1 0 0 ${-s * 0.68} Z`
  );
}

export function bolt(cx: number, cy: number, s: number): string {
  return `M ${cx + s * 0.35} ${cy - s} L ${cx - s * 0.55} ${cy + s * 0.12} L ${cx - s * 0.05} ${
    cy + s * 0.12
  } L ${cx - s * 0.35} ${cy + s} L ${cx + s * 0.55} ${cy - s * 0.15} L ${cx + s * 0.05} ${cy - s * 0.15} Z`;
}

export function shell(cx: number, cy: number, r: number): string {
  let d = `M ${cx - r} ${cy + r * 0.35} A ${r} ${r} 0 0 1 ${cx + r} ${cy + r * 0.35} Z`;
  for (let i = 1; i < 5; i++) {
    const a = Math.PI + (Math.PI * i) / 5;
    d += ` M ${cx} ${cy + r * 0.35} L ${cx + Math.cos(a) * r * 0.92} ${cy + r * 0.35 + Math.sin(a) * r * 0.92}`;
  }
  return d;
}

export function snowflake(cx: number, cy: number, r: number): string {
  let d = '';
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    const ex = cx + Math.cos(a) * r;
    const ey = cy + Math.sin(a) * r;
    d += `M ${cx} ${cy} L ${ex.toFixed(1)} ${ey.toFixed(1)} `;
    const bx = cx + Math.cos(a) * r * 0.6;
    const by = cy + Math.sin(a) * r * 0.6;
    for (const s of [-0.6, 0.6]) {
      d += `M ${bx.toFixed(1)} ${by.toFixed(1)} L ${(bx + Math.cos(a + s) * r * 0.34).toFixed(1)} ${(
        by +
        Math.sin(a + s) * r * 0.34
      ).toFixed(1)} `;
    }
  }
  return d;
}

export function flame(cx: number, cy: number, s: number): string {
  return (
    `M ${cx} ${cy + s} C ${cx - s * 0.9} ${cy + s * 0.7} ${cx - s * 0.8} ${cy - s * 0.2} ${cx - s * 0.25} ${
      cy - s * 0.5
    } C ${cx - s * 0.4} ${cy - s * 0.95} ${cx - s * 0.1} ${cy - s * 0.8} ${cx} ${cy - s} ` +
    `C ${cx + s * 0.25} ${cy - s * 0.5} ${cx + s * 0.9} ${cy - s * 0.35} ${cx + s * 0.55} ${cy + s * 0.35} ` +
    `C ${cx + s * 0.45} ${cy + s * 0.75} ${cx + s * 0.25} ${cy + s * 0.9} ${cx} ${cy + s} Z`
  );
}

/** A rolling wave crest. */
export function wave(cx: number, cy: number, s: number): string {
  return (
    `M ${cx - s} ${cy + s * 0.4} C ${cx - s * 0.8} ${cy - s * 0.5} ${cx - s * 0.1} ${cy - s * 0.8} ${cx + s * 0.2} ${
      cy - s * 0.2
    } C ${cx + s * 0.4} ${cy + s * 0.2} ${cx + s * 0.7} ${cy + s * 0.1} ${cx + s} ${cy - s * 0.3} ` +
    `L ${cx + s} ${cy + s * 0.6} L ${cx - s} ${cy + s * 0.6} Z`
  );
}

/** A crescent, for witchy and night-time trims. */
export function moon(cx: number, cy: number, r: number): string {
  return `M ${cx} ${cy - r} A ${r} ${r} 0 1 0 ${cx} ${cy + r} A ${r * 0.78} ${r * 0.78} 0 1 1 ${cx} ${cy - r} Z`;
}

export function flower(cx: number, cy: number, r: number): string {
  let d = '';
  for (let i = 0; i < 5; i++) {
    const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    const px = cx + Math.cos(a) * r;
    const py = cy + Math.sin(a) * r;
    d += `M ${cx} ${cy} Q ${px + Math.cos(a - 1) * r * 0.8} ${py + Math.sin(a - 1) * r * 0.8} ${px} ${py} Q ${
      px + Math.cos(a + 1) * r * 0.8
    } ${py + Math.sin(a + 1) * r * 0.8} ${cx} ${cy} `;
  }
  return d;
}
