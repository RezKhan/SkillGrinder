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

function setAbilityColors(index) {
    styleRoot = document.querySelector(':root');
    styleRoot.style.setProperty('--fill-start', adventurer.job[index].startBar);
    styleRoot.style.setProperty('--fill-end', adventurer.job[index].endBar);      
}

function levelUp(levelObj) {    // compounding to get health increases
    console.log(levelObj.level);
}

function messageUpdates (mtype, mbody) {
    const tObj = {
        messageType: mtype,
        messageBody: mbody,
    }
    adventurerMessages.push(tObj)
    if (adventurerMessages.length > 5) {
        adventurerMessages.shift()
    }
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

function joblessUnlocks() {
    if (adventurer.job[0].abilities[0].level >= 3) { // unlock kick
        adventurer.job[0].abilities[1].unlocked = true;
    }
}

function warriorUnlocks() {

}

function rogueUnlocks() {

}

function mageUnlocks() {

}

function enemyUnlocks() {
    if (enemy.enemyType[0].killedCount >= 10) { // unlock the rat
        enemy.enemyType[0].level=2
        enemy.enemyType[1].unlocked = true;
    }
}

function checkUnlocks() {
    joblessUnlocks();

    enemyUnlocks();
}

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