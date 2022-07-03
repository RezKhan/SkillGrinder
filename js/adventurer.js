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
        jobIsActive: false,
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
        jobIsActive: false
    },
    {
        name: "Summoner",
        level: 1,
        rank: "F",
        experience: 0,
        tier: 1,
        unlocked: false,
        jobIsActive: false
    },
];

// Push jobs into adventurer object
jobs.forEach(element => {
    adventurer.job.push(element)
});

var joblessAbility = [
    {
        name: "Punch",
        coefficient: 0.1,
        rank: "F",
        unlockLevel: 1,
        castTime: 3.5,
        experience: 0
    }, 
    {
        name: "Kick",
        coefficient: 0.1,
        rank: "F",
        unlockLevel: 3,
        castTime: 4,
        experience: 0
    },
];

joblessAbility.forEach(element => {
    adventurer.job[0].abilities.push(element)
});

var warriorAbility = [
    {
        name: "Slash",
        coefficient: 0.1,
        rank: "F",
        unlockLevel: 1,
        castTime: 3.5,
        experience: 0
    }, 
    {
        name: "Strike",
        coefficient: 0.1,
        rank: "F",
        unlockLevel: 1,
        castTime: 4,
        experience: 0
    },
];

warriorAbility.forEach(element => {
    adventurer.job[1].abilities.push(element)
});

var rogueAbility = [
    {
        name: "Stab",
        coefficient: 0.1,
        rank: "F",
        unlockLevel: 1,
        castTime: 3.5,
        experience: 0
    }, 
    {
        name: "Kick",
        coefficient: 0.1,
        rank: "F",
        unlockLevel: 1,
        castTime: 4,
        experience: 0
    },
];

rogueAbility.forEach(element => {
    adventurer.job[2].abilities.push(element)
});

var mageAbility = [
    {
        name: "Fireball",
        coefficient: 0.1,
        rank: "F",
        unlockLevel: 1,
        castTime: 3.5,
        experience: 0
    }, 
    {
        name: "Icile",
        coefficient: 0.1,
        rank: "F",
        unlockLevel: 1,
        castTime: 4,
        experience: 0
    },
];

mageAbility.forEach(element => {
    adventurer.job[3].abilities.push(element)
});
