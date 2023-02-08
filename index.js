"use strict";
const screen = document.querySelector(".screen");
let equation = document.createElement("p");
let answer = document.createElement("h2");
equation.style.fontSize = "18px";
answer.style.alignSelf = "last baseLine";
screen.appendChild(equation);
screen.appendChild(answer);
let val,
  op1,
  op2,
  operation,
  operatorTriggered = 0,
  decimalPoint = 0;
// ==================== functionality =========================
// add
const add = function (operand1 = 0, operand2 = 0) {
  return operand1 + operand2;
};
// subtract
const subtract = function (operand1 = 0, operand2 = 0) {
  return operand1 - operand2;
};
// multiply
const multiply = function (operand1 = 0, operand2 = 0) {
  return operand1 * operand2;
};
// divide
const divide = function (operand1 = 0, operand2 = 1) {
  return operand1 / operand2;
};
// operate
const operate = function (operand1, operand2, operator) {
  if (operator === "+") {
    return add(operand1, operand2);
  } else if (operator === "-") {
    return subtract(operand1, operand2);
  } else if (operator === "x") {
    return multiply(operand1, operand2);
  } else if (operator === "/") {
    return divide(operand1, operand2);
  }
};
// clear
const clear = function () {
  equation.textContent = undefined;
  answer.textContent = undefined;
  val = undefined;
  op1 = undefined;
  op2 = undefined;
  operation = undefined;
  operatorTriggered = 0;
  decimalPoint = 0;
};
// delete
const del = function (num) {
  if (equation.textContent !== undefined)
    equation.textContent = equation.textContent.substring(
      0,
      equation.textContent.length - num
    );
};
// ===================== click a button=======================
const buttons = document.querySelectorAll(".btn");
for (let i = 0; i < buttons.length; i++)
  buttons[i].addEventListener("click", function () {
    // check for clicking a number
    if (buttons[i].classList.contains("number")) {
      val = undefined;
      if (buttons[i].value === ".") {
        if (decimalPoint === 0) {
          decimalPoint = 1;
          if (
            equation.textContent.length === 0 ||
            equation.textContent.charAt(equation.textContent.length - 1) === " "
          )
            equation.textContent =
              equation.textContent + "0" + buttons[i].value;
          else equation.textContent = equation.textContent + buttons[i].value;
        }
      } else equation.textContent = equation.textContent + buttons[i].value;
    } else if (buttons[i].classList.contains("operator")) {
      if (val) {
        if (val !== "ERROR") {
          equation.textContent = "" + val;
          decimalPoint = 0;
        } else {
          clear();
        }
      } else {
        decimalPoint = 0;
      }
      if (buttons[i].value === "clear") clear();
      else if (buttons[i].value === "del") {
        if (
          equation.textContent.charAt(equation.textContent.length - 1) === " "
        ) {
          operatorTriggered = 0;
          val = del(3);
        } else val = del(1);
      } else {
        if (
          equation.textContent.charAt(equation.textContent.length - 1) >= "0" &&
          equation.textContent.charAt(equation.textContent.length - 1) <= "9" &&
          operatorTriggered === 0 &&
          buttons[i].value !== "="
        ) {
          operatorTriggered = 1;
          equation.textContent += " " + buttons[i].value + " ";
        } else if (buttons[i].value === "=") {
          const array = equation.textContent.split(" ");
          [op1, operation, op2] = [...array];
          if (array.length === 1) {
            if (op1.charAt(op1.length - 1) === ".") {
              op1 += "0";
            }
            val = op1;
          } else if ((parseFloat(op2) == 0 || op2 === "") && operation === "/")
            val = "ERROR";
          else {
            val = operate(+op1, +op2, operation);
            console.log(val);
          }
          answer.textContent = val;
          equation.textContent = undefined;
          operatorTriggered = 0;
        }
      }
    }
  });
