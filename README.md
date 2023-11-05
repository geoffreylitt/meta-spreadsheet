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
    - relative cell position: eg, "L2U2"
- **embark:**
  - relationships: parent/child
  - lookups:
    - variable lookup: recursively up the parent tree

## design

- multiple coordinate systems can be active within a single compute graph; this gestures towards interop.
- lookup operations can only use the relationships defined within that coordinate system; this keeps coordinate systems cleanly separated

## future work

- Adapton-style minimal lazy spreadsheet evaluation
- more coordinate systems?