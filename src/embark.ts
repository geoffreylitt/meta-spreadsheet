import { CoordinateSystem } from "./engine";

export const embark: CoordinateSystem = {
  relationships: {
    parent: Symbol("parent"),
    child: Symbol("child"),
  },
  lookups: {
    relativeRef: (cell, name: string) => {
      throw new Error("haven't implemented Embark lookup yet");
    },
  },
};
