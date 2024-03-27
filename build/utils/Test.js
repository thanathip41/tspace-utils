"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StressTest = exports.Test = void 0;
const _1 = require(".");
/**
 *
 * Test equal a result comparing values
 * @example
 *   const sum = (a , b) => a + b
 *   new Test().describe('test sum').expect(() => sum(1,3)).toBe(4)
 *   new Test().describe('test sum').expect(() => sum(2,3)).toBe("1")
 */
class Test {
    /**
     * add description to Test
     * @param {string} description
     * @returns {this}
     */
    describe(description) {
        this.description = description;
        return this;
    }
    /**
     * add description to Test
     * @param {string} description
     * @returns {this}
     */
    name(description) {
        this.description = description;
        return this;
    }
    /**
     * add expect Function to Test
     * @param {string} callback
     * @returns {this}
     */
    expect(callback) {
        this.callback = callback;
        return this;
    }
    /**
     * add value compare a results
     * @param {any} toBeValue
     * @returns {Promise<void>}
     */
    equal(toBeValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.toBe(toBeValue);
        });
    }
    /**
     * add value compare a results
     * @param {any} toBeValue
     * @returns {Promise<void>}
     */
    toBe(toBeValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = process.hrtime();
            const diffTime = (hrtime) => {
                if (hrtime == null)
                    return;
                const [start, end] = process.hrtime(hrtime);
                return (start + (end / 1e9)).toFixed(4);
            };
            try {
                const result = yield this.callback();
                if (!(0, _1.deepEqual)(result, toBeValue))
                    throw new Error('value not match');
                console.log(`\x1b[42m PASSED \x1b[0m\x1b[34m (${this.description}) =>\x1b[0m \x1b[33mexecute time\x1b[0m : \x1b[32m${diffTime(startTime)}s\x1b[0m\n`);
                return;
            }
            catch (err) {
                console.log(`\x1b[41m FAILED \x1b[0m\x1b[34m (${this.description}) =>\x1b[0m \x1b[33mexecute time\x1b[0m : \x1b[32m${diffTime(startTime)}s\x1b[0m\n`);
                return;
            }
        });
    }
}
exports.Test = Test;
/**
 *
 * StressTest function for testing performance
 * @example
 *  import axios from 'axios'
 *  import { StressTest } from 'tspace-utils'
 *  const promise = axios.get(<some url for stress test api>)
 *  const test = await new StressTest().each(500).test(promise)
 *  console.log(test)
 */
class StressTest {
    constructor() {
        this.EACH = 1;
    }
    each(each) {
        this.EACH = each;
        return this;
    }
    loop(each) {
        this.EACH = each;
        return this;
    }
    test(promise) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [...Array(this.EACH).keys()].map(_ => promise);
            return this._test(promises);
        });
    }
    tests(promises) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._test(promises);
        });
    }
    _test(promises) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = process.hrtime();
            const diffTime = (hrtime) => {
                if (hrtime == null)
                    return { ss: 0, ms: 0 };
                const [start, end] = process.hrtime(hrtime);
                return {
                    ss: Number((start + (end / 1e9)).toFixed(4)),
                    ms: Number((start + (end / 1e6)).toFixed(4))
                };
            };
            const res = yield Promise.allSettled(promises.map((p) => p()));
            let reportsSuccess = 0;
            let reportsErrors = 0;
            let errors = [];
            for (const r of res) {
                if (r.status === 'fulfilled') {
                    reportsSuccess++;
                    continue;
                }
                const error = (_c = (_b = (_a = r.reason.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : (_d = r.reason) === null || _d === void 0 ? void 0 : _d.message;
                if (typeof error === 'string') {
                    errors.push(error);
                    reportsErrors++;
                    continue;
                }
                errors.push(JSON.stringify(error));
                reportsErrors++;
            }
            const messages = Object.entries(errors.reduce((r, c) => (r[c] = (r[c] || 0) + 1, r), {})).map(([k, v]) => v == 1 ? k : `(${v})` + ' ' + k);
            const timer = diffTime(startTime);
            return {
                successes: reportsSuccess,
                errors: reportsErrors,
                messages,
                ss: timer.ss,
                ms: timer.ms
            };
        });
    }
}
exports.StressTest = StressTest;
