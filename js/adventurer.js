var adventurer = {
    job: [],
    level: 1,
    rank: "F",
    health: 10,
    power: 10, 
    speed: 1
};

var jobs = [
    {
        name: "Jobless",
        level: 1,
        rank: "F",
        experience: 0,
        tier:0,
        jobIsActive: true,
        abilities: [],
        startBar: '#5a3821',                        // BROWNS
        endBar: '#8a5938',
    },
    {
        name: "Warrior",
        level: 1,
        rank: "F",
        experience: 0,
        tier:0,
        jobIsActive: false,
        abilities: [],
        startBar: '#66291e',                        // BROWNISH RED
        endBar: '#a72610',
    },
    {
        name: "Rogue",
        level: 1,
        rank: "F",
        experience: 0,
        tier:0,
        jobIsActive: false,
        abilities: [],
        startBar: '#5a3821',
        endBar: '#8a5938',
    },
    {
        name: "Mage",
        level: 1,
        rank: "F",
        experience: 0,
        tier:0,
        jobIsActive: false,
        abilities: [],
        startBar: '#5a3821',
        endBar: '#8a5938',
    },
    // tier 1 jobs
    {
        name: "Ranger",
        level: 1,
        rank: "F",
        experience: 0,
        tier:1,
        unlocked: false,
        jobIsActive: false,
        abilities: [],
    },
    {
        name: "Summoner",
        level: 1,
        rank: "F",
        experience: 0,
        tier: 1,
        unlocked: false,
        jobIsActive: false,
        abilities: [],
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
        coefficient: 0.1,
        rank: "F",
        unlocked: true,
        castTime: 1.5,
        castProgress: 0.0,
        level: 1,
        experience: 0,
    }, 
    {
        spellId: 2,
        name: "Kick",
        active: false,
        coefficient: 0.12,
        rank: "F",
        unlocked: false,
        castTime: 2,
        castProgress: 0.0,
        level: 1,
        experience: 0
    },
    {
        spellId: 9,
        name: "Whack",
        active: false,
        coefficient: 0.125,
        rank: "F",
        unlocked: false,
        castTime: 2.5,
        castProgress: 0.0,
        level: 1,
        experience: 0
    },
    {
        spellId: 10,
        name: "Flail",
        active: false,
        coefficient: 0.13,
        rank: "F",
        unlocked: false,
        castTime: 3,
        castProgress: 0.0,
        level: 1,
        experience: 0
    },
];

joblessAbility.forEach(element => {
    adventurer.job[0].abilities.push(element)
});

var warriorAbility = [
    {
        spellId: 3,
        name: "Slash",
        active: false,
        coefficient: 0.1,
        rank: "F",
        unlocked: true,
        castTime: 2,
        level: 1,
        experience: 0
    }, 
    {
        spellId: 4,
        name: "Strike",
        active: false,
        coefficient: 0.1,
        rank: "F",
        unlocked: false,
        castTime: 3,
        level: 1,
        experience: 0
    },
];

warriorAbility.forEach(element => {
    adventurer.job[1].abilities.push(element)
});

var rogueAbility = [
    {
        spellId: 5,
        name: "Stab",
        active: false,
        coefficient: 0.1,
        rank: "F",
        unlocked: true,
        castTime: 2,
        level: 1,
        experience: 0
    },
    {
        spellId: 6,
        name: "Throw Knife",
        active: false,
        coefficient: 0.1,
        rank: "F",
        unlocked: false,
        castTime: 4,
        level: 1,
        experience: 0
    }, ];

rogueAbility.forEach(element => {
    adventurer.job[2].abilities.push(element)
});

var mageAbility = [
    {
        spellId: 7,
        name: "Fireball",
        active: false,
        coefficient: 0.1,
        rank: "F",
        unlocked: true,
        castTime: 3.5,
        level: 1,
        experience: 0
    }, 
    {
        spellId: 8,
        name: "Icicle",
        active: false,
        coefficient: 0.1,
        rank: "F",
        unlocked: false,
        castTime: 4,
        level: 1,
        experience: 0
    },
];

mageAbility.forEach(element => {
    adventurer.job[3].abilities.push(element)
});
