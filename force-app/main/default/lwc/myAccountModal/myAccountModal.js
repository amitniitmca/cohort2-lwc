import { api } from 'lwc';
import LightningModal from 'lightning/modal';
import create from '@salesforce/apex/CreateAccountsController.create';
import createRelatedContacts from '@salesforce/apex/CreateAccountsController.createRelatedContacts';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MyAccountModal extends LightningModal {
    accountName;
    expiryDate;
    emp;
    annualRevenue;
    numberOfContacts;
    addContacts;
    relatedContacts = [];
    

    handleAccountNameChange(event){
        this.accountName = event.detail.value;
    }

    handleExpirationDateChange(event){
        this.expiryDate = event.detail.value;
    }

    handleNumberOfEmployeesChange(event){
        this.emp = event.detail.value;
    }

    handleAnnualRevenueChange(event){
        this.annualRevenue = event.detail.value;
    }

    handleNumberOfContactsChange(event){
        this.numberOfContacts = event.detail.value;
        if(this.numberOfContacts > 0 && this.numberOfContacts <= 10){
            this.relatedContacts = [];
            for(let index=1; index<= this.numberOfContacts; index++){
                this.relatedContacts.push({id: index, firstName:undefined, lastName:undefined, phone: undefined});
            }
        }
    }

    handleAddContacts(event){
        this.addContacts = event.detail.checked;
    }

    get showAddContacts(){
        return this.numberOfContacts > 0 && this.numberOfContacts <= 10;
    }

    get showContactForm(){
        return this.numberOfContacts > 0 && this.numberOfContacts <= 10 && this.addContacts;
    }

    handleCreate(){
        if(this.accountName == undefined){
            const errorToast = new ShowToastEvent({
                                    title: "Error", 
                                    message: "Account Name is required to create an Account!", 
                                    variant: "error"});
            this.dispatchEvent(errorToast);
        }
        else if(this.isContactReady() == false){
            const errorToast1 = new ShowToastEvent({
                title: "Error", 
                message: "Provide Contact details to create an Account!", 
                variant: "error"});
            this.dispatchEvent(errorToast1);
        }
        else{
            create({name: this.accountName, expiry: this.expiryDate, employees: this.emp, revenue: this.annualRevenue})
            .then((data) => {
                let accId = data.Id;
                createRelatedContacts({accId : accId, records: this.relatedContacts})
                .then((d) => {
                    const successToast = new ShowToastEvent({
                                            title: "Success", 
                                            message: data.Name+" Account is created with ID :"+data.Id+"!", 
                                            variant: "success"});
                    this.dispatchEvent(successToast);
                    this.resetAll();
                    this.close('OK');
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

    handleReadyToSave(event){
        const dataId = event.currentTarget.dataset.id;
        for(let cont of this.relatedContacts){
            if(cont.id == dataId){
                cont.firstName = event.detail.fName;
                cont.lastName = event.detail.lName;
                cont.phone = event.detail.phone;
            }
        }
    }

    isContactReady(){
        let ready = true;
        for(let cont of this.relatedContacts){
            if(cont.lastName == undefined){
                ready = false;
                break;
            }
        }
        return ready;
    }

    resetAll(){
        let conts = this.template.querySelectorAll("c-create-contacts");    
        for(let cont of conts){
            cont.resetComponents();
        }
        this.accountName = undefined;
        this.expiryDate = undefined;
        this.emp = undefined;
        this.annualRevenue = undefined;
        this.numberOfContacts = undefined;
        this.addContacts = false;
    }
}