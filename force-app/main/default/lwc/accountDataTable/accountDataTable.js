import { LightningElement, wire, track, api } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getAllAccounts from '@salesforce/apex/AccountDataTableController.getAllAccounts';

export default class AccountDataTable extends LightningElement {

    searchAccountName;

    pageSize;
    pageSizeOptions;

    totalRecords;
    pageNumber = 1;
    totalPages;
    recordsToShow = [];

    wiredAccountData;
    @track dataList;
    @track filteredDataList;

    columnsList = [
        {label: 'Account Id', fieldName: 'Id'},
        {label: 'Account Name', fieldName: 'Name'},
        {label: 'Account Type', fieldName: 'Type'},
        {label: 'Annual Revenue', fieldName: 'AnnualRevenue'},
        {label: 'SLA Expiry Date', fieldName: 'SLAExpirationDate__c'},
        {label: 'Phone Number', fieldName: 'Phone'}
    ];

    @wire(getAllAccounts)
    wiredGetAllAccounts(result){
        this.wiredAccountData = result;
        const {data, error} = result;
        if(data){
            this.dataList = data;
            this.filteredDataList = this.dataList;
            this.setRecordsInfo();
        }
        if(error){
            console.log(error);
        }
    }

    @api refreshData(){
        refreshApex(this.wiredAccountData);
    }

    setRecordsInfo(){
        this.totalRecords = this.filteredDataList.length;
        this.setPageSizeOptions();
        this.setPagination();
    }

    setPageSizeOptions(){
        this.pageSizeOptions = [];
        for(let val=5; val <= this.totalRecords; val += 5){
            this.pageSizeOptions.push({label: val, value : ''+val});
        }
        this.pageSize = '5';
    }

    setPagination(){
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        this.recordsToShow = [];
        for(let index=(this.pageNumber-1)*this.pageSize; index < this.pageNumber * this.pageSize ; index++){
            if(index == this.totalRecords){
                break;
            }
            this.recordsToShow.push(this.filteredDataList[index]);
        }
    }

    handlePageSizeChange(event){
        this.pageSize = event.detail.value;
        this.pageNumber = 1;
        this.setPagination();
    }

    handleFirstClick(){
        this.pageNumber = 1;
        this.setPagination();
    }

    handlePreviousClick(){
        this.pageNumber--;
        this.setPagination();
    }

    handleNextClick(){
        this.pageNumber++;
        this.setPagination();
    }

    handleLastClick(){
        this.pageNumber = this.totalPages;
        this.setPagination();
    }

    get isFirstPage(){
        return this.pageNumber == 1;
    }

    get isLastPage(){
        return this.pageNumber == this.totalPages;
    }

    get rowOffset(){
        return (this.pageNumber-1)*this.pageSize;
    }

    handleSearchAccountNameChange(event){
        this.searchAccountName = event.detail.value;
    }

    handleSearchClick(){
        if(this.searchAccountName == undefined || this.searchAccountName == ''){
            this.filteredDataList = this.dataList;
        }
        else{
            this.filteredDataList = this.filteredDataList.filter((item) => item.Name.includes(this.searchAccountName));
        }
        this.setRecordsInfo();
        this.setPagination();
    }
}