import { deepEqual } from '.'

/**
 * 
 * Test equal a result comparing values
 * @example
 *   const sum = (a , b) => a + b
 *   new Test().describe('test sum').expect(() => sum(1,3)).toBe(4)
 *   new Test().describe('test sum').expect(() => sum(2,3)).toBe("1")
 */
export class Test {
    private callback    !: any
    private description !: string

    /**
     * add description to Test 
     * @param {string} description 
     * @returns {this}
     */
    describe (description : string): this {
        this.description = description
        return this
    }

    /**
     * add description to Test 
     * @param {string} description 
     * @returns {this}
     */
    name (description : string): this {
        this.description = description
        return this
    }

    /**
     * add expect Function to Test 
     * @param {string} callback
     * @returns {this}
     */
    expect (callback : any): this {
        this.callback = callback
        return this
    }

    /**
     * add value compare a results
     * @param {any} toBeValue
     * @returns {Promise<void>}
     */
    async equal (toBeValue : any): Promise<void> {
        return this.toBe(toBeValue)
    }

    /**
     * add value compare a results
     * @param {any} toBeValue
     * @returns {Promise<void>}
     */
    async toBe (toBeValue : any): Promise<void> {
        const startTime = process.hrtime()
        const diffTime = (hrtime ?: [number , number]) => {
            if(hrtime == null) return
            const [start , end] = process.hrtime(hrtime)
            return (start + (end / 1e9)).toFixed(4)
        }
        try {
            const result = await this.callback()

            if(!deepEqual(result,toBeValue)) throw new Error('value not match')
            
            console.log(`\x1b[42m PASSED \x1b[0m\x1b[34m (${this.description}) =>\x1b[0m \x1b[33mexecute time\x1b[0m : \x1b[32m${diffTime(startTime)}s\x1b[0m\n`)
            return
    
        } catch (err:any) {
            console.log(`\x1b[41m FAILED \x1b[0m\x1b[34m (${this.description}) =>\x1b[0m \x1b[33mexecute time\x1b[0m : \x1b[32m${diffTime(startTime)}s\x1b[0m\n`)
            return
        }
    }
}
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
export class StressTest {

    private EACH : number = 1

    public each (each : number) {
        this.EACH = each
        return this
    }

    public loop (each : number) {
        this.EACH = each
        return this
    }

    public async test (promise : Function) {

        const promises : Function[] = [...Array(this.EACH).keys()].map(_ => promise)
        return await this._test(promises)
    }

    public async tests (promises : Function[]) {

        return await this._test(promises)
    }

    private async _test (promises : Function[]) : Promise<{
        successes : number,
        errors : number,
        messages : string[],
        ss: number,
        ms : number
    }> {

        const startTime = process.hrtime()

        const diffTime = (hrtime ?: [number , number]) => {
            if(hrtime == null) return { ss : 0 , ms : 0}
            const [start , end] = process.hrtime(hrtime)
            return {
                ss: Number((start + (end / 1e9)).toFixed(4)),
                ms: Number((start + (end / 1e6)).toFixed(4))
            }
        }

        const res = await Promise.allSettled(promises.map((p) => p()))

        let reportsSuccess : number = 0

        let reportsErrors : number = 0

        let errors : string[]= []

        for(const r of res) {
            if(r.status === 'fulfilled') {
                reportsSuccess++
                continue
            }
            const error = r.reason.response?.data?.message ?? r.reason?.message

            if(typeof error === 'string') {
                errors.push(error)
                reportsErrors++
                continue
            }
            
            errors.push(JSON.stringify(error))
           
            reportsErrors++
        }

        const messages = Object.entries(
            errors.reduce((r : Record<string,any>, c : string) => (r[c] = (r[c] || 0) + 1, r) , {})
        ).map(([k, v]) => v == 1 ? k : `(${v})` + ' ' + k)
        const timer = diffTime(startTime)

        return {
            successes : reportsSuccess,
            errors : reportsErrors,
            messages,
            ss : timer.ss,
            ms : timer.ms
        }
    }
}