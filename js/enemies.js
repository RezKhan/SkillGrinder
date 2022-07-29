const enemy = {
    enemyType: [],
    level: 1,
    rank: "F",
    health: 100,
    maxHealth: 100,
    constHealth: 100,
    power: 10, 
    constPower: 10,
    castProgress: 0.0,
    killedCount: 0,
};

const enemyFamilies = ['Beast', 'Reptile', 'Flying', 
'Insect', 'Plant', 'Humanoid', 
'Construct', 'Undead', 'Abberation', 'Demon'];

const enemyType = [
    {
        name: 'Puppet',
        enemyFamily: 'Construct',
        level: 1,
        nextLevel: 20,
        constExp: 20,
        rank: 'F',
        healthMod: 0.8,
        tier: 0,
        unlocked: true,
        killedCount: 0,
        abilityList: ['Swing', 'Bonk'],
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Rat',
        enemyFamily: 'Beast',
        level: 1,
        nextLevel: 25,
        constExp: 25,
        rank: 'F',
        healthMod: 0.9,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilityList: ['Scratch', 'Bite'],
        abilities: [],
        castSequence: [0,1],
    },
    {
        name: 'Bat',
        enemyFamily: 'Beast',
        level: 1,
        nextLevel: 30,
        constExp: 30,
        rank: 'F',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilityList: ['Bite', 'Screech'],
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Oozling',
        enemyFamily: 'Abberation',
        level: 1,
        nextLevel: 35,
        constExp: 35,
        rank: 'F',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilityList: ['Bad Breath', 'Gaze'],
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Stray Dog',
        enemyFamily: 'Beast',
        level: 1,
        nextLevel: 40,
        constExp: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilityList: ['Bite', 'Claw'],
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Wasp',
        enemyFamily: 'Insect',
        level: 1,
        nextLevel: 40,
        constExp: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
        abilityList: ['Sting', 'Bite'],
        castSequence: [0,0,1],
    },
    {
        name: 'Snake',
        enemyFamily: 'Reptile',
        level: 1,
        nextLevel: 40,
        constExp: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilityList: ['Bite', 'Spit'],
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Slime',
        enemyFamily: 'Abberation',
        level: 1,
        nextLevel: 40,
        constExp: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilityList: ['Bad Breath', 'Bonk'],
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'One Horn',
        enemyFamily: 'Beast',
        level: 1,
        nextLevel: 40,
        constExp: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilityList: ['Charge', 'Bite'],
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Dire Toad',
        enemyFamily: 'Reptile',
        level: 1,
        nextLevel: 40,
        constExp: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilityList: ['Tongue', 'Claw'],
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Tiny Bear',
        enemyFamily: 'Beast',
        level: 1,
        nextLevel: 40,
        constExp: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilityList: ['Mangle', 'Bite'],
        abilities: [],
        castSequence: [0,1],
    },
    {
        name: 'Goblin',
        enemyFamily: 'Humanoid',
        level: 1,
        nextLevel: 40,
        constExp: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilityList: ['Swing', 'Stab'],
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Suit of Armor',
        enemyFamily: 'Construct',
        level: 1,
        nextLevel: 40,
        constExp: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilityList: ['Swing', 'Stab', 'Bonk'],
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Floating Skull',
        enemyFamily: 'Undead',
        level: 1,
        nextLevel: 40,
        constExp: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilityList: ['Gaze', 'Bite'],
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Red Spider',
        enemyFamily: 'Insect',
        level: 1,
        nextLevel: 40,
        constExp: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilityList: ['Sting', 'Claw'],
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Thief',
        enemyFamily: 'Humanoid',
        level: 1,
        nextLevel: 40,
        constExp: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilityList: ['Stab'],
        abilities: [],
        castSequence: [0,],
    },
    {
        name: 'Flying Eye',
        enemyFamily: 'Demon',
        level: 1,
        nextLevel: 40,
        constExp: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilityList: ['Gaze', 'Mangle'],
        abilities: [],
        castSequence: [0,0,1],
    },
];

enemyType.forEach(element => {
    enemy.enemyType.push(element)
});

const enemyAbilityList = [
    {
        name: "Swing",
        abilityFamily: 'Construct',
        coefficient: 0.7,
        rank: "F",
        castTime: 2,
        level: 1,
    },
    {
        name: "Bonk",
        abilityFamily: 'Construct',
        coefficient: 0.75,
        rank: "F",
        castTime: 2.5,
        level: 1,
    },
    {
        name: "Scratch",
        abilityFamily: 'Beast',
        coefficient: 0.75,
        rank: "F",
        castTime: 2,
        level: 1,
    },
    {
        name: "Bite",
        abilityFamily: 'Beast',
        coefficient: 0.8,
        rank: "F",
        castTime: 2.5,
        level: 1,
    },
    {
        name: "Charge",
        abilityFamily: 'Beast',
        coefficient: 0.8,
        rank: "F",
        castTime: 2,
        level: 1,
    },
    {
        name: "Claw",
        abilityFamily: 'Beast',
        coefficient: 0.85,
        rank: "F",
        castTime: 2,
        level: 1,
    },
    {
        name: "Mangle",
        abilityFamily: 'Beast',
        coefficient: 0.9,
        rank: "F",
        castTime: 1.5,
        level: 1,
    },
    {
        name: "Stab",
        abilityFamily: 'Humanoid',
        coefficient: 0.9,
        rank: "F",
        castTime: 2,
        level: 1,
    },
    {
        name: "Screech",
        abilityFamily: 'Flying',
        coefficient: 0.9,
        rank: "F",
        castTime: 2,
        level: 1,
    },
    {
        name: "Spit",
        abilityFamily: 'Reptile',
        coefficient: 0.9,
        rank: "F",
        castTime: 1.5,
        level: 1,
    },
    {
        name: "Tongue",
        abilityFamily: 'Reptile',
        coefficient: 0.8,
        rank: "F",
        castTime: 2,
        level: 1,
    },
    {
        name: "Bad Breath",
        abilityFamily: 'Abberation',
        coefficient: 0.85,
        rank: "F",
        castTime: 2,
        level: 1,
    },
    {
        name: "Gaze",
        abilityFamily: 'Undead',
        coefficient: 0.9,
        rank: "F",
        castTime: 2,
        level: 1,
    },
    {
        name: "Sting",
        abilityFamily: 'Insect',
        coefficient: 0.85,
        rank: "F",
        castTime: 2,
        level: 1,
    },
];

enemyType.forEach((element) => {
    // setEnemyAbility(element);\
    console.log(element)

    let tArr = enemyAbilityList.filter((enemyAbilityList) => element.abilityList.includes(enemyAbilityList.name));
    tArr.forEach((value) => {
        element.abilities.push(value);
    })
});

const enemyArea = [
    {
        areaType: 'normal',
        prevArea: false,
        nextArea: false,
        description: 'Practice Room',
        minLevel: 1,
        maxLevel: 2,
        available: ['Puppet', 'Rat']
    },
    {
        areaType: 'normal',
        prevArea: true,
        nextArea: false,
        description: 'A field at night',
        minLevel: 2,
        maxLevel: 4,
        available: ['Rat', 'Bat', 'Oozling']
    }
];