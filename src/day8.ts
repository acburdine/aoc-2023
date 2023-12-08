import day8 from "../inputs/day8.txt";
// const day8 = `
// LLR
//
// AAA = (BBB, BBB)
// BBB = (AAA, ZZZ)
// ZZZ = (ZZZ, ZZZ)
// `;
// const day8 = `
// LR
//
// 11A = (11B, XXX)
// 11B = (XXX, 11Z)
// 11Z = (11B, XXX)
// 22A = (22B, XXX)
// 22B = (22C, 22C)
// 22C = (22Z, 22Z)
// 22Z = (22B, 22B)
// XXX = (XXX, XXX)
// `;

const [ruleRaw, mapRaw] = day8.trim().split("\n\n");

const rules = ruleRaw.trim().split("");
const map = new Map(
  mapRaw
    .trim()
    .split("\n")
    .map((l) => {
      const [k, v] = l.trim().split(" = ");
      return [k, v.replace("(", "").replace(")", "").split(", ")];
    })
);

function part1() {
  let position = "AAA";
  let steps = 0;

  while (true) {
    const rule = rules[steps % rules.length];
    const [x, y] = map.get(position) ?? [];
    position = rule === "L" ? x : y;
    steps++;

    if (position === "ZZZ") {
      break;
    }
  }

  return steps;
}

function gcd(a: number, b: number): number {
  if (b === 0) {
    return a;
  }

  return gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function part2() {
  const positions = Array.from(map.keys())
    .filter((k) => k.endsWith("A"))
    .map((position) => {
      let steps = 0;

      while (true) {
        const rule = rules[steps % rules.length];
        const [x, y] = map.get(position) ?? [];
        position = rule === "L" ? x : y;
        steps++;

        if (position.endsWith("Z")) {
          break;
        }
      }

      return steps;
    });

  const [first, ...rest] = positions;
  let result = first;
  for (const n of rest) {
    result = lcm(result, n);
  }

  return result;
}

console.log("part 1:", part1());
console.log("part 2:", part2());
