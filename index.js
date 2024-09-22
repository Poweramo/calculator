// TODO: add regex check of expression
// TODO: code = logic
const calculator = document.querySelector(".calculator");
const screen = document.querySelector("input");
const calculatorBtns = calculator.children
let numbers;
let result;
let calculatorRegex = /^[-+]?(\d+|(\d*[\.]?\d+))([-+*\/]+[-+]?(\d+|(\d*[\.]?\d+)))*$/

const error = () => {
	screen.value = "Error";
	setTimeout(() => {
		screen.value = "";
	}, 1500);
};
const add = (x, y) => {
	result = x + y;
};
const substract = (x, y) => {
	result = x - y;
};
const multiply = (x, y) => {
	result = x * y;
};
const divide = (x, y) => {
	result = x / y;
};
const root = (x) => {
	result = Math.sqrt(x);
};

for (let btn of calculatorBtns) {
	if (btn.textContent === "=") {
		continue
	}
	btn.addEventListener("click", () => {
		screen.value += btn.textContent
	})
}
