//? Why do we write this util? since we may have multiple forms or tables to get various data, it's not recommended
//? to statically map through different keys of an array to show data, we simply loop through the keys we want to show
//? in a single const(includeKeys) and pass the object we want(obj). 
// E.G: We want to pass the USER object after we fetch it from API and then we want (name,email,biography) keys from it to show

export function includeObject(obj, includeKeys) {
    const newObject = {}

    Object.keys(obj)
    .filter((key)=> includeKeys.includes(key))
    .forEach((key)=> (newObject[key] = obj[key]))
    return newObject
}