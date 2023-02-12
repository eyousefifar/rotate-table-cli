export function buildMakeTable() {
  return function makeTable(table: number[]) {
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
    let rightColumnTemp: number | undefined = undefined;
    let firstRowTemp: number | undefined = undefined;
    const centerIndex = Math.floor(squareDimensionLen / 2); // number of steps to shift the table
    for (let startIndex = 0; startIndex < centerIndex; startIndex++) {
      const boundary =
        squareDimensionLen - 2 * startIndex === squareDimensionLen
          ? squareDimensionLen - 1
          : squareDimensionLen - 2 * startIndex;
      const traverse = {
        start: startIndex * squareDimensionLen + startIndex,
        end:
          squareDimensionLen * squareDimensionLen -
          1 -
          squareDimensionLen * startIndex -
          startIndex,
      };
      // const nextTraverse = {
      //   start: (startIndex + 1) * squareDimensionLen + startIndex + 1,
      //   end:
      //     squareDimensionLen * squareDimensionLen -
      //     1 -
      //     squareDimensionLen * (startIndex + 1) -
      //     (startIndex + 1),
      // };
      rightColumnTemp = undefined;
      firstRowTemp = undefined;
      for (let index = traverse.start; index <= traverse.end; index++) {
        // if (index >= nextTraverse.start && index <= nextTraverse.end) {
        //   continue;
        // }
        const i = Math.floor(index / squareDimensionLen); // row
        const j = index % squareDimensionLen; // column
        if (i > boundary || i < startIndex) {
          // console.log("i not in boundary", i, boundary);

          continue;
        }
        if (j > boundary || j < startIndex) {
          // console.log("j not in boundary", j, boundary);
          continue;
        }
        // odd and center
        if (
          squareDimensionLen % 2 !== 0 &&
          i === centerIndex &&
          j === centerIndex
        ) {
          // console.log("center", i, j);

          continue;
        }
        // if (i === boundary - 1 && j === boundary) {
        //   rightColumnTemp = table[index + squareDimensionLen];
        // }
        // first row
        if (i === startIndex) {
          // last member of first row
          if (j === boundary) {
            continue;
          }
          if (j === startIndex) {
            firstRowTemp = table[index + 1];
            table[index + 1] = table[index];
            continue;
          }
          if (!firstRowTemp) continue;
          const save = table[index + 1];
          table[index + 1] = firstRowTemp;
          firstRowTemp = save;
        }
        // first column
        if (j === startIndex) {
          if (i === startIndex) {
            continue;
          }
          table[index - squareDimensionLen] = table[index];
        }
        // last column
        if (j === boundary) {
          // if (i === boundary - 1) {
          //   rightColumnTemp = table[index + squareDimensionLen];
          // }

          if (i === startIndex + 1 && firstRowTemp) {
            if (boundary > 1 && i !== boundary) {
              rightColumnTemp = table[index + squareDimensionLen];
              table[index + squareDimensionLen] = table[index];
            }

            table[index] = firstRowTemp;
          } else if (!(i === startIndex || i === boundary) && rightColumnTemp) {
            const save = table[index + squareDimensionLen];
            table[index + squareDimensionLen] = rightColumnTemp;
            rightColumnTemp = save;
          }

          // if (i === startIndex || i === boundary) {
          //   continue;
          // }
        }

        // last row
        if (i === boundary) {
          if (j === boundary) {
            continue;
          }
          if (j === boundary - 1 && rightColumnTemp) {
            table[index] = rightColumnTemp;
            continue;
          }
          table[index] = table[index + 1];
        }
      }
    }
    const madeTable = {
      get: {
        table: () => table,
        shiftedTable: () => table,
      },
      object: () => ({
        table,
        shiftedTable: table,
      }),
      error: undefined,
    };
    return madeTable;
  };
}
