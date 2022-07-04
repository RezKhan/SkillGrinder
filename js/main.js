import { progressbar } from './js/progressbar.vue';

var SkillGrinder = new Vue({
    el: "#skg",
    data: {
        adventurer: adventurer,
        tick: 50,

        starterInactive: 'job-info-container',
        starterActive: 'job-active',

        currentJob: adventurer.job[0].name,
    },
    
    //components: {
        // progressbar,
    //},
    
    methods: {
        starterButton($event, index) {
            for (i=0;i<adventurer.job.length;i++) {
                // console.log(adventurer.job[i].jobIsActive);
                if (i != index) {
                    adventurer.job[i].jobIsActive = false;
                } else {
                    adventurer.job[i].jobIsActive = true;
                    this.currentJob = adventurer.job[i].name;
                }
            }
            // console.log(this.activeJob.abilities[0].name);
        }
    },
    computed: {
        starterJobs: function() {
            return this.adventurer.job.filter((job) => (job.tier == 0));
        },
        midJobs: function() {
            return this.adventurer.job.filter((job) => ((job.tier == 1) && job.unlocked == true));
        },
        activeJob: function() {
            // console.log(this.currentJob);
            tempJob = this.adventurer.job.filter((job) => (job.name == this.currentJob));
            console.log(tempJob[0].name, " | ", tempJob[0].abilities[0].name);
            return tempJob[0];
        },
    },
}) 
