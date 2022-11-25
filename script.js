"use strict";

const calculatorDispaly = document.querySelector("h1");
const inputButtons = document.querySelectorAll("button");
const clearButton = document.getElementById("clear-button");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

// Calculate first and second values
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,

  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,

  "-": (firstNumber, secondNumber) => firstNumber + secondNumber,

  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,

  "=": (firstNumber, secondNumber) => secondNumber,
};

function getNumberValue(number) {
  //  Replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDispaly.textContent = number;
    awaitingNextValue = false;
  } else {
    // If current display value is 0 replace, if not add number
    const displayValue = calculatorDispaly.textContent;
    calculatorDispaly.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  // if operator pressed dont add decimal
  if (awaitingNextValue) return;
  // If theres no decimal, add one
  if (!calculatorDispaly.textContent.includes(".")) {
    calculatorDispaly.textContent = `${calculatorDispaly.textContent}.`;
  }
}

function useOperator(operator) {
  const currentValue = Number(calculatorDispaly.textContent);
  //   Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  // Asign first value if theres no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    firstValue = calculation;
    calculatorDispaly.textContent = calculation;
  }
  // Ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Reset functionality
function resetAll() {
  calculatorDispaly.textContent = "0";
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
}

// Event listeners for number,operators,decimal buttons
inputButtons.forEach((button) => {
  if (button.classList.length === 0) {
    button.addEventListener("click", () => getNumberValue(button.value));
  } else if (button.classList.contains("operator")) {
    button.addEventListener("click", () => useOperator(button.value));
  } else if (button.classList.contains("decimal")) {
    button.addEventListener("click", addDecimal);
  }
});

// Event listener
clearButton.addEventListener("click", resetAll);
