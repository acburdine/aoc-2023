type Race = {
  time: number;
  distance: number;
};

/*
 * SAMPLE
 *
 * Time:      7  15   30
 * Distance:  9  40  200
 */
// const races: Race[] = [
//   { time: 7, distance: 9 },
//   { time: 15, distance: 40 },
//   { time: 30, distance: 200 },
// ];
// const race: Race = {
//   time: 71530,
//   distance: 940200,
// };

/*
 * My Input
 *
 * Time:        59     70     78     78
 * Distance:   430   1218   1213   1276
 */
const races: Race[] = [
  { time: 59, distance: 430 },
  { time: 70, distance: 1218 },
  { time: 78, distance: 1213 },
  { time: 78, distance: 1276 },
];
const race: Race = {
  time: 59707878,
  distance: 430121812131276,
};

function numWins(race: Race): number {
  // ignore 0 and race.time, since they're not going to result
  // in a win

  let result = 0;

  for (let i = 1; i < race.time; i++) {
    const distance = i * (race.time - i);
    if (distance > race.distance) result++;
  }

  return result;
}

const part1 = races.reduce((acc, race) => acc * numWins(race), 1);
console.log("part 1:", part1);
console.log("part 2:", numWins(race));
