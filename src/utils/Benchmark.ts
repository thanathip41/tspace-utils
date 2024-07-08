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
export class Benchmark {
    private functions: Array<Function> = []
    private names : Array<string> = []
    private _diffTime (hrtime : [number , number]) {
        const [start , end] = process.hrtime(hrtime)
        return Number((start + (end / 1e9)).toFixed(4))
    }

    /**
     * 
     * push name & functions to the list of functions
     * @param {string} name name of the function
     * @param {function} func for benchmark
     * @return {this} this
     */
    push(name : string, func : Function): this {
        this.functions = [...this.functions ,func]
        this.names = [...this.names , name]
        return this
    }

    /**
     * 
     * add name & functions to the list of functions
     * @param {string} name name of the function
     * @param {function} func for benchmark
     * @return {this} this
     */
    add(name : string, func : Function): this {
        this.functions = [...this.functions ,func]
        this.names = [...this.names , name]
        return this
    }

    /**
     * 
     * run benchmark in list of functions
     * @return {Promise<void>} void
     */
    async run () : Promise<void> {
       
        for(let i = 0; i < this.functions.length; i++) {
            
            const func = this.functions[i]
            const name = this.names[i]
            const startTime = process.hrtime()
            await func()

            console.log(`\x1b[34m(${name}) =>\x1b[0m \x1b[33mexecute time\x1b[0m : \x1b[32m${this._diffTime(startTime)}s\x1b[0m\n`)
        }
        return
    }

    /**
     * 
     * execute results in list of functions
     * @return {Array<{ name : string , time : number, result : any}>} { name : string , time : number, result : any}
     */
    async execute () : Promise<{ name : string , time : number, result : any}[]> {
       
        const results = []
        for(let i = 0; i < this.functions.length; i++) {
            const name = this.names[i]
            const startTime = process.hrtime()
            const result = await this.functions[i]()
            results.push({
                name,
                time : this._diffTime(startTime),
                result
            })
        }
        return results
    }
}