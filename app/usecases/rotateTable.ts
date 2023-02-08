import { makeTable } from "../entities";

export function buildRotateTable() {
  return function rotateTable(id: string, table: number[]) {
    const madeTable = makeTable(table);
    if (madeTable.error) {
      return `${id},[],false`;
    }
    // JSON stringify can be faster
    return `${id},${JSON.stringify(madeTable.get.shiftedTable())},true`;
  };
}
