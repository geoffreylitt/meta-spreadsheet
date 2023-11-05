import { embark } from "../src/coordinateSystems/embark";
import { Cell, evalGraph, makeCell, makeGraph } from "../src/engine";
import { assertEq } from "./tinyTestFramework";

export const testEmbark = () => {
  const graph = makeGraph({ embark });

  /**
   - weather: { min: 50, max: 75 }
     - unnamed intermediate node with text value
       - {weather.max - weather.min} = 25
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
    formula: (cell, get) => {
      const weather = get(embark.lookups.relativeRef(cell, "weather"));
      return weather.max - weather.min;
    },
    relationships: {
      [embark.relationships.parent]: cell2,
    },
  });

  evalGraph(graph);
  assertEq(cell3.value, 25);

  /**
   Look one level down before looking up

   - weather: { min: 50, max: 75 }
     - unnamed intermediate node with text value
       - {weather.max - weather.min} = 1
          - weather: { min: 1, max: 2 }
  **/

  const cell4: Cell = makeCell({
    graph,
    name: "weather",
    value: { min: 1, max: 2 },
    relationships: {
      [embark.relationships.parent]: cell3,
    },
  });
  cell3.relationships[embark.relationships.child] = cell4;

  evalGraph(graph);
  assertEq(cell3.value, 1);
};
