
export function calculateCenter(x: number, y: number, w: number, h: number) {
  const w2 = w / 2;
  const h2 = h / 2;
  return {
    x: x + w2,
    y: y + h2
  };
}

export function calculateRadius(x: number, y: number, w: number, h: number) {
  return w / 2;
}