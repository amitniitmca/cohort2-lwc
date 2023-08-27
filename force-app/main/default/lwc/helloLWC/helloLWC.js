import { LightningElement } from 'lwc';

export default class HelloLWC extends LightningElement {
    name = "LWC";

    handleOnChange(event){
        this.name = event.detail.value;
    }
}