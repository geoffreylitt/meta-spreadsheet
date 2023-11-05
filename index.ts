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

// todo: constrain this more? how dynamic are our value types
type Value = any;

interface Semantics {
  relationships: { [key: string]: symbol };
  lookups: { [key: string]: (cell: Cell, name: any) => Value };
}

interface Graph {
  cells: { [key: string]: Cell };
}

type Formula = (cell: Cell) => any;
interface Cell {
  id: number;
  value: Value;
  formula?: Formula;
  relationships: { [key: symbol]: Cell };
}

const makeGraph = (semanticsMap: { [key: string]: Semantics }): Graph => {
  return {
    cells: {},
  };
};

let id = 0;

const makeCell = ({
  graph,
  value,
  relationships,
}: {
  graph: Graph;
  value: any;
  relationships?: { [key: string]: Cell };
}): Cell => {
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
    cell.value = cell.formula(cell);
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
      if (name[excelLeft] === 1) {
        const target = cell.relationships[excelLeft];
        if (target === undefined) {
          throw new Error(
            `Expected cell ${cell.id} to have a cell to its left`
          );
        }
        return target.value;
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

const cell1: Cell = makeCell({ graph, value: 1 });
const cell2: Cell = makeCell({
  graph,
  value: (cell: Cell) => {
    const leftValue = excel.lookups.relative(cell, {
      [excel.relationships.left]: 1,
    });
    return leftValue + 1;
  },
  relationships: {
    [excel.relationships.left]: cell1,
  },
});

evalGraph(graph);

assertEq(cell2.value, 2);

console.log("all tests passed!");
