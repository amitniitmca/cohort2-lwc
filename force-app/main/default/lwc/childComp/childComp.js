import { LightningElement } from 'lwc';

export default class ChildComp extends LightningElement {
    
    handleChildClick(){
        // Create a "buttonclick" event
        // dispatch this event
        const ce = new CustomEvent("buttonclick");
        this.dispatchEvent(ce);
    }
}