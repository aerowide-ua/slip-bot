

export const gdIcons = [
    '<:stars:1409150321401528433>', '<:Diamond:1409150773983449108>', '<:GoldCoin:1409151518057304115>', '<:sCoin:1409150835371282535>', '<:DemonIcon:1409150562863157308>',
    
    '<:Moon:1409155031978086400>', '<:CreatorPoint:1409150744967254177>', '<:Profile:1409155468101943337>', '<:ExclamationMark:1409156325325144195>', '<:InfoIcon:1409150449587720363>',

    '<:OrbIcon:1409150799417839687>', '<:CubeTabOn:1409151018947711006>', '<:ShipTabOn:1409151042146402364>', '<:gj_ballBtn_on_001:1409152148582699100>', '<:UFOTabOn:1409151176783560774>',

    '<:DartTabOn:1409151246136508456>', '<:RobotTabOn:1409151236628025388>', '<:SpiderTabOn:1409151161868751041>', '<:ExplosionTabOn:1409151253338132631>', '<:EditHSV:1409200972680527922>', 

    '<:CrossExit:1409208524604440616>', '<:YouTubeIcon:1409213416769589308>', '<:TwitterIcon:1409213428765032499>', '<:TwitchIcon:1409543095321886740>', '',

    '<:Auto:1409901005340151881>', '<:EasyIcon:1409900826767396864>', '<:NormalIcon:1409900852436668557>', '<:HardIcon:1409900870652526594>', '<:HarderIcon:1409900886695870474>', 

    '<:InsaneIcon:1409900926168207430>', '<:EasyDemon:1409900539373818007>', '<:MediumDemon:1409900556033720411>', '<:Demon:1409900590493864057>', '<:InsaneDemon:1409900605711056988>',

    '<:ExtremeDemon:1409900615328465008>', '<:FeaturedBG:1409894231723610133>', '<:EpicBG:1409894219832754276>', '<:LegendaryBG:1409894105500356780>', '<:MythicBG:1409894146856190125>', 

    '<:LikeIcon:1409150458383044688>', '<:DownloadsIcon:1409909883779678318>', '<:Unrated:1409939539585274070>', '<:TimeIcon:1409150416339468289>', '<:UserCoinUnverified:1409943459409690655>',

    '<:MusicOn:1409954732402933903>', '<:GJ_chatBtn_02_001:1409151945620328598>', '<:Play:1409967761219911826>', '<:Check:1410152672736313354>', '<:collaborationIcon_001:1410213652643971204>', 
]

export function gdrank(n) {
    return (
        n == 0 ? '<:ExclamationMark:1409156325325144195>' : n == 1 ? '<:Top1Rank:1409150605947047986>' :
        n <= 10 ? '<:Top10Rank:1409150613928804383>' : n <= 50 ? '<:Top50Rank:1409150620170063982>' :
        n <= 100 ? '<:Top100Rank:1409150630462754857>' : n <= 200 ? '<:Top200Rank:1409150638499041321>' :
        n <= 500 ? '<:Top500Rank:1409150646405300235>' : n <= 1000 ? '<:Top1000Rank:1409150654840176700>' :
        '<:RankAll:1409150597873008792>' )
}

const assetsPath = 'media/images/gd'
export const gdAssets = {
    "auto": `${assetsPath}/difficulties/Auto.png`,
    "easy": `${assetsPath}/difficulties/Easy.png`,
    "normal": `${assetsPath}/difficulties/Normal.png`,
    "hard": `${assetsPath}/difficulties/Hard.png`,
    "harder": `${assetsPath}/difficulties/Harder.png`,
    "insane": `${assetsPath}/difficulties/Insane.png`,
    "eDemon": `${assetsPath}/difficulties/Easy Demon.png`,
    "mDemon": `${assetsPath}/difficulties/Medium Demon.png`,
    "hDemon": `${assetsPath}/difficulties/Hard Demon.png`,
    "iDemon": `${assetsPath}/difficulties/Insane Demon.png`,
    "exDemon": `${assetsPath}/difficulties/Extreme Demon.png`,
    "feature": `${assetsPath}/difficulties/Featured BG.png`,
    "epic": `${assetsPath}/difficulties/Epic BG.png`,
    "leg": `${assetsPath}/difficulties/Legendary BG.png`,
    "mythic": `${assetsPath}/difficulties/Mythic BG.png`
}
