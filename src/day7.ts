import day7 from "../inputs/day7.txt";
// const day7 = `
// 32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483
// `;

const cardOrderNoJoker = "AKQJT98765432";
const cardOrderJoker = "AKQT98765432J";

function getCardCounts(cards: string, joker = false): number[] {
  const counts = new Map<string, number>();
  for (const card of cards) {
    counts.set(card, (counts.get(card) ?? 0) + 1);
  }

  const jokerCount = counts.get("J") ?? 0;
  if (joker) counts.delete("J");

  const result = Array.from(counts.values()).sort().reverse();
  if (joker) result[0] = (result[0] ?? 0) + jokerCount;

  return result;
}

const cardRanks: ((c: number[]) => boolean)[] = [
  (c) => c.length === 1, // 5 of a kind
  (c) => c.length === 2 && c[0] === 4, // 4 of a kind
  (c) => c.length === 2 && c[0] === 3, // full house
  (c) => c.length === 3 && c[0] === 3, // 3 of a kind
  (c) => c.length === 3 && c[0] === 2, // 2 pair
  (c) => c.length === 4 && c[0] === 2, // pair
  (c) => c.length === 5, // high card
];

type Hand = { cards: string; bid: number };

function sortFn(joker = false): (a: Hand, b: Hand) => number {
  const cardOrder = joker ? cardOrderJoker : cardOrderNoJoker;

  return (a, b) => {
    const aCounts = getCardCounts(a.cards, joker);
    const bCounts = getCardCounts(b.cards, joker);

    const aRank = cardRanks.findIndex((fn) => fn(aCounts));
    const bRank = cardRanks.findIndex((fn) => fn(bCounts));

    if (aRank !== bRank) {
      // types are different, sort by rank
      return aRank - bRank;
    }

    // types are the same, sort by card value
    for (const [idx, card] of a.cards.split("").entries()) {
      const aCard = cardOrder.indexOf(card);
      const bCard = cardOrder.indexOf(b.cards[idx]);
      if (aCard !== bCard) {
        return aCard - bCard;
      }
    }

    return 0;
  };
}

const hands = day7
  .trim()
  .split("\n")
  .map((line): Hand => {
    const [cards, bid] = line.trim().split(" ");
    return { cards, bid: parseInt(bid, 10) };
  });

const part1Winnings = [...hands]
  .sort(sortFn(false))
  .reverse()
  .reduce((acc, hand, idx) => acc + hand.bid * (idx + 1), 0);

console.log("part 1:", part1Winnings);

const part2Winnings = [...hands]
  .sort(sortFn(true))
  .reverse()
  .reduce((acc, hand, idx) => acc + hand.bid * (idx + 1), 0);

console.log("part 2:", part2Winnings);
