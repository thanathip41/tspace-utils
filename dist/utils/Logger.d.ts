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
export declare class Logger {
    private MAX_LENGTH;
    private NUMBER;
    private LOG_FOLDER;
    private LOG_NAME;
    private LOG_TYPE;
    constructor();
    /**
     *
     * @param {number} max max length of data in file log if than max length will created new log file
     * @return {this}
     */
    max(max: number): this;
    /**
     *
     * @param {number} max max length of data in file log if than max length will created new log file
     * @return {this}
     */
    maxLengthInFile(max: number): this;
    /**
     *
     * @param {string} folder the folder logs
     * @return {this}
     */
    createLogger(folder?: string): this;
    /**
     *
     * @param {string} folder the folder logs
     * @return {this}
     */
    folder(folder?: string): this;
    /**
     *
     * @param {string} name file name for read logs default current date yyy-mm-dd.log
     * @return {Array<string>}
     */
    readLogFile(name?: string): Array<string>;
    /**
     *
     * @param {string} name file name for read logs default current date yyy-mm-dd.log
     * @return {Array<string>}
     */
    readLog(name?: string): Array<string>;
    /**
     *
     * @param {string?} folder the folder logs
     * @return {Array<string>}
     */
    readFolder(folder?: string): Array<string>;
    /**
     *
     * @param {string?} folder the folder logs
     * @return {Array<string>}
     */
    readLogs(folder?: string): Array<string>;
    /**
     *
     * @param {any?} err err for everything to keeps track log
     * @return {void}
     */
    error(err: any): void;
    /**
     *
     * @param {any?} message write message into log file
     * @return {void}
     */
    info(message: string): void;
    /**
     *
     * @param {any?} message write message into log file
     * @return {void}
     */
    warn(message: string): void;
    /**
     *
     * @param {any?} message write message into log file
     * @return {void}
     */
    debug(message: string): void;
    private _dateString;
    private _createFolder;
    private _incrementLogFile;
    private _pushLogFile;
    private _findStack;
}
