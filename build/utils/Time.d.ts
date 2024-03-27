export declare class Time {
    private DATE;
    private FORMAT_DATE;
    private FORMAT_TIME;
    private ONLY_TIME;
    private ONLY_DATE;
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
    constructor(dateString?: string | number | Date);
    parse(dateString: string | number | Date): Date;
    addYears(year: number): this;
    addMonths(month: number): this;
    addDays(day: number): this;
    addHours(hour: number): this;
    addMinutes(min: number): this;
    addSeconds(second: number): this;
    minusYears(year: number): this;
    minusMonths(month: number): this;
    minusDays(day: number): this;
    minusHours(hour: number): this;
    minusMinutes(min: number): this;
    minusSeconds(second: number): this;
    startOfDay(): this;
    endOfDay(): this;
    formatDate(formatDate: string): this;
    formatTime(formatTime: string): this;
    onlyTime(): this;
    onlyDate(): this;
    toDate(): Date;
    toTimeStamp(): number;
    toTimestamp(): number;
    today(): string;
    now(): string;
    valueOf(): number;
    toString({ onlyDate, onlyTime }?: {
        onlyDate?: boolean | undefined;
        onlyTime?: boolean | undefined;
    }): string;
    private _dateString;
    private _timeString;
}
export declare class Carbon extends Time {
}
