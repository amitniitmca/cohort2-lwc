import { LightningElement, wire, track } from 'lwc';
import getAccountDetail from '@salesforce/apex/RecordFetcherController.getAccountDetail';

export default class ShowSpecificAccount extends LightningElement {

    id;
    accRecordId;
    @track accountRecord;

    @wire(getAccountDetail, {accId : '$accRecordId'})
    accountDetail({data, error}){
        if(data){
            this.accountRecord = data;
        }
        if(error){
            console.log(error);
        }
    }

    handleIdChange(event){
        this.id = event.detail.value;
    }

    handleClick(){
        this.accRecordId = this.id;
    }

}