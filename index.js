"use strict";
function assert(arg0) {
    if (!arg0) {
        throw new Error("test failed!");
    }
}
function assertEq(arg0, arg1) {
    if (arg0 !== arg1) {
        throw new Error(`expected ${arg0} to equal ${arg1}`);
    }
}
const makeGraph = (semanticsMap) => {
    return {
        cells: {},
    };
};
let id = 0;
const makeCell = (graph, value, relationships) => {
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
const compute = (cell) => {
    if (cell.formula === undefined) {
        return cell.value;
    }
    else {
        // todo actually compute cell value
        cell.value = "fake result";
    }
};
const excelLeft = Symbol("left");
const excelRight = Symbol("right");
const excelDown = Symbol("down");
const excelUp = Symbol("up");
const excel = {
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
            }
            else {
                throw new Error("only handle a trivial case so far");
            }
        },
    },
};
const evalGraph = (graph) => {
    for (const [id, cell] of Object.entries(graph.cells)) {
        compute(cell);
    }
};
const graph = makeGraph({ excel });
const cell1 = makeCell(graph, 1);
const cell2 = makeCell(graph, (cell) => excel.lookups.relative(cell, { left: 1 }));
evalGraph(graph);
assertEq(cell2.value, "fake result");
console.log("all tests passed!");
