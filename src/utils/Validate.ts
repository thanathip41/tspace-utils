enum RULE_TYPE {
    STRING = 'string',
    ARRAY = 'array',
    ARRAY_OBJECT = 'array object',
    OBJECT = 'object',
    BOOLEAN = 'boolean',
    COMFIRM = 'confirm',
    NUMBER = 'number',
    NUMBER_STRICT = 'number strict',
    DATE = 'date',
    MAX = 'max',
    MIN = 'min',
    EMAIL = 'email',
    REQUIRED = 'required',
    REGEX = 'regex',
    UUID = 'uuid',
    OPPOSITE_REGEX = 'opposite regex ',
    ENUM = 'enum',
    MIMETYPE = 'mimetype',
    SIZE = 'size',
    WHEN = 'when',
    OPTIONAL = 'optional',
    MAX_LENGTH = 'max length',
    MIN_LENGTH = 'min length',
}

type RuleCallback = (Rule : Rule) => Record<string , RuleValidate | Function | (RuleValidate | Function)[]> | RuleValidate
class RuleValidate {
    private RULES : string[] = []
    private RAWS : any[] = []
    private MESSAGES: string[] = []
    private NEST_RULES : {} | undefined

    private _pushMessage (message : string) : void {
        this.MESSAGES = [ ...this.MESSAGES, message]
        return
    }

    private _pushRaw (raw : any) : void {
        this.RAWS = [ ...this.RAWS, raw]
        return
    }

    private _pushRule (rule : string) : void {
        this.RULES = [ ...this.RULES, rule]
        return
    }

    /**
     * The 'required' method is used to validate required value. value is not empty.
     * 
     * @param {string} message  error message 
     * @return {this} this
     */
    required (message : string = ''): this {
        this._pushRule(RULE_TYPE.REQUIRED)
        this._pushMessage(message)
        this._pushRaw(null)

        return this
    }

    /**
     * The 'number' method is used to validate value is Number only can be types string or number. 
     * 
     * @param {string} message  error message 
     * @return {this} this
     */
    number (message : string = ''): this {
        this._pushRule(RULE_TYPE.NUMBER)
        this._pushMessage(message)
        this._pushRaw(null)

        return this
    }

    /**
     * The 'numberStrict' method is used to validate value type of Number only
     * 
     * @param {string} message  error message 
     * @return {this} this
     */
    numberStrict (message : string = ''): this {
        this._pushRule(RULE_TYPE.NUMBER_STRICT)
        this._pushMessage(message)
        this._pushRaw(null)

        return this
    }

    /**
     * The 'string' method is used to validate that value pattern is string
     * 
     * @param {string} message  error message 
     * @return {this} this
     */
    string (message : string = ''): this {
        this._pushRule(RULE_TYPE.STRING)
        this._pushMessage(message)
        this._pushRaw(null)

        return this
    }

    /**
     * The 'uuid' method is used to validate that value pattern is uuid
     * 
     * @param {string} message  error message 
     * @return {this} this
     */
     uuid (message : string = ''): this {
        this._pushRule(RULE_TYPE.UUID)
        this._pushMessage(message)
        this._pushRaw(null)

        return this
    }

    /**
     * The 'array' method is used to validate that value pattern is array.
     * 
     * @param {string} message  error message 
     * @return {this} this
     */
    array (cb ?: RuleCallback ,message : string = '') : this {

        if(cb == null) {
            this._pushRule(RULE_TYPE.ARRAY)
            this._pushMessage(message)
            this._pushRaw(null)

            return this
        }
        if(typeof cb !== 'function') throw new Error('Invalid callback')

        const rule  = cb(RuleValidate)
        this._pushRule(RULE_TYPE.ARRAY)
        this._pushMessage(message)
        this._pushRaw(null)
        this.NEST_RULES = {...this.NEST_RULES , ...rule}

        return this
    }

    /**
     * The 'arrayObject' method is used to validate array properties of objects.
     * 
     * if has 1 arguments. default message = callback
     * @param {string} message 
     * @param {function | undefined} cb callback Rule for validate values
     * @return {this} this
     */
    arrayObject (cb : RuleCallback, message : string = '') : this {

        if(typeof cb !== 'function') throw new Error('Invalid callback')

        const rule = cb(RuleValidate)
        this._pushRule(RULE_TYPE.ARRAY_OBJECT)
        this._pushMessage(message)
        this._pushRaw(null)
        this.NEST_RULES = {...this.NEST_RULES , ...rule}

        return this
    }

    /**
     * The 'email' method is used to validate that value pattern is email.
     * 
     * @param {string} message  error message 
     * @return {this} this
     */
    email (message : string = ''): this {
        this._pushRule(RULE_TYPE.EMAIL)
        this._pushMessage(message)
        this._pushRaw(null)

        return this
    }

    /**
     * The 'date' method is used to  validate that the value pattern is a date.
     * 
     * @param {string} message  error message 
     * @return {this} this
     */
    date (message: string = ''): this {
        this._pushRule(RULE_TYPE.DATE)
        this._pushMessage(message)
        this._pushRaw(null)

        return this
    }
    /**
     * The 'regex' method is used to validate value with a regex string for new RegExp
     * 
     * @param {string} regexRule regex
     * @param {string} message  error message 
     * @return {this} this
     */
    regex (regexRule : string | RegExp , message : string = ''): this {
        this._pushRule(`${RULE_TYPE.REGEX}:${regexRule}`)
        this._pushMessage(message)
        this._pushRaw(regexRule)

        return this
    }

    /**
     * The 'regexOpposite' method is used to validate value with a regex string for new RegExp *opposite method regex
     * 
     * @param {string} regexRule regex
     * @param {string} message  error message 
     * @return {this} this
     */
    regexOpposite (regexRule : string | RegExp, message : string = ''): this {
        this._pushRule(`${RULE_TYPE.OPPOSITE_REGEX}:${regexRule}`)
        this._pushMessage(message)
        this._pushRaw(regexRule)

        return this
    }
    /**
     * The 'confirm' method is used to validate value confirm like some value target with a key
     * 
     * @param {string} key key name for compare
     * @param {string} message  error message 
     * @return {this} this
     */
    confirm (key : string , message : string = ''): this  {
        this._pushRule(`${RULE_TYPE.COMFIRM}:${key}`)
        this._pushMessage(message)
        this._pushRaw(null)

        return this
    }

    /**
     * The 'size' method is used to validate size of file with bytes.
     * 
     * @param {number} limit limit size of file bytes
     * @param {string} message  error message 
     * @return {this} this
     */
    size (limit : number, message : string = '') : this {
        this._pushRule(`${RULE_TYPE.SIZE}:${limit}`)
        this._pushMessage(message)
        this._pushRaw(null)
       
        return this
    }
    /**
     * The 'maxLength' method is used to validate value has length not higher than max length.
     * 
     * @param {number} limit limit characters , if array max length of array
     * @param {string} message  error message 
     * @return {this} this
     */
    maxLength (limit : number, message : string = '') : this {
        this._pushRule(`${RULE_TYPE.MAX_LENGTH}:${limit}`)
        this._pushMessage(message)
        this._pushRaw(null)
 
        return this
    }

    /**
     * The 'minLength' method is used to validate value has length not lower than min length.
     * 
     * @param {number} limit limit characters , if array min length of array
     * @param {string} message  error message 
     * @return {this} this
     */
    minLength (limit : number, message : string = '') : this {
        this._pushRule(`${RULE_TYPE.MIN_LENGTH}:${limit}`)
        this._pushMessage(message)
        this._pushRaw(null)
       
        return this
    }
    /**
     * The 'max' method is used to validate value has length not higher than max length.
     * 
     * @param {number} limit limit characters
     * @param {string} message  error message 
     * @return {this} this
     */
    max (limit : number, message : string = '') : this {
        this._pushRule(`${RULE_TYPE.MAX}:${limit}`)
        this._pushMessage(message)
        this._pushRaw(null)
       
        return this
    }
    /**
     * The 'min' method is used to validate value has length not lower than min length
     * @param {number} limit limit characters
     * @param {string} message  error message 
     * @return {this} this
     */
    min (limit : number, message: string = ''): this {
        this._pushRule(`${RULE_TYPE.MIN}:${limit}`)
        this._pushMessage(message)
        this._pushRaw(null)

        return this
    }

    /**
     * The 'enum' method is used to validate value in lists of enum values
     * @param {array} data between data
     * @param {string} message  error message 
     * @return {this} this
     */
    enum (data : string[] , message : string = ''): this {
        this._pushRule( `${RULE_TYPE.ENUM}:${data}`)
        this._pushMessage(message)
        this._pushRaw(null)

        return this
    }

    /**
     * The 'mimetype' method is used to validate file in lists of mimetype
     * @param {array} data between data
     * @param {string} message  error message 
     * @return {this} this
     */
    mimetype (data : string[] , message : string = ''): this {
        this._pushRule( `${RULE_TYPE.MIMETYPE}:${data}`)
        this._pushMessage(message)
        this._pushRaw(null)

        return this
    }

    /**
     * The 'required' method is used to validate value type of Boolean
     * 
     * @param {string} message  error message
     * @return {this} this
     */
    boolean (message : string = '') : this{
      this._pushRule(RULE_TYPE.BOOLEAN )
      this._pushMessage(message)
      this._pushRaw(null)

      return this
    }

    /**
     * The 'object' method is used to validate keys values in the object
     * 
     * if has 1 arguments. default message = callback
     * @param {string} message 
     * @param {function | undefined} cb callback Rule for validate values
     * @return {this} this
     */
    object (cb : RuleCallback ,message : string = '') : this {

        if(typeof cb !== 'function') throw new Error('Invalid callback')

        const rule = cb(RuleValidate)
        this._pushRule(RULE_TYPE.OBJECT)
        this._pushMessage(message)
        this._pushRaw(null)
        this.NEST_RULES = {...this.NEST_RULES , ...rule}

        return this
    }

    /**
     * The 'when' method is used to validate the rule when the condition is a true will be executed validation of data
     * 
     * @param {string} condition
     * @param {function | undefined} cb callback Rule for validate values
     * @param {string} message
     * @return {this} this
     */
    when (condition : string | number | undefined | null | Boolean , cb : RuleCallback, message : string = '') : this {

        if(typeof cb !== 'function') throw new Error('Invalid callback')
        if(!condition) return this
        const rule = cb(RuleValidate)

        this._pushRule(RULE_TYPE.WHEN)
        this._pushMessage(message)
        this._pushRaw(null)
        this.NEST_RULES = {...this.NEST_RULES , ...rule}

        return this
    }

    /**
     * not a validate of data
     * @return {this} this
     */
    optional () : this {
        return this
    }

    toString() : this {
        return this
    }
}
  
/**
 * 
 * import { Rule } from 'tspace-utils'
 * 
 * return {
 *      username : new Rule().required().min(6),
 *      password : new Rule().required()
 * }
 */
export type Rule = {
    new(): RuleValidate
}

/**
 * 
 * import { Rules } from 'tspace-utils'
 * 
 * return {
 *      username : new Rules().required().min(6),
 *      password : new Rules().required()
 * }
 */
export type Rules = {
    new(): RuleValidate
}

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
export class Validate {
    private ERROR_MESSAGES :string[] = []
    private ERRORS :object = {}
    private REQUESTS :object = {}
    
    constructor(data: object){
        this.REQUESTS = data
    }

    /**
     * 
     * check data is correct in the rule validation
     * @param {Rule} callback callback Rule for validation
     * @return {this} this
     */
    check = (callback : RuleCallback): void => {

        const callbackRule = callback(RuleValidate)

        if(!this._typeObject(callbackRule) || !this.REQUESTS) throw new Error('The rules are invalid.')

        return this._validate(callbackRule)
    }
    
    /**
     * 
     * check data promise is correct in the rule validation
     * @param {Rule} callback callback Rule for validation
     * @return {this} this
     */
    checkPromise = async (callback : RuleCallback): Promise<void> => {

        const callbackRule = callback(RuleValidate)

        if(!this._typeObject(callbackRule) || !this.REQUESTS) throw new Error('The rules are invalid.')
        
        return await this._validatePromise(callbackRule)
    }

    /**
     * 
     * @return {boolean} boolean
     */
    fails = (): boolean => !!Object.keys(this.ERRORS)?.length || true

    /**
     * 
     * @return {object} object
     */
    errors = (): object => this.ERRORS

    errorsMessage = (): string[] => this.ERROR_MESSAGES

    /**
     * 
     * @return {string} string
     */
    errorsToString = (): string => JSON.stringify(this.ERRORS,null,2)

    errorsString = (): string => JSON.stringify(this.ERRORS,null,2)

    private _validate (dataRules : {[key: string]: any} ) : void {
        const requests: { [key: string]: any} = this.REQUESTS
 
        let errorValidate:{[key: string]: any} = {}

        const { RULES , MESSAGES , NEST_RULES  } = dataRules

        if(RULES != null && MESSAGES != null) {

            for(const index in RULES) {
                let message = MESSAGES[index]
                const rule = RULES[index]

                const error = this._checkRules({
                    requests,
                    rule,
                    reqInput : requests,
                    message,
                    nestRules: NEST_RULES
                })

                if(error == null) continue
                
                this.ERROR_MESSAGES.push(String(error))
            }

            return
        }

        for(const [property, rawRules] of Object.entries(dataRules)) {

            const { RULES , MESSAGES , NEST_RULES  } = dataRules[property]

            const reqInput : string = requests[property]

            if(!rawRules) throw new Error('invalid rules')

            if(Array.isArray(rawRules)) {
                for(const rawRule of rawRules) {
                    if(typeof rawRule === 'function') {
                    
                        const r : string | null = rawRule(reqInput)
                        if(r == null) continue
                        errorValidate = this._errorValidate(errorValidate,property, r)
                        continue
                    }

                    const { RULES , MESSAGES , NEST_RULES  } = rawRule

                    for(const index in RULES) {
                        let message = MESSAGES[index]
                        const rule = RULES[index]
        
                        const error = this._checkRules({
                            requests,
                            rule,
                            reqInput,
                            message,
                            nestRules : NEST_RULES
                        })
        
                        if(error == null) continue
        
                        errorValidate = this._errorValidate(errorValidate,property , error)
                    }
                }
            }

            if([RULES , MESSAGES , NEST_RULES].every(v=> v == null) && typeof rawRules === 'function') {
                const r : string | null = rawRules(reqInput)
                if(r == null) continue
                errorValidate = this._errorValidate(errorValidate,property, r ?? 'error message')
                continue
            }

            for(const index in RULES) {

                let message = MESSAGES[index]
                const rule = RULES[index]

                const error = this._checkRules({
                    requests,
                    rule,
                    reqInput,
                    message,
                    nestRules : NEST_RULES
                })

                if(error == null) continue

                errorValidate = this._errorValidate(errorValidate,property , error)
                
            }
        }

        if(Object.keys(errorValidate)?.length) {
            this.ERRORS = errorValidate
        }

        return 
    }

    private async _validatePromise (dataRules : {[key: string]: any} ) : Promise<void> {
        const requests: { [key: string]: any} = this.REQUESTS
        let errorValidate:{[key: string]: any} = {}

        const { RULES , MESSAGES , RAWS , NEST_RULES  } = dataRules

        if(RULES != null && MESSAGES != null) {

            for(const index in RULES) {
                let message = MESSAGES[index]
                const rule = RULES[index]

                const error = this._checkRules({
                    requests,
                    rule,
                    reqInput : requests,
                    message,
                    raw : RAWS[index],
                    nestRules: NEST_RULES
                })

                if(error == null) continue
                
                this.ERROR_MESSAGES.push(String(error))
            }

            return
        }

        for(const [property, rawRules] of Object.entries(dataRules)) {
            if(!rawRules) throw new Error('invalid rules')

            const reqInput : string = requests[property]

            if(Array.isArray(rawRules)) {
                for(const rawRule of rawRules) {
                    if(typeof rawRule === 'function') {
                    
                        const r : string | null = await rawRule(reqInput)
                        if(r == null) continue
                        errorValidate = this._errorValidate(errorValidate,property, r ?? 'error message')
                        continue
                    }

                    const { RULES , MESSAGES , NEST_RULES , RAWS  } = rawRule

                    for(const index in RULES) {
                        let message = MESSAGES[index]
                        const rule = RULES[index]
        
                        const error = this._checkRules({
                            requests,
                            rule,
                            reqInput,
                            raw : RAWS[index],
                            message,
                            nestRules : NEST_RULES
                        })
        
                        if(error == null) continue
        
                        errorValidate = this._errorValidate(errorValidate,property , error)
                    }
                }
            }

            const { RULES , MESSAGES , NEST_RULES , RAWS } = dataRules[property]

            if([RULES , MESSAGES , NEST_RULES].every(v=> v == null)) {
                if(typeof rawRules === 'function') {
                    
                    const r : string | null = await rawRules(reqInput)
                    if(r == null) continue
                    errorValidate = this._errorValidate(errorValidate,property, r ?? 'error message')
                    continue
                }
            }

            for(const index in RULES) {
                let message = MESSAGES[index]
                const rule = RULES[index]

                const error = this._checkRules({
                    requests,
                    rule,
                    reqInput,
                    raw : RAWS[index],
                    message,
                    nestRules : NEST_RULES
                })

                if(error == null) continue

                errorValidate = this._errorValidate(errorValidate,property , error)
            }
        }

        if(Object.keys(errorValidate)?.length) {
            this.ERRORS = errorValidate
        }

        return 
    }

    private _checkRules = ({ requests, rule , reqInput , message , nestRules , raws } : any) => {

        if(rule === RULE_TYPE.STRING) {
            return this._string(reqInput , message)
        }

        if(rule === RULE_TYPE.UUID) {
            return this._uuid(reqInput , message)
        }
       
        if(rule === RULE_TYPE.EMAIL) {
            return this._email(reqInput, message)
        }

        if(rule === RULE_TYPE.NUMBER) {
            return this._number(reqInput, message)
        }

        if(rule === RULE_TYPE.NUMBER_STRICT) {
            return this._numberStrict(reqInput, message)
        }

        if(rule === RULE_TYPE.DATE) {
            return this._date(reqInput, message)
        }

        if(rule === RULE_TYPE.BOOLEAN) {
            return this._boolean(reqInput, message)
        }

        if(rule === RULE_TYPE.OBJECT) {
            return this._object(nestRules,reqInput, message)
        }

        if(rule === RULE_TYPE.ARRAY) {
            return this._array(nestRules,reqInput , message)
        }

        if(rule === RULE_TYPE.ARRAY_OBJECT) {
            return this._arrayObject(nestRules,reqInput, message)
        }

        if(rule === RULE_TYPE.WHEN) {
            return this._when(nestRules,reqInput, message)
        }

        if(rule === RULE_TYPE.REQUIRED) {
            return this._required(reqInput, message)  
        }

        if(this._ruleEqual(rule,RULE_TYPE.COMFIRM)){
          return this._confirm(requests ,reqInput ,rule?.split(`${RULE_TYPE.COMFIRM}:`)?.pop(), message)
        }

        if(this._ruleEqual(rule,RULE_TYPE.REGEX)) {
            return this._regex(reqInput, rule?.split(`${RULE_TYPE.REGEX}:`).pop(), message , raws)
        }

        if(this._ruleEqual(rule,RULE_TYPE.OPPOSITE_REGEX)){
            return this._regexOpposite(reqInput, rule?.split(`${RULE_TYPE.OPPOSITE_REGEX}:`).pop(), message, raws)
        }

        if(this._ruleEqual(rule,RULE_TYPE.ENUM)){
            return this._enum(reqInput, rule?.split(`${RULE_TYPE.ENUM}:`)?.pop()?.split(','), message)
        }

        if(this._ruleEqual(rule,RULE_TYPE.MIMETYPE)){
            return this._mimetype(reqInput, rule?.split(`${RULE_TYPE.MIMETYPE}:`)?.pop()?.split(','), message)
        }

        if(this._ruleEqual(rule,RULE_TYPE.SIZE)){
            return this._size(reqInput, rule?.split(`${RULE_TYPE.SIZE}:`)?.pop()?.split(','), message)
        }

        if(this._ruleEqual(rule,RULE_TYPE.MAX_LENGTH)) {
            return this._maxLength(reqInput,rule?.split(`${RULE_TYPE.MAX_LENGTH}:`).pop(), message)
        }

        if(this._ruleEqual(rule,RULE_TYPE.MAX)) {
            return this._max(reqInput,rule?.split(`${RULE_TYPE.MAX}:`).pop(), message)
        }

        if(this._ruleEqual(rule,RULE_TYPE.MIN_LENGTH)) {
            return this._minLength(reqInput,rule.split(`${RULE_TYPE.MIN_LENGTH}:`).pop(),message)
        }

        if(this._ruleEqual(rule,RULE_TYPE.MIN)) {
            return this._min(reqInput,rule.split(`${RULE_TYPE.MIN}:`).pop(),message)
        }

        return null
    }

    private _ruleEqual (rule : any , type : any) {
        return  rule?.split(':')[0] === type
    }
    
    private _type = (data : any) => Object.prototype.toString.apply(data).slice(8, -1)

    private _typeObject = (data : any) => this._type(data) === 'Object'

    private _isEmpty = (value : any) => {
        const valueIsType  = (Object.prototype.toString.apply(value).slice(8, -1)).toLowerCase()
        
        switch (valueIsType) {
          case 'array' : {
            if(!value.length) return true
            return false
          }
          case 'object': {
            if(!Object.keys(value).length) return true
            return false
          }
          case 'string' : {
            if(value === '') return true
            return false
          }
          case 'null' :
          case 'undefined' : {
            if(value == null) return true
            return false
          }
          default : {
            return false
          }
        }
    } 
  
    private _errorValidate (errors :any , property:string , err : string | object) {

        return errors = {
            ...errors,
            [property] : errors.hasOwnProperty(property) 
                ? [...errors[property],err] 
                : Array.isArray(err) ? err : [err]
        }
    }

    private _when = (rules: Function, data : any, _: string)  => {

        const validate = new Validate(data)

        validate._validate(rules)

        if(validate.errorsMessage().length) return validate.errorsMessage()

        if(Object.keys(validate.errors())?.length) return validate.errors()

        return null
    }

    private _object = (rules:Function, data : any, message : string)  => {

        if(this._type(data) !== 'Object') {
            return ([message === '' ? 'It must be an object only.' : message])
        }

        const validate = new Validate(data)

        validate._validate(rules)

        if(Object.keys(validate.errors())?.length) return validate.errors()

        return null
    }

    private _array = (rules:Function, data: any, message:string)  => {

        
        if(rules == null) {
            if(this._isEmpty(message)) message = `It must be an array only.`

            if(!Array.isArray(data)) return message

            return null
        }
        

        if(this._type(data) !== 'Array') {
            return  [message === '' ? 'It must be an array only.' : message]
        }

        let errors : Record<string,any>[] = []

        for(const index in data) {
          
            const validate = new Validate(data[index])

            validate._validate(rules)

            if(!validate.errorsMessage().length) {
                continue
            }

            errors.push({
                index : Number(index), 
                errors : validate.errorsMessage() 
            })
        }

        if(Object.keys(errors).length) return errors
    
        return null

    }

    private _arrayObject = (rules:any, data : any, message : string) => {

        if(this._type(data) !== 'Array') {
            return  [message === '' ? 'It must be an array only.' : message]
        }

        let errors : Record<string,any>[] = []

        for(const index in data) {
            
            const element = data[index]

            const validate = new Validate(element)

            validate._validate(rules)

            if(!Object.keys(validate.errors()).length) continue
    
            errors.push({
                index : Number(index), 
                ...validate.errors() 
            })
        }

        if(Object.keys(errors).length) return errors
    
        return null
    }

    private _boolean = (reqInput:string, message:string )  => {

      if(this._isEmpty(message)) message = `It must be boolean only.`

      if(typeof reqInput !== "boolean") return message

      return null
    }

    private _required = (reqInput: any, message:string )  => {

        if(this._isEmpty(message)) message = `It is required.`

        if(this._isEmpty(reqInput)) return message

        return null
    }

    private _string = (reqInput:string, message:string)  => {
        if(this._isEmpty(message)) message = `It must be string only.`

        if(Array.isArray(reqInput)) {
            if(!reqInput.every(r => typeof r  === 'string' )) return message
            return null
        }

        if(typeof reqInput  !== 'string') return message

        return null
    }

    private _number = (reqInput:string, message:string) => {

        const regex = /^\d+$/;
      
        if(this._isEmpty(message)) message = `It must be number only.`

        if(Array.isArray(reqInput)) {
            if(!reqInput.every(r => regex.test(r))) return message
            return null
        }

        if(!regex.test(reqInput)) return message

        return null
    }

    private _numberStrict = (reqInput:string, message:string) => {

        if(this._isEmpty(message)) message = `It must be a number only.`

        if(Array.isArray(reqInput)) {
            if(!reqInput.every(r => typeof r  === 'number' )) return message
            return null
        }

        if(typeof reqInput  !== 'number') return message

        return null
    }

    private _date = (reqInput:string, message:string) => {

        const regex = /\d{4}-\d{2}-\d{2}/

        if(this._isEmpty(message)) message =  `It must be in a valid (YYYY-MM-DD) format.` 

        if(Array.isArray(reqInput)) {

            if(reqInput.some(r => !regex.test(r))) return message

            return null
        }


        if(!regex.test(reqInput)) return message

        return null
    }

    private _email = (reqInput:string, message:string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if(this._isEmpty(message)) message =  `The email is an invalid email type` 

        if(Array.isArray(reqInput)) {

            if(reqInput.some(r => !regex.test(r))) return message

            return null
        }

        if(!regex.test(reqInput)) return message

        return null
    }

    private _uuid = (reqInput:string, message:string)  => {

        const regex = new RegExp('^(?![0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$)') 

        if(this._isEmpty(message)) message = `It must not contain the regex pattern 'uuid'.` 

        if(Array.isArray(reqInput)) {
            if(reqInput.some(r => regex.test(r))) return message
            return null
        }

        if(regex.test(reqInput)) return message

        return null
    }

    private _regex = (reqInput:string, rawRegex:any, message:string , raw ?: RegExp)  => {

        const regex = raw == null ? new RegExp(rawRegex) : raw
        if(this._isEmpty(message)) message = `It must not contain the regex pattern '${rawRegex}'.` 

        if(Array.isArray(reqInput)) {
            if(reqInput.some(r => regex.test(r))) return message
            return null
        }

        if(regex.test(reqInput)) return message

        return null
    }

    private _regexOpposite = (reqInput:string, rawRegex:any, message:string , raw ?: RegExp)  => {
        
        const regex =  raw == null ? new RegExp(rawRegex) : raw

        if(this._isEmpty(message)) message = `It must not contain the regex pattern '${rawRegex}'.` 

        if(Array.isArray(reqInput)) {
            if(reqInput.some(r => !regex.test(r))) return message
            return null
        }

        if(!regex.test(reqInput)) return message

        return null
    }

    private _enum = (reqInput:string , enumLists :string[], message:string)   => {
        if(this._isEmpty(message)) message = `It must be one of the following values: ${enumLists.map(e => `'${e}'`).join(', ')}`

        if(Array.isArray(reqInput)) {
            if(!reqInput.some(r => enumLists.includes(r))) return message
            return null
        }
        
        if(!enumLists.some(d => d === reqInput)) return message

        return null
    }

    private _mimetype = (reqInput: Record<string,any> | any[] , enumLists :string[], message:string)   => {
        if(reqInput == null) return null
        if(this._isEmpty(message)) message = `It must be one of the following values: ${enumLists.map(e => `'${e}'`).join(', ')}`

        const detectMimetype = (mimetype : string | null) => {

            if(mimetype == null) return ''
            
            return mimetype.split('/')[1]
        }

        if(Array.isArray(reqInput)) {
            if(!reqInput.some(r => enumLists.includes(detectMimetype(r?.mimetype)))) return message
            return null
        }
        
        if(!enumLists.some(d => d === detectMimetype(reqInput?.mimetype))) return message

        return null
    }

    private _size = (reqInput: Record<string,any> | any[] , max :any | number, message:string)   => {
       
        if(reqInput == null) return null

        if(this._isEmpty(message)) message = `The maximum file upload limit. It must be a maximum size of '${max}' bytes.`

        if(Array.isArray(reqInput)) {
            if(reqInput.some(r => r?.size ?? Infinity > max )) return message
            return null
        }

        if(reqInput?.size ?? Infinity > max) return message

        return null
    }

    private _max = (reqInput:string , max :any | number, message:string)   => {
        if(this._isEmpty(message)) message = `It must be a maximum of ${max} characters in length.`

        if(Array.isArray(reqInput)) {
            if(reqInput.some(r => r?.length > max )) return message
            return null
        }

        if(reqInput?.length > max) return message

        return null
    }

    private _min = (reqInput:string, min :any | number, message:string) => {
        if(this._isEmpty(message)) message = `It must be a minimum of ${min} characters in length.`

        if(Array.isArray(reqInput)) {
            if(reqInput.some(r => r?.length < min || r == null )) return message
            return null
        }

        if(reqInput?.length < min || reqInput == null) return message

        return null
    }

    private _maxLength = (reqInput:string, max :any | number, message:string) => {
        if(this._isEmpty(message)) message = `It must be a maximum of ${max} characters in length.`

        if(Array.isArray(reqInput)) {
            if(reqInput.length > max) return message
            return null
        }

        if(reqInput?.length > max) return message

        return null
    }

    private _minLength = (reqInput:string, min :any | number, message:string) => {
        if(this._isEmpty(message)) message = `It must be a minimum of ${min} characters in length.`

        if(Array.isArray(reqInput)) {
            if(reqInput.length < min) return message
            return null
        }

        if(reqInput?.length < min || reqInput == null) return message

        return null
    }

    private _confirm = (data:any ,reqInput:string, key: string | any, message:string)  => {
      const compare = reqInput === data[key]

      if(this._isEmpty(message)) message = `not match`

      if(!compare) return message

      return null
    }
}

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
export class Validator extends Validate {}