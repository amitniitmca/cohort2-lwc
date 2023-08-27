import { LightningElement, track } from 'lwc';

export default class TrackableExample extends LightningElement {
    @track employees = [];
    name;
    salary;

    handleNameChange(event){
        this.name = event.detail.value;
    }

    handleSalaryChange(event){
        this.salary = event.detail.value;
    }

    handleClick(){
        let employee = {
            name : this.name,
            salary : this.salary
        };
        this.employees.push(employee);
    }
}