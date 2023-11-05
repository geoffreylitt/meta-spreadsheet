import { CoordinateSystem } from "./engine";

const excelLeft = Symbol("left");
const excelRight = Symbol("right");
const excelDown = Symbol("down");
const excelUp = Symbol("up");
const relationships = {
  left: excelLeft,
  right: excelRight,
  down: excelDown,
  up: excelUp,
};
export const excel: CoordinateSystem = {
  relationships,
  lookups: {
    relative: (cell, name: string) => {
      const ops = name.split(",");
      // todo: use a proper parser here

      let current = cell;

      for (const op of ops) {
        const dir = op.split(" ")[0] as "left" | "right" | "up" | "down";
        const count = parseInt(op.split(" ")[1]);
        if (!["left", "right", "up", "down"].includes(dir)) {
          throw new Error(`invalid direction ${dir}`);
        }
        if (Number.isNaN(count)) {
          throw new Error(`invalid count: ${count}`);
        }

        for (let i = 0; i < count; i++) {
          const nextCurrent = current.relationships[relationships[dir]];
          if (nextCurrent === undefined) {
            throw new Error(
              `Expected cell ${current.id} to have a cell in the ${dir} direction`
            );
          }
          current = nextCurrent;
        }
      }

      return current.value;
    },
  },
};
