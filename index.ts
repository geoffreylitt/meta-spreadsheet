function assert(arg0: any) {
  if (!arg0) {
    throw new Error("test failed!");
  }
}

function assertEq(arg0: any, arg1: any) {
  if (arg0 !== arg1) {
    throw new Error(`expected ${arg0} to equal ${arg1}`);
  }
}

interface Semantics {
  relationships: { [key: string]: symbol };
  lookups: { [key: string]: (cell: Cell, name: any) => Cell | undefined };
}

interface Graph {
  cells: { [key: string]: Cell };
}

type Formula = (cell: Cell) => any;
interface Cell {
  id: number;
  value: any;
  formula?: Formula;
  relationships: { [key: symbol]: Cell };
}

const makeGraph = (semanticsMap: { [key: string]: Semantics }): Graph => {
  return {
    cells: {},
  };
};

let id = 0;

const makeCell = (
  graph: Graph,
  value: any,
  relationships?: { [key: string]: Cell }
): Cell => {
  let cell;
  if (value instanceof Function) {
    cell = {
      id: ++id,
      value: undefined,
      formula: value,
      relationships: relationships ?? {},
    };
  } else {
    cell = { id: ++id, value, relationships: relationships ?? {} };
  }

  graph.cells[id] = cell;
  return cell;
};

const compute = (cell: Cell): any => {
  if (cell.formula === undefined) {
    return cell.value;
  } else {
    // todo actually compute cell value
    cell.value = "fake result";
  }
};

const excelLeft = Symbol("left");
const excelRight = Symbol("right");
const excelDown = Symbol("down");
const excelUp = Symbol("up");
const excel: Semantics = {
  relationships: {
    left: excelLeft,
    right: excelRight,
    down: excelDown,
    up: excelUp,
  },
  lookups: {
    relative: (cell, name) => {
      if (name.left === 1) {
        return cell.relationships[excelLeft];
      } else {
        throw new Error("only handle a trivial case so far");
      }
    },
  },
};

const evalGraph = (graph: Graph): void => {
  for (const [id, cell] of Object.entries(graph.cells)) {
    compute(cell);
  }
};

const graph = makeGraph({ excel });

const cell1: Cell = makeCell(graph, 1);
const cell2: Cell = makeCell(graph, (cell: Cell) =>
  excel.lookups.relative(cell, { left: 1 })
);

evalGraph(graph);

assertEq(cell2.value, "fake result");

console.log("all tests passed!");
