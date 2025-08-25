import fetch from "node-fetch";
import { makeReadable, parseResponse } from './convertRobertStrings.js'
import { userInfoC } from '../important/strings.js'
const URL = "http://www.boomlings.com/database/"



async function getUsers(name) {
    const body = new URLSearchParams({ "secret": "Wmfd2893gb7", "str": name })
    const response = await fetch(`${URL}getGJUsers20.php`, { method: "POST", headers: { "User-Agent": "" }, body: body } )
    const accText = await response.text()
    const accParsed = parseResponse(accText, ":")
    return accParsed
}
export async function getUserInfo(str) {
    const user = await getUsers(str)
    const userID = isNaN(Number(str)) ? user["16"] : str
    const body = new URLSearchParams({ "secret": "Wmfd2893gb7", "targetAccountID": userID })
    const response = await fetch(`${URL}getGJUserInfo20.php`, { method: "POST", headers: { "User-Agent": "" }, body: body } )
    const userRaw = await response.text()
    const userData = makeReadable(parseResponse(userRaw, ":"), userInfoC)
    return userData
}
