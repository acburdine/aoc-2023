import day4 from "../inputs/day4.txt";
// const day4 = `
// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
// `;

type Card = {
  card: string;
  left: number[];
  right: Set<number>;

  points?: number;
};

const cards: Card[] = day4
  .trim()
  .split("\n")
  .map((line) => {
    const [card, numbers] = line.split(": ");
    const [left, right] = numbers.split(" | ");

    return {
      card,
      left: left
        .split(" ")
        .map((n) => parseInt(n.trim(), 10))
        .filter(Boolean),
      right: new Set(
        right
          .split(" ")
          .map((n) => parseInt(n.trim(), 10))
          .filter(Boolean)
      ),
    };
  });

const p1Sum = cards.reduce((sum, card) => {
  const mult = card.left.reduce(
    (acc, n) => (card.right.has(n) ? acc + 1 : acc),
    0
  );

  card.points = mult;

  return mult === 0 ? sum : sum + Math.pow(2, mult - 1);
}, 0);

console.log(`part 1: ${p1Sum}`);

const p2Map = new Map<Card, number>(cards.map((card) => [card, 1]));
for (const [idx, card] of cards.entries()) {
  if (!card.points || !p2Map.has(card)) continue;

  const curVal = p2Map.get(card)!;
  for (const won of cards.slice(idx + 1, idx + 1 + card.points)) {
    p2Map.set(won, p2Map.get(won)! + curVal);
  }
}

const p2Sum = Array.from(p2Map.values()).reduce((acc, n) => acc + n, 0);
console.log(`part 2: ${p2Sum}`);
