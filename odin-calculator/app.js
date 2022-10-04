let oldValue = '';
let newValue = '0';

const oldValueText = document.querySelector('.previousValue');
const newValueText = document.querySelector('.newValue');
const equal = document.querySelector('.equal');
equal.addEventListener('click', () => operate(oldValue[oldValue.length-1], oldValue.slice(0,-2), newValue))
const comma = document.querySelector('.comma');
comma.addEventListener('click', () => {
    if(newValue == '') {
        newValue = '0';
    }
    if((newValue.includes('.'))) return;
    newValue += '.';
    newValueText.textContent = newValue;    
});

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clear)
const deleteDigit = document.querySelector('#delete');
deleteDigit.addEventListener('click', () => {
    newValue = newValue.slice(0,-1);
    if(newValue == '') newValue = '0';
    newValueText.textContent = newValue;
})

function clear(){
    operatorIsChosen = false;
    oldValue = '';
    newValue = '0';
    oldValueText.textContent = oldValue;
    newValueText.textContent = newValue;
}
const operators = [...document.querySelectorAll('.operator')];
const numbers = [...document.querySelectorAll('.number')];
const buttons = [].concat(operators).concat(numbers).push(comma);

operators.forEach(operator => {
    operator.addEventListener('click', () => writeOperator(operator.textContent));
})

numbers.forEach(number => {
    number.addEventListener('click', () => writeDigit(number.textContent));
})



let operatorIsChosen = false;
let justSelectedOperator = false;
let evaluated = false;
function writeDigit(digit){
    if(newValue == "C'MON MATE") clear();
    if(operatorIsChosen && evaluated){
        newValue = '';
        evaluated = false;
    }
    if(justSelectedOperator){
        newValue = '';
        justSelectedOperator = false;
    }
    if(newValue == '0') newValue = '';
    newValue += digit;
    newValueText.textContent = newValue;
}


function writeOperator(operator){    
    if(newValue == "C'MON MATE") clear();
    justSelectedOperator = true;
    if(!operatorIsChosen){
        oldValue = ''
        oldValue += newValue + ' ' + operator;
        operatorIsChosen = true;
    }
    else{
        if(oldValue[oldValue.length-1] == operator) operate(operator, oldValue.slice(0,-2), newValue);
        else oldValue = oldValue.slice(0, -1) + operator;
    }    
    oldValueText.textContent = oldValue;
}

function operate(op, a, b){
    if(operatorIsChosen){
        a = +a;
        b = +b;
        switch(op){
            case 'x' :
                newValue = multiply(a,b);
                break;
            case '/' :
                newValue = divide(a,b);
                break;
            case '+' :
                newValue = sum(a,b);
                break;
            case '-' :
                newValue = subtract(a,b);
                break;                
        }
        oldValue = newValue + ' ' + op;
        oldValueText.textContent = oldValue;    
        newValueText.textContent = newValue;
        evaluated = true;
    }
}
function roundResult(number) {
    return Math.round(number * 1000) / 1000
  }
function multiply(a,b){return `${roundResult(a*b)}`;}
function divide(a,b){
    if(b==0) return "C'MON MATE";
    return `${roundResult(a/b)}`;
}
function sum(a,b){return `${a+b}`;}
function subtract(a,b){return `${a-b}`;}