const enemy = {
    enemyType: [],
    level: 1,
    rank: "F",
    health: 100,
    maxHealth: 100,
    constMaxHealth: 100,
    power: 10, 
    constPower: 10,
    castProgress: 0.0,
    killedCount: 0,
};

const enemyFamilies = ['Beast', 'Reptile', 'Flying', 
'Insect', 'Plant', 'Humanoid', 
'Construct', 'Undead', 'Aberation', 'Demon'];

const enemyType = [
    {
        name: 'Puppet',
        enemyFamily: 'Construct',
        level: 1,
        nextLevel: 20,
        rank: 'F',
        healthMod: 0.8,
        tier: 0,
        unlocked: true,
        killedCount: 0,
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Rat',
        enemyFamily: 'Beast',
        level: 1,
        nextLevel: 25,
        rank: 'F',
        healthMod: 0.9,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
        castSequence: [0,1],
    },
    {
        name: 'Bat',
        enemyFamily: 'Beast',
        level: 1,
        nextLevel: 30,
        rank: 'F',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Oozling',
        enemyFamily: 'Aberation',
        level: 1,
        nextLevel: 35,
        rank: 'F',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Slime',
        enemyFamily: 'Aberation',
        level: 1,
        nextLevel: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Stray Dog',
        enemyFamily: 'Beast',
        level: 1,
        nextLevel: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Wasp',
        enemyFamily: 'Insect',
        level: 1,
        nextLevel: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Snake',
        enemyFamily: 'Reptile',
        level: 1,
        nextLevel: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'One Horn',
        enemyFamily: 'Beast',
        level: 1,
        nextLevel: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Dire Toad',
        enemyFamily: 'Reptile',
        level: 1,
        nextLevel: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Tiny Bear',
        enemyFamily: 'Beast',
        level: 1,
        nextLevel: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Goblin',
        enemyFamily: 'Humanoid',
        level: 1,
        nextLevel: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Suit of Armor',
        enemyFamily: 'Construct',
        level: 1,
        nextLevel: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Floating Skull',
        enemyFamily: 'Undead',
        level: 1,
        nextLevel: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Red Spider',
        enemyFamily: 'Insect',
        level: 1,
        nextLevel: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Thief',
        enemyFamily: 'Humanoid',
        level: 1,
        nextLevel: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
        castSequence: [0,0,1],
    },
    {
        name: 'Flying Eye',
        enemyFamily: 'Demon',
        level: 1,
        nextLevel: 40,
        rank: 'E',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
        castSequence: [0,0,1],
    },
];

enemyType.forEach(element => {
    enemy.enemyType.push(element)
});

const puppetAbility = [
    {
        name: "Swing",
        coefficient: 0.7,
        rank: "F",
        castTime: 2,
        level: 1,
    },
    {
        name: "Bonk",
        coefficient: 0.75,
        rank: "F",
        castTime: 2.5,
        level: 1,
    },
];

puppetAbility.forEach(element => {
    enemy.enemyType[0].abilities.push(element)
});

const ratAbility = [
    {
        name: "Scratch",
        coefficient: 0.75,
        rank: "F",
        castTime: 2,
        level: 1,
    },
    {
        name: "Bite",
        coefficient: 0.8,
        rank: "F",
        castTime: 2.5,
        level: 1,
    },
];

ratAbility.forEach(element => {
    enemy.enemyType[1].abilities.push(element)
});

const batAbility = [
    {
        name: "Bite",
        coefficient: 0.85,
        rank: "F",
        castTime: 2,
        level: 1,
    },
    {
        name: "Screech",
        coefficient: 0.9,
        rank: "F",
        castTime: 2,
        level: 1,
    },
];

batAbility.forEach(element => {
    enemy.enemyType[2].abilities.push(element)
});


const oozlingAbility = [
    {
        name: "Bad Breath",
        coefficient: 0.85,
        rank: "F",
        castTime: 2,
        level: 1,
    },
    {
        name: "Gaze",
        coefficient: 0.9,
        rank: "F",
        castTime: 2,
        level: 1,
    },
];

oozlingAbility.forEach(element => {
    enemy.enemyType[3].abilities.push(element)
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

enemyAbilityList = [
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
        name: "Screech",
        abilityFamily: 'Flying',
        coefficient: 0.9,
        rank: "F",
        castTime: 2,
        level: 1,
    },
    {
        name: "Bad Breath",
        abilityFamily: 'Undead',
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
];
