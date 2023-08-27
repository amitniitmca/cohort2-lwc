import { LightningElement, api } from 'lwc';

export default class ChildTrainers extends LightningElement {
    trainerValue;
    trainerOptions;
    @api selectedSubject;

    subjectAndTrainers = {
        apex : ["abc", "def", "ghi"],
        html : ["jkl", "mno"],
        css : ["pqr", "stu"],
        js : ["vwx", "xyz"],
        lwc : ["abc", "jkl", "pqr", "vwx"]
    };

    connectedCallback(){
        this.setTrainers();
    }
    
    @api selectedSubjectChanged(newSubject){
        this.selectedSubject = newSubject;
        this.setTrainers();
    }

    setTrainers() {
        this.trainerOptions = [];
        for(let train of this.subjectAndTrainers[this.selectedSubject]){
            this.trainerOptions.push({label : train, value : train});
        }
    }

    handleTrainerChange(event){
        this.trainerValue = event.detail.value;
    }

    handleSelectClick(){
        if(this.trainerValue){
            const ce = new CustomEvent('trainerselected', {detail: this.trainerValue});
            this.dispatchEvent(ce);
        }
    }
}