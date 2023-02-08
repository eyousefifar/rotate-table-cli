import { parse, transform } from "csv"; // TODO: inject this
import { rotateTable } from "../../usecases";
import type { controllerTypes } from "../../types";

export function buildReadCsv(args: controllerTypes.IBuildReadCsv) {
  const { fileExists, createReadStream } = args;
  //   function transform() {

  //   }
  return async function readCsv(filePath: string) {
    const exists = await fileExists(filePath);
    if (!exists) {
      // replace with fast logger interface
      return process.stderr.write("File does not exist\n");
    }
    const transformed = createReadStream(filePath)
      .pipe(
        parse({
          delimiter: ",",
          columns: [{ name: "id" }, { name: "json" }],
          fromLine: 2,
        })
      )
      .pipe(
        transform((row) => {
          return {
            id: Number(row.id),
            array: JSON.parse(row.json),
          };
        })
      );
    process.stdout.write("id,json,is_valid\n");
    for await (const row of transformed) {
      const result = rotateTable(row.id, row.array);
      process.stdout.write(result + "\n");
    }
  };
}
