type JSONSchemaObject = Record<string, unknown>;
interface JSONSchemaType {
    isType: boolean;
    $required(): JSONSchemaType;
    isRequired?: boolean;
    [p: string]: unknown;
}
export declare const config: {
    /** defined identifier for types */
    IS_TYPE: string;
    /** defined utility to mark as required property */
    SET_REQUIRED: string;
    /** defined identifier for required property */
    IS_REQUIRED: string;
    /** json-schema definitions-property */
    DEFINITIONS: string;
};
/** create an object-schema */
export declare function o(...args: JSONSchemaObject[]): JSONSchemaType;
/** create an array-schema */
export declare function a(...args: (JSONSchemaObject | JSONSchemaObject[])[]): JSONSchemaType;
/** create an enum-schema */
export declare function e(...args: (JSONSchemaObject | (unknown)[])[]): JSONSchemaType;
/** create a string-schema */
export declare function s(...args: (JSONSchemaObject | string)[]): JSONSchemaType;
/** create a number-schema */
export declare function n(...args: (JSONSchemaObject | number)[]): JSONSchemaType;
/** create an integer-schema */
export declare function i(...args: (JSONSchemaObject | number)[]): JSONSchemaType;
/** create a boolean-schema */
export declare function b(...args: (JSONSchemaObject | boolean)[]): JSONSchemaType;
/** create a reference { $ref: "<input-string>" } */
export declare function $ref(...args: (JSONSchemaObject | string)[]): JSONSchemaType;
/** create a reference to definitions { $ref: "#/definitions/<input-string>" } */
export declare function $def(...args: (JSONSchemaObject | string)[]): JSONSchemaType;
/** create definitions { definitions: <input-object> } */
export declare function defs(definitions: Record<string, JSONSchemaObject>): JSONSchemaObject;
/** helper function calling json-type-helpers via string. e.g. schemascript("array", { minItems: 1 })  */
export default function schemascript(type: string, ...args: JSONSchemaObject[]): any;
export {};
