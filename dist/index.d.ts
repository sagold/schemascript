declare type JSONSchemaObject = {
    type?: string;
    [p: string]: any;
};
export declare const config: {
    IS_TYPE: string;
    SET_REQUIRED: string;
    IS_REQUIRED: string;
    DEFINITIONS: string;
};
export declare function o(...args: Array<JSONSchemaObject>): JSONSchemaObject;
export declare function a(...args: Array<JSONSchemaObject | Array<JSONSchemaObject>>): JSONSchemaObject;
export declare function e(...args: Array<JSONSchemaObject | Array<JSONSchemaObject>>): JSONSchemaObject;
export declare function s(...args: Array<JSONSchemaObject | string>): JSONSchemaObject;
export declare function n(...args: Array<JSONSchemaObject | number>): JSONSchemaObject;
export declare function i(...args: Array<JSONSchemaObject | number>): JSONSchemaObject;
export declare function b(...args: Array<JSONSchemaObject | boolean>): JSONSchemaObject;
export declare function $ref(...args: Array<JSONSchemaObject | string>): JSONSchemaObject;
export declare function $def(...args: Array<JSONSchemaObject | string>): JSONSchemaObject;
export declare function defs(definitions: any): {
    [x: string]: any;
};
export default function schemascript(type: string, ...args: Array<JSONSchemaObject>): any;
export {};
