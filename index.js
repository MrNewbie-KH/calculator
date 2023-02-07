"use strict";
const screen = document.querySelector(".screen");
let equation = document.createElement("p");
let answer = document.createElement("h2");
equation.style.fontSize = "18px";
answer.style.alignSelf = "last baseLine";
screen.appendChild(equation);
screen.appendChild(answer);
let val, op1, op2, operation, lastElement;
// ==================== functionality =========================
// add
const add = function (operand1, operand2) {
  return operand1 + operand2;
};
// subtract
const subtract = function (operand1, operand2) {
  return operand1 - operand2;
};
// multiply
const multiply = function (operand1, operand2) {
  return operand1 * operand2;
};
// divide
const divide = function (operand1, operand2) {
  return operand1 / operand2;
};
// operate
const operate = function (operand1, operand2, operator) {
  if (operator === "+") {
    add(operand1, operand2);
  } else if (operator === "-") {
    subtract(operand1, operand2);
  } else if (operator === "x") {
    multiply(operand1, operand2);
  } else if (operator === "/") {
    divide(operand1, operand2);
  }
};
// clear
// delete
const del = function () {
  if (equation.textContent !== undefined)
    equation.textContent = equation.textContent.substring(
      0,
      equation.textContent.length - 1
    );
};
// ===================== click a button=======================
const buttons = document.querySelectorAll(".btn");
for (let i = 0; i < buttons.length; i++)
  buttons[i].addEventListener("click", function () {
    if (buttons[i].classList.contains("number")) {
      equation.textContent = equation.textContent + buttons[i].value;
    } else if (buttons[i].classList.contains("operator")) {
      if (equation.textContent.length > 0) {
        if (
          equation.textContent.charAt(equation.textContent.length - 1) >= "0" &&
          equation.textContent.charAt(equation.textContent.length - 1) <= "9"
        ) {
          equation.textContent += " " + buttons[i].value + " ";
        }
      }
    }
  });
