import { readInput } from "./utils";

const day2 = await readInput("day2.txt");

const cubes: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

type Game = {
  id: number;

  sets: Record<string, number>[];
};

const gameR = /^Game ([0-9]+)$/;
const setR = /^([0-9]+) ([a-z]+)$/;

function isValid(game: Game): boolean {
  for (const set of game.sets) {
    for (const [color, n] of Object.entries(set)) {
      if (cubes[color] < n) return false;
    }
  }

  return true;
}

function getPower(game: Game): number {
  const acc: Record<string, number> = {};
  for (const set of game.sets) {
    for (const [color, n] of Object.entries(set)) {
      const cm = acc[color] ?? 0;
      if (n > cm) acc[color] = n;
    }
  }

  return Object.values(acc).reduce((acc, n) => acc * n, 1);
}

const games = day2
  .trim()
  .split("\n")
  .map((l): Game => {
    const [rawGame, rawSets] = l.trim().split(": ");

    const matches = rawGame.match(gameR);
    if (!matches) throw new Error(`invalid game entry ${rawGame}`);

    return {
      id: parseInt(matches[1]),

      sets: rawSets
        .trim()
        .split("; ")
        .map((rawSet) => {
          return rawSet
            .trim()
            .split(", ")
            .reduce((acc, set) => {
              const sm = set.match(setR);
              if (!sm) return acc;

              return { ...acc, [sm[2]]: parseInt(sm[1]) };
            }, {});
        }),
    };
  });

let p1Sum = 0;
let p2Sum = 0;
for (const game of games) {
  if (isValid(game)) p1Sum += game.id;
  p2Sum += getPower(game);
}

console.log(`part 1: ${p1Sum}`);
console.log(`part 2: ${p2Sum}`);
