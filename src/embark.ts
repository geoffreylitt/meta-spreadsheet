import { Cell, CoordinateSystem, Value } from "./engine";

const embarkParent = Symbol("parent");
const embarkChild = Symbol("child");
export const embark = {
  relationships: {
    parent: embarkParent,

    // NOTE: we only support one child currently;
    // i haven't figured out the best way to model array of ordered children.
    // is there a single "children" link type which points to a list of cells..?
    child: embarkChild,
  },
  lookups: {
    // For now this is a very simple recursive parent matcher
    // TODO: make this actually match Embark's lookup behavior
    relativeRef: (cell: Cell, name: string): Value => {
      let current = cell;
      const visited = [cell];
      while (current !== undefined) {
        const child = current.relationships[embarkChild];
        if (child && child.name === name) {
          return child;
        }

        const parent = current.relationships[embarkParent];
        if (visited.includes(parent)) {
          throw new Error("cycle detected!");
        }
        if (parent.name === name) {
          return parent;
        }
        current = parent;
      }
      throw new Error(`Couldn't resolve name ${name} from cell ${cell.id}`);
    },
  },
};
