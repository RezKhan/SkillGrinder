const { createApp } = Vue

createApp({
    data() {
        return {
            adventurer: adventurer,
            tick: 20,
            abilityWidth: 0,
            castProgress: 0.0,

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
            i = 0;                                              // if we directly set castProgress it results in a really long string of numbers
            fakeXP = 0;
            
            tempJob = adventurer.job.filter((job) => (job.name == this.currentJob));
            // console.log(tempJob[0].abilities[spellIndex].name)
            tempJob[0].abilities[spellIndex].active = !tempJob[0].abilities[spellIndex].active;

            tempAbilities = tempJob[0].abilities;
            for (n=0; n<tempAbilities.length; n++) {
                if (n != spellIndex) {
                    tempAbilities[n].active = false;
                    this.castProgress = 0;
                    i=0;
                } 
            }
            activeAbility = tempJob[0].abilities[spellIndex];
            activeAbility.castProgress=0;
            tickrate = (activeAbility.castTime*1000)/this.tick;                   

            // console.log(Object.keys(this._data));
            let fillerthing = setInterval(() => {            
                if (this.abilityWidth < 100 && activeAbility.active == true) {
                    this.abilityWidth += (100/tickrate);            // The progress bar itself
                    this.abilityWidth.toFixed(2);
                    i += (this.tick/1000);     
                    this.castProgress = i.toFixed(2);                     // Fucky bit to deal with the text counter or it's ugly; 
                    // console.log(activeAbility.active);
                    // console.log(activeAbility.castTime, tickrate, i);
                } 
                else if(this.abilityWidth >=100) {
                    this.abilityWidth = 0;
                    this.castProgress = 0;
                    fakeXP++;
                    // console.log(activeAbility.active);
                    i=0;
                    // tempAbilities.forEach((element) => {
                    //     console.log(element.name, element.level, "xp", fakeXP);
                    // })
                };
                if (activeAbility.active == false) {
                    clearInterval(fillerthing);
                }
                if (fakeXP >= 3) {
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
