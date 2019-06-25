// Function source: https://github.com/udacity/reactnd-chirper-app
export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }

// Function source: https://medium.com/dailyjs/rewriting-javascript-converting-an-array-of-objects-to-an-object-ec579cafbfc7
export const arrayToObject = (array, keyField) =>
array.reduce((obj, item) => {
  obj[item[keyField]] = item
  return obj
}, {})

// Function source: https://github.com/udacity/reactnd-chirper-app
export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}