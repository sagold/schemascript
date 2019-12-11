type JSONSchemaObject = {
	[p: string]: any
};

type JSONSchemaType = {
	isType: boolean;
	$required(): JSONSchemaType;
	isRequired?: boolean;
	[p: string]: any
};

type JSTypes = "object"|"array"|"number"|"string"|"boolean"|"null"|"undefined";

/* modifiable schemascript configuration */
export const config = {
	/** defined identifier for types */
	IS_TYPE: "isType",
	/** defined utility to mark as required property */
	SET_REQUIRED: "$required",
	/** defined identifier for required property */
	IS_REQUIRED: "isRequired",
	/** json-schema definitions-property */
	DEFINITIONS: "definitions"
};


const toString = Object.prototype.toString;
// @ts-ignore
const getType = (v?: any): JSTypes => toString.call(v).match(/\s([^\]]+)\]/).pop().toLowerCase();


function flagType(schema) {
	Object.defineProperty(schema, config.IS_TYPE, { enumerable: false, value: true });
	if (schema[config.SET_REQUIRED] == null) {
		Object.defineProperty(schema, config.SET_REQUIRED, { enumerable: false, value: () =>
			Object.defineProperty(schema, config.IS_REQUIRED, { enumerable: false, value: true })
		});
	}
	return schema;
}

// add required props
function addRequired(schema, properties) {
	if (properties == null) { return schema; }
	const required = schema.required || [];
	Object.keys(properties).forEach(p => {
		if (properties[p].isRequired && required.includes(p) === false) { required.push(p); }
	});
	if (required.length > 0) { schema.required = required; }
	return schema;
}

// find and merge properties
function addProperties(objects: Array<JSONSchemaObject>): Array<JSONSchemaObject> {
	let properties;
	objects.forEach(schema => {
		Object.keys(schema).forEach((key) => {
			if (schema[key][config.IS_TYPE] === true) {
				properties = properties || {};
				properties[key] = schema[key];
				delete schema[key];
			}
		});
		if (schema.properties) {
			properties = Object.assign({}, properties, schema.properties);
			delete schema.properties;
		}
	});
	properties && objects.push({ properties });
	return objects;
}

/** create an object-schema */
export function o(...args:Array<JSONSchemaObject>): JSONSchemaType {
	args = addProperties(args);
	const schema = flagType(Object.assign({}, ...args, { type: "object" }));
	return addRequired(schema, schema.properties);
}

/** create an array-schema */
export function a(...args: Array<JSONSchemaObject|Array<JSONSchemaObject>>): JSONSchemaType {
	// add to default-items for array-input or type-input
	args = args.map(schema => {
		if (Array.isArray(schema) || schema[config.IS_TYPE]) { return { items: schema }; }
		return schema;
	});
	const schema = flagType(Object.assign({}, ...args, { type: "array" }));
	return schema;
}

/** create an enum-schema */
export function e(...args: Array<JSONSchemaObject|Array<JSONSchemaObject>>): JSONSchemaType {
	args = args.map(schema => {
		if (Array.isArray(schema)) { return { enum: schema }; }
		return schema;
	});

	const schema = flagType(Object.assign({ enum: [] }, ...args));

	let useType = schema.enum.length > 0;
	const type = getType(schema.enum[0]);
	schema.enum.forEach(v => { if (getType(v) !== type) { useType = false; } });
	if (useType) { schema.type = type; }

	return schema;
}

/** create a string-schema */
export function s(...args: Array<JSONSchemaObject|string>): JSONSchemaType {
	args = args.map(a => getType(a) === "string" ? { default: a } : a);
	return flagType(Object.assign({}, ...args, { type: "string" }));
}

/** create a number-schema */
export function n(...args: Array<JSONSchemaObject|number>): JSONSchemaType {
	args = args.map(a => getType(a) === "number" ? { default: a } : a);
	return flagType(Object.assign({}, ...args, { type: "number" }));
}

/** create an integer-schema */
export function i(...args: Array<JSONSchemaObject|number>): JSONSchemaType {
	return flagType(Object.assign(n(...args), { type: "integer" }));
}

/** create a boolean-schema */
export function b(...args: Array<JSONSchemaObject|boolean>): JSONSchemaType {
	args = args.map(a => getType(a) === "boolean" ? { default: a } : a);
	return flagType(Object.assign({}, ...args, { type: "boolean" }));
}

/** create a reference { $ref: "<input-string>" } */
export function $ref(...args: Array<JSONSchemaObject|string>): JSONSchemaType {
	args = args.map(a => getType(a) === "string" ? { $ref: a } : a);
	return flagType(Object.assign({}, ...args));
}

/** create a reference to definitions { $ref: "#/definitions/<input-string>" } */
export function $def(...args: Array<JSONSchemaObject|string>): JSONSchemaType {
	args = args.map(a =>
		getType(a) === "string" ? { $ref: `#/${config.DEFINITIONS}/${a.replace(/^\//, "")}` } : a
	);
	return flagType(Object.assign({}, ...args));
}

/** create definitions { definitions: <input-object> } */
export function defs(definitions: { [id: string ]: JSONSchemaObject }): JSONSchemaObject {
	return { [config.DEFINITIONS]: definitions };
}

// ionbase
const types = { i, o, n, b, a, s, e, $ref, defs, $def };

/** helper function calling json-type-helpers via string. e.g. schemascript("array", { minItems: 1 })  */
export default function schemascript(type: string, ...args: Array<JSONSchemaObject>) {
	return types[type[0]](...args);
}