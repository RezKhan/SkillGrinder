const { createApp } = Vue;

createApp({
    data() {
        return {
            adventurer: adventurer,
            enemy: enemy,
            // tick: 20, // not needed since we're not using setInterval

            currentJob: adventurer.job[0],                         // initialising
            currentSkill: adventurer.job[0].abilities[0], 
            lastJob: adventurer.job[0], 
            lastSkill: adventurer.job[0].abilities[0],
            lastExecutionMS: null,
            adventurerCastPercentage: 0,

            currentEnemy: enemy.enemyType[0],
            currentEnemySkill: enemy.enemyType[0].abilities[0],
            enemycastPercentage: 0,
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
            activeSkill = tempJob[0].abilities[spellId];
            adventurer.castProgress=0;
            this.currentSkill=activeSkill;
            this.lastExecutionMS = null,
            this.step();
        },

        fillPlayerBar(activeSkill, deltaMs) {
            this.adventurerCastPercentage += (deltaMs / (activeSkill.castTime*10)); // Why 10? Why not 1000? Why does this work? It shouldn't.
            i += deltaMs/1000;
            adventurer.castProgress = i.toFixed(1)
            if (this.adventurerCastPercentage > 99) {
                this.adventurerCastPercentage =0;
                fakeXP++;
                i=0;
                this.setEnemy();
            }
            if (fakeXP >= 2) {
                activeSkill.level++;
                fakeXP = 0;
                checkUnlocks();
            }
            this.lastSkill=this.currentSkill;
        },

        setEnemy() {
            availableEnemy = enemy.enemyType.filter((enemyType) => (enemyType.unlocked == true));
            
            console.log(Math.floor(Math.random()*availableEnemy.length))
            this.currentEnemy = availableEnemy[Math.floor(Math.random()*availableEnemy.length)]
            // this.currentEnemy = availableEnemy.enemyType[Math.random(availableEnemy.enemyType.length)]
        },

        setEnemySkill() {

        }, 
        
        fillEnemyBar () {

        },

        step(now) {
            deltaMs = (now - (this.lastExecutionMS ?? now));
            if ((deltaMs <= 0) || isNaN(deltaMs)){
                deltaMs = 0;
            }
            this.lastExecutionMS = now;
            this.fillPlayerBar(activeSkill, deltaMs);

            if (this.currentSkill.active == false) {
                console.log('Current skill is not active!')
                cancelAnimationFrame(this.step);
                return;
            }
            requestAnimationFrame(this.step);
        },
    },

    computed: {
        starterJobs: function() {  
            styleRoot = document.querySelector(':root');
            styleRoot.style.setProperty('--fill-start', adventurer.job[0].startBar);
            styleRoot.style.setProperty('--fill-end', adventurer.job[0].endBar);
            return adventurer.job.filter((job) => (job.tier == 0));         // Vue 3
            // return this.adventurer.job.filter((job) => (job.tier == 0)); // Vue 2
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


            // if (this.currentSkill.active == false) {
            //     console.log('Current skill is not active!')
            //     cancelAnimationFrame(this.step());
            //     return;
            // }
            // if (this.currentSkill.name != this.lastSkill.name) {
            //     console.log('Current skill is not last skill!')
            //     cancelAnimationFrame(this.fillBar);
            //     return;
            // }