import fetch from "node-fetch";
import { makeReadable, parseResponse, splitData } from './extras/gd/convertRobertStrings.js'
const URL = "http://www.boomlings.com/database/"

export async function getLevelInfo(id) {
    const body = new URLSearchParams({ "secret": "Wmfd2893gb7", "levelID": Number(id), "star"})
    const response = await fetch(`${URL}downloadGJLevel22.php`, { method: "POST", headers: { "User-Agent": "" }, body: body } )
    const accText = await response.text()
    const accParsed = parseResponse(splitData(accText, "#")[0], ":")
    return accParsed
}
console.log(await getLevelInfo('6508283'))

// node getLevel.js