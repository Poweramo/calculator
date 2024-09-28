// TODO: fix calculation for decimal numbers
// TODO: change / to ÷
// TODO: add clear button
// TODO: fix calculator regex (++ or -- or // or ** are accepted)
// TODO: fix division by 0

const calculator = document.querySelector(".calculator");
const screen = document.querySelector("input");
const calculatorBtns = calculator.children
let calculatorRegex = /^[-+]?(\d+|(\d*[\.]?\d+))([-+*\/]+[-+]?(\d+|(\d*[\.]?\d+)))*$/

function add(x, y) {
        return x + y;
};
function substract(x, y) {
        return x - y;
};
function multiply(x, y) {
        return x * y;
};
function divide(x, y) {
        return x / y;
};

function error() {
	screen.value = "Error";
	setTimeout(() => {
		screen.value = "";
	}, 1500);
};

function calculate(exp) {
    const results = [];
    const waitingList = []
    let currNum = ""
    let currOp = ""

    for (let i = 0; i < exp.length; i++) {
        if (!isNaN(Number(exp[i]))) {
            currNum += exp[i]

            if (isNaN(Number(exp[i + 1]))) {
                const secondNum = Number(currNum)
                currNum = ""

                if (results.length === 0) {
                    results.push(secondNum)
                    continue;
                }

                if (currOp === "*" || currOp === "/") {
                    const firstNum = results.pop()
                    if (currOp === "*") results.push(multiply(firstNum, secondNum))
                    if (currOp === "/") results.push(divide(firstNum, secondNum))
                } else {
                    results.push(secondNum)
                    waitingList.push(currOp)
                }
            }
        } else {
            currOp = exp[i]
        }
    }

    while (results.length > 1) {
        const operator = waitingList.shift()
        const firstNum = results.shift()
        const secondNum = results.shift()

        if (operator === "+") results.unshift(add(firstNum, secondNum))
        if (operator === "-") results.unshift(substract(firstNum, secondNum))
        if (operator === "*") results.unshift(multiply(firstNum, secondNum))
        if (operator === "/") results.unshift(divide(firstNum, secondNum))
    }

    return results[0];
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
