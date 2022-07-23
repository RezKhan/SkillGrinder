const { createApp } = Vue;

const skg = createApp({
    data() {
        return {
            gameVersion: 0.1,
            adventurer: adventurer,
            enemy: enemy,

            currentJob: adventurer.job[0],                         
            currentSkill: adventurer.job[0].abilities[0], 
            lastJob: adventurer.job[0], 
            lastSkill: adventurer.job[0].abilities[0],
            adventurerCastPercentage: 0,

            currentEnemy: enemy.enemyType[0],
            currentEnemySkill: enemy.enemyType[0].abilities[0],
            enemyCastPercentage: 0,
            enemySkillIndex:1,

            lastExecutionMS: null,
            activeFrame: null,
            restFrame: null,
        }
    },
        
    methods: {
        setJob(jobIndex) {                              
            for (i=0; i<adventurer.job.length; i++) {
                if (i != jobIndex) {
                    this.adventurer.job[i].active = false;
                    this.adventurer.job[i].abilities.forEach((element) => {
                        element.active = false;
                        // console.log(adventurer.job[i].name, element.name, element.active);
                    })
                } else {
                    this.adventurer.job[i].active = true;
                    this.adventurer.job[i].abilities.active = false;
                    this.currentJob = adventurer.job[i]; 
                }
            }
            styleRoot = document.querySelector(':root');
            styleRoot.style.setProperty('--fill-start', adventurer.job[jobIndex].startBar);
            styleRoot.style.setProperty('--fill-end', adventurer.job[jobIndex].endBar);            
        },
        
        setActiveSkill(spellId) {
            fakeXP = 0;
            this.adventurerCastPercentage=0;
            tempJob = adventurer.job.filter((job) => (job.name == this.currentJob.name));
            this.currentSkill = tempJob[0].abilities[spellId];
            this.currentSkill.active = !this.currentSkill.active;

            for (n=0; n<tempJob[0].abilities.length; n++) {
                if (n != spellId) {
                    tempJob[0].abilities[n].active = false;
                } 
            }
            this.adventurer.castProgress=0;
            this.lastExecutionMS = null,
            this.stepActive();
        },

        fillPlayerBar(deltaMs) {
            this.adventurerCastPercentage += (deltaMs / (this.currentSkill.castTime*10)); // Why 10? Why not 1000? Why does this work? It shouldn't.
            this.adventurer.castProgress += deltaMs/1000;
            if (this.adventurerCastPercentage > 99.5) { // change this to a watcher
                this.adventurerCastPercentage =0;
                this.adventurer.castProgress=0;
                this.enemy.health -= adventurerDamageTurn();                
            }
            this.lastSkill=this.currentSkill; // don't think I'm using this anymore
        },

        fillPlayerHealth(deltaMs) {
            this.adventurer.health += deltaMs/100;
        },

        getXp(levelObj, levelModifier) {
            if (levelModifier == null) {
                levelModifier = 1
            }
            levelObj.experience += (this.currentEnemy.experience * levelModifier);
            if (levelObj.experience >= levelObj.nextLevel) {
                levelObj.level++;
                levelObj.experience -= levelObj.nextLevel;
                Math.round(levelObj.nextLevel *= 1.5);
            }
            checkUnlocks();
        },

        setEnemy() {
            availableEnemy = enemy.enemyType.filter((enemyType) => (enemyType.unlocked == true))
            this.currentEnemy = availableEnemy[Math.floor(Math.random()*availableEnemy.length)]
            this.currentEnemyCastPercentage = 0;
            this.enemy.castProgress = 0;
            this.enemy.health = enemy.maxHealth;
            this.enemySkillIndex=0;
        }, 

        setEnemySkill() {
            if (this.enemySkillIndex >= this.currentEnemy.castSequence.length) {
                this.enemySkillIndex = 0
            }
            this.currentEnemySkill = this.currentEnemy.abilities[this.currentEnemy.castSequence[this.enemySkillIndex]]
            console.log(this.enemySkillIndex);
            this.enemySkillIndex++;
        }, 
        
        fillEnemyBar (deltaMs) {
            this.enemyCastPercentage += (deltaMs / (this.currentEnemySkill.castTime*10));
            this.enemy.castProgress += deltaMs/1000;
            if (this.enemyCastPercentage > 99.9) {
                this.enemy.castProgress = 0;
                this.enemyCastPercentage = 0;
                this.setEnemySkill();
                this.adventurer.health -= enemyDamageTurn();
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
            }

            this.activeFrame = requestAnimationFrame(this.stepActive);
        },

        stepRest(now) {
            deltaMs = this.getDeltaMs(now);

            this.lastExecutionMS = now;
            this.fillPlayerHealth(deltaMs)

            if (adventurer.health >= adventurer.maxHealth) {  // TODO: Move this to it's own function
                console.log('Healed'); 
                cancelAnimationFrame(this.stepRest);
                return;
            }
            this.restFrame = requestAnimationFrame(this.stepRest);
        }, 
    },

    watch: {
        'enemy.health': function(hVal) {          // TODO: this works now, but the below is horrible. Change it to something that doesn't suck.
            if (hVal <= 0) {
                console.log('Killed the enemy!');
                cancelAnimationFrame(this.activeFrame);

                this.currentSkill.active = false;
                this.enemy.health=0;
                this.currentEnemy.killedCount++;
                this.enemy.killedCount++;
                this.enemyCastPercentage = 0;

                this.getXp(this.currentSkill);
                this.getXp(this.currentJob, 0.1);
                if (this.currentEnemy.level < 10) {
                    this.getXp(this.adventurer, 0.1);
                } else {
                    this.getXp(this.adventurer, 0.01);
                }
                this.setEnemy();
                return;
            }
        },

        'currentSkill.active': function(csActive) {
            console.log('currentSkill.active is', csActive);
            if (csActive == false) {
                console.log('Current skill is not active!')
                cancelAnimationFrame(this.stepActive());
                if (this.adventurer.health >= this.adventurer.maxHealth) {
                    console.log('Fully healed!');
                    return;    
                }
                if (adventurer.health < adventurer.maxHealth) {
                    requestAnimationFrame(this.stepRest);
                    return;
                }
            }
        },
    },

    computed: {
        starterJobs: function() {  
            styleRoot = document.querySelector(':root');
            styleRoot.style.setProperty('--fill-start', adventurer.job[0].startBar);
            styleRoot.style.setProperty('--fill-end', adventurer.job[0].endBar);
            return adventurer.job.filter((job) => (job.tier == 0));         // Vue 3
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
