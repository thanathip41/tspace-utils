declare class RuleValidate {
    private RULES;
    private MESSAGES;
    private NEST_RULES;
    private _pushMessage;
    private _pushRule;
    /**
     * validate required value. value is not empty
     * @param {string} message  error message
     * @return {this} this
     */
    required(message?: string): this;
    /**
     * validate value is Number only can be types string or number
     * @param {string} message  error message
     * @return {this} this
     */
    number(message?: string): this;
    /**
     * Validate value type of Number only
     * @param {string} message  error message
     * @return {this} this
     */
    numberStrict(message?: string): this;
    /**
     * Validate value type of String
     * @param {string} message  error message
     * @return {this} this
     */
    string(message?: string): this;
    /**
     * Validate value type of Array only
     * @param {string} message  error message
     * @return {this} this
     */
    array(message?: string): this;
    /**
     * Validate value pattern is email address
     * @param {string} message  error message
     * @return {this} this
     */
    email(message?: string): this;
    /**
     * Validate value pattern is date
     * @param {string} message  error message
     * @return {this} this
     */
    date(message?: string): this;
    /**
     * Validate value with a regex string for new RegExp
     * @param {string} regexRule regex
     * @param {string} message  error message
     * @return {this} this
     */
    regex(regexRule: string, message?: string): this;
    /**
     * Validate value with a regex string for new RegExp *opposite method regex
     * @param {string} regexRule regex
     * @param {string} message  error message
     * @return {this} this
     */
    regexOpposite(regexRule: string, message?: string): this;
    /**
     * Validate value confirm like some value target with a key
     * @param {string} key key name for compare
     * @param {string} message  error message
     * @return {this} this
     */
    confirm(key: string, message?: string): this;
    /**
     * Validate value has length not higher than max length
     * @param {number} limit limit characters , if array max length of array
     * @param {string} message  error message
     * @return {this} this
     */
    maxLength(limit: number, message?: string): this;
    /**
     * Validate value has length not lower than min length
     * @param {number} limit limit characters , if array min length of array
     * @param {string} message  error message
     * @return {this} this
     */
    minLength(limit: number, message?: string): this;
    /**
     * Validate value has length not higher than max length
     * @param {number} limit limit characters
     * @param {string} message  error message
     * @return {this} this
     */
    max(limit: number, message?: string): this;
    /**
     * Validate value has length not lower than min length
     * @param {number} limit limit characters
     * @param {string} message  error message
     * @return {this} this
     */
    min(limit: number, message?: string): this;
    /**
     * Validate value in lists of enum values
     * @param {array} data between data
     * @param {string} message  error message
     * @return {this} this
     */
    enum(data: Array<string>, message?: string): this;
    /**
     * Validate value type of Boolean
     * @param {string} message  error message
     * @return {this} this
     */
    boolean(message?: string): this;
    /**
     * if has 1 arguments. default message = callback
     * @param {string} message
     * @param {function | undefined} cb callback Rule for validate values
     * @return {this} this
     */
    object(cb: Function, message?: string): this;
    /**
     * if has 1 arguments. default message = callback
     * @param {string} message
     * @param {function | undefined} cb callback Rule for validate values
     * @return {this} this
     */
    arrayObject(cb: Function, message?: string): this;
    /**
     * if condition is a true will be validate of data.
     * @param {string} condition
     * @param {function | undefined} cb callback Rule for validate values
     * @param {string} message
     * @return {this} this
     */
    when(condition: string | number | undefined | null | Boolean, cb: Function, message?: string): this;
    customFunction(condition: string | number | undefined | null | Boolean, cb: Function, message?: string): this;
    /**
     * not a validate of data
     * @return {this} this
     */
    optional(): this;
    toString(): this;
}
export interface Rule {
    new (): RuleValidate;
}
export interface Rules {
    new (): RuleValidate;
}
export declare class Validate {
    private ERROR_MESSAGES;
    private ERRORS;
    private REQUESTS;
    /**
     * Create a validate
     * @param {object} data {object} for validation
     * @example
     *  import { Rule, Validate } from 'tspace-utils'
     *  const v = new Validate(data)
     *
     *  v.check((Rule : Rule) => {
     *       return {
     *           username : new Rule().required().min(6),
     *           password : new Rule().required()
     *       }
     *   })
     *
     *  if(v.fails()) {
     *       console.log(v.errorsToString())
     *       console.log(v.errors())
     *       throw ...
     *  }
    */
    constructor(data: object);
    /**
     *
     * check data is correct in the rule validation
     * @param {Rule} callback callback Rule for validation
     * @return {this} this
     */
    check: (callback: Function) => void;
    /**
     *
     * check data promise is correct in the rule validation
     * @param {Rule} callback callback Rule for validation
     * @return {this} this
     */
    checkPromise: (callback: Function) => Promise<void>;
    /**
     *
     * @return {boolean} boolean
     */
    fails: () => boolean;
    /**
     *
     * @return {object} object
     */
    errors: () => object;
    errorsMessage: () => string[];
    /**
     *
     * @return {string} string
     */
    errorsToString: () => string;
    private _validate;
    private _validatePromise;
    private _checkRules;
    private _type;
    private _typeObject;
    private _isEmpty;
    private _errorValidate;
    private _when;
    private _object;
    private _arrayObject;
    private _boolean;
    private _required;
    private _string;
    private _number;
    private _numberStrict;
    private _array;
    private _date;
    private _email;
    private _regex;
    private _regexOpposite;
    private _enum;
    private _max;
    private _min;
    private _maxLength;
    private _minLength;
    private _confirm;
}
export declare class Validator extends Validate {
}
export {};
