import { exists } from "fs-extra";

export function buildFileExists() {
  return async function fileExists(path: string) {
    try {
      return await exists(path);
    } catch (error) {
      return false;
    }
  };
}
