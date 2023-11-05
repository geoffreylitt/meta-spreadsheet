"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("./engine");
const excel_1 = require("./excel");
const tinyTestFramework_1 = require("./tinyTestFramework");
const graph = (0, engine_1.makeGraph)({ excel: excel_1.excel });
const cell1 = (0, engine_1.makeCell)({ graph, value: 1 });
const cell2 = (0, engine_1.makeCell)({
    graph,
    value: (cell) => {
        return (excel_1.excel.lookups.relative(cell, {
            [excel_1.excel.relationships.left]: 1,
        }) + 1);
    },
    relationships: {
        [excel_1.excel.relationships.left]: cell1,
    },
});
const cell3 = (0, engine_1.makeCell)({
    graph,
    value: (cell) => {
        return (excel_1.excel.lookups.relative(cell, {
            [excel_1.excel.relationships.left]: 1,
        }) + 1);
    },
    relationships: {
        [excel_1.excel.relationships.left]: cell2,
    },
});
(0, engine_1.evalGraph)(graph);
(0, tinyTestFramework_1.assertEq)(cell2.value, 2);
console.log("all tests passed!");
