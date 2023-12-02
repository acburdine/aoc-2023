import { dirname, basename } from "node:path";
import { readdir } from "node:fs/promises";
import select from "@inquirer/select";

const file = Bun.fileURLToPath(new URL(import.meta.url));
const dir = dirname(file);

const dayFiles = (await readdir(dir)).filter((f) => /^day[0-9]+\.ts$/.test(f));

const choice = await select({
  message: "Day to run",
  choices: dayFiles.map((f) => ({ name: basename(f, ".ts"), value: f })),
});

await import(`./${choice}`);
