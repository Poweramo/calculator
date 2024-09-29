// TODO: add clear button

const calculator = document.querySelector(".calculator");
const screen = document.querySelector("input");
const calculatorBtns = calculator.children
let calculatorRegex = /^[-+]?(\d+|(\d*[\.]?\d+))([-+*÷]?(\d+|(\d*[\.]?\d+)))*$/

function error() {
	screen.value = "Error";
	setTimeout(() => {
		screen.value = "";
	}, 1500);
};

function calculate(exp) {
    let result = 0;
    let prevNum = 0;
    let currNum = 0;
    let currOp = "+";
	let numAsString = ""
    let i = 0;
    while (i < exp.length) {
        if (!isNaN(Number(exp[i]))) {
            while (i < exp.length && (!isNaN(Number(exp[i])) || exp[i] === ".")) {
                numAsString += exp[i];
                i++;
            }
		    currNum = Number(numAsString);
		    numAsString = "";
            i--;
            if (currOp === "+") {
                result += currNum;
                prevNum = currNum;
            } else if (currOp === "-") {
                result -= currNum;
                prevNum = -currNum;
            } else if (currOp === "*") {
                result -= prevNum;
                result += prevNum * currNum;
                prevNum = prevNum * currNum;
            } else {
                result -= prevNum;
                result += prevNum / currNum;
                prevNum = prevNum / currNum;
            }
            currNum = 0
        } else {
            currOp = exp[i];
        }
        i++;
    }

    return result;
};


for (let btn of calculatorBtns) {
	btn.addEventListener("click", () => {
		screen.value += btn.textContent
		if (btn.textContent === "=") {
			screen.value = screen.value.slice(0, screen.value.length - 1)
			if (!screen.value.match(calculatorRegex)) error()
			if (screen.value.match(calculatorRegex)) {
				screen.value = calculate(screen.value)
			}
		}
	})
}
