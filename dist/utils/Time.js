"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carbon = exports.Time = void 0;
class Time {
    /**
     *
     * Time helper function covert Date to things
     * @param {Date} dateString
     * @example
     * new Time().now()
     * new Time().formatDate('yyyy-mm-dd').today()
     * new Time().formatDate('yyyy/mm/dd').toDate()
     * new Time().minusYears(10).addMonths(1).addDays(10).addHours(2).addMinutes(30).onlyTime().toString()
     * new Time().minusYears(10).addMonths(1).minusDays(10).addHours(2).addMinutes(30).onlyDate().toString()
     * new Time().minusYears(50).addMonths(1).minusDays(10).addHours(2).toTimestamp()
     */
    constructor(dateString) {
        this.DATE = new Date();
        this.FORMAT_DATE = 'yyyy-mm-dd';
        this.FORMAT_TIME = 'h:m:s';
        this.ONLY_TIME = false;
        this.ONLY_DATE = false;
        if (dateString == null)
            return;
        this.DATE = new Date(dateString);
    }
    parse(dateString) {
        return new Date(dateString);
    }
    addYears(year) {
        this.DATE.setFullYear(this.DATE.getFullYear() + year);
        return this;
    }
    addMonths(month) {
        this.DATE.setMonth(this.DATE.getMonth() + month);
        return this;
    }
    addDays(day) {
        this.DATE.setDate(this.DATE.getDate() + day);
        return this;
    }
    addHours(hour) {
        this.DATE.setHours(this.DATE.getHours() + hour);
        return this;
    }
    addMinutes(min) {
        this.DATE.setMinutes(this.DATE.getMinutes() + min);
        return this;
    }
    addSeconds(second) {
        this.DATE.setSeconds(this.DATE.getSeconds() + second);
        return this;
    }
    minusYears(year) {
        this.DATE.setFullYear(this.DATE.getFullYear() - year);
        return this;
    }
    minusMonths(month) {
        this.DATE.setMonth(this.DATE.getMonth() - month);
        return this;
    }
    minusDays(day) {
        this.DATE.setDate(this.DATE.getDate() - day);
        return this;
    }
    minusHours(hour) {
        this.DATE.setHours(this.DATE.getHours() - hour);
        return this;
    }
    minusMinutes(min) {
        this.DATE.setMinutes(this.DATE.getMinutes() - min);
        return this;
    }
    minusSeconds(second) {
        this.DATE.setSeconds(this.DATE.getSeconds() - second);
        return this;
    }
    startOfDay() {
        this.DATE.setHours(0, 0, 0, 0);
        return this;
    }
    endOfDay() {
        this.DATE.setHours(23, 59, 59, 59);
        return this;
    }
    formatDate(formatDate) {
        formatDate = formatDate.toLocaleLowerCase();
        const checkList = formatDate.includes('yyyy')
            && formatDate.includes('mm')
            && formatDate.includes('dd');
        if (!checkList)
            throw new Error('format allow pattern yyyy mm dd');
        this.FORMAT_DATE = checkList ? formatDate : this.FORMAT_DATE;
        return this;
    }
    formatTime(formatTime) {
        formatTime = formatTime.toLocaleLowerCase();
        const checkList = formatTime.includes('h')
            && formatTime.includes('m')
            && formatTime.includes('s');
        if (!checkList)
            throw new Error('format allow pattern h m s');
        this.FORMAT_TIME = checkList ? formatTime : this.FORMAT_TIME;
        return this;
    }
    onlyTime() {
        this.ONLY_TIME = true;
        return this;
    }
    onlyDate() {
        this.ONLY_DATE = true;
        return this;
    }
    toDate() {
        return this.DATE;
    }
    toTimeStamp() {
        return +this.DATE;
    }
    toTimestamp() {
        return +this.DATE;
    }
    today() {
        return this._dateString(this.DATE);
    }
    now() {
        return `${this._dateString(this.DATE)} ${this._timeString(this.DATE)}`;
    }
    valueOf() {
        return +this.DATE;
    }
    toString({ onlyDate = false, onlyTime = false } = {}) {
        const date = this.DATE;
        const dateString = this._dateString(date);
        if (onlyDate || this.ONLY_DATE)
            return dateString;
        const timeString = this._timeString(date);
        if (onlyTime || this.ONLY_TIME)
            return timeString;
        const now = `${dateString} ${timeString}`;
        return now;
    }
    _dateString(date) {
        const y = `${date.getFullYear()}`;
        const m = (`0${(date.getMonth() + 1)}`).slice(-2);
        const d = (`0${date.getDate()}`).slice(-2);
        const format = this.FORMAT_DATE;
        const yyyy = format.replace('yyyy', y);
        const mm = yyyy.replace('mm', m);
        const dateString = mm.replace('dd', d);
        return dateString;
    }
    _timeString(date) {
        const h = (`0${date.getHours()}`).slice(-2);
        const m = (`0${date.getMinutes()}`).slice(-2);
        const s = (`0${date.getSeconds()}`).slice(-2);
        const format = this.FORMAT_TIME;
        const hh = format.replace('h', h);
        const mm = hh.replace('m', m);
        const timeString = mm.replace('s', s);
        return timeString;
    }
}
exports.Time = Time;
class Carbon extends Time {
}
exports.Carbon = Carbon;
