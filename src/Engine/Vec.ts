export interface Vec {
  x: number;
  y: number;
}

export const Vec = {
  add: (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y }),
  floor: ({ x, y }: Vec): Vec => ({ x: Math.floor(x), y: Math.floor(y) }),
  limit: (v: Vec, l: Vec): Vec => ({ x: limit(v.x, l.x), y: limit(v.y, l.y) }),
};

function clamp(min: number, n: number, max: number) {
  return Math.max(min, Math.min(n, max));
}

function limit(n: number, max: number) {
  return clamp(-max, n, max);
}
