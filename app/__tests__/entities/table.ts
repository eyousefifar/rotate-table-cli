import { buildMakeTable } from "../../entities/table";

describe("table entity", () => {
  it("should rotate odd ( 1 ) square tables", () => {
    const makeTable = buildMakeTable();
    const table = [1];
    const madeTable = makeTable(table);
    expect(madeTable.error).toBeUndefined();
    expect(madeTable.get.shiftedTable()).toEqual([1]);
  });
  it("should rotate even ( 4 ) square tables", () => {
    const makeTable = buildMakeTable();
    const table = [40, 20, 90, 10];
    const madeTable = makeTable(table);
    expect(madeTable.error).toBeUndefined();

    expect(madeTable.get.shiftedTable()).toEqual([90, 40, 10, 20]);
  });
  it("should rotate even ( 16 ) square tables", () => {
    const makeTable = buildMakeTable();
    const table = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const madeTable = makeTable(table);
    expect(madeTable.error).toBeUndefined();

    expect(madeTable.get.shiftedTable()).toEqual([
      5, 1, 2, 3, 9, 10, 6, 4, 13, 11, 7, 8, 14, 15, 16, 12,
    ]);
  });
  it("should rotate odd  ( 9 ) square tables", () => {
    const makeTable = buildMakeTable();
    const table = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const madeTable = makeTable(table);
    expect(madeTable.error).toBeUndefined();
    expect(madeTable.get.shiftedTable()).toEqual([4, 1, 2, 7, 5, 3, 8, 9, 6]);
  });
  it("should return error if table is not a perfect square", () => {
    const makeTable = buildMakeTable();
    const table1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const table2 = [1, 2, 3];
    const madeTable1 = makeTable(table1);
    const madeTable2 = makeTable(table2);
    expect(madeTable1.error).toEqual("Table is not a perfect square");
    expect(madeTable2.error).toEqual("Table is not a perfect square");
  });
});
