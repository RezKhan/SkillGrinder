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
    },
    {
        name: "Warrior",
        level: 1,
        rank: "F",
        experience: 0,
        tier:0,
        jobIsActive: false,
        abilities: [],
    },
    {
        name: "Rogue",
        level: 1,
        rank: "F",
        experience: 0,
        tier:0,
        jobIsActive: false,
        abilities: [],
    },
    {
        name: "Mage",
        level: 1,
        rank: "F",
        experience: 0,
        tier:0,
        jobIsActive: false,
        abilities: [],
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
        name: "Kick",
        active: false,
        coefficient: 0.1,
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
