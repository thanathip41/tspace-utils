/**
 *
 * Collection functions that helper Array value can be work everythings in the collection
 * @example
 *  import { Collection } from 'tsapce-utils'
 *  const data = [
 *       {
 *           id : 3,
 *           username : 'test3',
 *           email : null,
 *           createdAt : '2022-06-23 12:30:00',
 *           updatedAt : '2022-06-23 12:30:00'
 *      },
 *       {
 *           id : 2,
 *           username : 'test2',
 *           email : null,
 *           createdAt : '2022-06-21 12:30:00',
 *           updatedAt : '2022-06-22 12:30:00'
 *       },
 *       {
 *           id : 1,
 *           username : 'test1',
 *           email : 'test1@gmail.com',
 *           createdAt : '2022-06-23 15:00:00',
 *           updatedAt : '2022-06-25 12:30:00'
 *       },
 *       {
 *           id : 5,
 *           username : 'test5',
 *           email : 'test5@gmail.com',
 *           createdAt : '2022-06-11 17:00:00',
 *           updatedAt : '2022-06-22 12:30:00'
 *       },
 *       {
 *           id : 4,
 *           username : 'test4',
 *           email : 'test4@gmail.com',
 *           createdAt : '2022-06-22 18:00:00',
 *           updatedAt : '2022-06-25 18:30:00'
 *       }
 *   ]
 *
 *  const map = new Collection(data).map((item: { username: string }) => {
 *       return { ...item,username : item.username.toUpperCase() }
 *   }).get()
 *
 *  const find = new Collection(data).find((item: { id: number }) => item.id === 1).get()
 *
 *  const each = new Collection(data).each((collect: Collection) => {
 *       collect.where('id',1).concat([{ id : 10 , username : 'test10' }])
 *   }).get()
 *
 *  const filter = new Collection(data).filter((item: { id : number }) => item.id === 1).get()
 *
 *  const reduce = new Collection(data).reduce(( prev:number, cur : { id : number}) => prev + cur.id , 0).get()
 *
 *  const when = new Collection(data).when(true, (collect: Collection) => {
 *       collect.map((item: { id : number } , index: number) => item.id * index)
 *  }).get()
 */
declare class Collection {
    private ITEMS;
    private ORIGINS;
    constructor(data: Array<any>);
    result(): any;
    resultAndOrigin(): {
        items: any;
        origins: any[];
    };
    get(): any;
    findMany(): any;
    first(): any;
    findOne(): any;
    getOrigin(): any[];
    getAndOrigin(): {
        items: any;
        origins: any[];
    };
    all(): any;
    shift(): any;
    pop(): any;
    isEmpty(): boolean;
    exists(): boolean;
    toJson(): string;
    count(): any;
    size(): any;
    avg(key?: string): number;
    sum(key?: string): any;
    max(key?: string): number;
    min(key?: string): number;
    chunk(chunk?: number): any;
    camelCase: () => this;
    snakeCase(): this;
    when(value: string | number | undefined | null | Boolean, cb: Function): this;
    whenEmpty(cb: Function): this;
    whenNotEmpty(cb: Function): this;
    where(key: string, operator?: any, value?: any): this;
    whereBetween(key: string | null, value: any[]): this;
    whereNotBetween(key: string | null, value: any[]): this;
    whereNull(key: string | null): this;
    whereNotNull(key: string | null): this;
    whereIn(key: string | null, array: Array<any>): this;
    whereNotIn(key: string | null, array: Array<any>): this;
    limit(limit: number): this;
    except(...keys: Array<string>): this;
    slice(start: number, end: number): this;
    forget(key: number): this;
    oldest(key?: string): this;
    latest(key?: string): this;
    push(data: any): this;
    add(data: any): this;
    merge(data: Array<any>): this;
    each(cb: Function): this;
    findIndex(cb: Function): this;
    every(cb: Function): this;
    some(cb: Function): this;
    find(cb: Function): this;
    filter(cb: Function): this;
    map(cb: Function): this;
    reduce(cb: Function, result?: string | number | Object | Array<any> | Boolean | null): this;
    private _next;
    private _temp;
    private _removeKey;
    private _valueAndOperator;
    private _typeOf;
    private _operators;
    private _snakeCase;
    private _camelCase;
}
export { Collection };
export default Collection;
