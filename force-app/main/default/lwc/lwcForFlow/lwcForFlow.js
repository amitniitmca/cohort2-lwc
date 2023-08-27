
import { LightningElement, api} from 'lwc';

export default class LwcForFlow extends LightningElement {

    @api userName;
    @api email;
    @api phone;

    @api myValue= "Eli";

    handleSaveClick(){
        this.myValue = "Amit Kumar";
    }

    handleResetClick(){

    }

    handleUsernameChange(event){
        this.userName = event.detail.value;
    }

    handleEmailChange(event){
        this.email = event.detail.value;
    }

    handlePhoneChange(event){
        this.phone = event.detail.value;
    }
}