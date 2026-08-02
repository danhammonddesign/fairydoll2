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
