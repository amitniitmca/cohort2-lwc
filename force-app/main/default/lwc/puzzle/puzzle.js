import { LightningElement } from 'lwc';

export default class Puzzle extends LightningElement {
    
    isRendered = false;
    randomNumbers = [];

    connectedCallback(){
        this.randomNumbers = [];
        for(;;){
            let num = parseInt(Math.random()*10);
            if(num != 0 && num != 9 && !this.randomNumbers.includes(num)){
                this.randomNumbers.push(num);
            }
            if(this.randomNumbers.length == 8){
                break;
            }
        }
    }

    renderedCallback(){
        if(this.isRendered === false){
            const buttons = this.template.querySelectorAll("lightning-button");
            for(let index=0; index < buttons.length-1; index++){
                buttons[index].label = this.randomNumbers[index];
            }
            buttons[buttons.length-1].label = "-"
            this.isRendered = true;
        }
    }

    handleButtonClick(event){
        let buttonClickedId = event.target.id.split("-")[0];
        if(buttonClickedId === "1"){
            let b1 = this.template.querySelector('lightning-button[data-id="2"]');
            let b2 = this.template.querySelector('lightning-button[data-id="4"]');
            this.checkAndSwap(event.target, [b1, b2]);
        }
        else if(buttonClickedId === "2"){
            let b1 = this.template.querySelector('lightning-button[data-id="1"]');
            let b2 = this.template.querySelector('lightning-button[data-id="3"]');
            let b3 = this.template.querySelector('lightning-button[data-id="5"]');
            this.checkAndSwap(event.target, [b1, b2, b3]);
        }
        else if(buttonClickedId === "3"){
            let b1 = this.template.querySelector('lightning-button[data-id="2"]');
            let b2 = this.template.querySelector('lightning-button[data-id="6"]');
            this.checkAndSwap(event.target, [b1, b2]);
        }
        else if(buttonClickedId === "4"){
            let b1 = this.template.querySelector('lightning-button[data-id="1"]');
            let b2 = this.template.querySelector('lightning-button[data-id="5"]');
            let b3 = this.template.querySelector('lightning-button[data-id="7"]');
            this.checkAndSwap(event.target, [b1, b2, b3]);
        }
        else if(buttonClickedId === "5"){
            let b1 = this.template.querySelector('lightning-button[data-id="2"]');
            let b2 = this.template.querySelector('lightning-button[data-id="4"]');
            let b3 = this.template.querySelector('lightning-button[data-id="6"]');
            let b4 = this.template.querySelector('lightning-button[data-id="8"]');
            this.checkAndSwap(event.target, [b1, b2, b3, b4]);
        }
        else if(buttonClickedId === "6"){
            let b1 = this.template.querySelector('lightning-button[data-id="3"]');
            let b2 = this.template.querySelector('lightning-button[data-id="5"]');
            let b3 = this.template.querySelector('lightning-button[data-id="9"]');
            this.checkAndSwap(event.target, [b1, b2, b3]);
        }
        else if(buttonClickedId === "7"){
            let b1 = this.template.querySelector('lightning-button[data-id="4"]');
            let b2 = this.template.querySelector('lightning-button[data-id="8"]');
            this.checkAndSwap(event.target, [b1, b2]);
        }
        else if(buttonClickedId === "8"){
            let b1 = this.template.querySelector('lightning-button[data-id="5"]');
            let b2 = this.template.querySelector('lightning-button[data-id="7"]');
            let b3 = this.template.querySelector('lightning-button[data-id="9"]');
            this.checkAndSwap(event.target, [b1, b2, b3]);
        }
        else {
            let b1 = this.template.querySelector('lightning-button[data-id="6"]');
            let b2 = this.template.querySelector('lightning-button[data-id="8"]');
            this.checkAndSwap(event.target, [b1, b2]);
        }
        this.checkForWin();
    }

    checkAndSwap(target, buttonArray){
        for(let button of buttonArray){
            if(button.label === "-"){
                button.label = target.label;
                target.label = "-";
                break;
            }
        }
    }

    checkForWin(){
        let myarray = ['1', '2', '3', '4', '5', '6', '7', '8', '-'];
        let won = true;
        const buttons = this.template.querySelectorAll("lightning-button");
        for(let index=0; index < buttons.length; index++){
            if(buttons[index].label != myarray[index]){
                won = false;
                break;
            }
        }
        if(won === true){
            alert("Congratulation, You Won!");
        }
    }
}