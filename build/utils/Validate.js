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
exports.Validator = exports.Validate = void 0;
var RULE_TYPE;
(function (RULE_TYPE) {
    RULE_TYPE["STRING"] = "string";
    RULE_TYPE["ARRAY"] = "array";
    RULE_TYPE["ARRAY_OBJECT"] = "array object";
    RULE_TYPE["OBJECT"] = "object";
    RULE_TYPE["BOOLEAN"] = "boolean";
    RULE_TYPE["COMFIRM"] = "confirm";
    RULE_TYPE["NUMBER"] = "number";
    RULE_TYPE["NUMBER_STRICT"] = "number strict";
    RULE_TYPE["DATE"] = "date";
    RULE_TYPE["MAX"] = "max";
    RULE_TYPE["MIN"] = "min";
    RULE_TYPE["EMAIL"] = "email";
    RULE_TYPE["REQUIRED"] = "required";
    RULE_TYPE["REGEX"] = "regex";
    RULE_TYPE["OPPOSITE_REGEX"] = "opposite regex ";
    RULE_TYPE["ENUM"] = "enum";
    RULE_TYPE["WHEN"] = "when";
    RULE_TYPE["OPTIONAL"] = "optional";
    RULE_TYPE["MAX_LENGTH"] = "max length";
    RULE_TYPE["MIN_LENGTH"] = "min length";
})(RULE_TYPE || (RULE_TYPE = {}));
class RuleValidate {
    constructor() {
        this.RULES = [];
        this.MESSAGES = [];
    }
    _pushMessage(message) {
        this.MESSAGES = [...this.MESSAGES, message];
        return;
    }
    _pushRule(rule) {
        this.RULES = [...this.RULES, rule];
        return;
    }
    /**
     * The 'required' method is used to validate required value. value is not empty.
     *
     * @param {string} message  error message
     * @return {this} this
     */
    required(message = '') {
        this._pushRule(RULE_TYPE.REQUIRED);
        this._pushMessage(message);
        return this;
    }
    /**
     * The 'number' method is used to validate value is Number only can be types string or number.
     *
     * @param {string} message  error message
     * @return {this} this
     */
    number(message = '') {
        this._pushRule(RULE_TYPE.NUMBER);
        this._pushMessage(message);
        return this;
    }
    /**
     * The 'numberStrict' method is used to validate value type of Number only
     * @param {string} message  error message
     * @return {this} this
     */
    numberStrict(message = '') {
        this._pushRule(RULE_TYPE.NUMBER_STRICT);
        this._pushMessage(message);
        return this;
    }
    /**
     * The 'string' method is used to validate that value pattern is string
     *
     * @param {string} message  error message
     * @return {this} this
     */
    string(message = '') {
        this._pushRule(RULE_TYPE.STRING);
        this._pushMessage(message);
        return this;
    }
    /**
     * The 'array' method is used to validate that value pattern is array.
     *
     * @param {string} message  error message
     * @return {this} this
     */
    array(message = '') {
        this._pushRule(RULE_TYPE.ARRAY);
        this._pushMessage(message);
        return this;
    }
    /**
     * The 'email' method is used to validate that value pattern is email.
     *
     * @param {string} message  error message
     * @return {this} this
     */
    email(message = '') {
        this._pushRule(RULE_TYPE.EMAIL);
        this._pushMessage(message);
        return this;
    }
    /**
     * The 'date' method is used to  validate that the value pattern is a date.
     *
     * @param {string} message  error message
     * @return {this} this
     */
    date(message = '') {
        this._pushRule(RULE_TYPE.DATE);
        this._pushMessage(message);
        return this;
    }
    /**
     * The 'regex' method is used to validate value with a regex string for new RegExp
     * @param {string} regexRule regex
     * @param {string} message  error message
     * @return {this} this
     */
    regex(regexRule, message = '') {
        this._pushRule(`${RULE_TYPE.REGEX}:${regexRule}`);
        this._pushMessage(message);
        return this;
    }
    /**
     * The 'regexOpposite' method is used to validate value with a regex string for new RegExp *opposite method regex
     * @param {string} regexRule regex
     * @param {string} message  error message
     * @return {this} this
     */
    regexOpposite(regexRule, message = '') {
        this._pushRule(`${RULE_TYPE.OPPOSITE_REGEX}:${regexRule}`);
        this._pushMessage(message);
        return this;
    }
    /**
     * The 'confirm' method is used to validate value confirm like some value target with a key
     * @param {string} key key name for compare
     * @param {string} message  error message
     * @return {this} this
     */
    confirm(key, message = '') {
        this._pushRule(`${RULE_TYPE.COMFIRM}:${key}`);
        this._pushMessage(message);
        return this;
    }
    /**
     * The 'maxLength' method is used to validate value has length not higher than max length.
     *
     * @param {number} limit limit characters , if array max length of array
     * @param {string} message  error message
     * @return {this} this
     */
    maxLength(limit, message = '') {
        this._pushRule(`${RULE_TYPE.MAX_LENGTH}:${limit}`);
        this._pushMessage(message);
        return this;
    }
    /**
     * The 'minLength' method is used to validate value has length not lower than min length.
     *
     * @param {number} limit limit characters , if array min length of array
     * @param {string} message  error message
     * @return {this} this
     */
    minLength(limit, message = '') {
        this._pushRule(`${RULE_TYPE.MIN_LENGTH}:${limit}`);
        this._pushMessage(message);
        return this;
    }
    /**
     * The 'max' method is used to validate value has length not higher than max length.
     *
     * @param {number} limit limit characters
     * @param {string} message  error message
     * @return {this} this
     */
    max(limit, message = '') {
        this._pushRule(`${RULE_TYPE.MAX}:${limit}`);
        this._pushMessage(message);
        return this;
    }
    /**
     * The 'min' method is used to validate value has length not lower than min length
     * @param {number} limit limit characters
     * @param {string} message  error message
     * @return {this} this
     */
    min(limit, message = '') {
        this._pushRule(`${RULE_TYPE.MIN}:${limit}`);
        this._pushMessage(message);
        return this;
    }
    /**
     * The 'enum' method is used to validate value in lists of enum values
     * @param {array} data between data
     * @param {string} message  error message
     * @return {this} this
     */
    enum(data, message = '') {
        this._pushRule(`${RULE_TYPE.ENUM}:${data}`);
        this._pushMessage(message);
        return this;
    }
    /**
     * The 'required' method is used to validate value type of Boolean
     *
     * @param {string} message  error message
     * @return {this} this
     */
    boolean(message = '') {
        this._pushRule(RULE_TYPE.BOOLEAN);
        this._pushMessage(message);
        return this;
    }
    /**
     * The 'object' method is used to validate keys values in the object
     *
     * if has 1 arguments. default message = callback
     * @param {string} message
     * @param {function | undefined} cb callback Rule for validate values
     * @return {this} this
     */
    object(cb, message = '') {
        if (typeof cb !== 'function')
            throw new Error('Invalid callback');
        const rule = cb(RuleValidate);
        this._pushRule(RULE_TYPE.OBJECT);
        this._pushMessage(message);
        this.NEST_RULES = Object.assign(Object.assign({}, this.NEST_RULES), rule);
        return this;
    }
    /**
     * The 'arrayObject' method is used to validate array properties of objects.
     *
     * if has 1 arguments. default message = callback
     * @param {string} message
     * @param {function | undefined} cb callback Rule for validate values
     * @return {this} this
     */
    arrayObject(cb, message = '') {
        if (typeof cb !== 'function')
            throw new Error('Invalid callback');
        const rule = cb(RuleValidate);
        this._pushRule(RULE_TYPE.ARRAY_OBJECT);
        this._pushMessage(message);
        this.NEST_RULES = Object.assign(Object.assign({}, this.NEST_RULES), rule);
        return this;
    }
    /**
     * The 'when' method is used to validate the rule when the condition is a true will be executed validation of data
     *
     * @param {string} condition
     * @param {function | undefined} cb callback Rule for validate values
     * @param {string} message
     * @return {this} this
     */
    when(condition, cb, message = '') {
        if (typeof cb !== 'function')
            throw new Error('Invalid callback');
        if (!condition)
            return this;
        const rule = cb(RuleValidate);
        this._pushRule(RULE_TYPE.WHEN);
        this._pushMessage(message);
        this.NEST_RULES = Object.assign(Object.assign({}, this.NEST_RULES), rule);
        return this;
    }
    /**
     * not a validate of data
     * @return {this} this
     */
    optional() {
        return this;
    }
    toString() {
        return this;
    }
}
class Validate {
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
    constructor(data) {
        this.ERROR_MESSAGES = [];
        this.ERRORS = {};
        this.REQUESTS = {};
        this.VALIDATE = {};
        /**
         *
         * check data is correct in the rule validation
         * @param {Rule} callback callback Rule for validation
         * @return {this} this
         */
        this.check = (callback) => {
            const callbackRule = callback(RuleValidate);
            if (!this._typeObject(callbackRule) || !this.REQUESTS)
                throw new Error('invalid rules');
            return this._validate(callbackRule);
        };
        /**
         *
         * check data promise is correct in the rule validation
         * @param {Rule} callback callback Rule for validation
         * @return {this} this
         */
        this.checkPromise = (callback) => __awaiter(this, void 0, void 0, function* () {
            const callbackRule = callback(RuleValidate);
            if (!this._typeObject(callbackRule) || !this.REQUESTS)
                throw new Error('invalid rules');
            return yield this._validatePromise(callbackRule);
        });
        /**
         *
         * @return {boolean} boolean
         */
        this.fails = () => { var _a, _b; return (_b = !!((_a = Object.keys(this.ERRORS)) === null || _a === void 0 ? void 0 : _a.length)) !== null && _b !== void 0 ? _b : true; };
        /**
         *
         * @return {object} object
         */
        this.errors = () => this.ERRORS;
        this.errorsMessage = () => this.ERROR_MESSAGES;
        /**
         *
         * @return {string} string
         */
        this.errorsToString = () => JSON.stringify(this.ERRORS, null, 2);
        this._checkRules = ({ requests, rule, reqInput, message, nestRules }) => {
            var _a, _b, _c;
            if (rule === RULE_TYPE.STRING) {
                return this._string(reqInput, message);
            }
            if (rule === RULE_TYPE.EMAIL) {
                return this._email(reqInput, message);
            }
            if (rule === RULE_TYPE.NUMBER) {
                return this._number(reqInput, message);
            }
            if (rule === RULE_TYPE.NUMBER_STRICT) {
                return this._numberStrict(reqInput, message);
            }
            if (rule === RULE_TYPE.DATE) {
                return this._date(reqInput, message);
            }
            if (rule === RULE_TYPE.BOOLEAN) {
                return this._boolean(reqInput, message);
            }
            if (rule === RULE_TYPE.ARRAY) {
                return this._array(reqInput, message);
            }
            if (rule === RULE_TYPE.OBJECT) {
                return this._object(nestRules, reqInput, message);
            }
            if (rule === RULE_TYPE.ARRAY_OBJECT) {
                return this._arrayObject(nestRules, reqInput, message);
            }
            if (rule === RULE_TYPE.WHEN) {
                return this._when(nestRules, reqInput, message);
            }
            if (rule === RULE_TYPE.REQUIRED) {
                return this._required(reqInput, message);
            }
            if (this._ruleEqual(rule, RULE_TYPE.COMFIRM)) {
                return this._confirm(requests, reqInput, (_a = rule === null || rule === void 0 ? void 0 : rule.split(`${RULE_TYPE.COMFIRM}:`)) === null || _a === void 0 ? void 0 : _a.pop(), message);
            }
            if (this._ruleEqual(rule, RULE_TYPE.REGEX)) {
                return this._regex(reqInput, rule === null || rule === void 0 ? void 0 : rule.split(`${RULE_TYPE.REGEX}:`).pop(), message);
            }
            if (this._ruleEqual(rule, RULE_TYPE.OPPOSITE_REGEX)) {
                return this._regexOpposite(reqInput, rule === null || rule === void 0 ? void 0 : rule.split(`${RULE_TYPE.OPPOSITE_REGEX}:`).pop(), message);
            }
            if (this._ruleEqual(rule, RULE_TYPE.ENUM)) {
                return this._enum(reqInput, (_c = (_b = rule === null || rule === void 0 ? void 0 : rule.split(`${RULE_TYPE.ENUM}:`)) === null || _b === void 0 ? void 0 : _b.pop()) === null || _c === void 0 ? void 0 : _c.split(','), message);
            }
            if (this._ruleEqual(rule, RULE_TYPE.MAX_LENGTH)) {
                return this._maxLength(reqInput, rule === null || rule === void 0 ? void 0 : rule.split(`${RULE_TYPE.MAX_LENGTH}:`).pop(), message);
            }
            if (this._ruleEqual(rule, RULE_TYPE.MAX)) {
                return this._max(reqInput, rule === null || rule === void 0 ? void 0 : rule.split(`${RULE_TYPE.MAX}:`).pop(), message);
            }
            if (this._ruleEqual(rule, RULE_TYPE.MIN_LENGTH)) {
                return this._minLength(reqInput, rule.split(`${RULE_TYPE.MIN_LENGTH}:`).pop(), message);
            }
            if (this._ruleEqual(rule, RULE_TYPE.MIN)) {
                return this._min(reqInput, rule.split(`${RULE_TYPE.MIN}:`).pop(), message);
            }
            return null;
        };
        this._type = (data) => Object.prototype.toString.apply(data).slice(8, -1);
        this._typeObject = (data) => this._type(data) === 'Object';
        this._isEmpty = (value) => {
            const valueIsType = (Object.prototype.toString.apply(value).slice(8, -1)).toLowerCase();
            switch (valueIsType) {
                case 'array': {
                    if (!value.length)
                        return true;
                    return false;
                }
                case 'object': {
                    if (!Object.keys(value).length)
                        return true;
                    return false;
                }
                case 'string': {
                    if (value === '')
                        return true;
                    return false;
                }
                case 'null':
                case 'undefined': {
                    if (value == null)
                        return true;
                    return false;
                }
                default: {
                    return false;
                }
            }
        };
        this._when = (rules, data, _) => {
            var _a;
            const validate = new Validate(data);
            validate._validate(rules);
            if (validate.errorsMessage().length)
                return validate.errorsMessage();
            if ((_a = Object.keys(validate.errors())) === null || _a === void 0 ? void 0 : _a.length)
                return validate.errors();
            return null;
        };
        this._object = (rules, data, message) => {
            var _a;
            if (this._type(data) !== 'Object') {
                return ([message === '' ? 'object only' : message]);
            }
            const validate = new Validate(data);
            validate._validate(rules);
            if ((_a = Object.keys(validate.errors())) === null || _a === void 0 ? void 0 : _a.length)
                return validate.errors();
            return null;
        };
        this._arrayObject = (rules, data, message) => {
            if (this._type(data) !== 'Array') {
                return [message === '' ? 'Array only' : message];
            }
            let errors = [];
            for (const index in data) {
                const element = data[index];
                const validate = new Validate(element);
                validate._validate(rules);
                if (!Object.keys(validate.errors()).length)
                    continue;
                errors.push(Object.assign({ index: Number(index) }, validate.errors()));
            }
            if (Object.keys(errors).length)
                return errors;
            return null;
        };
        this._boolean = (reqInput, message) => {
            if (this._isEmpty(message))
                message = `must be boolean only`;
            if (typeof reqInput !== "boolean")
                return message;
            return null;
        };
        this._required = (reqInput, message) => {
            if (this._isEmpty(message))
                message = `must be required`;
            if (this._isEmpty(reqInput))
                return message;
            return null;
        };
        this._string = (reqInput, message) => {
            if (this._isEmpty(message))
                message = `must be string only`;
            if (Array.isArray(reqInput)) {
                if (!reqInput.every(r => typeof r === 'string'))
                    return message;
                return null;
            }
            if (typeof reqInput !== 'string')
                return message;
            return null;
        };
        this._number = (reqInput, message) => {
            const regex = /^\d+$/;
            if (this._isEmpty(message))
                message = `must be number only`;
            if (Array.isArray(reqInput)) {
                if (!reqInput.every(r => regex.test(r)))
                    return message;
                return null;
            }
            if (!regex.test(reqInput))
                return message;
            return null;
        };
        this._numberStrict = (reqInput, message) => {
            if (this._isEmpty(message))
                message = `must be number only`;
            if (Array.isArray(reqInput)) {
                if (!reqInput.every(r => typeof r === 'number'))
                    return message;
                return null;
            }
            if (typeof reqInput !== 'number')
                return message;
            return null;
        };
        this._array = (reqInput, message) => {
            if (this._isEmpty(message))
                message = `must be array only`;
            if (!Array.isArray(reqInput))
                return message;
            return null;
        };
        this._date = (reqInput, message) => {
            const regex = /\d{4}-\d{2}-\d{2}/;
            if (this._isEmpty(message))
                message = `must be valid ( YYYY-MM-DD)!`;
            if (!regex.test(reqInput))
                return message;
            return null;
        };
        this._email = (reqInput, message) => {
            const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (this._isEmpty(message))
                message = `email is invalid type email`;
            if (!regex.test(reqInput))
                return message;
            return null;
        };
        this._regex = (reqInput, rawRegex, message) => {
            const regexRule = new RegExp(rawRegex);
            if (this._isEmpty(message))
                message = `must not be regex ${rawRegex} in characters`;
            if (regexRule.test(reqInput))
                return message;
            return null;
        };
        this._regexOpposite = (reqInput, rawRegex, message) => {
            const regexRule = new RegExp(rawRegex);
            if (this._isEmpty(message))
                message = `must not be regex ${rawRegex} in characters`;
            if (!regexRule.test(reqInput))
                return message;
            return null;
        };
        this._enum = (reqInput, enumLists, message) => {
            if (this._isEmpty(message))
                message = `must be in lists ${enumLists.map(e => `'${e}'`).join(', ')} only`;
            if (Array.isArray(reqInput)) {
                if (!reqInput.some(r => enumLists.includes(r)))
                    return message;
                return null;
            }
            if (!enumLists.some(d => d === reqInput))
                return message;
            return null;
        };
        this._max = (reqInput, max, message) => {
            if (this._isEmpty(message))
                message = `maximum ${max} characters`;
            if (Array.isArray(reqInput)) {
                if (reqInput.some(r => (r === null || r === void 0 ? void 0 : r.length) > max))
                    return message;
                return null;
            }
            if ((reqInput === null || reqInput === void 0 ? void 0 : reqInput.length) > max)
                return message;
            return null;
        };
        this._min = (reqInput, min, message) => {
            if (this._isEmpty(message))
                message = `minimum ${min} characters`;
            if (Array.isArray(reqInput)) {
                if (reqInput.some(r => (r === null || r === void 0 ? void 0 : r.length) < min || r == null))
                    return message;
                return null;
            }
            if ((reqInput === null || reqInput === void 0 ? void 0 : reqInput.length) < min || reqInput == null)
                return message;
            return null;
        };
        this._maxLength = (reqInput, max, message) => {
            if (this._isEmpty(message))
                message = `maximum ${max} length of characters`;
            if (Array.isArray(reqInput)) {
                if (reqInput.length > max)
                    return message;
                return null;
            }
            if ((reqInput === null || reqInput === void 0 ? void 0 : reqInput.length) > max)
                return message;
            return null;
        };
        this._minLength = (reqInput, min, message) => {
            if (this._isEmpty(message))
                message = `minimum ${min} length of characters`;
            if (Array.isArray(reqInput)) {
                if (reqInput.length < min)
                    return message;
                return null;
            }
            if ((reqInput === null || reqInput === void 0 ? void 0 : reqInput.length) < min || reqInput == null)
                return message;
            return null;
        };
        this._confirm = (data, reqInput, key, message) => {
            const compare = reqInput === data[key];
            if (this._isEmpty(message))
                message = `not match`;
            if (!compare)
                return message;
            return null;
        };
        this.REQUESTS = data;
    }
    _validate(dataRules) {
        var _a;
        const requests = this.REQUESTS;
        let errorValidate = {};
        const { RULES, MESSAGES, NEST_RULES } = dataRules;
        if (RULES != null && MESSAGES != null) {
            for (const index in RULES) {
                let message = MESSAGES[index];
                const rule = RULES[index];
                const error = this._checkRules({
                    requests,
                    rule,
                    reqInput: requests,
                    message,
                    nestRules: NEST_RULES
                });
                if (error == null)
                    continue;
                this.ERROR_MESSAGES.push(String(error));
            }
            return;
        }
        for (const [property, rawRules] of Object.entries(dataRules)) {
            const reqInput = requests[property];
            if (!rawRules)
                throw new Error('invalid rules');
            if (Array.isArray(rawRules)) {
                for (const rawRule of rawRules) {
                    if (typeof rawRule === 'function') {
                        const r = rawRule(reqInput);
                        if (r == null)
                            continue;
                        errorValidate = this._errorValidate(errorValidate, property, r);
                        continue;
                    }
                    const { RULES, MESSAGES, NEST_RULES } = rawRule;
                    for (const index in RULES) {
                        let message = MESSAGES[index];
                        const rule = RULES[index];
                        const error = this._checkRules({
                            requests,
                            rule,
                            reqInput,
                            message,
                            nestRules: NEST_RULES
                        });
                        if (error == null)
                            continue;
                        errorValidate = this._errorValidate(errorValidate, property, error);
                    }
                }
            }
            const { RULES, MESSAGES, NEST_RULES } = dataRules[property];
            if ([RULES, MESSAGES, NEST_RULES].every(v => v == null)) {
                if (typeof rawRules === 'function') {
                    const r = rawRules(reqInput);
                    if (r == null)
                        continue;
                    errorValidate = this._errorValidate(errorValidate, property, r !== null && r !== void 0 ? r : 'error message');
                }
            }
            for (const index in RULES) {
                let message = MESSAGES[index];
                const rule = RULES[index];
                const error = this._checkRules({
                    requests,
                    rule,
                    reqInput,
                    message,
                    nestRules: NEST_RULES
                });
                if (error == null)
                    continue;
                errorValidate = this._errorValidate(errorValidate, property, error);
            }
        }
        if ((_a = Object.keys(errorValidate)) === null || _a === void 0 ? void 0 : _a.length) {
            this.ERRORS = errorValidate;
        }
        return;
    }
    _validatePromise(dataRules) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const requests = this.REQUESTS;
            let errorValidate = {};
            const { RULES, MESSAGES, NEST_RULES } = dataRules;
            if (RULES != null && MESSAGES != null) {
                for (const index in RULES) {
                    let message = MESSAGES[index];
                    const rule = RULES[index];
                    const error = this._checkRules({
                        requests,
                        rule,
                        reqInput: requests,
                        message,
                        nestRules: NEST_RULES
                    });
                    if (error == null)
                        continue;
                    this.ERROR_MESSAGES.push(String(error));
                }
                return;
            }
            for (const [property, rawRules] of Object.entries(dataRules)) {
                if (!rawRules)
                    throw new Error('invalid rules');
                const reqInput = requests[property];
                if (Array.isArray(rawRules)) {
                    for (const rawRule of rawRules) {
                        if (typeof rawRule === 'function') {
                            const r = yield rawRule(reqInput);
                            if (r == null)
                                continue;
                            errorValidate = this._errorValidate(errorValidate, property, r !== null && r !== void 0 ? r : 'error message');
                            continue;
                        }
                        const { RULES, MESSAGES, NEST_RULES } = rawRule;
                        for (const index in RULES) {
                            let message = MESSAGES[index];
                            const rule = RULES[index];
                            const error = this._checkRules({
                                requests,
                                rule,
                                reqInput,
                                message,
                                nestRules: NEST_RULES
                            });
                            if (error == null)
                                continue;
                            errorValidate = this._errorValidate(errorValidate, property, error);
                        }
                    }
                }
                const { RULES, MESSAGES, NEST_RULES } = dataRules[property];
                if ([RULES, MESSAGES, NEST_RULES].every(v => v == null)) {
                    if (typeof rawRules === 'function') {
                        const r = yield rawRules(reqInput);
                        if (r == null)
                            continue;
                        errorValidate = this._errorValidate(errorValidate, property, r !== null && r !== void 0 ? r : 'error message');
                    }
                }
                for (const index in RULES) {
                    let message = MESSAGES[index];
                    const rule = RULES[index];
                    const error = this._checkRules({
                        requests,
                        rule,
                        reqInput,
                        message,
                        nestRules: NEST_RULES
                    });
                    if (error == null)
                        continue;
                    errorValidate = this._errorValidate(errorValidate, property, error);
                }
            }
            if ((_a = Object.keys(errorValidate)) === null || _a === void 0 ? void 0 : _a.length) {
                this.ERRORS = errorValidate;
            }
            return;
        });
    }
    _ruleEqual(rule, type) {
        return (rule === null || rule === void 0 ? void 0 : rule.split(':')[0]) === type;
    }
    _errorValidate(errors, property, err) {
        return errors = Object.assign(Object.assign({}, errors), { [property]: errors.hasOwnProperty(property)
                ? [...errors[property], err]
                : Array.isArray(err) ? err : [err] });
    }
}
exports.Validate = Validate;
class Validator extends Validate {
}
exports.Validator = Validator;
