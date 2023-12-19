# tspace-utils

[![NPM version](https://img.shields.io/npm/v/tspace-utils.svg)](https://www.npmjs.com)
[![NPM downloads](https://img.shields.io/npm/dm/tspace-utils.svg)](https://www.npmjs.com)

tspace-utils is a library functions and methods helper can be used with TypeScript.  
Its always support the latest TypeScript and JavaScript features and provide additional features that help you to develop.
 
## Install

Install with [npm](https://www.npmjs.com/):

```sh
npm install tspace-utils --save
```
## Basic Usage
- [Validate](#validate)
- [Collection](#collection)
- [Logger](#logger)
- [Time](#time)
- [Test](#test)
- [Benchmark](#benchmark)
- [Other](#other)

## Validate

```js
import { Validate , Rule } from 'tspace-utils'

const data = {
    useWhen : 'hello when'
    email : 'test@g',
    mobile : '045811xxxx',
    username : 'username',
    password : '',
    passwordConfirm : 'password',
    enum : 'test enum',
    arrayObject : [
        {
            id : "1",
            name : '',
            email : 'test@g.com',
        },
        {
            id : "xx",
            name : 'qwqw',
            email : 'test',
        },
        {
            id : "",
            name : '',
            email : 'x.com',
        }
    ],
    object: {
        id : "",
        name : '',
        email : 'test@g.com',
        nestObject: {
            test : ""
        }
    }
}

const validate = new Validate(data)

validate.check((Rule : Rule) => {   
    return {
        //  .when if condition is true will working
        useWhen : new Rule().when(true, (Rule : Rule) => {
            return new Rule().required(),
        }),
        email : new Rule().required().email(),
        mobile : new Rule().required().number().numberStrict().max(10),
        username : new Rule().required().min(3),
        password : new Rule().required().confirm('passwordConfirm')
        .regex('(?=.*[A-Za-z])(?=.*\\d)(?!.*[ก-๙])[\\S\\d]{8,}$','format is invalid'),
        passwordConfirm : new Rule().required(),
        array : new Rule().array().string().maxLength(10).minLength(1),
        enum : new Rule().enum(['test1','test2'])
        arrayObject : new Rule().arrayObject((Rule : Rule) => {
            return {
                id : new Rule().required(),
                name : new Rule().required().number(),
                email : new Rule().required().email()
            }
        }),
        object : new Rule().object((Rule : Rule) => {
            return {
                id : new Rule().required(),
                name : new Rule().required(),
                email : new Rule().required().email(),
                nestObject : new Rule().object((Rule : Rule) => {
                    return {
                        id : new Rule().required(),
                        name : new Rule().required(),
                        email : new Rule().required().email(),
                    }
                })
            }
        })
    }      
})

if(validate.fails()) {
    console.log(validate.errorsToString())
    console.log(validate.errors())
    throw ...
}

// or u can validate using Promise functions
const dataForPromise = {
    dataPromise : "data for promise"
    data : "data for function"
}

const validatePromise = new Validate(dataForPromise)

function sumPromise (a, b) {
    return new Promise((resolve) => resolve(a + b))
}

function sum (a, b) {
    return a + b
}

validatePromise.checkPromise((rule : Rule) => {   
    return {
        dataPromise : [
            async () => {
                return {
                    error : await sumPromise(1,3) !== 3, // if true will trigger error
                    message : 'Number is not equal to 3'
                }
            },
            new Rule().required().enum(['test1','test2']),
        ],
        data : () => {
            return {
                error : sum(1,3) !== 3,
                message : 'Number is not equal to 3'
            }
        },
    }      
})

if(validatePromise.fails()) {
    console.log(validatePromise.errorsToString())
    console.log(validatePromise.errors())
    throw ...
}


```
## Collection

```js
import { Collection } from 'tsapce-utils'

    const data = [
        {
            id : 3,
            username : 'test3',
            email : null,
            created_at : '2022-06-23 12:30:00',
            updatedAt : '2022-06-23 12:30:00'
        },
        {
            id : 2,
            username : 'test2',
            email : null,
            created_at : '2022-06-21 12:30:00',
            updatedAt : '2022-06-22 12:30:00'
        },
        {
            id : 1,
            username : 'test1',
            email : 'test1@gmail.com',
            created_at : '2022-06-23 15:00:00',
            updatedAt : '2022-06-25 12:30:00'
        },
        {
            id : 5,
            username : 'test5',
            email : 'test5@gmail.com',
            created_at : '2022-06-11 17:00:00',
            updatedAt : '2022-06-22 12:30:00'
        },
        {
            id : 4,
            username : 'test4',
            email : 'test4@gmail.com',
            created_at : '2022-06-22 18:00:00',
            updatedAt : '2022-06-25 18:30:00'
        }
    ]
    
    const map = new Collection(data).map((item: { username: string }) => {
        return { ...item,username : item.username.toUpperCase() }
    }).get()

    const find = new Collection(data).find((item: { id: number }) => item.id === 1).get()

    const each = new Collection(data).each((collect: Collection) => {
        collect.where('id',1).concat([{ id : 10 , username : 'test10' }])
    }).get()
    
    const filter = new Collection(data).filter((item: { id : number }) => item.id === 1).get()

    const reduce = new Collection(data).reduce(( prev:number, cur : { id : number}) => prev + cur.id , 0).get()

    const when = new Collection(data).when(true, (collect: Collection) => {
        collect.map((item: { id : number } , index: number) => item.id * index)
    }).get()

    const whereBetween = new Collection(data).whereBetween('id',[1,2]).get()
    const whereNotBetween = new Collection(data).whereNotBetween('id',[1,2]).get()
    const whereNull = new Collection(data).whereNull('email').get()
    const whereNotNull = new Collection(data).whereNotNull('email').get()
    const where = new Collection(data).where('id',1).where('username','test1').get()
    const whereNotIn = new Collection(data).whereNotIn('id',[1,2,3,4]).get()
    const whereIn = new Collection(data).whereIn('id',[1,2,3,4]).get()
    const count = new Collection(data).count()
    const avg = new Collection(data).avg('id')
    const json = new Collection(data).toJson()
    const sum = new Collection(data).sum('id')
    const max =  new Collection(data).max('id')
    const min = new Collection(data).min('id')
    const chunk = new Collection(data).chunk(3)
    const oldest = new Collection(data).oldest('created_at').get()
    const latest = new Collection(data).latest('created_at').get()
    const limit = new Collection(data).limit(3).get()
    const except = new Collection(data).except('email').get()
    const snakeCase = new Collection(data).snakeCase().get()
    const camelCase = new Collection(data).camelCase().get()
```

## Logger

```js
import { Logger } from 'tspace-utils'

// basic Logger
new Logger().info('info Hello logger')
new Logger().warn('warn Hello logger')
new Logger().debug('debug Hello logger')
 try {
     throw new Error('keeping logs')
 } 
 catch (err) {
   new Logger().error(err)
 } 
// create new folder
new Logger().folder('new-logs').maxLengthInFile(1000).info('info Hello logger')
new Logger().folder('logs/new-logs').info('info Hello logger')
// read logs
new Logger().readLog('new-logs')
new Logger().folder('logs/new-logs').readLog(name)
new Logger().readLogsInFolder(folder)
```

## Time

```js

import { Time } from 'tspace-utils'

new Time().now()
new Time().formatDate('yyyy-mm-dd').today()
new Time().formatDate('yyyy/mm/dd').toDate()
new Time().minusYears(10).addMonths(1).addDays(10).addHours(2).addMinutes(30).onlyTime().toString()
new Time().minusYears(10).addMonths(1).minusDays(10).addHours(2).addMinutes(30).onlyDate().toString()
new Time().minusYears(50).addMonths(1).minusDays(10).addHours(2).toTimestamp()

```

## Test

```js

import { Test, StressTest } from 'tspace-utils'

    const sum = (a , b) => a + b

    new Test().describe('test sum').expect(() => sum(1,3)).toBe(4)
    new Test().describe('test sum').expect(() => sum(2,3)).toBe("5")

    // testing api performance
    const func = () => axios.get(url)
    console.log(await new StressTest().each(500).test(func))
```

## Benchmark

```js

import { Benchmark } from 'tspace-utils'

    function sumPromise1 (a , b) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(a + b)
            }, 1000)
        })
    }

    function sumPromise2 (a , b) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(a + b)
            }, 3000)
        })
    }

    await new Benchmark()
        .add('test sum 1 + 2' , () =>  sumPromise2(1,2))
        .add('test sum 1000 + 2000' , () =>  sumPromise(1000,2000))
        .add('test sum 2000 + 2000' , () =>  sumPromise2(2000,2000))
        .run()

```

## Other
```js
import {createState , typeOf , isEmpty , deepEqual , snakeCase , camelCase } from 'tspace-utils'

const [ state , setState] = createState([])
console.log(state())

setState({
    add : 'state'
})

console.log(state())

console.log(typeOf([]))
console.log(typeOf({}))

console.log(isEmpty([]))
console.log(isEmpty({}))
console.log(isEmpty(""))
console.log(isEmpty(null))

console.log(snakeCase('snakeCase')) // 'snake_case'
console.log(camelCase('camel_case')) // 'camelCase'


console.log( 
    deepEqual(
        { a : [ 2, 3 ], b : [ 4 ] },
        { a : [ 2, 3 ], b : [ '4' ] }
    ),
    deepEqual(
        new Map([[1,3]]),
        new Map([['1',3]])
    ),
    deepEqual(
        null,
        undefined
    ),
    deepEqual(
        new Date('1999-01-01 00:00:0000'),
        new Date('1999-01-02 00:00:0000'),
    )
)

```