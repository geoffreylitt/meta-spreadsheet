// todo: constrain this more? how dynamic are our value types
export type Value = any;

export interface CoordinateSystem {
  relationships: { [key: string]: symbol };
  lookups: { [key: string]: (cell: Cell, name: any) => Value };
}

export interface Graph {
  cells: { [key: string]: Cell };
}

export type Formula = (cell: Cell) => any;
export interface Cell {
  id: number;
  value: Value;
  formula?: Formula;
  relationships: { [key: symbol]: Cell };
}

// create a new computation graph
export const makeGraph = (semanticsMap: {
  [key: string]: CoordinateSystem;
}): Graph => {
  return {
    cells: {},
  };
};

let id = 0;

// create a new cell in the computation graph
export const makeCell = ({
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

export const getCell = (graph: Graph, id: string) => graph.cells[id];

// compute the value of a single cell
export const compute = (cell: Cell): any => {
  if (cell.formula === undefined) {
    return cell.value;
  } else {
    cell.value = cell.formula(cell);
  }
};

// eagerly compute values for all cells in the sheet
export const evalGraph = (graph: Graph): void => {
  for (const [id, cell] of Object.entries(graph.cells)) {
    compute(cell);
  }
};
