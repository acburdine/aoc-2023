import { chunk } from "lodash";

import day5 from "../inputs/day5.txt";
// const day5 = `
// seeds: 79 14 55 13
//
// seed-to-soil map:
// 50 98 2
// 52 50 48
//
// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15
//
// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4
//
// water-to-light map:
// 88 18 7
// 18 25 70
//
// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13
//
// temperature-to-humidity map:
// 0 69 1
// 1 0 69
//
// humidity-to-location map:
// 60 56 37
// 56 93 4
// `;

const [seeds, ...ranges] = day5.trim().split("\n\n");
type Range = {
  srcStart: number;
  srcEnd: number;
  destStart: number;
  destEnd: number;
};

function getMappedValue(value: number, ranges: Range[]) {
  for (const range of ranges) {
    if (value >= range.srcStart && value < range.srcEnd) {
      return range.destStart + (value - range.srcStart);
    }
  }
  return value;
}

function getInverseMappedValue(value: number, ranges: Range[]) {
  for (const range of ranges) {
    if (value >= range.destStart && value < range.destEnd) {
      return range.srcStart + (value - range.destStart);
    }
  }
  return value;
}

const [
  seedToSoil,
  soilToFertilizer,
  fertilizerToWater,
  waterToLight,
  lightToTemperature,
  temperatureToHumidity,
  humidityToLocation,
] = ranges.map((range) => {
  const [_, ...lines] = range.trim().split("\n");

  return lines.map((line): Range => {
    const [destStart, srcStart, length] = line
      .trim()
      .split(" ")
      .map((x) => parseInt(x, 10));

    return {
      srcStart,
      srcEnd: srcStart + length,
      destStart,
      destEnd: destStart + length,
    };
  });
});

const seedNumbers = seeds
  .trim()
  .split(": ")[1]
  .split(" ")
  .map((x) => parseInt(x, 10));

const mappedSeeds = seedNumbers.map((seed) => {
  let value = seed;
  value = getMappedValue(value, seedToSoil);
  value = getMappedValue(value, soilToFertilizer);
  value = getMappedValue(value, fertilizerToWater);
  value = getMappedValue(value, waterToLight);
  value = getMappedValue(value, lightToTemperature);
  value = getMappedValue(value, temperatureToHumidity);
  value = getMappedValue(value, humidityToLocation);
  return value;
});

console.log(`part 1: ${Math.min(...mappedSeeds)}`);

const seedPairs = chunk(seedNumbers, 2);

function inSeedRange(value: number): boolean {
  return seedPairs.some(([start, length]) => {
    return value >= start && value < start + length;
  });
}

function checkSeed(value: number): boolean {
  let seed = value;
  seed = getInverseMappedValue(seed, humidityToLocation);
  seed = getInverseMappedValue(seed, temperatureToHumidity);
  seed = getInverseMappedValue(seed, lightToTemperature);
  seed = getInverseMappedValue(seed, waterToLight);
  seed = getInverseMappedValue(seed, fertilizerToWater);
  seed = getInverseMappedValue(seed, soilToFertilizer);
  seed = getInverseMappedValue(seed, seedToSoil);

  return inSeedRange(seed);
}

let p2Result = 0;
while (!checkSeed(p2Result)) {
  p2Result++;
}

console.log(`part 2: ${p2Result}`);
