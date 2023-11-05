import { embark } from "../src/embark";
import { Cell, evalGraph, makeCell, makeGraph } from "../src/engine";
import { assertEq } from "./tinyTestFramework";

export const testEmbark = () => {
  const graph = makeGraph({ embark });

  /**
   test case:
   - weather: { min: 50, max: 75 }
     - unnamed intermediate node with text value
       - {weather.max - weather.min}
  **/

  const cell1: Cell = makeCell({
    graph,
    value: { min: 50, max: 75 },
    name: "weather",
  });
  const cell2: Cell = makeCell({
    graph,
    value: "intermediate",
    relationships: {
      [embark.relationships.parent]: cell1,
    },
  });
  const cell3: Cell = makeCell({
    graph,
    value: (cell: Cell) => {
      const weather = embark.lookups.relativeRef(cell, "weather");
      return weather.max - weather.min;
    },
    relationships: {
      [embark.relationships.parent]: cell2,
    },
  });

  evalGraph(graph);
  assertEq(cell3.value, 25);
};
