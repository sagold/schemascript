import "mocha";
import assert from "assert";
import sc, { o, a, s, b, n, i, e, $def, defs } from "../src/index";


it("should generate json-schema", () => {
	assert.deepEqual(
		o({
			document: $def("article"),
			data: o({
				version: n(0),
				workingTitle: s()
			})},

			defs({
				article: o({
					type: s({ pattern: "^doc$" }, "doc").$required(),
					content: a($def("node")).$required()
				}),
				node: o({
					type: s({ minLength: 4 }).$required(),
					content: a($def("node")).$required()
				})
			})
		),
		{
			type: "object",
			properties: {
				document: { $ref: "#/definitions/article" },
				data: {
					type: "object",
					properties: {
						version: {
							type: "number",
							default: 0
						},
						workingTitle: {
							type: "string"
						}
					}
				}
			},
			definitions: {
				article: {
					type: "object",
					required: ["type", "content"],
					properties: {
						type: {
							type: "string",
							pattern: "^doc$",
							default: "doc"
						},
						content: {
							type: "array",
							items: { $ref: "#/definitions/node" }
						}
					}
				},
				node: {
					type: "object",
					required: ["type", "content"],
					properties: {
						type: {
							minLength: 4,
							type: "string"
						},
						content: {
							type: "array",
							items: { $ref: "#/definitions/node" }
						}
					}
				}
			}
		}
	);
});