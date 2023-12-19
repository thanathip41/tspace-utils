"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelCase = exports.snakeCase = exports.deepEqual = exports.isEmpty = exports.createState = exports.typeOf = void 0;
__exportStar(require("./Logger"), exports);
__exportStar(require("./Validate"), exports);
__exportStar(require("./Time"), exports);
__exportStar(require("./Collection"), exports);
__exportStar(require("./Test"), exports);
__exportStar(require("./Benchmark"), exports);
const typeOf = (data) => Object.prototype.toString.apply(data).slice(8, -1).toLocaleLowerCase();
exports.typeOf = typeOf;
const createState = (defaultState = null) => {
    const checkType = (oldState, newState) => {
        switch ((0, exports.typeOf)(oldState)) {
            case 'array': {
                oldState = [...oldState, newState];
                break;
            }
            case 'object': {
                if ((0, exports.typeOf)(newState) !== 'object')
                    throw new TypeError('this state allow object only');
                oldState = Object.assign(Object.assign({}, oldState), newState);
                break;
            }
            case 'boolean': {
                if ((0, exports.typeOf)(newState) !== 'boolean')
                    throw new TypeError('this state allow boolean only');
                oldState = newState;
                break;
            }
            case 'bumber': {
                if ((0, exports.typeOf)(newState) !== 'number')
                    throw new TypeError('this state allow number only');
                oldState = newState;
                break;
            }
            case 'string': {
                if ((0, exports.typeOf)(newState) !== 'string')
                    throw new TypeError('this state allow string only');
                oldState = newState;
                break;
            }
            case 'null' || 'nndefined': {
                oldState = newState;
                break;
            }
            default: {
                throw new Error("Can't set state");
            }
        }
        return oldState;
    };
    const getState = () => defaultState;
    const setState = (newState) => defaultState = checkType(defaultState, newState);
    return [getState, setState];
};
exports.createState = createState;
const isEmpty = (value) => {
    switch ((0, exports.typeOf)(value)) {
        case 'array': {
            if (!value.length)
                return true;
            break;
        }
        case 'object': {
            if (!Object.keys(value).length)
                return true;
            break;
        }
        case 'boolean': {
            if (!value)
                return true;
            break;
        }
        case 'number': {
            if (value === 0 || Number.isNaN(value))
                return true;
            break;
        }
        case 'string': {
            if (value === '')
                return true;
            break;
        }
        case 'null':
        case 'undefined': {
            if (value == null)
                return true;
            break;
        }
        default: {
            return false;
        }
    }
    return false;
};
exports.isEmpty = isEmpty;
const deepEqual = (a, b) => {
    if ((0, exports.typeOf)(a) !== (0, exports.typeOf)(b))
        return false;
    if (a === b)
        return true;
    switch ((0, exports.typeOf)(a)) {
        case 'object': {
            if (Object.keys(a).length !== Object.keys(b).length)
                return false;
            const keys = Object.keys(a);
            const length = keys.length;
            for (let i = 0; i < length; i++) {
                const key = keys[i];
                if (!(0, exports.deepEqual)(a[key], b[key]))
                    return false;
            }
            return true;
        }
        case 'array': {
            if (a.length !== b.length)
                return false;
            for (let i = 0; i < a.length; i++) {
                if (!(0, exports.deepEqual)(a[i], b[i]))
                    return false;
            }
            return true;
        }
        case 'number': {
            if (Number.isNaN(a) && Number.isNaN(b))
                return true;
            return false;
        }
        case 'map': {
            if (a.size !== b.size)
                return false;
            for (let i of a.entries()) {
                if (!b.has(i[0]))
                    return false;
            }
            for (let i of a.entries()) {
                if (!(0, exports.deepEqual)(i[1], b.get(i[0])))
                    return false;
            }
            return true;
        }
        case 'set': {
            if (a.size !== b.size)
                return false;
            for (let i of a.entries()) {
                if (!b.has(i[0]))
                    return false;
            }
            return true;
        }
        case 'date': {
            return a.valueOf() === b.valueOf();
        }
        default: return false;
    }
};
exports.deepEqual = deepEqual;
const snakeCase = (value) => {
    if ((0, exports.typeOf)(value) !== "object")
        return value;
    Object.entries(value).forEach(([oldName]) => {
        const newName = oldName.replace(/([A-Z])/g, (str) => `_${str.toLocaleLowerCase()}`);
        if (newName !== oldName) {
            if (value.hasOwnProperty(oldName)) {
                value = Object.assign(Object.assign({}, value), { [newName]: value[oldName] });
                delete value[oldName];
            }
        }
        if ((0, exports.typeOf)(value[newName]) === "object")
            value[newName] = (0, exports.snakeCase)(value[newName]);
    });
    return value;
};
exports.snakeCase = snakeCase;
const camelCase = (value) => {
    if ((0, exports.typeOf)(value) !== "object")
        return value;
    Object.entries(value).forEach(([oldName]) => {
        const newName = oldName.replace(/(.(\_|-|\s)+.)/g, (str) => str[0] + (str[str.length - 1].toUpperCase()));
        if (newName !== oldName) {
            if (value.hasOwnProperty(oldName)) {
                value = Object.assign(Object.assign({}, value), { [newName]: value[oldName] });
                delete value[oldName];
            }
        }
        if ((0, exports.typeOf)(value[newName]) === "object")
            value[newName] = (0, exports.camelCase)(value[newName]);
    });
    return value;
};
exports.camelCase = camelCase;
