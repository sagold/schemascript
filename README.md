# schemascript

> build json-schema definitions using helper functions

`yarn install @sagold/schemascript`

This is a simple utility to remove redundant json-schema syntax

## helpers

export| type    | result
------|---------|-----------------
i()   | integer | { type: "integer" }
o()   | object  | { type: "object" }
n()   | number  | { type: "number" }
b()   | boolean | { type: "boolean" }
a()   | array   | { type: "array" }
s()   | string  | { type: "string" }
e()   | enum    | { enum: [] }

Each method takes any number of objects as input, merging them to the exported schema

## examples

```js
import { i, o, n, b, a, s, e } from "@sagold/schemascript";

s("default-value");
// { type: "string", default: "default-value" }

s({ minLength: 2 }, "default-value");
// { type: "string", minLength: 2, default: "default-value" }

o();
// { type: "object"}

o({ minProperties: 4 });
// { type: "object", minProperties: 4 }

o({ properties: { title: s() } });
// { type: "object", properties: { title: { type: "string" }} }

o({ title: s(), minProperties: 4 });
// { type: "object", minProperties: 4, properties: { title: { type: "string" }} }

a({ minItems: 2 });
// { type: "array", minItems: 2 }

a(s(), { minItems: 2 });
// { type: "array", minItems: 2, items: { type: "string" } }

a([s(), n(), b()], { minItems: 2 });
// { type: "array", minItems: 2, items: [ {type: "string"}, {type: "number"}, {type: "boolean"} ] }
```

building a json-schema could look like

```js
o({
  document: o({
    type: s("doc"),
    content: a(o({
      type: "node",
      content: a()
    }))
  }).$required()
});
```

resulting in

```js
{
  type: "object",
  required: ["document"],
  properties: {
    document: {
      type: "object",
      properties: {
        type: {
          type: "string",
          default: "doc"
        },
        content: {
          type: "array",
          items: {
            type: "object",
            properties: {
              content: {
                type: "array"
              }
            }
          }
        }
      }
    }
  }
}
```

you can always pass json-schema properties directly

```js
o({
  title: "root-object",
  required: ["title"],
  properties: {
    title: s({
      $id: "title",
      title: "app-title",
      minLength: 2
    })
  },
  additionalProperties: {
    // ...
  }
});
```
