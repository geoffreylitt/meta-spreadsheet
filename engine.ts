// todo: constrain this more? how dynamic are our value types
export type Value = any;

export interface Semantics {
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

export const makeGraph = (semanticsMap: {
  [key: string]: Semantics;
}): Graph => {
  return {
    cells: {},
  };
};

let id = 0;

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

export const compute = (cell: Cell): any => {
  if (cell.formula === undefined) {
    return cell.value;
  } else {
    // todo actually compute cell value
    cell.value = cell.formula(cell);
  }
};

export const evalGraph = (graph: Graph): void => {
  for (const [id, cell] of Object.entries(graph.cells)) {
    compute(cell);
  }
};
