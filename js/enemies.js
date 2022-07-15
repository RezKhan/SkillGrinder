const enemy = {
    enemyType: [],
    level: 1,
    rank: "F",
    health: 100,
    maxHealth: 100,
    power: 10, 
    speed: 1, 
    castProgress: 0.0,
};

const enemyType = [
    {
        name: 'Puppet',
        level: 1,
        rank: 'F',
        healthMod: 1.1,
        tier: 0,
        unlocked: true,
        abilities: [],
    },
    {
        name: 'Cockroach',
        level: 1,
        rank: 'F',
        healthMod: 0.8,
        tier: 0,
        unlocked: true,
        abilities: [],
    },
    {
        name: 'Rat',
        level: 1,
        rank: 'F',
        healthMod: 0.9,
        tier: 0,
        unlocked: false,
        abilities: [],
    },
];

enemyType.forEach(element => {
    enemy.enemyType.push(element)
});

var puppetAbility = [
    {
        name: "Swing",
        coefficient: 0.1,
        rank: "F",
        castTime: 2,
        level: 1,
    },
    {
        name: "Bonk",
        coefficient: 0.2,
        rank: "F",
        castTime: 2.5,
        level: 1,
    },
];

puppetAbility.forEach(element => {
    enemy.enemyType[0].abilities.push(element)
});