"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
class Logger {
    constructor() {
        this.MAX_LENGTH = 10000;
        this.NUMBER = 1;
        this.LOG_NAME = '';
        this.LOG_TYPE = {
            INFO: 'info',
            DEBUG: 'debug',
            ERROR: 'error',
            WARN: 'warn'
        };
        this._dateString = ({ time = true } = {}) => {
            const d = new Date();
            const year = d.getFullYear();
            const month = (`0${(d.getMonth() + 1)}`).slice(-2);
            const date = (`0${d.getDate()}`).slice(-2);
            const hours = (`0${d.getHours()}`).slice(-2);
            const minutes = (`0${d.getMinutes()}`).slice(-2);
            const seconds = (`0${d.getSeconds()}`).slice(-2);
            if (time)
                return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
            return `${year}-${month}-${date}`;
        };
        this._createFolder = () => {
            try {
                fs_1.default.accessSync(this.LOG_FOLDER, fs_1.default.constants.F_OK);
            }
            catch (err) {
                fs_1.default.mkdirSync(this.LOG_FOLDER, {
                    recursive: true
                });
            }
            return this;
        };
        this._pushLogFile = ({ type = 'error', message = '', stack = [], logName = null }) => {
            this._createFolder();
            const LOG_NAME = logName == null ? `${this.LOG_FOLDER}/${this.LOG_NAME}` : `${this.LOG_FOLDER}/${logName}`;
            let data = '';
            if (type === 'error') {
                const stackTrace = stack.map((data, index) => `#${index} ${data.trim()}\n`);
                stackTrace.shift();
                data = `${this._dateString()} ${type}: ${message} \nStack trace: \n${stackTrace.join("")}`;
            }
            else
                data = `${this._dateString()} ${type}: ${message}`;
            try {
                if (!fs_1.default.existsSync(LOG_NAME)) {
                    fs_1.default.writeFileSync(LOG_NAME, data);
                    return;
                }
                const old = fs_1.default.readFileSync(LOG_NAME, 'utf8');
                if (old.length <= this.MAX_LENGTH) {
                    const newData = old ? `${old}\n${data}` : data;
                    fs_1.default.writeFileSync(LOG_NAME, newData);
                    return;
                }
                this.LOG_NAME = this._incrementLogFile(this.LOG_NAME, this.NUMBER);
                this.NUMBER += 1;
                const LOG = `${this.LOG_FOLDER}/${this.LOG_NAME}`;
                if (!fs_1.default.existsSync(LOG)) {
                    fs_1.default.writeFileSync(LOG, data);
                    return;
                }
                this._pushLogFile({
                    type,
                    message,
                    stack,
                    logName: this.LOG_NAME
                });
                return;
            }
            catch (err) {
                console.log("can't push file logs");
            }
            return;
        };
        this._findStack = (err) => {
            try {
                if (err.stack == null)
                    return [];
                const stackData = err.stack.split("\n");
                const stack = stackData !== null && stackData !== void 0 ? stackData : [];
                return stack;
            }
            catch (err) {
                return [];
            }
        };
        this.LOG_NAME = `${this._dateString({ time: false })}.log`;
        this.LOG_FOLDER = path_1.default.resolve("logs");
    }
    /**
     *
     * @param {number} max max length of data in file log if than max length will created new log file
     * @return {this}
     */
    max(max) {
        this.MAX_LENGTH = max;
        return this;
    }
    /**
     *
     * @param {number} max max length of data in file log if than max length will created new log file
     * @return {this}
     */
    maxLengthInFile(max) {
        this.MAX_LENGTH = max;
        return this;
    }
    /**
     *
     * @param {string} folder the folder logs
     * @return {this}
     */
    createLogger(folder = 'logs') {
        this.LOG_FOLDER = path_1.default.resolve(folder);
        return this;
    }
    /**
     *
     * @param {string} folder the folder logs
     * @return {this}
     */
    folder(folder = 'logs') {
        this.LOG_FOLDER = path_1.default.resolve(folder);
        return this;
    }
    /**
     *
     * @param {string} name file name for read logs default current date yyy-mm-dd.log
     * @return {Array<string>}
     */
    readLogFile(name = this.LOG_NAME) {
        const file = `${this.LOG_FOLDER}/${name}`;
        const rawLogs = fs_1.default.readFileSync(file, 'utf8');
        const logs = rawLogs === null || rawLogs === void 0 ? void 0 : rawLogs.split('\n');
        return logs !== null && logs !== void 0 ? logs : [];
    }
    /**
     *
     * @param {string} name file name for read logs default current date yyy-mm-dd.log
     * @return {Array<string>}
     */
    readLog(name = this.LOG_NAME) {
        const file = `${this.LOG_FOLDER}/${name}`;
        const rawLogs = fs_1.default.readFileSync(file, 'utf8');
        const logs = rawLogs === null || rawLogs === void 0 ? void 0 : rawLogs.split('\n');
        return logs !== null && logs !== void 0 ? logs : [];
    }
    /**
     *
     * @param {string?} folder the folder logs
     * @return {Array<string>}
     */
    readFolder(folder = this.LOG_FOLDER) {
        var _a;
        return (_a = fs_1.default.readdirSync(folder)) !== null && _a !== void 0 ? _a : [];
    }
    /**
     *
     * @param {string?} folder the folder logs
     * @return {Array<string>}
     */
    readLogs(folder = this.LOG_FOLDER) {
        var _a;
        return (_a = fs_1.default.readdirSync(folder)) !== null && _a !== void 0 ? _a : [];
    }
    /**
     *
     * @param {any?} err err for everything to keeps track log
     * @return {void}
     */
    error(err) {
        this._pushLogFile({
            type: this.LOG_TYPE.ERROR,
            message: err.message || 'unknow message',
            stack: this._findStack(err)
        });
        return;
    }
    /**
     *
     * @param {any?} message write message into log file
     * @return {void}
     */
    info(message) {
        this._pushLogFile({
            type: this.LOG_TYPE.INFO,
            message,
            stack: []
        });
        return;
    }
    /**
     *
     * @param {any?} message write message into log file
     * @return {void}
     */
    warn(message) {
        this._pushLogFile({
            type: this.LOG_TYPE.WARN,
            message,
            stack: []
        });
        return;
    }
    /**
     *
     * @param {any?} message write message into log file
     * @return {void}
     */
    debug(message) {
        this._pushLogFile({
            type: this.LOG_TYPE.DEBUG,
            message,
            stack: []
        });
        return;
    }
    _incrementLogFile(filename, numberOfFiles) {
        if (filename.split('-').length === 3)
            return filename.replace('.log', `-${numberOfFiles}.log`);
        const regex = /(\d+)\.log$/;
        const match = filename.match(regex);
        if (match) {
            const currentNumber = parseInt(match[1]);
            if (!isNaN(currentNumber)) {
                const newNumber = currentNumber + 1;
                const newFilename = filename.replace(regex, `${newNumber}.log`);
                return newFilename;
            }
        }
        return filename;
    }
}
exports.Logger = Logger;
