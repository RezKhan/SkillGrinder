function joblessUnlocks() {
    if (adventurer.job[0].abilities[0].level >= 3) {
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