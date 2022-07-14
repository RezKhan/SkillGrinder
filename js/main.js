const { createApp } = Vue;

createApp({
    data() {
        return {
            adventurer: adventurer,
            tick: 20,
            abilityWidth: 0,

            currentJob: adventurer.job[0],                         // initialising
            currentSkill: adventurer.job[0].abilities[0], 
            lastJob: adventurer.job[0], 
            lastSkill: adventurer.job[0].abilities[0],
            lastExecutionMS: null,
        }
    },
        
    methods: {
        selectJob(index) {                              // don't know why this needs $event but it doesn't work without it
            for (i=0; i<adventurer.job.length; i++) {
                if (i != index) {
                    adventurer.job[i].jobIsActive = false;
                    adventurer.job[i].abilities.forEach((element) => {
                        element.active = false;
                        // console.log(adventurer.job[i].name, element.name, element.active);
                    })
                } else {
                    adventurer.job[i].jobIsActive = true;
                    adventurer.job[i].abilities.active = false;
                    this.currentJob = adventurer.job[i]; // adventurer works, but I have to use 'this' option for currentJob, don't know why
                }
            }
            styleRoot = document.querySelector(':root');
            styleRoot.style.setProperty('--fill-start', adventurer.job[index].startBar);
            styleRoot.style.setProperty('--fill-end', adventurer.job[index].endBar);            
        },
        
        setActiveSkill(spellId) {
            i = 0;                                                                  // if i directly set castProgress it results in a really long string of numbers
            fakeXP = 0;
            this.abilityWidth=0;
            tempJob = adventurer.job.filter((job) => (job.name == this.currentJob.name));
            tempJob[0].abilities[spellId].active = !tempJob[0].abilities[spellId].active;

            for (n=0; n<tempJob[0].abilities.length; n++) {
                if (n != spellId) {
                    tempJob[0].abilities[n].active = false;
                    tempJob[0].abilities[n].castProgress = 0;
                } 
            }

            activeSkill = tempJob[0].abilities[spellId];
            activeSkill.castProgress=0;
            this.currentSkill=activeSkill;
            this.lastExecutionMS = null,
            this.step();
        },

        step(now) {
            deltaMs = (now - (this.lastExecutionMS ?? now));
            if ((deltaMs <= 0) || isNaN(deltaMs)){
                deltaMs = 0;
            }
            this.lastExecutionMS = now;
            this.fillBar(activeSkill, deltaMs);

            if (this.currentSkill.active == false) {
                console.log('Current skill is not active!')
                cancelAnimationFrame(this.step);
                return;
            }
            requestAnimationFrame(this.step);
        },

        fillBar(activeSkill, deltaMs) {
            this.abilityWidth += (deltaMs / (activeSkill.castTime*10)); // Why 10? Why not 1000? Why does this work? It shouldn't.
            i += deltaMs/1000;
            activeSkill.castProgress = i.toFixed(2)
            if (this.abilityWidth > 99) {
                this.abilityWidth =0;
                fakeXP++;
                i=0;
            }
            if (fakeXP >= 2) {
                activeSkill.level++;
                fakeXP = 0;
                checkUnlocks();
            }
            this.lastSkill=this.currentSkill;
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


        // fillbar(activeSkill, deltaMs) {                                                          // <--- Trying to move the above to it's own function, 
                                                                                        // but it fucks something else, likely because of setInterval
                                                                                        // work on removing setInterval next

            // let fillerthing = setInterval(() => { 
            //     if (activeSkill.active == true) {
            //         if (this.abilityWidth < 99) {
            //             this.abilityWidth += (100/tickrate);                            // The progress bar itself
            //             this.abilityWidth.toFixed(2);
            //             i += (this.tick/1000);     
            //             activeSkill.castProgress = i.toFixed(2);                        // Fucky bit to deal with the text counter or it's ugly; 
            //         } 
            //         else {
            //             this.abilityWidth = 0;
            //             this.castProgress = 0;
            //             fakeXP++;
            //             i=0;
            //         };
            //         console.log('Current:', this.currentSkill.name, '| Last:', this.lastSkill.name, '| Active:', activeSkill.name)
            //         if (this.currentSkill.active == false) {
            //             clearInterval(fillerthing);
            //         }
            //         if ((this.currentSkill.name != this.lastSkill.name) || (this.currentSkill.name != activeSkill.name)) {
            //             clearInterval(fillerthing);
            //         }
            //         if (fakeXP >= 2) {
            //             activeSkill.level++;
            //             fakeXP = 0;
            //             checkUnlocks();
            //         }
            //     }
            // }, this.tick);


            
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