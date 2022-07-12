const { createApp } = Vue;

createApp({
    data() {
        return {
            adventurer: adventurer,
            tick: 20,
            abilityWidth: 0,

            currentJob: adventurer.job[0].name,  // initialising 
            currentSkill: adventurer.job[0].abilities[0], // initialising
            starterInactive: 'job-info-container', // <-- probably don't need these in the global data store
            starterActive: 'job-active',
        }
    },
        
    methods: {
        selectJob($event, index) {                              // don't know why this needs $event but it doesn't work without it
            for (i=0; i<adventurer.job.length; i++) {
                if (i != index) {
                    adventurer.job[i].jobIsActive = false;
                    adventurer.job[i].abilities.forEach((element) => {
                        element.active = false;
                        // console.log(element.name, element.active);
                    })
                } else {
                    adventurer.job[i].jobIsActive = true;
                    this.currentJob = adventurer.job[i].name; // adventurer works, but we have to use 'this' option for currentJob, don't know why
                }
            }
        },
        
        setActiveSkill(spellId) {
            i = 0;                                              // if we directly set castProgress it results in a really long string of numbers
            fakeXP = 0;
            this.abilityWidth=0;
            tempJob = adventurer.job.filter((job) => (job.name == this.currentJob));
            tempJob[0].abilities[spellId].active = !tempJob[0].abilities[spellId].active;

            for (n=0; n<tempJob[0].abilities.length; n++) {
                if (n != spellId) {
                    tempJob[0].abilities[n].active = false;
                    tempJob[0].abilities[n].castProgress = 0;
                } 
            }
            activeSkill = tempJob[0].abilities[spellId];
            activeSkill.castProgress=0;
            tickrate = (activeSkill.castTime*1000)/this.tick;                   

            let fillerthing = setInterval(() => {            
                if (this.abilityWidth < 99 && activeSkill.active == true) {
                    this.abilityWidth += (100/tickrate);            // The progress bar itself
                    this.abilityWidth.toFixed(2);
                    i += (this.tick/1000);     
                    activeSkill.castProgress = i.toFixed(2);                     // Fucky bit to deal with the text counter or it's ugly; 
                } 
                else {
                    this.abilityWidth = 0;
                    this.castProgress = 0;
                    fakeXP++;
                    i=0;
                };
                if (this.currentSkill.active == false) {
                    clearInterval(fillerthing);
                }
                if (fakeXP >= 2) {
                    activeSkill.level++;
                    fakeXP = 0;
                    checkUnlocks();
                }
                this.currentSkill=activeSkill;
            }, this.tick);
            //this.fillbar(activeSkill, tickrate);
        },

        fillbar(activeSkill, tickrate) {   // <--- Trying to move the above to it's own function, but it fucks something else
            let fillerthing = setInterval(() => {            
                if (this.abilityWidth < 100 && activeSkill.active == true) {
                    this.abilityWidth += (100/tickrate);            // The progress bar itself
                    this.abilityWidth.toFixed(2);
                    i += (this.tick/1000);     
                    activeSkill.castProgress = i.toFixed(2);                     // Fucky bit to deal with the text counter or it's ugly; 
                } 
                else {
                    this.abilityWidth = 0;
                    this.castProgress = 0;
                    fakeXP++;
                    // console.log(activeSkill.active);
                    i=0;
                    // tempAbilities.forEach((element) => {
                    //     console.log(element.name, element.level, "xp", fakeXP);
                    // })
                };
                if (this.currentSkill.active == false) {
                    clearInterval(fillerthing);
                }
                if (fakeXP >= 2) {
                    activeSkill.level++;
                    fakeXP = 0;
                    checkUnlocks();
                }
                this.currentSkill=activeSkill;
            }, this.tick);
        },
    },

    computed: {
        starterJobs: function() {  
            return adventurer.job.filter((job) => (job.tier == 0));         // Vue 3
            // return this.adventurer.job.filter((job) => (job.tier == 0)); // Vue 2
        },
        midJobs: function() {
            return adventurer.job.filter((job) => ((job.tier == 1) && job.unlocked == true));
        },
        activeJob: function() {
            tempJob = adventurer.job.filter((job) => (job.name == this.currentJob));
            console.log(tempJob[0].name, " | ", tempJob[0].abilities[0].name);
            return tempJob[0];
        },
    },
}) .mount("#skg");
