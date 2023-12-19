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
exports.Benchmark = void 0;
/**
 *
 * Benchmarking that supports resolution timers & returns statistically significant results.
 * @example
 *  function sumPromise (a: any , b: any) : Promise<number> {
 *     return new Promise((resolve) => {
 *          setTimeout(() => {
 *               resolve(a + b)
 *           }, 3000);
 *     })
 *   }
 *  const benchmark =  await new Benchmark()
 *    .add('test sum 1 * 2' , () =>  sumPromise(1,2))
 *    .add('test sum 1000 * 2000' , () =>  sumPromise(1000,2000))
 *    .add('test sum 10000**100000 * 2000' , () =>  sumPromise(10000**100000,2000))
 *    .run()
 *
 *   console.log(benchmark)
 *
 *  const benchmarkExecute =  await new Benchmark()
 *    .add('test sum 1 * 2' , () =>  sumPromise(1,2))
 *    .add('test sum 1000 * 2000' , () =>  sumPromise(1000,2000))
 *    .add('test sum 10000**100000 * 2000' , () =>  sumPromise(10000**100000,2000))
 *    .execute()
 *
 *   console.log(benchmarkExecute)
 */
class Benchmark {
    constructor() {
        this.functions = [];
        this.names = [];
    }
    _diffTime(hrtime) {
        const [start, end] = process.hrtime(hrtime);
        return Number((start + (end / 1e9)).toFixed(4));
    }
    /**
     *
     * push name & functions to the list of functions
     * @param {string} name name of the function
     * @param {function} func for benchmark
     * @return {this} this
     */
    push(name, func) {
        this.functions = [...this.functions, func];
        this.names = [...this.names, name];
        return this;
    }
    /**
     *
     * add name & functions to the list of functions
     * @param {string} name name of the function
     * @param {function} func for benchmark
     * @return {this} this
     */
    add(name, func) {
        this.functions = [...this.functions, func];
        this.names = [...this.names, name];
        return this;
    }
    /**
     *
     * run benchmark in list of functions
     * @return {Promise<void>} void
     */
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.functions.length; i++) {
                const func = this.functions[i];
                const name = this.names[i];
                const startTime = process.hrtime();
                yield func();
                console.log(`\x1b[34m(${name}) =>\x1b[0m \x1b[33mexecute time\x1b[0m : \x1b[32m${this._diffTime(startTime)}s\x1b[0m\n`);
            }
            return;
        });
    }
    /**
     *
     * execute results in list of functions
     * @return {Array<{ name : string , time : number, result : any}>} { name : string , time : number, result : any}
     */
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = [];
            for (let i = 0; i < this.functions.length; i++) {
                const name = this.names[i];
                const startTime = process.hrtime();
                const result = yield this.functions[i]();
                results.push({
                    name,
                    time: this._diffTime(startTime),
                    result
                });
            }
            return results;
        });
    }
}
exports.Benchmark = Benchmark;
