import fetch from "node-fetch";
import { makeReadable, parseResponse, splitData } from './convertRobertStrings.js'
import levelInfoC from '../data/levelInfo.json' with { type: 'json' };
import {getUsers} from './getUser.js'
const URL = "http://www.boomlings.com/database/"

export async function getLevelInfo(id) {
    const body = new URLSearchParams({ "secret": "Wmfd2893gb7", "levelID": Number(id)})
    const response = await fetch(`${URL}downloadGJLevel22.php`, { method: "POST", headers: { "User-Agent": "" }, body: body } )
    const levelText = await response.text()
    const levelData = makeReadable(parseResponse(splitData(levelText, "#")[0], ":"), levelInfoC)
    return levelData
}
export async function getLevels(input, page=0, param=null) {
    const type = param ? param == 'u' ? 5 : 0 : 0
    input = type == 5 ? (await getUsers(input))["2"] : input
    const body = new URLSearchParams({ "secret": "Wmfd2893gb7", "str": input, "star": 0, "type": type, "page": page})
    const response = await fetch(`${URL}getGJLevels21.php`, { method: "POST", headers: { "User-Agent": "" }, body: body } )
    const levels = await response.text()
    const levelsData = splitData(levels, "#")
    const lvlsRaw = splitData(levelsData[0], "|")
    const creatorsRaw = splitData(levelsData[1], "|")
    const songsRaw = splitData(levelsData[2], "~:~")
    const totalOnPage = splitData(levelsData[3], ":")[0]

    let lvls = [], creators = {}, songs = {}, creatorsS, songsS
    for (let i=0; i<lvlsRaw.length; i++) { lvls.push(makeReadable(parseResponse(lvlsRaw[i], ":"), levelInfoC))}

    for (let i=0; i<creatorsRaw.length; i++) {
        creatorsS = splitData(creatorsRaw[i], ":")
        creators[creatorsS[0]] = creatorsS[1]
    }
    for (let i=0; i<songsRaw.length; i++) {
        songsS = splitData(songsRaw[i], "~|~", 0, true)
        songs[songsS[0]] = [songsS[1], songsS[3]]
    }
    return [lvls, creators, songs, totalOnPage]
}
// curse you robert !!!!!!!!!!!!!!!!!!!!

// console.log(await getLevelInfo('4706930'))

// node ./extras/gd/getLevel.js