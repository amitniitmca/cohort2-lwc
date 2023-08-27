import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MyRecordForm extends LightningElement {
    objectApiName = "Account"
    fieldsList = [
        'Name',
        'Type',
        'AnnualRevenue',
        'Phone',
        'Employees'
    ];
}