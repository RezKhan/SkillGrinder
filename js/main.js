const { createApp } = Vue;

const skg = createApp({
    data() {
        return {
            gameVersion: 0.1,
            adventurer: adventurer,
            enemy: enemy,

            currentJob: adventurer.job[0],                         // initialising
            currentSkill: adventurer.job[0].abilities[0], 
            lastJob: adventurer.job[0], 
            lastSkill: adventurer.job[0].abilities[0],
            adventurerCastPercentage: 0,

            currentEnemy: enemy.enemyType[0],
            currentEnemySkill: enemy.enemyType[0].abilities[0],
            enemyCastPercentage: 0,

            lastExecutionMS: null,
        }
    },
        
    methods: {
        setJob(jobIndex) {                              // don't know why this needs $event but it doesn't work without it
            for (i=0; i<adventurer.job.length; i++) {
                if (i != jobIndex) {
                    adventurer.job[i].active = false;
                    adventurer.job[i].abilities.forEach((element) => {
                        element.active = false;
                        // console.log(adventurer.job[i].name, element.name, element.active);
                    })
                } else {
                    adventurer.job[i].active = true;
                    adventurer.job[i].abilities.active = false;
                    this.currentJob = adventurer.job[i]; 
                }
            }
            styleRoot = document.querySelector(':root');
            styleRoot.style.setProperty('--fill-start', adventurer.job[jobIndex].startBar);
            styleRoot.style.setProperty('--fill-end', adventurer.job[jobIndex].endBar);            
        },
        
        setActiveSkill(spellId) {
            i = 0;                                           // if i directly set castProgress it results in a really long string of numbers
            fakeXP = 0;
            this.adventurerCastPercentage=0;
            tempJob = adventurer.job.filter((job) => (job.name == this.currentJob.name));
            tempJob[0].abilities[spellId].active = !tempJob[0].abilities[spellId].active;

            for (n=0; n<tempJob[0].abilities.length; n++) {
                if (n != spellId) {
                    tempJob[0].abilities[n].active = false;
                    // adventurer.castProgress = 0;
                } 
            }
            this.currentSkill = tempJob[0].abilities[spellId];
            adventurer.castProgress=0;
            this.lastExecutionMS = null,
            this.stepActive();
        },

        fillPlayerBar(deltaMs) {
            this.adventurerCastPercentage += (deltaMs / (this.currentSkill.castTime*10)); // Why 10? Why not 1000? Why does this work? It shouldn't.
            adventurer.castProgress += deltaMs/1000;
            if (this.adventurerCastPercentage > 99.5) {
                this.adventurerCastPercentage =0;
                adventurer.castProgress=0;
                enemy.health -= adventurerDamageTurn();                
            }
            if (fakeXP >= 2) {
                this.currentSkill.level++;
                fakeXP = 0;
                checkUnlocks();
            }
            this.lastSkill=this.currentSkill;
        },

        fillPlayerHealth(deltaMs) {
            this.adventurer.health += deltaMs/100;
        },

        setEnemy() {
            availableEnemy = enemy.enemyType.filter((enemyType) => (enemyType.unlocked == true))
            this.currentEnemy = availableEnemy[Math.floor(Math.random()*availableEnemy.length)]
            this.currentEnemyCastPercentage = 0;
            enemy.castProgress = 0;
        }, 

        setEnemySkill() {

        }, 
        
        fillEnemyBar (deltaMs) {
            this.enemyCastPercentage += (deltaMs / (this.currentEnemySkill.castTime*10));
            enemy.castProgress += deltaMs/1000;
            if (this.enemyCastPercentage > 99.5) {
                enemy.castProgress = 0;
                this.enemyCastPercentage = 0;
                enemyDamageTurn();
            }
        },

        stepActive(now) {
            deltaMs = (now - (this.lastExecutionMS ?? Date.now()));
            if ((deltaMs <= 0) || isNaN(deltaMs)){
                deltaMs = 0;
            }
            this.lastExecutionMS = now;
            this.fillPlayerBar(deltaMs);
            this.fillEnemyBar(deltaMs);

            if (this.currentSkill.active == false) {
                console.log('Current skill is not active!')
                cancelAnimationFrame(this.stepActive);
                if (adventurer.health >= adventurer.maxHealth) {
                    console.log('Fully healed!');
                    return;    
                }
                if (adventurer.health < adventurer.maxHealth) {
                    // this.fillPlayerHealth(deltaMs);
                    requestAnimationFrame(this.stepRest);
                    return;
                }
            }
            requestAnimationFrame(this.stepActive);
        },

        stepRest(now) {
            deltaMs = (now - (this.lastExecutionMS ?? Date.now()));
            if ((deltaMs <= 0) || isNaN(deltaMs)){
                deltaMs = 0;
            }
            this.lastExecutionMS = now;
            this.fillPlayerHealth(deltaMs)

            if (adventurer.health >= adventurer.maxHealth) {
                console.log('Healed'); 
                cancelAnimationFrame(this.stepRest);
                return;
            }
            requestAnimationFrame(this.stepRest);
        }, 
    },

    watch: {
        'enemy.health': function(newVal, oldValue) {
            console.log(enemy.health)
        }
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

