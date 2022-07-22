const enemy = {
    enemyType: [],
    level: 1,
    rank: "F",
    health: 100,
    maxHealth: 100,
    constMaxHealth: 100,
    power: 10, 
    castProgress: 0.0,
    killedCount: 0,
};

const enemyType = [
    {
        name: 'Puppet',
        level: 1,
        experience: 20,
        rank: 'F',
        healthMod: 0.8,
        tier: 0,
        unlocked: true,
        killedCount: 0,
        abilities: [],
    },
    {
        name: 'Rat',
        level: 1,
        experience: 25,
        rank: 'F',
        healthMod: 0.9,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
    },
    {
        name: 'Bat',
        level: 1,
        experience: 30,
        rank: 'F',
        healthMod: 1,
        tier: 0,
        unlocked: false,
        killedCount: 0,
        abilities: [],
    },
];

enemyType.forEach(element => {
    enemy.enemyType.push(element)
});

var puppetAbility = [
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