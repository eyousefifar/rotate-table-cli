import { commands } from "../controllers";
export async function cli() {
  const filePath = process.argv[2]; // only supports the first argument
  await commands.readCsv(filePath);
}
