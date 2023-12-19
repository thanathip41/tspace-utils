/**
 *
 * Test equal a result comparing values
 * @example
 *   const sum = (a , b) => a + b
 *   new Test().describe('test sum').expect(() => sum(1,3)).toBe(4)
 *   new Test().describe('test sum').expect(() => sum(2,3)).toBe("1")
 */
export declare class Test {
    private callback;
    private description;
    /**
     * add description to Test
     * @param {string} description
     * @returns {this}
     */
    describe(description: string): this;
    /**
     * add description to Test
     * @param {string} description
     * @returns {this}
     */
    name(description: string): this;
    /**
     * add expect Function to Test
     * @param {string} callback
     * @returns {this}
     */
    expect(callback: any): this;
    /**
     * add value compare a results
     * @param {any} toBeValue
     * @returns {Promise<void>}
     */
    equal(toBeValue: any): Promise<void>;
    /**
     * add value compare a results
     * @param {any} toBeValue
     * @returns {Promise<void>}
     */
    toBe(toBeValue: any): Promise<void>;
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
export declare class StressTest {
    private EACH;
    each(each: number): this;
    loop(each: number): this;
    test(promise: Function): Promise<{
        successes: number;
        errors: number;
        messages: string[];
        ss: number;
        ms: number;
    }>;
    tests(promises: Function[]): Promise<{
        successes: number;
        errors: number;
        messages: string[];
        ss: number;
        ms: number;
    }>;
    private _test;
}
