import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LwcUsingFlow extends LightningElement {

    @track flowValue;
    flowOptions = [
        {label: "Screen Flow for LWC 1", value :"Screen_Flow_for_LWC_1"},
        {label: "Flow for LWC", value :"Flow_for_LWC"}
    ];
    userName;
    subjects = [];
    dateOfJoining;

    handleStatusChange(event){
        if(event.detail.status == "FINISHED"){
            this.dispatchEvent(new ShowToastEvent({title:'SUCCESS', message:'Flow Finished!', variant: 'success'}));
            const outVariables = event.detail.outputVariables;
            for(let out of outVariables){
                if(out.name == "user"){
                    this.userName = out.value;
                }
                else if(out.name == "joiningDate"){
                    this.dateOfJoining = out.value;
                }
                else{
                    this.subjects = out.value.split(";");
                }
            }
            console.log(this.userName);
            for(let sub of this.subjects){
                console.log(sub);
            }
            console.log(this.dateOfJoining);
        }

    }

    handleFlowChange(event){
        this.flowValue = undefined;
        setTimeout(() => {
            this.flowValue = event.detail.value;
        }, 1000);
    }
}