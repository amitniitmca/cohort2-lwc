public with sharing class RecordFetcherController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts(){
        return [SELECT Id, Name, Phone FROM Account];
    }

    @AuraEnabled(cacheable=true)
    public static Account getAccountDetail(Id accId){
        return [SELECT Id, Name, AccountNumber, Phone FROM Account WHERE Id = :accId];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountDetails(String accType){
        return [SELECT 
                Id, Name, AccountNumber, Phone, AnnualRevenue, Type 
                FROM Account 
                WHERE Type = :accType];
    }

    @AuraEnabled
    public static List<String> getAccountTypePicklistValues(){
        Schema.DescribeFieldResult fieldResult = Account.Type.getDescribe();
        List<Schema.PicklistEntry> typeList = fieldResult.getPicklistValues();
        List<String> values = new List<String>();
        for(Schema.PicklistEntry temp : typeList){
            if(temp.isActive()){
                values.add(temp.getValue());
            }
        }
        return values;
    }
}