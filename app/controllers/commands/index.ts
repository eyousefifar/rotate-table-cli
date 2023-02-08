import { createReadStream } from "fs-extra";
import { utils } from "../../adapters";
import { buildReadCsv } from "./readCsv";

export const readCsv = buildReadCsv({
  createReadStream,
  fileExists: utils.fileExists,
});
