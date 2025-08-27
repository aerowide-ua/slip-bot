import { userInfoC } from '../important/strings.js'

export function parseResponse(rawData, sep) {
    const split = !(rawData == undefined ) ? rawData.split(sep) : ''
    let result = {}
    for (let i = 0; i < split.length; i = i + 2) { result[Number(split[i])] = split[i+1] ?? "" }
    return result
}
export function splitData(rawData, sep, start=0, nokey=false) {
    const split = rawData ? rawData.split(sep) : []
    let result = []
    for (let i = 0; i < split.length; i = i + 1) { 
        if (nokey && i%2==0) continue
        result.push(split[i].slice(start, split[i].length)) 
    }
    return result
}

export function mergeObjs(o1, o2) {
    let result = {}
    for (let [k, v] of [...Object.entries(o1), ...Object.entries(o2)]) {
        if (!(Object.keys(result).includes(k))) { result[k] = v }
    }
    return result
}

export function makeReadable(data, k) {
    return Object.fromEntries(Object.entries(data).map(([key, value]) => [k[key] || key, value]))
}

export function makeObject(list1, list2) {
    let result = []
    for (let i=0; i<list1.length; i++) { 
        let a = list1[i]
        let b = list2[i]
        result.push([(a == undefined ? '-' : a), (b == undefined ? '-' : b)])
    }
    return Object.fromEntries(result)
}