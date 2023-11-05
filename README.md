# meta-spreadsheet

A tiny spreadsheet engine with pluggable coordinate systems.

Credit: heavily inspired by ideas from Alex Warth, Avi Bryant, Paul Sonnentag and others.

## play

```
tsc && node dist/index.js
```

## pluggable coordinate systems

A computation graph can have one or more **coordinate systems**. A coordinate system defines:

- The types of relationships that cells can have with one another
- A set of lookup operations which can find relative cell

Currently this demo shows two coordinate systems:

- **excel:**
  - relationships:
    - left
    - right
    - up
    - down
  - lookups:
    - relative cell position: eg, "left 2, up 1"
- **embark:**
  - relationships: parent/child
  - lookups:
    - variable lookup: recursively up the parent tree

## design

- multiple coordinate systems can be active within a single compute graph; this gestures towards interop.
- lookup operations can only use the relationships defined within that coordinate system; this keeps coordinate systems cleanly separated
- lookup operations return cells, not values. this is very important! because that's the only way that spreadsheet dependency tracking can be general across all coordinate systems. the lookup returns a cell, the engine decides how to schedule updates of that cell.

## future work

- Adapton-style minimal lazy spreadsheet evaluation / caching
- add a UI
- play with more coordinate system examples

## questions

- is L2U1 equivalent to U1L2? how does that work with a sparse link-based coordinate system where we don't necessarily materialize a cell at every position?
  - we could use a pathfinding algorithm, but that feels kinda needlessly heavy...
- how much is it useful to mix and match coordinate systems within the same formula? eg: traverse a parent link, and then a 2D grid link. seems funky but unclear if it's valuable.
- can a single relationship point to multiple cells? This would be helpful for, eg, the `children` relationship type for Embark. But it's annoying to pollute all relationships with this kind of multiplicity.