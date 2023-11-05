import { Cell, CoordinateSystem } from "./engine";

export const embark = {
  relationships: {
    parent: Symbol("parent"),
    child: Symbol("child"),
  },
  lookups: {
    relativeRef: (cell: Cell, name: string): any => {
      return "hey";
    },
  },
};
