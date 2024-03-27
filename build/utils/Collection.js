"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
/**
 *
 * Collection functions that helper Array value can be work everythings in the collection
 * @example
 *  import { Collection } from 'tsapce-utils'
 *  const data = [
 *       {
 *           id : 3,
 *           username : 'test3',
 *           email : null,
 *           createdAt : '2022-06-23 12:30:00',
 *           updatedAt : '2022-06-23 12:30:00'
 *      },
 *       {
 *           id : 2,
 *           username : 'test2',
 *           email : null,
 *           createdAt : '2022-06-21 12:30:00',
 *           updatedAt : '2022-06-22 12:30:00'
 *       },
 *       {
 *           id : 1,
 *           username : 'test1',
 *           email : 'test1@gmail.com',
 *           createdAt : '2022-06-23 15:00:00',
 *           updatedAt : '2022-06-25 12:30:00'
 *       },
 *       {
 *           id : 5,
 *           username : 'test5',
 *           email : 'test5@gmail.com',
 *           createdAt : '2022-06-11 17:00:00',
 *           updatedAt : '2022-06-22 12:30:00'
 *       },
 *       {
 *           id : 4,
 *           username : 'test4',
 *           email : 'test4@gmail.com',
 *           createdAt : '2022-06-22 18:00:00',
 *           updatedAt : '2022-06-25 18:30:00'
 *       }
 *   ]
 *
 *  const map = new Collection(data).map((item: { username: string }) => {
 *       return { ...item,username : item.username.toUpperCase() }
 *   }).get()
 *
 *  const find = new Collection(data).find((item: { id: number }) => item.id === 1).get()
 *
 *  const each = new Collection(data).each((collect: Collection) => {
 *       collect.where('id',1).concat([{ id : 10 , username : 'test10' }])
 *   }).get()
 *
 *  const filter = new Collection(data).filter((item: { id : number }) => item.id === 1).get()
 *
 *  const reduce = new Collection(data).reduce(( prev:number, cur : { id : number}) => prev + cur.id , 0).get()
 *
 *  const when = new Collection(data).when(true, (collect: Collection) => {
 *       collect.map((item: { id : number } , index: number) => item.id * index)
 *  }).get()
 */
class Collection {
    constructor(data) {
        this.ORIGINS = [];
        this.camelCase = () => {
            for (let i = 0; i < this.ITEMS.length; i++) {
                this.ITEMS[i] = this._camelCase(this.ITEMS[i]);
            }
            return this;
        };
        this._snakeCase = (obj) => {
            try {
                if (typeof (obj) !== "object")
                    return obj;
                Object.entries(obj).forEach(([oldName, _]) => {
                    const newName = oldName.replace(/([A-Z])/g, (str) => "_" + str.toLowerCase());
                    if (newName !== oldName) {
                        if (obj.hasOwnProperty(oldName)) {
                            obj = Object.assign(Object.assign({}, obj), { [newName]: obj[oldName] });
                            delete obj[oldName];
                        }
                    }
                    if (typeof (obj[newName]) === "object")
                        obj[newName] = this._snakeCase(obj[newName]);
                });
                return obj;
            }
            catch (e) {
                return obj;
            }
        };
        this._camelCase = (obj) => {
            try {
                if (typeof (obj) !== "object")
                    return obj;
                Object.entries(obj).forEach(([oldName, _]) => {
                    const newName = oldName.replace(/(.(\_|-|\s)+.)/g, (str) => str[0] + (str[str.length - 1].toUpperCase()));
                    if (newName !== oldName) {
                        if (obj.hasOwnProperty(oldName)) {
                            obj = Object.assign(Object.assign({}, obj), { [newName]: obj[oldName] });
                            delete obj[oldName];
                        }
                    }
                    if (typeof (obj[newName]) === "object")
                        obj[newName] = this._camelCase(obj[newName]);
                });
                return obj;
            }
            catch (e) {
                return obj;
            }
        };
        if (!Array.isArray(data))
            throw new Error('Collection defined value Array Only');
        this.ITEMS = [...data];
        this.ORIGINS = [...data];
    }
    result() {
        return this.ITEMS;
    }
    resultAndOrigin() {
        return {
            items: this.ITEMS,
            origins: this.ORIGINS
        };
    }
    get() {
        return this.ITEMS;
    }
    findMany() {
        return this.ITEMS;
    }
    first() {
        var _a;
        return (_a = this.ITEMS[0]) !== null && _a !== void 0 ? _a : null;
    }
    findOne() {
        var _a;
        return (_a = this.ITEMS[0]) !== null && _a !== void 0 ? _a : null;
    }
    getOrigin() {
        return this.ORIGINS;
    }
    getAndOrigin() {
        return {
            items: this.ITEMS,
            origins: this.ORIGINS
        };
    }
    all() {
        return this.ITEMS;
    }
    shift() {
        var _a;
        return (_a = this.ITEMS) === null || _a === void 0 ? void 0 : _a.shift();
    }
    pop() {
        var _a;
        return (_a = this.ITEMS) === null || _a === void 0 ? void 0 : _a.pop();
    }
    isEmpty() {
        var _a;
        switch (this._typeOf(this.ITEMS)) {
            case 'Array': {
                return ((_a = this.ITEMS) === null || _a === void 0 ? void 0 : _a.length) ? true : false;
            }
            case 'Object': {
                return Object.keys(this.ITEMS).length ? true : false;
            }
            default: {
                return false;
            }
        }
    }
    exists() {
        var _a;
        switch (this._typeOf(this.ITEMS)) {
            case 'Array': {
                return ((_a = this.ITEMS) === null || _a === void 0 ? void 0 : _a.length) ? true : false;
            }
            case 'Object': {
                return Object.keys(this.ITEMS).length ? true : false;
            }
            default: {
                return false;
            }
        }
    }
    toJson() {
        return JSON.stringify(this.ITEMS) || JSON.stringify([]);
    }
    count() {
        var _a, _b;
        switch (this._typeOf(this.ITEMS)) {
            case 'Array': {
                return (_b = (_a = this.ITEMS) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
            }
            case 'Object': {
                return Object.keys(this.ITEMS).length;
            }
            default: {
                return 0;
            }
        }
    }
    size() {
        var _a, _b;
        switch (this._typeOf(this.ITEMS)) {
            case 'Array': {
                return (_b = (_a = this.ITEMS) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
            }
            case 'Object': {
                return Object.keys(this.ITEMS).length;
            }
            default: {
                return 0;
            }
        }
    }
    avg(key) {
        this._next();
        const avg = this.ITEMS.reduce((prev, current) => {
            if (key == null)
                return prev + current;
            if (current[key])
                return prev + current[key];
            throw new Error(`can't find property [${key}] in collections`);
        }, 0);
        return Number(avg) / this.ITEMS.length;
    }
    sum(key) {
        this._next();
        const sum = this.ITEMS.reduce((prev, current) => {
            if (key == null)
                return prev + current;
            if (current[key])
                return prev + current[key];
            throw new Error(`can't find property [${key}] in collections`);
        }, 0);
        return sum;
    }
    max(key) {
        this._next();
        return Math.max(...this.ITEMS.map((item) => {
            if (key == null)
                return item;
            if (item[key])
                return item[key];
            throw new Error(`can't find property [${key}] in collections`);
        }));
    }
    min(key) {
        this._next();
        return Math.min(...this.ITEMS.map((item) => {
            if (key == null)
                return item;
            if (item[key])
                return item[key];
            throw new Error(`can't find property [${key}] in collections`);
        }));
    }
    chunk(chunk = 5) {
        this._next();
        return this.ITEMS.reduce((chunkArray, item, index) => {
            const chunkIndex = Math.floor(index / chunk);
            if (!chunkArray[chunkIndex])
                chunkArray[chunkIndex] = [];
            chunkArray[chunkIndex] = [
                ...chunkArray[chunkIndex],
                item
            ];
            return chunkArray;
        }, []);
    }
    snakeCase() {
        for (let i = 0; i < this.ITEMS.length; i++) {
            this.ITEMS[i] = this._snakeCase(this.ITEMS[i]);
        }
        return this;
    }
    when(value, cb) {
        this._next();
        if (value)
            cb(this);
        return this;
    }
    whenEmpty(cb) {
        this._next();
        if (!this.ITEMS.length)
            cb(this);
        return this;
    }
    whenNotEmpty(cb) {
        this._next();
        if (this.ITEMS.length)
            cb(this);
        return this;
    }
    where(key, operator, value) {
        [value, operator] = this._valueAndOperator(value, operator, arguments.length === 2);
        this._next();
        this.ITEMS = this.ITEMS.filter((item) => {
            if (key == null || key === '')
                return this._operators(operator)(item, value);
            if (!item.hasOwnProperty(key))
                throw new Error(`can't find property [${key}] in collections`);
            const property = item[key];
            const result = this._operators(operator)(property, value);
            if (result == null)
                throw new Error(`not support this operator ${operator}`);
            return result;
        });
        return this;
    }
    whereBetween(key, value) {
        this._next();
        if (!Array.isArray(value))
            throw new TypeError("defined value must be an array");
        if (value.length !== 2)
            throw new Error("value must be 2 only");
        const [v1, v2] = value;
        this.ITEMS = this.ITEMS.filter((item) => {
            if (key == null || key === '')
                return v1 <= item && item <= v2;
            if (!item.hasOwnProperty(key))
                throw new Error(`can't find property [${key}] in collections`);
            const property = item[key];
            return v1 <= property && property <= v2;
        });
        return this;
    }
    whereNotBetween(key, value) {
        this._next();
        if (!Array.isArray(value))
            throw new TypeError("defined value must be an array");
        if (value.length !== 2)
            throw new Error("value must be 2 only");
        const [v1, v2] = value;
        this.ITEMS = this.ITEMS.filter((item) => {
            if (key == null || key === '')
                return !(v1 <= item && item <= v2);
            if (!item.hasOwnProperty(key))
                throw new Error(`can't find property [${key}] in collections`);
            const property = item[key];
            return !(v1 <= property && property <= v2);
        });
        return this;
    }
    whereNull(key) {
        this._next();
        this.ITEMS = this.ITEMS.filter((item) => {
            if (key == null || key === '')
                return item == null;
            if (!item.hasOwnProperty(key))
                throw new Error(`can't find property [${key}] in collections`);
            return item[key] == null;
        });
        return this;
    }
    whereNotNull(key) {
        this._next();
        this.ITEMS = this.ITEMS.filter((item) => {
            if (key == null || key === '')
                return item != null;
            if (!item.hasOwnProperty(key))
                throw new Error(`can't find property [${key}] in collections`);
            return item[key] != null;
        });
        return this;
    }
    whereIn(key, array) {
        this._next();
        this.ITEMS = this.ITEMS.filter((item) => {
            if (key == null || key === '')
                return array.includes(item);
            if (!item.hasOwnProperty(key))
                throw new Error(`can't find property [${key}] in collections`);
            const property = item[key];
            return array.includes(property);
        });
        return this;
    }
    whereNotIn(key, array) {
        this._next();
        this.ITEMS = this.ITEMS.filter((item) => {
            if (key == null || key === '')
                return !array.includes(item);
            if (!item.hasOwnProperty(key))
                throw new Error(`can't find property [${key}] in collections`);
            const property = item[key];
            return !array.includes(property);
        });
        return this;
    }
    limit(limit) {
        this._next();
        this.ITEMS = this.ITEMS.slice(0, limit);
        return this;
    }
    except(...keys) {
        this._next();
        this.ITEMS = this.ITEMS.map((item) => {
            keys.forEach((key) => item = Object.assign({}, this._removeKey(key, item)));
            return item;
        });
        return this;
    }
    slice(start, end) {
        this.ITEMS = this.ITEMS.slice(start, end);
        return this;
    }
    forget(key) {
        this.ITEMS = this.ITEMS.splice(key, this.ITEMS.length);
        return this;
    }
    oldest(key) {
        this._next();
        const temp = this._temp();
        temp.sort((a, b) => {
            if (key == null)
                return a - b;
            if (a[key] && b[key]) {
                const d1 = Date.parse(a[key]);
                const d2 = Date.parse(b[key]);
                if (Number.isNaN(d1) || Number.isNaN(d2))
                    return a[key] - b[key];
                return d1 - d2;
            }
            throw new Error(`can't find property [${key}] in collections`);
        });
        this.ITEMS = temp;
        return this;
    }
    latest(key) {
        this._next();
        const temp = this._temp();
        temp.sort((a, b) => {
            if (key == null)
                return b - a;
            if (a[key] && b[key]) {
                const d1 = Date.parse(a[key]);
                const d2 = Date.parse(b[key]);
                if (Number.isNaN(d1) || Number.isNaN(d2))
                    return b[key] - a[key];
                return d2 - d1;
            }
            throw new Error(`can't find property [${key}] in collections`);
        });
        this.ITEMS = temp;
        return this;
    }
    push(data) {
        this._next();
        this.ITEMS = [...this.ITEMS, data];
        return this;
    }
    add(data) {
        this._next();
        this.ITEMS = [...this.ITEMS, data];
        return this;
    }
    merge(data) {
        this._next();
        this.ITEMS = [
            ...this.ITEMS,
            ...data
        ];
        return this;
    }
    each(cb) {
        cb(this);
        return this;
    }
    findIndex(cb) {
        this._next();
        let result = -1;
        for (let i = 0; i < this.ITEMS.length; i++) {
            if (cb(this.ITEMS[i], i) === true) {
                result = i;
                break;
            }
        }
        this.ITEMS = result;
        return this;
    }
    every(cb) {
        this._next();
        let result = [];
        for (let i = 0; i < this.ITEMS.length; i++) {
            if (cb(this.ITEMS[i], i) === true) {
                result = [...result, true];
                continue;
            }
            result = [...result, false];
        }
        this.ITEMS = true;
        for (let j = 0; j < result.length; j++) {
            if (result[j] === false) {
                this.ITEMS = false;
                break;
            }
        }
        return this;
    }
    some(cb) {
        this._next();
        let result = false;
        for (let i = 0; i < this.ITEMS.length; i++) {
            if (cb(this.ITEMS[i], i) === true) {
                result = true;
                break;
            }
        }
        this.ITEMS = result;
        return this;
    }
    find(cb) {
        this._next();
        let result = null;
        for (let i = 0; i < this.ITEMS.length; i++) {
            const collect = this.ITEMS[i];
            if (cb(collect, i) === true) {
                result = collect;
                break;
            }
        }
        this.ITEMS = result;
        return this;
    }
    filter(cb) {
        this._next();
        let result = [];
        for (let i = 0; i < this.ITEMS.length; i++) {
            const collect = this.ITEMS[i];
            if (cb(collect, i) === true)
                result = [...result, collect];
        }
        this.ITEMS = result;
        return this;
    }
    map(cb) {
        this._next();
        let result = [];
        for (let i = 0; i < this.ITEMS.length; i++) {
            const collect = this.ITEMS[i];
            result = [...result, cb(collect, i)];
        }
        this.ITEMS = result;
        return this;
    }
    reduce(cb, result) {
        this._next();
        let i = 0;
        if (arguments.length < 2) {
            result = this.ITEMS[i];
            i = 1;
        }
        for (i; i < this.ITEMS.length; i++) {
            result = cb(result, this.ITEMS[i], i, this.ITEMS);
        }
        this.ITEMS = result;
        return this;
    }
    _next() {
        if (this._typeOf(this.ITEMS) === 'Array')
            return;
        throw new Error('This current value is not an Array');
    }
    _temp() {
        return this.ITEMS.slice();
    }
    _removeKey(key, _a) {
        var _b = key, _ = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
        return rest;
    }
    _valueAndOperator(value, operator, useDefault = false) {
        if (useDefault)
            return [operator, '='];
        if (operator == null)
            throw new Error('bad arguments');
        return [value, operator];
    }
    _typeOf(data) {
        return Object.prototype.toString.apply(data).slice(8, -1);
    }
    _operators(operator) {
        const operators = {
            '=': (property, value) => property === value,
            '<': (property, value) => property < value,
            '>': (property, value) => property > value,
            '<=': (property, value) => property <= value,
            '>=': (property, value) => property >= value,
        };
        return operators[operator];
    }
}
exports.Collection = Collection;
exports.default = Collection;
