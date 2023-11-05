import { Cell, CoordinateSystem, Value } from "./engine";

const embarkParent = Symbol("parent");
const embarkChild = Symbol("child");
export const embark = {
  relationships: {
    parent: embarkParent,
    child: embarkChild,
  },
  lookups: {
    // For now this is a very simple recursive parent matcher
    // TODO: make this actually match Embark's lookup behavior
    relativeRef: (cell: Cell, name: string): Value => {
      let current = cell;
      const visited = [cell];
      while (current !== undefined) {
        const parent = current.relationships[embarkParent];
        if (visited.includes(parent)) {
          throw new Error("cycle detected!");
        }
        if (parent.name === name) {
          return parent.value;
        }
        current = parent;
      }
      throw new Error(`Couldn't resolve name ${name} from cell ${cell.id}`);
    },
  },
};
