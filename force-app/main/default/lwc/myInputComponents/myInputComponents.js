import { LightningElement, track } from 'lwc';

export default class MyInputComponents extends LightningElement {
    @track firstName = "Betul";
    @track dob;
    @track doa;
    @track dobMax;
    @track dobMin;
    @track salary = 1000;

    connectedCallback(){
        let dt = new Date();
        this.dobMax = (dt.getFullYear()-18)+"-"+12+"-"+31;
        this.dobMin = (dt.getFullYear()-50)+"-"+1+"-"+1;
        this.dob = this.dobMax;
    }

    handleClick(){
        alert(this.firstName);
        alert(this.dob);
        alert(this.doa);
        alert(this.salary);
    }

    handleFirstNameChange(event){
        this.firstName = event.detail.value;
    }

    handleDateOfBirthChange(event){
        this.dob = event.detail.value;
    }

    handleDateOfAppointmentChange(event){
        this.doa = event.detail.value;
    }

    handleSalaryChange(event){
        this.salary = event.detail.value;
    }
}