const { createApp } = Vue

createApp({
    data() {
        return {
            adventurer: adventurer,
            tick: 20,
            abilityWidth: 0,

            currentJob: adventurer.job[0].name,
            starterInactive: 'job-info-container',
            starterActive: 'job-active',
        }
    },
        
    methods: {
        selectJob($event, index) {                              // don't know why this needs $event but it doesn't work without it
            for (i=0;i<adventurer.job.length;i++) {
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

        setActiveSkill(spellIndex) {
            tempJob = adventurer.job.filter((job) => (job.name == this.currentJob));
            console.log(tempJob[0].abilities[spellIndex].name)
            tempJob[0].abilities[spellIndex].active = !tempJob[0].abilities[spellIndex].active;

            activeAbility = tempJob[0].abilities[spellIndex];
            let i = 0;                                              // if we directly set castProgress it results in a really long string of numbers
            fakeXP = 0;
            // console.log(Object.keys(this._data));
            let fillerthing = setInterval(() => {            
                if (this.abilityWidth < 99 && activeAbility.active == true) {
                    tickrate=(activeAbility.castTime*1000)/this.tick;                   
                    this.abilityWidth += (100/tickrate);            // The progress bar itself
                    this.abilityWidth.toFixed(2);
                    i += (this.tick/1000);                          // Fucky bit to deal with the text counter or it's ugly
                    activeAbility.castProgress = i.toFixed(2); 
                    // console.log(activeAbility.active);
                } 
                else {
                    this.abilityWidth = 0;
                    activeAbility.castProgress = 0;
                    i = 0;
                    fakeXP++;
                    // console.log(activeAbility.active);
                    console.log(activeAbility.name, activeAbility.level, "xp", fakeXP);
                };
                if (activeAbility.active == false)
                    clearInterval(fillerthing);
                if (fakeXP >= 10) {
                    activeAbility.level++;
                    fakeXP = 0;
                    checkUnlocks();
                }
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
