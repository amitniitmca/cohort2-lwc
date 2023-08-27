import { LightningElement, api, track } from 'lwc';

export default class MyChild extends LightningElement {
    @api childName;
    @track childDescription;

    connectedCallback(){
        this.childDescription = "This is a child component";
    }

    @api changeTheName(){
        this.childName = "Changed Name";
        this.childDescription = "This is changed description";
    }
}