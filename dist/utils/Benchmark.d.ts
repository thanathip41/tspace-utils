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
export declare class Benchmark {
    private functions;
    private names;
    private _diffTime;
    /**
     *
     * push name & functions to the list of functions
     * @param {string} name name of the function
     * @param {function} func for benchmark
     * @return {this} this
     */
    push(name: string, func: Function): this;
    /**
     *
     * add name & functions to the list of functions
     * @param {string} name name of the function
     * @param {function} func for benchmark
     * @return {this} this
     */
    add(name: string, func: Function): this;
    /**
     *
     * run benchmark in list of functions
     * @return {Promise<void>} void
     */
    run(): Promise<void>;
    /**
     *
     * execute results in list of functions
     * @return {Array<{ name : string , time : number, result : any}>} { name : string , time : number, result : any}
     */
    execute(): Promise<{
        name: string;
        time: number;
        result: any;
    }[]>;
}
