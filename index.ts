import { Cell, evalGraph, makeCell, makeGraph } from "./engine";
import { excel } from "./excel";
import { assertEq } from "./tinyTestFramework";

const graph = makeGraph({ excel });

const cell1: Cell = makeCell({ graph, value: 1 });
const cell2: Cell = makeCell({
  graph,
  value: (cell: Cell) => {
    return (
      excel.lookups.relative(cell, {
        [excel.relationships.left]: 1,
      }) + 1
    );
  },
  relationships: {
    [excel.relationships.left]: cell1,
  },
});
const cell3: Cell = makeCell({
  graph,
  value: (cell: Cell) => {
    return (
      excel.lookups.relative(cell, {
        [excel.relationships.left]: 1,
      }) + 1
    );
  },
  relationships: {
    [excel.relationships.left]: cell2,
  },
});

evalGraph(graph);

assertEq(cell2.value, 2);

console.log("all tests passed!");
