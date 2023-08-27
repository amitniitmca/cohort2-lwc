import { LightningElement } from 'lwc';
import MyModal from 'c/myAccountModal';

export default class OpenModal extends LightningElement {
    async handleClick(){
        const result = await MyModal.open({
                        size: 'large',
                        description: 'Accessible description of modal\'s purpose'
                    });
        alert(result);
    }
}