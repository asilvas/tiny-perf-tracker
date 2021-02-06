import { writeFile } from "fs";

export function fileLogger(filePath, opts = {}) {
  function logger(data) {
    writeFile(filePath, JSON.stringify(data, null, 2)); // fire and forget
  }
  return { raw: true, logger, ...opts };
}
