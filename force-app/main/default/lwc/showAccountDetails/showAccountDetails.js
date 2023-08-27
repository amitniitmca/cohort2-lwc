import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import ACC_ID from '@salesforce/schema/Account.Id';
import ACC_NAME from '@salesforce/schema/Account.Name';
import ACC_NUMBER from '@salesforce/schema/Account.AccountNumber';
import ACC_WEBSITE from '@salesforce/schema/Account.Website';
import ACC_REVENUE from '@salesforce/schema/Account.AnnualRevenue';

export default class ShowAccountDetails extends LightningElement {

    @api recordId;

    @track accountRecord = undefined;

    @wire(getRecord, {recordId: '$recordId', fields: [ACC_ID, ACC_NAME, ACC_NUMBER, ACC_REVENUE, ACC_WEBSITE]})
    getAccountRecord({data, error}){
        if(data){
            this.accountRecord = {
                Id : data.fields.Id.value,
                Name : data.fields.Name.value,
                AccountNumber : data.fields.AccountNumber.value,
                AnnualRevenue : data.fields.AnnualRevenue.value,
                Website : data.fields.Website.value
            };
        }
        if(error){
            console.log(error);
        }
    }
}