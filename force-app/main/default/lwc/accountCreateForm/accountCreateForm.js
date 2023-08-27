import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccountTypePicklistValues from '@salesforce/apex/AccountCreateFormController.getAccountTypePicklistValues';
import createAccount from '@salesforce/apex/AccountCreateFormController.createAccount';
import createContacts from '@salesforce/apex/AccountCreateFormController.createContacts';

export default class AccountCreateForm extends LightningElement {
    defaultTypeValue;
    accountName;
    typeValue;
    typeOptions;
    annualRevenue;
    expiryDate;
    phoneNumber;
    activeValue = 'No';
    activeOptions = [
        {label: 'Yes', value:'Yes'},
        {label: 'No', value:'No'}
    ];
    @track contactRecords = [];
    numberOfContacts = 0;
    currentContact = 1;

    @wire(getAccountTypePicklistValues)
    wiredGetAccountTypePicklistValues({data, error}){
        if(data){
            this.typeOptions = [];
            let count = 0;
            for(let temp of data){
                count++;
                this.typeOptions.push({label: temp, value: temp});
                if(count == 1){
                    this.typeValue = temp;
                    this.defaultTypeValue = temp;
                }
            }
        }
        if(error){
            console.log(error);
        }
    }

    handleAccountNameChange(event){
        this.accountName = event.detail.value;
    }

    handleTypeChange(event){
        this.typeValue = event.detail.value;
    }

    handleAnnualRevenueChange(event){
        this.annualRevenue = event.detail.value;
    }

    handleExpiryDateChange(event){
        this.expiryDate = event.detail.value;
    }

    handlePhoneNumberChange(event){
        this.phoneNumber = event.detail.value;
    }

    handleActiveChange(event){
        this.activeValue = event.detail.value;
    }

    handleAddContactClick(){
        this.numberOfContacts++;
        for(let index=this.currentContact; index <= this.numberOfContacts; index++){
            this.contactRecords.push({id : index, saved : false});
            this.currentContact++;
        }
    }

    handleRemoveContactClick(){
        if(this.numberOfContacts != 0){
            this.numberOfContacts--;
        }
        if(this.currentContact > 1 ){
            this.currentContact--;
        }
        if(this.contactRecords.length > 0){
            this.contactRecords.pop();
        }
    }

    handleCreateClick(){
        if(this.accountName == undefined){
            this.dispatchEvent(new ShowToastEvent({title: 'Error', message: 'Account name is required to create an Account!', variant : 'error'}));
        }
        else if(this.annualRevenue == undefined){
            this.dispatchEvent(new ShowToastEvent({title: 'Error', message: 'Annual Revenue is required to create an Account!', variant : 'error'}));
        }
        else if(this.expiryDate == undefined){
            this.dispatchEvent(new ShowToastEvent({title: 'Error', message: 'SLA Expiry Date is required to create an Account!', variant : 'error'}));
        }
        else if(this.phoneNumber == undefined){
            this.dispatchEvent(new ShowToastEvent({title: 'Error', message: 'Phone Number is required to create an Account!', variant : 'error'}));
        }
        else if(this.isAllContactsSaved() == false){
            this.dispatchEvent(new ShowToastEvent({title: 'Error', message: 'All contacts should be saved to create an Account!', variant : 'error'}));
        }
        else{
            let accountRecord = {
                name : this.accountName,
                type : this.typeValue,
                annualRevenue: this.annualRevenue,
                expiryDate : this.expiryDate,
                phone : this.phoneNumber,
                active : this.activeValue
            };
            createAccount({record : accountRecord})
            .then((data) => {
                createContacts({accId: data.Id, records: this.contactRecords})
                .then((d) => {
                    this.dispatchEvent(new ShowToastEvent({title: 'Success', message: 'Account Created Successfully : '+data.Id+'!', variant : 'success'}));
                    this.handleResetClick();
                    const event = new CustomEvent('accountcreated');
                    this.dispatchEvent(event);
                })
                .catch((e) => {
                    console.log(e);
                });
                
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    handleResetClick(){
        this.accountName = undefined;
        this.typeValue = this.defaultTypeValue;
        this.annualRevenue = undefined;
        this.expiryDate = undefined;
        this.phoneNumber = undefined;
        this.activeValue = 'No';
        this.numberOfContacts = 0;
        this.currentContact = 1;
        this.contactRecords = [];
        const comps = this.template.querySelectorAll("c-contact-create-form");
        for(let comp of comps){
            comp.resetAll();
        }
    }

    handleContactSaved(event){
        const formId = event.currentTarget.dataset.id;
        for(let cont of this.contactRecords){
            if(cont.id == formId){
                cont.saved = true;
                cont.lastName = event.detail.lastName;
                cont.phone = event.detail.phone;
            }
        }
    }

    handleContactReset(event){
        const formId = event.currentTarget.dataset.id;
        for(let cont of this.contactRecords){
            if(cont.id == formId){
                cont.saved = false;
                cont.lastName = undefined;
                cont.phone = undefined;
            }
        }
    }

    isAllContactsSaved(){
        let saved = true;
        for(let cont of this.contactRecords){
            if(cont.saved == false){
                saved = false;
                break;
            }
        }
        return saved;
    }
}