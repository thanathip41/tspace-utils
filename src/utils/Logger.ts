import fs from 'fs'
import path from 'path'

interface LogType {
  INFO  :string ,
  DEBUG :string, 
  ERROR :string, 
  WARN  :string
}

interface CreateLogFiles { 
  type    : string , 
  message :string ,
  stack   : Array<string>,
  logName ?: string | null
}
/**
 * 
 * 'Logger' is used for keep message into file log for everyting.
 * 
 * Auto created '${yyyy-mm-dd}.log' files in root directory folder : 'logs'
 * @example
 *  #basic Logger
 *  new Logger().info('info Hello logger')
 *  new Logger().warn('warn Hello logger')
 *  new Logger().debug('debug Hello logger')
 *   try {
 *       throw new Error('keeping logs')
 *   } 
 *   catch (err) {
 *     new Logger().error(err)
 *   }
 * 
 *  #try to create new directory
 *  new Logger().directory('new-logs').info('info Hello logger')
 *  new Logger().directory('logs/new-logs').info('info Hello logger')
 * 
 *  #read logs
 *  new Logger().readLogs('new-logs')
 *  new Logger().directory('logs/new-logs').readLogs()
 *  new Logger().readFolder('logs')
 */
export class Logger {
  private MAX_LENGTH = 10000
  private NUMBER = 1
  private LOG_FOLDER: string
  private LOG_NAME: string = ''
  private LOG_TYPE :LogType = { 
    INFO  : 'info',
    DEBUG : 'debug', 
    ERROR : 'error', 
    WARN  : 'warn'
  }
  constructor () {
    this.LOG_NAME = `${this._dateString({ time: false })}.log`
    this.LOG_FOLDER = path.resolve("logs")
  }

  /**
   * 
   * @param {number} max max length of data in file log if than max length will created new log file
   * @return {this}
   */
  max (max : number): this {
    this.MAX_LENGTH = max
    return this
  }

  /**
   * 
   * @param {number} max max length of data in file log if than max length will created new log file
   * @return {this}
   */
  maxLengthInFile (max : number): this {
    this.MAX_LENGTH = max
    return this
  }

  /**
   * 
   * @param {string} folder the folder logs
   * @return {this}
   */
  createLogger (folder: string = 'logs'): this {
    this.LOG_FOLDER = path.resolve(folder)
    return this
  }

  /**
   * 
   * @param {string} folder the folder logs
   * @return {this}
   */
  folder (folder: string = 'logs'): this {
    this.LOG_FOLDER = path.resolve(folder)
    return this
  }

  /**
   * 
   * @param {string} name file name for read logs default current date yyy-mm-dd.log
   * @return {Array<string>}
   */
  readLogFile (name: string = this.LOG_NAME): Array<string> {
    const file = `${this.LOG_FOLDER}/${name}`
    const rawLogs = fs.readFileSync( file, 'utf8')
    const logs = rawLogs?.split('\n')
   
    return logs ?? []
  }

  /**
   * 
   * @param {string} name file name for read logs default current date yyy-mm-dd.log
   * @return {Array<string>}
   */
  readLog (name: string = this.LOG_NAME): Array<string> {
    const file = `${this.LOG_FOLDER}/${name}`
    const rawLogs = fs.readFileSync( file, 'utf8')
    const logs = rawLogs?.split('\n')
   
    return logs ?? []
  }
  
  /**
   * 
   * @param {string?} folder the folder logs
   * @return {Array<string>}
   */
  readFolder (folder: string = this.LOG_FOLDER): Array<string> {
    return fs.readdirSync(folder) ?? []
  }

  /**
   * 
   * @param {string?} folder the folder logs
   * @return {Array<string>}
   */
  readLogs (folder: string = this.LOG_FOLDER): Array<string> {
    return fs.readdirSync(folder) ?? []
  }
  /**
   * 
   * @param {any?} err err for everything to keeps track log 
   * @return {void}
   */
  error (err:any): void {
    this._pushLogFile ({
      type : this.LOG_TYPE.ERROR,
      message : err.message || 'unknow message',
      stack : this._findStack(err)
    })
   
    return
  }
  /**
   * 
   * @param {any?} message write message into log file
   * @return {void}
   */
  info (message:string): void {
    this._pushLogFile ({
      type : this.LOG_TYPE.INFO,
      message,
      stack: []
    })
    return
  }
  /**
   * 
   * @param {any?} message write message into log file
   * @return {void}
   */
  warn (message:string): void {
    this._pushLogFile ({
      type : this.LOG_TYPE.WARN,
      message,
      stack: []
    })
    return
  }
  /**
   * 
   * @param {any?} message write message into log file
   * @return {void}
   */
  debug (message:string): void {
    this._pushLogFile ({
      type : this.LOG_TYPE.DEBUG,
      message,
      stack: []
    })
    return
  }

  private _dateString = ({ time = true} = {}) => {
    const d = new Date()
    const year = d.getFullYear() ;
    const month = (`0${(d.getMonth() + 1)}`).slice(-2)
    const date = (`0${d.getDate()}`).slice(-2)
    const hours = (`0${d.getHours()}`).slice(-2)
    const minutes = (`0${d.getMinutes()}`).slice(-2)
    const seconds = (`0${d.getSeconds()}`).slice(-2)

    if(time) return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
    
    return `${year}-${month}-${date}`
  }

  private _createFolder = () => {
    try {
      fs.accessSync(this.LOG_FOLDER , fs.constants.F_OK)
    } catch (err:any) {
      fs.mkdirSync(this.LOG_FOLDER, {
        recursive: true
      });
    }
    return this
  }
  
  private _incrementLogFile(filename : string, numberOfFiles : number) {
    
    if(filename.split('-').length === 3) return filename.replace('.log',`-${numberOfFiles}.log`)
    const regex = /(\d+)\.log$/;
    const match = filename.match(regex)

    if(match) {
      const currentNumber = parseInt(match[1]);
      if (!isNaN(currentNumber)) {
        const newNumber = currentNumber + 1;
        const newFilename = filename.replace(regex, `${newNumber}.log`);
        return newFilename;
      }
    }
  
    return filename
  }

  private _pushLogFile = ({ type ='error' , message = '' , stack = [] , logName = null } : CreateLogFiles ) => {

    this._createFolder()

    const LOG_NAME = logName == null ? `${this.LOG_FOLDER}/${this.LOG_NAME}` : `${this.LOG_FOLDER}/${logName}`
    let data:string = ''
    if(type === 'error') {
      const stackTrace = stack.map((data:string,index:number) => `#${index} ${data.trim()}\n`)
      stackTrace.shift()
      data = `${this._dateString()} ${type}: ${message} \nStack trace: \n${stackTrace.join("")}`
    }
    else data = `${this._dateString()} ${type}: ${message}`

    try {
      if(!fs.existsSync(LOG_NAME)) {
        fs.writeFileSync(LOG_NAME, data) 
        return
      }

      const old = fs.readFileSync(LOG_NAME, 'utf8')
      
      if(old.length <= this.MAX_LENGTH) {
        const newData = old ? `${old}\n${data}` : data
        fs.writeFileSync(LOG_NAME,newData)
        return
      }

      this.LOG_NAME  = this._incrementLogFile(this.LOG_NAME , this.NUMBER)
      this.NUMBER += 1 

      const LOG = `${this.LOG_FOLDER}/${this.LOG_NAME}`

      if(!fs.existsSync(LOG)) {
        fs.writeFileSync(LOG, data) 
        return
      }

      this._pushLogFile({
        type,
        message,
        stack,
        logName : this.LOG_NAME
      })
      
      return

    } catch(err:any) {
      console.log("can't push file logs")
    }
    return
  }

  private _findStack = (err:any) => {
    try {
      if(err.stack == null) return []

      const stackData:Array<string> = err.stack.split("\n")
      const stack:Array<string> = stackData ?? []

      return stack
    } catch (err:any) {
        return []
    }
  }
}
