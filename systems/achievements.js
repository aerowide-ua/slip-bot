import icons from '../extras/data/icons.json' with { type: 'json' };
import {GET, INC, SET} from './getdb.js'

export let ACH = {
    "pats": 0, // PATTING: 1 time, 5 times, 25 times, 100 times, 727 times (0, 1, 2, 3, 4, 5)
    "epic": 0, "leg": 0, "mitik": 0, "fail": 0, "teg": 0, "tMitik": 0, "tAll": 0, // RMM: epic, legendary, mythic, triple X, triple LEG, triple MITIK, all 3 slots are epic-mythic
    "ranks": 0, // RANKS: newbie, citizen, expert, council, guard, authority, gov (0, 1, 2, 3, 4, 5, 6, 7)
    "job": 0, // JOBBING: 1 time, 10 times, 50 times, 100 times, 250 times, 500 times, 2500 times (0, 1, 2, 3, 4, 5, 6, 7)
}

export function SET_ACH(id, number, setNum) {
    const currACH = GET('users', 0, id).achievements.split(":")
    currACH[number] = String(setNum)
    SET('users', 'achievements', id, currACH.join(":"))
}






export const ACH_DISPLAY = [
    // name, description, secret?, emoj
    [ // PATTING
        ["pat", "Pat Slip 1 time", false, icons.pat],
        ["pat pat", "Pat Slip 5 times", false, icons.pat],
        ["pat pat pat", "Pat Slip 25 times", false, icons.pat],
        ["pat pat pat pat", "Pat Slip 100 times!", false, icons.pat],
        ["ULTIMATE pat", "Pat Slip 727 times!!", true, icons.pat],
    ],
    // RRM
    [["epic win", "Get epic in Robtop's Rating Machine™", false, ":fire:"]],
    [["LEGENDARY!!", "Get legendary in Robtop's Rating Machine™", false, icons.leg]],
    [["MITIK!!!!!!", "Get MYTHIC in Robtop's Rating Machine™", false, icons.mitik]],
    [["your on fire xd", "Have all 3 slots on 3 best ratings in Robtop's Rating Machine™", true, ":fire::fire::fire:"]],
    [["epic fail", "Get triple X in Robtop's Rating Machine™", false, "boom:"]],
    [["LEGENDARIER!!!!", "Get triple legendary in Robtop's Rating Machine™", true, icons.LEG]],
    [["OH BABY IT'S TRIPLE", "GET TRIPLE MYTHIC IN Robtop's Rating Machine™", true, icons.MITIK]],
    [ // REP
        ["Welcome to Topatropolis!", "Get the Newbie reputation!", false, icons.newb],
        ["Topatropalian", "Get the Citizen reputation!", false, icons.citizen],
        ["PhD in Topatropols studies", "Get the Expert reputation!", false, ":boom:"],
        ["Topatropojudgement", "Get the Council Member reputation!!", false, ":boom:"],
        ["Sword and shield", "Get the City Guard reputation!!™", false, ":boom:"],
        ["Illuminati confirmed", "Get the Authority reputation!!!™", false, ":boom:"],
        ["On the Topa of the world", "Get the Governor reputation!!!!", false, ":boom:"],
    ],
    [ // JOB
        ["Boring", "Work your first job", false, icons.damn],
        ["Boooring", "Work 10 jobs", false, icons.damn],
        ["Boooooring", "Work 50 jobs", false, icons.damn],
        ["Boooooooring", "Work 100 jobs", false, icons.damn],
        ["Extra boring", "Work 250 jobs", false, icons.damn],
        ["Extra extra boring", "Work 500 jobs", false, icons.damn],
        ["As boring as it can get", "Work 2500 jobs....", true, icons.damn2],
    ]
]