export * from './Logger'
export * from './Validate'
export * from './Time'
export * from './Collection'
export * from './Test'
export * from './Benchmark'

export const typeOf = (data : any) => Object.prototype.toString.apply(data).slice(8, -1).toLocaleLowerCase()

export const createState = (defaultState: any = null ) : [Function, Function] => {
  const checkType = (oldState?: any , newState?: any) => {
    switch (typeOf(oldState)) {
        case 'array' : {
          oldState = [...oldState , newState]
          break
        }
        case 'object': {
          if(typeOf(newState) !== 'object' ) throw new TypeError('this state allow object only')
          oldState = {...oldState , ...newState}
          break
        }
        case 'boolean' : {
          if(typeOf(newState) !== 'boolean' ) throw new TypeError('this state allow boolean only')
          oldState = newState
          break
        }
        case 'bumber' : {
          if(typeOf(newState) !== 'number' ) throw new TypeError('this state allow number only')
          oldState = newState
          break
        }
        case 'string' : {
          if(typeOf(newState) !== 'string' ) throw new TypeError('this state allow string only')
          oldState = newState
          break
        }
        case 'null' || 'nndefined' : {
          oldState = newState
          break
        }
        default : {
          throw new Error("Can't set state")
        }
    }
    return oldState
  }

  const getState = () => defaultState

  const setState = (newState : any) => defaultState = checkType(defaultState ,newState)

  return [getState , setState];
}

export const isEmpty = (value : any) => {
  switch (typeOf(value)) {
    case 'array' : {
      if(!value.length) return true
      break
    }
    case 'object': {
      if(!Object.keys(value).length) return true
      break
    }
    case 'boolean' : {
      if(!value) return true
      break
    }
    case 'number' : {
      if(value === 0 || Number.isNaN(value)) return true
      break
    }
    case 'string' : {
      if(value === '') return true

      break
    }
    case 'null' :
    case 'undefined' : {
      if(value == null) return true
      break
    }
    default : {
      return false
    }
  }

  return false
}

export  const deepEqual = (a :any , b :any ) => {

  if(typeOf(a) !== typeOf(b)) return false

  if (a === b) return true

  switch(typeOf(a)) {

      case 'object' : {
          
          if(Object.keys(a).length !== Object.keys(b).length) return false

          const keys = Object.keys(a)
  
          const length = keys.length
  
          for (let i = 0; i < length; i++){
              const key = keys[i]
              if (!deepEqual(a[key], b[key])) return false
          }

          return true
      }

      case 'array' : {
          if (a.length !== b.length) return false
     
          for (let i = 0; i <a.length; i++){
              if (!deepEqual(a[i], b[i])) return false
          }
          return true
      }

      case 'number' : {
          if(Number.isNaN(a) && Number.isNaN(b)) return true
          return false
      }

      case 'map' : {
          if (a.size !== b.size) return false

          for (let i of a.entries()) {
              if (!b.has(i[0])) return false
          }
          
          for (let i of a.entries()) {
              if (!deepEqual(i[1], b.get(i[0]))) return false
          }

          return true
      }

      case 'set' : {
          if (a.size !== b.size) return false
          for (let i of a.entries()) {
            if (!b.has(i[0])) return false
          }
          return true
      }
      
      case 'date' : {
          return a.valueOf() === b.valueOf()
      }

      default : return false
  }
}

export const snakeCase = (value : any) => {
  if (typeOf(value) !== "object") return value

  Object.entries(value).forEach(([oldName]) => {

      const newName = oldName.replace(/([A-Z])/g, (str) => `_${str.toLocaleLowerCase()}`)

      if (newName !== oldName) {
          if (value.hasOwnProperty(oldName)) {
              value = { ...value, 
                  [newName] : value[oldName] 
              }
              delete value[oldName]
          }
      }

      if (typeOf(value[newName]) === "object") value[newName] = snakeCase(value[newName])
  })

  return value
}

export const camelCase = (value : any) => {
  if (typeOf(value) !== "object") return value

    Object.entries(value).forEach(([oldName]) => {

        const newName = oldName.replace(/(.(\_|-|\s)+.)/g, (str) => str[0] + (str[str.length-1].toUpperCase()))

        if (newName !== oldName) {
            if (value.hasOwnProperty(oldName)) {
                value = { ...value, 
                    [newName] : value[oldName] 
                }
                delete value[oldName]
            }
        }

        if (typeOf(value[newName]) === "object") value[newName] = camelCase(value[newName])
    })

    return value
}
