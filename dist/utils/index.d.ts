export * from './Logger';
export * from './Validate';
export * from './Time';
export * from './Collection';
export * from './Test';
export * from './Benchmark';
export declare const typeOf: (data: any) => string;
export declare const createState: (defaultState?: any) => [Function, Function];
export declare const isEmpty: (value: any) => boolean;
export declare const deepEqual: (a: any, b: any) => boolean;
export declare const snakeCase: (value: any) => any;
export declare const camelCase: (value: any) => any;