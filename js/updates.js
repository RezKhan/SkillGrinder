function enemyDamageTurn() { 
    let primaryMultiplier = enemy.power;
    let secondaryMultiplier = (enemy.level * skg.currentEnemy.level) + skg.currentEnemySkill.level;
    let coefficient = rankToCoefficient(enemy.rank) + ((1 + skg.currentEnemySkill.coefficient) * rankToCoefficient(skg.currentEnemy.rank) * rankToCoefficient(skg.currentEnemySkill.rank))
    let wiggle = Math.random() * (enemy.level+skg.currentEnemy.level);

    let result = Math.round(wiggle + (primaryMultiplier * secondaryMultiplier * coefficient))
    return result;
}
// TODO: replace these two with one function that takes 3 objects as arguments
function adventurerDamageTurn() {
    let primaryMultiplier = adventurer.power;
    let secondaryMultiplier = (adventurer.level * skg.currentJob.level) + skg.currentSkill.level;
    let coefficient = rankToCoefficient(adventurer.rank, 1+skg.currentJob.tier) + ((1 + skg.currentSkill.coefficient) * rankToCoefficient(skg.currentJob.rank, 1+skg.currentJob.tier) * rankToCoefficient(skg.currentSkill.rank, 1+skg.currentJob.tier));
    var wiggle = Math.random() * (adventurer.level + skg.currentJob.level);

    let result = Math.round(wiggle + (primaryMultiplier * secondaryMultiplier * coefficient));
    return result;
}

function rankToCoefficient(rank, modifier) {
    if (modifier==null) {
        modifier = 1;
    }
    switch (rank) {
        case 'F':
            return (0.4*modifier);
        case 'E': 
            return (0.5*modifier);
    }
}

function setAbilityColors(index) {
    let styleAbilities = document.querySelector(':root');
    styleAbilities.style.setProperty('--fill-start', adventurer.job[index].startBar);
    styleAbilities.style.setProperty('--fill-end', adventurer.job[index].endBar);      
}

function levelUp(lObj) {    // compounding to get level increases for health/power
    if (lObj.hasOwnProperty('maxHealth') && lObj.hasOwnProperty('constHealth')) {
        levelLoop(lObj, 'maxHealth', 'constHealth')
    }
    if (lObj.hasOwnProperty('power')  && lObj.hasOwnProperty('constPower')) {
        levelLoop(lObj, 'power', 'constPower')
    }
    if (lObj.hasOwnProperty('nextLevel') && lObj.hasOwnProperty('constExp')) {
        levelLoop(lObj, 'nextLevel', 'constExp')
    }

    function levelLoop(lObj, objProp, baseProp) {
        if (Object.prototype.hasOwnProperty.call(lObj, objProp) == true) {
            lObj[objProp] = lObj[baseProp]; // reset to base value then compound
            for (let i = 1; i < lObj.level; i++) {
                Math.round(lObj[objProp] *= 1.1);
            }
            messageUpdates(gameMessages, 'game-update', (lObj.name + ' feels stronger ... '));
        }
    }
}

function messageUpdates(mObj, mtype, mbody) {
    const tObj = {
        messageType: mtype,
        messageBody: mbody,
    }
    mObj.push(tObj)
    if (combatMessages.length > 10) {
        combatMessages.shift()
    }
    let cbtUpdDiv = document.getElementsByClassName('combat-updates');
    cbtUpdDiv.scrollTop = cbtUpdDiv.scrollHeight;
    let strUpdDiv = document.getElementsByClassName('game-updates');
    strUpdDiv.scrollTop = strUpdDiv.scrollHeight;
}


function jobUnlocks(job) {
    if (job.abilities[0].level >= 3 &&  !job.abilities[1].unlocked) { 
        job.abilities[1].unlocked = true;
        messageUpdates(gameMessages, 'game-update', ('You have unlocked ' + job.abilities[1].name));
    }
    if (job.abilities[1].level >= 3 &&  !job.abilities[2].unlocked) { 
        job.abilities[2].unlocked = true;
        messageUpdates(gameMessages, 'game-update', ('You have unlocked ' + job.abilities[2].name));
    }
    if (job.abilities[2].level >= 3 &&  !job.abilities[3].unlocked) { 
        job.abilities[3].unlocked = true;
        messageUpdates(gameMessages, 'game-update', ('You have unlocked ' + job.abilities[3].name));
    }
}

function enemyUnlocks() {
    if ((enemy.enemyType[0].killedCount >= 10) && !enemy.enemyType[1].unlocked) { // unlock the rat
        enemy.enemyType[1].unlocked = true;
        messageUpdates(gameMessages, 'game-update', 'a Rat enters the area...')
        enemyArea[0].nextArea = true;
    }
    if ((enemy.enemyType[1].killedCount >= 10) && !enemy.enemyType[2].unlocked) { // unlock the rat
        enemy.enemyType[2].unlocked = true;
        messageUpdates(gameMessages, 'game-update', 'a Bat has flown in...')
    }
}

function checkUnlocks(job) {
    jobUnlocks(job);

    enemyUnlocks();
}

let combatMessages = [
    {
        messageType: 'general-update',
        messageBody: 'Welcome to Skill Grinder',
    },
    {
        messageType: 'general-update',
        messageBody: 'I am learning javascript, please forgive any jank',
    },
];

let gameMessages = [
    {
        messageType: 'game-update',
        messageBody: 'You have awakened with little memory of who you are or what you were doing...',
    },
];

// Zpecs thing, use this when I need something more robust, probably when gear is in place
// function zspecsDamage() {
//     const modifiers = [
//         { name: "Sword of Damage Tenfolding", transform: x => x * 10 },
//         { name: "Helmet of Non-Seeing", transform: x => x - 2 }
//       ];
      
//       function calculateModifiers(value) {
//         let result = [value];
//         for (const modifier of modifiers) {
//           result = result.map(modifier.transform)
//         }
//         return result[0];
//       }
      
//       const newDamage = calculateModifiers(oldDamage);
// }