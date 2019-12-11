type JSONSchemaObject = {
	type?: string;
	[p: string]: any
};

type JSTypes = "object"|"array"|"number"|"string"|"boolean"|"null"|"undefined";


export const config = {
	IS_TYPE: "isType",
	SET_REQUIRED: "$required",
	IS_REQUIRED: "isRequired",
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

export function o(...args:Array<JSONSchemaObject>): JSONSchemaObject {
	args = addProperties(args);
	const schema = flagType(Object.assign({}, ...args, { type: "object" }));
	return addRequired(schema, schema.properties);
}

export function a(...args: Array<JSONSchemaObject|Array<JSONSchemaObject>>): JSONSchemaObject {
	// add to default-items for array-input or type-input
	args = args.map(schema => {
		if (Array.isArray(schema) || schema[config.IS_TYPE]) { return { items: schema }; }
		return schema;
	});
	const schema = flagType(Object.assign({}, ...args, { type: "array" }));
	return schema;
}

export function e(...args: Array<JSONSchemaObject|Array<JSONSchemaObject>>): JSONSchemaObject {
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

export function s(...args: Array<JSONSchemaObject|string>): JSONSchemaObject {
	args = args.map(a => getType(a) === "string" ? { default: a } : a);
	return flagType(Object.assign({}, ...args, { type: "string" }));
}

export function n(...args: Array<JSONSchemaObject|number>): JSONSchemaObject {
	args = args.map(a => getType(a) === "number" ? { default: a } : a);
	return flagType(Object.assign({}, ...args, { type: "number" }));
}

export function i(...args: Array<JSONSchemaObject|number>): JSONSchemaObject {
	return flagType(Object.assign(n(...args), { type: "integer" }));
}

export function b(...args: Array<JSONSchemaObject|boolean>): JSONSchemaObject {
	args = args.map(a => getType(a) === "boolean" ? { default: a } : a);
	return flagType(Object.assign({}, ...args, { type: "boolean" }));
}

export function $ref(...args: Array<JSONSchemaObject|string>): JSONSchemaObject {
	args = args.map(a => getType(a) === "string" ? { $ref: a } : a);
	return flagType(Object.assign({}, ...args));
}

export function $def(...args: Array<JSONSchemaObject|string>): JSONSchemaObject {
	args = args.map(a =>
		getType(a) === "string" ? { $ref: `#/${config.DEFINITIONS}/${a.replace(/^\//, "")}` } : a
	);
	return flagType(Object.assign({}, ...args));
}

export function defs(definitions) {
	return { [config.DEFINITIONS]: definitions };
}

// oaesinb boasine ionbase baseion
const types = { o, a, e, s, i, n, b, $ref };

export default function schemascript(type: string, ...args: Array<JSONSchemaObject>) {
	return types[type[0]](...args);
}