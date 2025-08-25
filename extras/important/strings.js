export const userInfoC = {
    '1': 'name',
    '2': 'pID', // player ID
    '3': 'stars',
    '4': 'demons',
    '8': 'bp', // builder points :3
    '9': 'icon',
    '10': 'color1',
    '11': 'color2',
    '13': 'coins', // gold
    '16': 'aID', // account ID
    '17': 'userCoins',
    '18': 'messages',
    '19': 'friendReqs',
    '20': 'youtube',
    '21': 'cube',
    '22': 'ship',
    '23': 'ball',
    '24': 'ufo',
    '25': 'wave',
    '26': 'robot',
    '28': 'glow',
    '30': 'lb', // leaderboard rank
    '43': 'spider',
    '44': 'xitter',
    '45': 'twitch',
    '46': 'diamonds',
    '48': 'explosion', // explosion effect
    '49': 'mod',
    '51': 'colorG', // glou
    '52': 'moons',
    '53': 'swing',
    '54': 'jetpack',
    '55': 'dSpread', // DEMONS ---> //classic// easy, medium, hard, insane, extreme, //plat// easy, medium, hard, insane, extreme, //misc// weekly, gauntlet
    '56': 'cSpread', // CLASSIC ---> auto, easy, normal, hard, harder, insane, daily, gauntlet
    '57': 'pSpread' // PLATFORMER ---> auto, easy, normal, hard, harder, insane, daily(????)
}

export const levelInfoC = {
    '1': 'lID',
    '2': 'name',
    '3': 'desc',
    '5': 'ver',
    '6': 'pID',
    '10': 'downloads',
    '12': 'oSong',
    '13': 'gameVer',
    '14': 'likes',
    '15': 'length',
    '16': 'dislikes',
    '17': 'demon',
    '18': 'stars',
    '19': 'featureScore',
    '25': 'auto',
    '3': 'desc',
    '3': 'desc',
    '3': 'desc',
    '3': 'desc',
    '3': 'desc',
    '3': 'desc',
    '3': 'desc',
    '3': 'desc',
    '3': 'desc',
    '3': 'desc',
    '3': 'desc',

    
}








export const gdIcons = [
    // 0-9 PROFILE ICONS
    '<:stars:1409150321401528433>', '<:Diamond:1409150773983449108>', '<:GoldCoin:1409151518057304115>', '<:SilverCoinIcon:1409150835371282535>', '<:DemonIcon:1409150562863157308>',
    '<:Moon:1409155031978086400>', '<:CreatorPoint:1409150744967254177>', '<:Profile:1409155468101943337>', '<:ExclamationMark:1409156325325144195>', '<:InfoIcon:1409150449587720363>',
    // 10-23 MORE PROFILE ICONS
    '<:OrbIcon:1409150799417839687>', '<:CubeTabOn:1409151018947711006>', '<:ShipTabOn:1409151042146402364>', '<:gj_ballBtn_on_001:1409152148582699100>', '<:UFOTabOn:1409151176783560774>',
    '<:DartTabOn:1409151246136508456>', '<:RobotTabOn:1409151236628025388>', '<:SpiderTabOn:1409151161868751041>', '<:ExplosionTabOn:1409151253338132631>', '<:EditHSV:1409200972680527922>', 
    '<:CrossExit:1409208524604440616>', '<:YouTubeIcon:1409213416769589308>', '<:TwitterIcon:1409213428765032499>', '<:TwitchIcon:1409543095321886740>', '',
    // 24-29 LEVEL ICONS
    '', '', '', '', '', 

    '', '', '', '', '',
    '', '', '', '', '', 

    '', '', '', '', '',
    '', '', '', '', '', 
]

export function gdrank(n) {
    return (
        n == 0 ? '<:ExclamationMark:1409156325325144195>' : n == 1 ? '<:Top1Rank:1409150605947047986>' :
        n <= 10 ? '<:Top10Rank:1409150613928804383>' : n <= 50 ? '<:Top50Rank:1409150620170063982>' :
        n <= 100 ? '<:Top100Rank:1409150630462754857>' : n <= 200 ? '<:Top200Rank:1409150638499041321>' :
        n <= 500 ? '<:Top500Rank:1409150646405300235>' : n <= 1000 ? '<:Top1000Rank:1409150654840176700>' :
        '<:RankAll:1409150597873008792>' )
}