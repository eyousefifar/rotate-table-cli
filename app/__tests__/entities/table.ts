import { buildMakeTable } from "../../entities/table";

describe("table entity", () => {
  const makeTable = buildMakeTable();
  it("should rotate odd ( 1 ) square tables", () => {
    const table = [1];
    const madeTable = makeTable(table);
    expect(madeTable.error).toBeUndefined();
    expect(madeTable.get.shiftedTable()).toEqual([1]);
  });
  it("should rotate even ( 4 ) square tables", () => {
    const table = [
      [40, 20],
      [90, 10],
    ];
    const rotatedTable = [
      [90, 40],
      [10, 20],
    ];
    const madeTable = makeTable(table.flat());
    expect(madeTable.error).toBeUndefined();

    expect(madeTable.get.shiftedTable()).toEqual(rotatedTable.flat());
  });
  it("should rotate even ( 16 ) square tables", () => {
    const table = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
    ];
    const rotatedTable = [
      [4, 0, 1, 2],
      [8, 9, 5, 3],
      [12, 10, 6, 7],
      [13, 14, 15, 11],
    ];
    const madeTable = makeTable(table.flat());
    expect(madeTable.error).toBeUndefined();

    expect(madeTable.get.shiftedTable()).toEqual(rotatedTable.flat());
  });
  it("should rotate odd  ( 9 ) square tables", () => {
    const table = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const rotatedTable = [
      [4, 1, 2],
      [7, 5, 3],
      [8, 9, 6],
    ];
    const madeTable = makeTable(table.flat());
    expect(madeTable.error).toBeUndefined();
    expect(madeTable.get.shiftedTable()).toEqual(rotatedTable.flat());
  });
  it("should rotate odd  ( 25 ) square tables", () => {
    const table = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25],
    ];
    const rotatedTable = [
      [6, 1, 2, 3, 4],
      [11, 12, 7, 8, 5],
      [16, 17, 13, 9, 10],
      [21, 18, 19, 14, 15],
      [22, 23, 24, 25, 20],
    ];
    const madeTable = makeTable(table.flat());
    expect(madeTable.error).toBeUndefined();
    expect(madeTable.get.shiftedTable()).toEqual(rotatedTable.flat());
  });

  it("should return error if table is not a perfect square", () => {
    const table1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const table2 = [1, 2, 3];
    const madeTable1 = makeTable(table1);
    const madeTable2 = makeTable(table2);
    expect(madeTable1.error).toEqual("Table is not a perfect square");
    expect(madeTable2.error).toEqual("Table is not a perfect square");
  });
});
