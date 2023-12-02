import { join } from "node:path";

const file = Bun.fileURLToPath(new URL(import.meta.url));
const inputDir = join(file, "../../inputs");

export async function readInput(file: string): Promise<string> {
  return await Bun.file(join(inputDir, file)).text();
}
