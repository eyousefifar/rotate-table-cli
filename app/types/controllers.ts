import type { ReadStream } from "fs-extra";

export interface IBuildReadCsv {
  fileExists: (filePath: string) => Promise<boolean>;
  createReadStream: (filePath: string) => ReadStream;
}
