import { LightningElement, track } from 'lwc';
import getAccountDetails from '@salesforce/apex/RecordFetcherController.getAccountDetails';
import getAccountTypePicklistValues from '@salesforce/apex/RecordFetcherController.getAccountTypePicklistValues';

export default class ShowAccountsOfTypePart2 extends LightningElement {
    
    type;
    @track accountRecords;
    options;

    connectedCallback(){
        getAccountTypePicklistValues()
        .then((data) => {
            this.options = [];
            for(let temp of data){
                this.options.push({label : temp, value : temp});
            }
            this.type = data[0];
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleTypeChange(event){
        this.type = event.detail.value;
    }

    handleClick(){
        getAccountDetails({accType : this.type})
        .then((data) => {
            this.accountRecords = [];
            for(let rec of data){
                let temp = {
                    Id : rec.Id,
                    Name : rec.Name,
                    AccountNumber : rec.AccountNumber,
                    Phone : rec.Phone,
                    AnnualRevenue : rec.AnnualRevenue,
                    Type : rec.Type,
                    Link : "/lightning/r/Account/"+rec.Id+"/view"
                };
                this.accountRecords.push(temp);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
}