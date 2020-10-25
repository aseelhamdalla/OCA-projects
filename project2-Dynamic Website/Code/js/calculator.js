/* menue bar function*/
function toggleSidebar(ref) {
  document.getElementById("sidebar").classList.toggle("active");
}
//Change backround btn
function darkBG() {
  document.body.style.backgroundImage = "url('images/black4k.jpg')";
  $(".pagecontainer").css("background-color", "#4d0f00");
  $("#sidebar").css("background-color", "#6e1500");
  $("footer").css("background-color", "#4d0f00");
  $("#welcomemsg").css("color", "white");
  $("#newtasklabel").css("color", "white");
}
function lightBG() {
  document.body.style.backgroundImage = "url('images/whiteBG.jpg')";
  $(".pagecontainer").css("background-color", "#225378");
  $("#sidebar").css("background-color", "#2d709f");
  $("footer").css("background-color", "#225378");
}
//defining variables
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

/* cal code*/
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    let f = 1;
    for (let i = prev; i >= 1; i--) {
      f = f * i;
    }

    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = ((prev, current) => {
          return prev + current;
        })(prev, current);
        break;
      case "-":
        computation = ((prev, current) => {
          return prev - current;
        })(prev, current);
        break;
      case "*":
        computation = ((prev, current) => {
          return prev * current;
        })(prev, current);
        break;
      case "÷":
        computation = ((prev, current) => {
          return prev / current;
        })(prev, current);
        break;
      case "|X|":
        computation = ((prev, current) => {
          return Math.abs(prev, current);
        })(prev, current);
        break;
      case "X^":
        computation = ((prev, current) => {
          return Math.pow(prev, current);
        })(prev, current);
        break;
      case "X!":
        computation = f;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
