import fetch from "node-fetch";
const URL = "http://www.boomlings.com/database/"
function parseResponse(rawData) {
    const split = rawData.split(":")
    let result = {}
    for (let i = 0; i < split.length; i = i + 2) { result[Number(split[i])] = split[i+1] ?? "" }
    return result
}
function mergeObjs(o1, o2) {
    let result = {}
    for (let [k, v] of [...Object.entries(o1), ...Object.entries(o2)]) {
        if (!(Object.keys(result).includes(k))) { result[k] = v }
    }
    return result
}
function makeReadable(data) {
    data["1"] = "d"
}
async function getUsers(name) {
    const body = new URLSearchParams({ "secret": "Wmfd2893gb7", "str": name })
    const response = await fetch(`${URL}getGJUsers20.php`, { method: "POST", headers: { "User-Agent": "" }, body: body } )
    const accText = await response.text()
    const accParsed = parseResponse(accText)
    return accParsed
}
async function getUserInfo(str) {
    const user = await getUsers(str)
    const userID = isNaN(Number(str)) ? user["16"] : str
    const body = new URLSearchParams({ "secret": "Wmfd2893gb7", "targetAccountID": userID })
    const response = await fetch(`${URL}getGJUserInfo20.php`, { method: "POST", headers: { "User-Agent": "" }, body: body } )
    const userRaw = await response.text()
    const userData = parseResponse(userRaw)
    return userData
}
const userName = 'iminguendo'
const userData = await getUserInfo(userName)
console.log(userData)
// console.log(makeReadable(userData))


// node gdreq.js