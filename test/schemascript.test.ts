import "mocha";
import assert from "assert";
import sc, { i, o, n, b, a, s, e } from "../src/index";


describe("schemascript basics", () => {
	// object
	it("should create object-schema", () => assert.deepEqual(sc("object"), { type: "object" }));
	it("should create object-schema with 'o'", () => assert.deepEqual(o(), { type: "object" }));
	it("should have isType-flag on object", () => assert.deepEqual(sc("object").isType, true));
	// array
	it("should create array-schema", () => assert.deepEqual(sc("array"), { type: "array" }));
	it("should create array-schema with 'a'", () => assert.deepEqual(a(), { type: "array" }));
	it("should have isType-flag on array", () => assert.deepEqual(sc("array").isType, true));
	// string
	it("should create string-schema", () => assert.deepEqual(sc("string"), { type: "string" }));
	it("should create string-schema with 's'", () => assert.deepEqual(s(), { type: "string" }));
	it("should have isType-flag on string", () => assert.deepEqual(sc("string").isType, true));
	// boolean
	it("should create boolean-schema", () => assert.deepEqual(sc("boolean"), { type: "boolean" }));
	it("should create boolean-schema with 'b'", () => assert.deepEqual(b(), { type: "boolean" }));
	it("should have isType-flag on boolean", () => assert.deepEqual(sc("boolean").isType, true));
	// number
	it("should create number-schema", () => assert.deepEqual(sc("number"), { type: "number" }));
	it("should create number-schema with 'b'", () => assert.deepEqual(n(), { type: "number" }));
	it("should have isType-flag on number", () => assert.deepEqual(sc("number").isType, true));
	// integer
	it("should create integer-schema", () => assert.deepEqual(sc("integer"), { type: "integer" }));
	it("should create integer-schema with 'i'", () => assert.deepEqual(i(), { type: "integer" }));
	it("should have isType-flag on integer", () => assert.deepEqual(sc("integer").isType, true));
	// enum
	it("should create enum-schema", () => assert.deepEqual(sc("enum"), { enum: [] }));
	it("should create integer-schema with 'i'", () => assert.deepEqual(e(), { enum: [] }));
	it("should have isType-flag on enum", () => assert.deepEqual(sc("enum").isType, true));
});

describe("array", () => {
	it("should add properties to schema", () => {
		assert.deepEqual(a({ minItems: 1 }), { type: "array", minItems: 1 });
	});
	it("should not overwrite type", () => {
		assert.deepEqual(a({ minItems: 1 , type: "object" }), { type: "array", minItems: 1 });
	});

	it("should type-argument as items-object", () => {
		assert.deepEqual(
			a(s("title")),
			{
				type: "array",
				items: { type: "string", default: "title" }
			}
		);
	});

	it("should add array as items per default", () => {
		assert.deepEqual(
			a([ s("title") ]),
			{
				type: "array",
				items: [
					{ type: "string", default: "title" }
				]
			}
		);
	});
});

describe("object", () => {
	it("should add properties to schema", () => {
		assert.deepEqual(o({ required: ["title"] }), { type: "object", required: ["title"] });
	});
	it("should not overwrite type", () => {
		assert.deepEqual(o({ required: ["title"], type: "array" }), { type: "object", required: ["title"] });
	});

	it("should add types to properties per default", () => {
		assert.deepEqual(
			o({ required: ["title"], title: s("title") }),
			{ type: "object", required: ["title"], properties: { title: { type: "string", default: "title" }} }
		);
	});

	it("should combine types and properties", () => {
		assert.deepEqual(
			o({
				required: ["title"],
				title: s("title"),
				properties: {
					id: { type: "number" }
				}
			}),
			{
				type: "object",
				required: ["title"],
				properties: {
					title: { type: "string", default: "title" },
					id: { type: "number" }
				}
			}
		);
	});

	it("should add required properties", () => {
		assert.deepEqual(
			o({
				title: s("title").$required()
			}),
			{
				type: "object",
				required: ["title"],
				properties: {
					title: { type: "string", default: "title" }
				}
			}
		);
	});
});

describe("enum", () => {
	it("should add properties to schema", () => {
		assert.deepEqual(e({ title: "my-enum" }), { title: "my-enum", enum: [] });
	});
	it("should add enum options from input-array", () => {
		assert.deepEqual(
			e([1, "2", { "three": true }]),
			{ enum: [1, "2", { "three": true }] }
		);
	});
	it("should add enum type for homogenous enum-types", () => {
		assert.deepEqual(e(["1", "2"]), { type: "string", enum: ["1", "2"] } );
	});

	it("should merge schema with enum", () => {
		assert.deepEqual(
			e(["1", "2"], { title: "my-enum" }),
			{ type: "string", enum: ["1", "2"], title: "my-enum" }
		);
	});
});

describe("string", () => {
	it("should add string-param as 'default'", () => {
		assert.deepEqual(s("default-title"), { type: "string", default: "default-title" } );
	});
	it("should add properties to schema", () => {
		assert.deepEqual(s({ minLength: 1 }), { type: "string", minLength: 1 });
	});
	it("should not overwrite type", () => {
		assert.deepEqual(s({ minLength: 1, type: "array" }), { type: "string", minLength: 1 });
	});
	it("should combine properties and default-value", () => {
		assert.deepEqual(s({ minLength: 1 }, "title"), { type: "string", minLength: 1, default: "title" });
	});
});

describe("number", () => {
	it("should add number as 'default'", () => {
		assert.deepEqual(n(42), { type: "number", default: 42 } );
	});
	it("should add properties to schema", () => {
		assert.deepEqual(n({ minimum: 1 }), { type: "number", minimum: 1 });
	});
	it("should not overwrite type", () => {
		assert.deepEqual(n({ minimum: 1, type: "array" }), { type: "number", minimum: 1 });
	});
	it("should combine properties and default-value", () => {
		assert.deepEqual(n({ minimum: 1 }, 42), { type: "number", minimum: 1, default: 42 });
	});
});

describe("integer", () => {
	it("should add integer as 'default'", () => {
		assert.deepEqual(i(42), { type: "integer", default: 42 } );
	});
	it("should add properties to schema", () => {
		assert.deepEqual(i({ minimum: 1 }), { type: "integer", minimum: 1 });
	});
	it("should not overwrite type", () => {
		assert.deepEqual(i({ minimum: 1, type: "array" }), { type: "integer", minimum: 1 });
	});
	it("should combine properties and default-value", () => {
		assert.deepEqual(i({ minimum: 1 }, 42), { type: "integer", minimum: 1, default: 42 });
	});
});

describe("boolean", () => {
	it("should add boolean as 'default'", () => {
		assert.deepEqual(b(true), { type: "boolean", default: true } );
	});
	it("should add properties to schema", () => {
		assert.deepEqual(b({ title: "flag" }), { type: "boolean", title: "flag" });
	});
	it("should not overwrite type", () => {
		assert.deepEqual(b({ title: "flag", type: "array" }), { type: "boolean", title: "flag" });
	});
	it("should combine properties and default-value", () => {
		assert.deepEqual(b({ title: "flag" }, false), { type: "boolean", title: "flag", default: false });
	});
});