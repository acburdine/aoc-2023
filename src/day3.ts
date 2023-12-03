import day3 from "../inputs/day3.txt";
// const day3 = `
// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..
// `;

const grid = day3
  .trim()
  .split("\n")
  .map((line) => line.split(""));

type Point = { x: number; y: number };
type Num = { y: number; startX: number; endX: number; num: number };
type Part = { nums: string; valid: boolean; num: Num | null };

const num = /^[0-9]$/;
const symbolr = /^[^0-9.]$/;

const maxY = grid.length - 1;
const maxX = grid[0].length - 1;

function hasSymbol(point: Point): boolean {
  if (point.y > maxY || point.x > maxX || point.y < 0 || point.x < 0) {
    return false;
  }

  return symbolr.test(grid[point.y][point.x]);
}

function hasNeighboringSymbol(point: Point): boolean {
  return (
    hasSymbol({ x: point.x - 1, y: point.y }) ||
    hasSymbol({ x: point.x - 1, y: point.y - 1 }) ||
    hasSymbol({ x: point.x, y: point.y - 1 }) ||
    hasSymbol({ x: point.x + 1, y: point.y - 1 }) ||
    hasSymbol({ x: point.x + 1, y: point.y }) ||
    hasSymbol({ x: point.x + 1, y: point.y + 1 }) ||
    hasSymbol({ x: point.x, y: point.y + 1 }) ||
    hasSymbol({ x: point.x - 1, y: point.y + 1 })
  );
}

let p1Sum = 0;
let starPoints: Point[] = [];
let nums: Num[] = [];

function findNum(point: Point): Num | null {
  return (
    nums.find(
      (n) => n.y === point.y && n.startX <= point.x && n.endX >= point.x
    ) ?? null
  );
}

function neighboringNumbers(point: Point): Set<Num> {
  const set = new Set<Num>();

  const tl = findNum({ x: point.x - 1, y: point.y - 1 });
  if (tl) set.add(tl);
  const t = findNum({ x: point.x, y: point.y - 1 });
  if (t) set.add(t);
  const tr = findNum({ x: point.x + 1, y: point.y - 1 });
  if (tr) set.add(tr);
  const r = findNum({ x: point.x + 1, y: point.y });
  if (r) set.add(r);
  const br = findNum({ x: point.x + 1, y: point.y + 1 });
  if (br) set.add(br);
  const b = findNum({ x: point.x, y: point.y + 1 });
  if (b) set.add(b);
  const bl = findNum({ x: point.x - 1, y: point.y + 1 });
  if (bl) set.add(bl);
  const l = findNum({ x: point.x - 1, y: point.y });
  if (l) set.add(l);

  return set;
}

for (let y = 0; y <= maxY; y++) {
  let part: Part = { nums: "", valid: false, num: null };

  for (let x = 0; x <= maxX; x++) {
    if (grid[y][x] === "*") {
      starPoints.push({ x, y });
    }

    if (!num.test(grid[y][x])) {
      if (part.valid && part.nums) {
        if (part.num) {
          part.num.endX = x - 1;
          part.num.num = parseInt(part.nums, 10);
        }
        nums.push(part.num!);
        p1Sum += part.num?.num ?? 0;
      }

      part = { nums: "", valid: false, num: null };
      continue;
    }

    if (!part.num) part.num = { y, startX: x, endX: x, num: 0 };
    part.nums += grid[y][x];
    part.valid = part.valid || hasNeighboringSymbol({ x, y });
  }

  if (part.valid && part.nums) {
    if (part.num) {
      part.num.endX = maxX;
      part.num.num = parseInt(part.nums, 10);
    }
    nums.push(part.num!);
    p1Sum += part.num?.num ?? 0;
  }
}

console.log(`Part 1: ${p1Sum}`);

let p2Sum = 0;
for (const pt of starPoints) {
  const n = neighboringNumbers(pt);
  if (n.size === 2) {
    p2Sum += Array.from(n).reduce((acc, cur) => acc * cur.num, 1);
  }
}

console.log(`Part 2: ${p2Sum}`);
