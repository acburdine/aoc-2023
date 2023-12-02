import { readInput } from "./utils";

const nums: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const day1 = await readInput("day1.txt");

const lines = day1
  .trim()
  .split("\n")
  .map((l) => l.trim());

const isNum = (c: string) => !isNaN(parseInt(c, 10));

let p1Sum = 0;
let p2Sum = 0;
for (const line of lines) {
  const chars = line.split("");

  const firstChar = chars.findIndex(isNum);
  const lastChar = chars.findLastIndex(isNum);

  p1Sum += parseInt(`${chars[firstChar]}${chars[lastChar]}`);

  let minIdx = line.length;
  let minNum = "";
  let maxIdx = -1;
  let maxNum = "";

  for (const ns of Object.keys(nums)) {
    const nsMinIdx = line.indexOf(ns);
    const nsMaxIdx = line.lastIndexOf(ns);

    if (nsMinIdx >= 0 && nsMinIdx < minIdx) {
      minNum = ns;
      minIdx = nsMinIdx;
    }

    if (nsMaxIdx >= 0 && nsMaxIdx > maxIdx) {
      maxNum = ns;
      maxIdx = nsMaxIdx;
    }
  }

  const d1 =
    firstChar >= 0 && firstChar < minIdx ? chars[firstChar] : nums[minNum];
  const d2 = lastChar > maxIdx ? chars[lastChar] : nums[maxNum];

  p2Sum += parseInt(`${d1}${d2}`);
}

console.log(`part 1: ${p1Sum}`);
console.log(`part 2: ${p2Sum}`);
