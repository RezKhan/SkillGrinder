const adventurer = {
    job: [],
    level: 1,
    rank: "F",
    health: 100,
    maxHealth: 100,
    power: 10, 
    speed: 1,
    castProgress: 0.0,
};

const jobs = [
    {
        name: "Jobless",
        level: 1,
        rank: "F",
        experience: 0,
        nextLevel: 100,
        tier:0,
        active: true,
        abilities: [],
        startBar: '#5a3821',                        // BROWNS
        endBar: '#8a5938',
    },
    {
        name: "Warrior",
        level: 1,
        rank: "F",
        experience: 0,
        nextLevel: 100,
        tier:0,
        active: false,
        abilities: [],
        startBar: '#66291e',                        // BROWNISH RED
        endBar: '#a72610',
    },
    {
        name: "Rogue",
        level: 1,
        rank: "F",
        experience: 0,
        nextLevel: 100,
        tier:0,
        active: false,
        abilities: [],
        startBar: '#9c9e09',
        endBar: '#ceab13',
    },
    {
        name: "Mage",
        level: 1,
        rank: "F",
        experience: 0,
        nextLevel: 100,
        tier:0,
        active: false,
        abilities: [],
        startBar: '#f56e00',
        endBar: '#f53900',
    },
    // tier 1 jobs
    {
        name: "Ranger",
        level: 1,
        rank: "F",
        experience: 0,
        nextLevel: 100,
        tier:1,
        unlocked: false,
        active: false,
        abilities: [],
        startBar: '#f56e00',
        endBar: '#f53900',
    },
    {
        name: "Summoner",
        level: 1,
        rank: "F",
        experience: 0,
        nextLevel: 100,
        tier: 1,
        unlocked: false,
        active: false,
        abilities: [],
        startBar: '#f56e00',
        endBar: '#f53900',
    },
];

// Push jobs into adventurer object
jobs.forEach(element => {
    adventurer.job.push(element)
});

var joblessAbility = [
    {
        spellId: 1,
        name: "Punch",
        active: false,
        coefficient: 0.2,
        rank: "F",
        unlocked: true,
        castTime: 1.5,
        level: 1,
        experience: 0,
        nextLevel: 100,
    }, 
    {
        spellId: 2,
        name: "Kick",
        active: false,
        coefficient: 0.25,
        rank: "F",
        unlocked: false,
        castTime: 2,
        level: 1,
        experience: 0,
        nextLevel: 100,
    },
    {
        spellId: 3,
        name: "Whack",
        active: false,
        coefficient: 0.3,
        rank: "F",
        unlocked: false,
        castTime: 2.5,
        level: 1,
        experience: 0,
        nextLevel: 100,
    },
    {
        spellId: 4,
        name: "Flail",
        active: false,
        coefficient: 0.9,
        rank: "F",
        unlocked: false,
        castTime: 3,
        level: 1,
        experience: 0,
        nextLevel: 100,
    },
];

joblessAbility.forEach(element => {
    adventurer.job[0].abilities.push(element)
});

var warriorAbility = [
    {
        spellId: 5,
        name: "Slash",
        active: false,
        coefficient: 0.1,
        rank: "F",
        unlocked: true,
        castTime: 2,
        level: 1,
        experience: 0,
        nextLevel: 100,
    }, 
    {
        spellId: 6,
        name: "Strike",
        active: false,
        coefficient: 0.1,
        rank: "F",
        unlocked: false,
        castTime: 3,
        level: 1,
        experience: 0,
        nextLevel: 100,
    },
    {
        spellId: 7,
        name: "Crushing Blow",
        active: false,
        coefficient: 0.1,
        rank: "F",
        unlocked: false,
        castTime: 3,
        level: 1,
        experience: 0,
        nextLevel: 100,
    },
    {   spellId: 8,
        name: "Whirlwind",
        active: false,
        coefficient: 0.1,
        rank: "F",
        unlocked: false,
        castTime: 3,
        level: 1,
        experience: 0,
        nextLevel: 100,
    },
];

warriorAbility.forEach(element => {
    adventurer.job[1].abilities.push(element)
});

var rogueAbility = [
    {
        spellId: 9,
        name: "Stab",
        active: false,
        coefficient: 0.1,
        rank: "F",
        unlocked: true,
        castTime: 2,
        level: 1,
        experience: 0,
        nextLevel: 100,
    },
    {
        spellId: 10,
        name: "Throw Knife",
        active: false,
        coefficient: 0.1,
        rank: "F",
        unlocked: false,
        castTime: 4,
        level: 1,
        experience: 0,
        nextLevel: 100,
    },
    {
        spellId: 11,
        name: "Gash",
        active: false,
        coefficient: 0.1,
        rank: "F",
        unlocked: false,
        castTime: 1.5,
        level: 1,
        experience: 0,
        nextLevel: 100,
    },
    {
        spellId: 12,
        name: "Mug",
        active: false,
        coefficient: 0.1,
        rank: "F",
        unlocked: false,
        castTime: 4,
        level: 1,
        experience: 0,
        nextLevel: 100,
    },
];

rogueAbility.forEach(element => {
    adventurer.job[2].abilities.push(element)
});

var mageAbility = [
    {
        spellId: 13,
        name: "Fireball",
        active: false,
        coefficient: 0.1,
        rank: "F",
        unlocked: true,
        castTime: 3.5,
        level: 1,
        experience: 0,
        nextLevel: 100,
    }, 
    {
        spellId: 14,
        name: "Icicle",
        active: false,
        coefficient: 0.1,
        rank: "F",
        unlocked: false,
        castTime: 4,
        level: 1,
        experience: 0,
        nextLevel: 100,
    },
    {
        spellId: 15,
        name: "Sear",
        active: false,
        coefficient: 0.1,
        rank: "F",
        unlocked: false,
        castTime: 1.5,
        level: 1,
        experience: 0,
        nextLevel: 100,
    },
    {
        spellId: 16,
        name: "Lightning Strike",
        active: false,
        coefficient: 0.1,
        rank: "F",
        unlocked: false,
        castTime: 4,
        level: 1,
        experience: 0,
        nextLevel: 100,
    },
];

mageAbility.forEach(element => {
    adventurer.job[3].abilities.push(element)
});

adventurerMessages = [
    {
        messageType: 'game-update',
        messageBody: 'Welcome to Skill Grinder',
    },
    {
        messageType: 'game-update',
        messageBody: 'I am learning javascript',
    },
    {
        messageType: 'game-update',
        messageBody: 'Please forgive any jank',
    },
];