import { CoordinateSystem } from "./engine";

const excelLeft = Symbol("left");
const excelRight = Symbol("right");
const excelDown = Symbol("down");
const excelUp = Symbol("up");
export const excel: CoordinateSystem = {
  relationships: {
    left: excelLeft,
    right: excelRight,
    down: excelDown,
    up: excelUp,
  },
  lookups: {
    relative: (cell, name) => {
      if (name["L"] === 1) {
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
