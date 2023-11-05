import { Cell, evalGraph, makeCell, makeGraph } from "../src/engine";
import { excel } from "../src/excel";
import { assertEq } from "./tinyTestFramework";

export const testExcel = () => {
  const graph = makeGraph({ excel });

  /**
   test case:

   --+------+------
   1 | L1+1 | L1+1
   --+------+------
  **/

  const cell1: Cell = makeCell({ graph, value: 1 });
  const cell2: Cell = makeCell({
    graph,
    value: (cell: Cell) => {
      return excel.lookups.relative(cell, "left 1") + 1;
    },
    relationships: {
      [excel.relationships.left]: cell1,
    },
  });
  const cell3: Cell = makeCell({
    graph,
    value: (cell: Cell) => {
      return excel.lookups.relative(cell, "left 1") + 1;
    },
    relationships: {
      [excel.relationships.left]: cell2,
    },
  });

  // Basic math works with L1 relationships

  evalGraph(graph);
  assertEq(cell2.value, 2);
  assertEq(cell3.value, 3);

  // Updating the graph works

  cell1.value = 5;
  evalGraph(graph);
  assertEq(cell2.value, 6);
  assertEq(cell3.value, 7);

  // Now try a more complicated relationship: L2U1

  /**
   test case:
   ------+------------+------------+-----------------
   C4: 5 |            |
   ------+------------+------------+-----------------
   C1: 5 | C2: L1+1=2 | C3: L1+1=3 | C5: L3U1 + 2 = 7
   ------+------------+------------+-----------------
  **/

  const cell4: Cell = makeCell({
    graph,
    value: 5,
    relationships: {},
  });

  cell1.relationships[excel.relationships.up] = cell4;

  const cell5: Cell = makeCell({
    graph,
    value: (cell: Cell) => {
      return excel.lookups.relative(cell, "left 3,up 1") + 2;
    },
    relationships: {
      [excel.relationships.left]: cell3,
    },
  });

  evalGraph(graph);
  assertEq(cell5.value, 7);
};
