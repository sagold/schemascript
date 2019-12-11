import "mocha";
import assert from "assert";
import schemascript, { o } from "../dist/schemascript.es5";

it("should correctly import bundle", () => {
	assert.deepEqual(o(), { type: "object" });
	assert.deepEqual(schemascript("array"), { type: "array" });
});
