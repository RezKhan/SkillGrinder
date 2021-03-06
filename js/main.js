const { createApp } = Vue;

const skg = createApp({
    data() {
        return {
            gameVersion: 0.1,           // use this later for save file stuff
            adventurer: adventurer,
            enemy: enemy,
            enemyArea: enemyArea,
            combatMessages: combatMessages,
            gameMessages: gameMessages,

            currentJob: adventurer.job[0],                         
            currentSkill: adventurer.job[0].abilities[0], 
            // lastJob: adventurer.job[0], 
            // lastSkill: adventurer.job[0].abilities[0],
            adventurerCastPercentage: 0,

            currentArea: enemyArea[0],

            currentEnemy: enemy.enemyType[0],
            currentEnemySkill: enemy.enemyType[0].abilities[0],
            enemyCastPercentage: 0,
            enemySkillIndex:1,

            lastExecutionMS: null,
            activeFrame: null,
            restFrame: null,

            autoCombat: false,
        }
    },
        
    methods: {
        setJob(jobIndex) {      
            this.lastJob = this.currentJob;                        
            for (let i=0; i<adventurer.job.length; i++) {
                if (i != jobIndex) {
                    this.adventurer.job[i].active = false;
                    this.adventurer.job[i].abilities.forEach((element) => {
                        element.active = false;
                    })
                } else {
                    this.adventurer.job[i].active = true;
                    this.adventurer.job[i].abilities[0].active = false;
                    this.currentJob = adventurer.job[i]; 
                }
            }
            setAbilityColors(jobIndex);    
        },
        
        setActiveSkill(SkillId) {
            if (this.activeFrame != null) {
                cancelAnimationFrame(this.activeFrame);
            }
            this.adventurerCastPercentage=0;
            let tempJob = adventurer.job.filter((job) => (job.name == this.currentJob.name));
            this.currentSkill = tempJob[0].abilities[SkillId];
            this.currentSkill.active = !this.currentSkill.active;

            tempJob[0].abilities.forEach((element, index) => {
                if (index != SkillId) {
                    element.active = false;
                } 
            });

            this.adventurer.castProgress=0;
            this.lastExecutionMS = null,
            this.stepActive();
        },

        setCurrentArea(byNum) {
            let tempIndex = this.enemyArea.indexOf(this.currentArea);
            tempIndex += byNum;
            this.currentArea = this.enemyArea[tempIndex];
            this.setEnemy();
        },

        fillPlayerBar(deltaMs) {
            this.adventurerCastPercentage += (deltaMs / (this.currentSkill.castTime*10)); // <-- x10 turns this into a percentage calculation
            this.adventurer.castProgress += deltaMs/1000;
            if (this.adventurerCastPercentage > 100) { // change this to a watcher
                this.adventurerCastPercentage = 0;
                this.adventurer.castProgress = 0;
                aDmg = adventurerDamageTurn()
                this.enemy.health -= aDmg;
                messageUpdates(combatMessages, 'adventurer-combat-update', ''.concat('You used ' , this.currentSkill.name, ' on ', this.currentEnemy.name, ' for ', aDmg));            
            }
            /// this.lastSkill=this.currentSkill; // don't think I'm using this anymore
        },

        fillPlayerHealth(deltaMs) {
            this.adventurer.health += deltaMs/100;
        },

        getXp(levelObj, levelModifier) {
            if (levelModifier == null) {
                levelModifier = 1
            }
            levelObj.experience += Math.round(this.currentEnemy.nextLevel * levelModifier);
            if (levelObj.experience >= levelObj.nextLevel) {
                levelObj.level++;
                levelObj.experience -= levelObj.nextLevel;
                levelUp(levelObj);
            }
            checkUnlocks(this.currentJob);
        },

        setEnemy() {
            let availableEnemy = enemy.enemyType.filter((enemyType) => ((enemyType.unlocked == true) &&  (this.currentArea.available.includes(enemyType.name))));
            this.currentEnemy = availableEnemy[Math.floor(Math.random()*availableEnemy.length)];
            this.currentEnemySkill = this.currentEnemy.abilities[0];

            let tempEnemyLevel = Math.floor(Math.random() * (this.currentArea.maxLevel - this.currentArea.minLevel + 1) + this.currentArea.minLevel)
            this.currentEnemy.level = tempEnemyLevel;
            this.enemy.level = tempEnemyLevel;
            levelUp(enemy);
            levelUp(this.currentEnemy);

            this.currentEnemyCastPercentage = 0;
            this.enemy.castProgress = 0;
            this.enemy.health = enemy.maxHealth;
            this.enemySkillIndex = 0;
        }, 

        setEnemySkill() {
            if (this.enemySkillIndex >= this.currentEnemy.castSequence.length) {
                this.enemySkillIndex = 0
            }
            this.currentEnemySkill = this.currentEnemy.abilities[this.currentEnemy.castSequence[this.enemySkillIndex]]
            this.currentEnemySkill.level = this.currentEnemy.level;
            this.enemySkillIndex++;
        }, 
        
        fillEnemyBar (deltaMs) {
            this.enemyCastPercentage += (deltaMs / (this.currentEnemySkill.castTime*10));
            this.enemy.castProgress += deltaMs/1000;
            if (this.enemyCastPercentage > 100) {
                this.enemy.castProgress = 0;
                this.enemyCastPercentage = 0;
                this.setEnemySkill();
                eDmg = enemyDamageTurn();
                this.adventurer.health -= eDmg;
                messageUpdates(combatMessages, 'enemy-combat-update', ''.concat(this.currentEnemy.name, ' used ' , this.currentEnemySkill.name, ' on adventurer for ', eDmg));
            }
        },

        getDeltaMs(now) {
            deltaMs = (now - (skg.lastExecutionMS ?? performance.now()));
            if ((deltaMs <= 0) || isNaN(deltaMs)){
                deltaMs = 0;
            }
            return deltaMs;
        },

        stepActive(now) {
            deltaMs = this.getDeltaMs(now);

            if (this.currentSkill.active) {
                this.lastExecutionMS = now;
                this.fillPlayerBar(deltaMs);
                this.fillEnemyBar(deltaMs);
                this.activeFrame = requestAnimationFrame(this.stepActive);
            }
        },

        stepRest(now) {
            deltaMs = this.getDeltaMs(now);
            this.lastExecutionMS = now;
            this.fillPlayerHealth(deltaMs)

            if (this.adventurer.health >= this.adventurer.maxHealth) {  // TODO: Move this to it's own function
                cancelAnimationFrame(this.stepRest);
                if (this.autoCombat == true) {
                    this.currentSkill.active = true;
                    this.stepActive();
                }
                return;
            }
            this.restFrame = requestAnimationFrame(this.stepRest);
        }, 
    },

    watch: {
        'enemy.health': function(hVal) {          // Does this need to be moved to it's own function
            if (hVal <= 0) {
                messageUpdates(combatMessages, 'general-update', ('You have defeated ' + this.currentEnemy.name + ' for ' + this.currentEnemy.nextLevel + ' experience'));
                cancelAnimationFrame(this.activeFrame);

                this.currentSkill.active = false;
                this.enemy.health=0;
                this.currentEnemy.killedCount++;
                this.enemy.killedCount++;
                this.enemyCastPercentage = 0;

                this.getXp(this.currentSkill);
                this.getXp(this.currentJob, 0.25);
                if (this.currentEnemy.level < 10) {
                    this.getXp(this.adventurer, 0.1);
                } else {
                    this.getXp(this.adventurer, 0.01);
                }
                this.setEnemy();
                return;
            }
        },

        'adventurer.health': function(hVal) {
            if (hVal <= 0) {
                    this.currentSkill.active = false;
                    cancelAnimationFrame(this.activeFrame);
                    this.adventurer.health = 0;
                    messageUpdates(combatMessages, 'general-update','You have retreated..');
            }
        },

        'currentSkill.active': function(csActive) {
            if (csActive == false) {
                cancelAnimationFrame(this.activeFrame);
                if (adventurer.health < adventurer.maxHealth) {
                    requestAnimationFrame(this.stepRest);
                    return;
                }
            }
        },
    },

    computed: {
        starterJobs: function() {
            setAbilityColors(0)
            return adventurer.job.filter((job) => (job.tier == 0));
        },
        midJobs: function() {
            return adventurer.job.filter((job) => ((job.tier == 1) && job.unlocked == true));
        },
        activeJob: function() {
            tempJob = adventurer.job.filter((job) => (job.name == this.currentJob.name));
            return tempJob[0];
        },
    },
}) .mount("#skg");
