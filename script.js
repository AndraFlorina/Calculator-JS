//store inputs
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  //function for deleting all characters
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }
  //function for deleating last character
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  //function for adding to the screen numbers pressed by the user
  appendNumber(number) {
    //stop user to use more .
    if (number === '.' && this.currentOperand.includes('.')) return;
    //conver them in strings so JS won't add them, we need them appended
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  //function for choosing the particular operation that user selected
  chooseOperation(operation) {
    //stop the function if we don't have an operand
    if (this.currentOperand === '') return;
    //compute the first operation, so the user can make more operations
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    //let the user add the next number
    this.currentOperand = '';
  }
  //take values inside the calculator and display on the screen a single value
  compute() {
    let computation;
    //convert string to numbers
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    //without a value we cancel the function compilations
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      //if none of the symbols match the operation return without a computation
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }
  //return number with , for big numbers
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  //update display
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    //if we have an operation displayed, appended our previous operand text element
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}
//get all number elemets
const numberButtons = document.querySelectorAll('[data-number]');
//get all operations elemets
const operationButtons = document.querySelectorAll('[data-operation]');
//get all other elemets
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);
//get the number user pressed and call the function for appending numbers and update display screen
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
//get the operation user pressed and call the function for choosing opration and update display screen
operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
