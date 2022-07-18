function enemyDamageTurn() {
    return Math.round((Math.random() * (enemy.level+skg.currentEnemy.level))+((enemy.power * skg.currentEnemySkill.coefficient) * (rankToCoefficient(enemy.rank) + (rankToCoefficient(skg.currentEnemy.rank) * rankToCoefficient(skg.currentEnemySkill.rank))) * (enemy.level + skg.currentEnemy.level))); 
    
}

function adventurerDamageTurn() {
    return Math.round((Math.random() * (adventurer.level + skg.currentJob.level)) + (adventurer.power * skg.currentSkill.coefficient * (rankToCoefficient(adventurer.rank, 1+skg.currentJob.tier) + (rankToCoefficient(skg.currentJob.rank, 1+skg.currentJob.tier) * rankToCoefficient(skg.currentSkill.rank, 11+skg.currentJob.tier))) * ((adventurer.level * skg.currentJob.level) + skg.currentSkill.level)));
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

function mageUnlocks() {

}

function checkUnlocks() {
    joblessUnlocks();
}