"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalGraph = exports.compute = exports.makeCell = exports.makeGraph = void 0;
const makeGraph = (semanticsMap) => {
    return {
        cells: {},
    };
};
exports.makeGraph = makeGraph;
let id = 0;
const makeCell = ({ graph, value, relationships, }) => {
    let cell;
    if (value instanceof Function) {
        cell = {
            id: ++id,
            value: undefined,
            formula: value,
            relationships: relationships ?? {},
        };
    }
    else {
        cell = { id: ++id, value, relationships: relationships ?? {} };
    }
    graph.cells[id] = cell;
    return cell;
};
exports.makeCell = makeCell;
const compute = (cell) => {
    if (cell.formula === undefined) {
        return cell.value;
    }
    else {
        // todo actually compute cell value
        cell.value = cell.formula(cell);
    }
};
exports.compute = compute;
const evalGraph = (graph) => {
    for (const [id, cell] of Object.entries(graph.cells)) {
        (0, exports.compute)(cell);
    }
};
exports.evalGraph = evalGraph;
