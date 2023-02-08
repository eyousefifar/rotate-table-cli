export function buildMakeTable() {
  return function makeTable(table: number[]) {
    const tableLength = table.length;
    const squareDimensionLen = Math.sqrt(table.length);
    if (!Number.isInteger(squareDimensionLen)) {
      const madeTable = {
        get: {
          table: () => table,
          shiftedTable: () => [],
        },
        object: () => ({
          table,
          shiftedTable: [],
        }),
        error: "Table is not a perfect square",
      };
      return madeTable;
    }
    const rotatedTable: number[] = Array.from(table);

    const centerIndex = Math.floor(squareDimensionLen / 2); // number of steps to shift the table
    for (let startIndex = 0; startIndex < centerIndex; startIndex++) {
      for (let index = 0; index < tableLength; index++) {
        const i = Math.floor(index / squareDimensionLen); // row
        const j = index % squareDimensionLen; // column
        if (
          i === startIndex && // top row
          j >= startIndex && // first column of top row
          j < squareDimensionLen - startIndex // last column of top row
        ) {
          if (j !== squareDimensionLen - 1 - startIndex) {
            // if not last column of top row
            rotatedTable[i * squareDimensionLen + j + 1] = table[index]; // shift to the right
            continue;
          }
          // if last column of top row, shift to the bottom
          rotatedTable[(i + 1) * squareDimensionLen + j] = table[index];
          continue;
        }

        if (
          j === squareDimensionLen - 1 - startIndex && // last column
          i > startIndex && // not the top row
          i < squareDimensionLen - startIndex // in boundary
        ) {
          if (i !== squareDimensionLen - 1 - startIndex) {
            // if not last row
            rotatedTable[(i + 1) * squareDimensionLen + j] = table[index]; // shift the right edge down
            continue;
          }
          // if the last row of the table
          rotatedTable[i * squareDimensionLen + j - 1] = table[index];
          continue;
        }

        if (
          i === squareDimensionLen - 1 - startIndex && // last row
          j >= startIndex &&
          j < squareDimensionLen - startIndex // in boundary
        ) {
          if (j !== startIndex) {
            rotatedTable[i * squareDimensionLen + j - 1] = table[index]; // shift the bottom edge left
            continue;
          }
          rotatedTable[(i - 1) * squareDimensionLen + j] = table[index]; // shift the left edge up
          continue;
        }

        if (
          j == startIndex && // first column
          i >= startIndex &&
          i < squareDimensionLen - startIndex // in boundary
        ) {
          rotatedTable[(i - 1) * squareDimensionLen + j] = table[index];
        }
      }
    }
    const madeTable = {
      get: {
        table: () => table,
        shiftedTable: () => rotatedTable.flat(),
      },
      object: () => ({
        table,
        shiftedTable: rotatedTable.flat(),
      }),
      error: undefined,
    };
    return madeTable;
  };
}
