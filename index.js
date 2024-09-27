// TODO: fix calculation for negative numbers
// TODO: change / to ÷
// TODO: add clear button
// TODO: add tests to fix bugs

const calculator = document.querySelector(".calculator");
const screen = document.querySelector("input");
const calculatorBtns = calculator.children
let calculatorRegex = /^[-+]?(\d+|(\d*[\.]?\d+))([-+*\/]+[-+]?(\d+|(\d*[\.]?\d+)))*$/
let numbers;

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
	const priorOpStack = []
        const opStack = []
        const priorNumsStack = []
        const numsStack = []
        let lastOp = ""
        let currNum = ""
        let res;

        for (let i = 0; i < exp.length; i++) {
                if (isNaN(Number(exp[i]))) {
                        const num = Number(currNum)
                        if (exp[i] === "+" || exp[i] === "-") {
                                opStack.push(exp[i])
                                numsStack.push(num)
                        }
                        if (exp[i] === "*" || exp[i] === "/") {
                                priorOpStack.push(exp[i])
                                priorNumsStack.push(num)
                        }

                        lastOp = exp[i]
                        currNum = ""
                        continue;
                }
                currNum += exp[i]
        }
        if (lastOp === "+" || lastOp === "-") numsStack.push(Number(currNum))
        if (lastOp === "*" || lastOp === "/") priorNumsStack.push(Number(currNum))

        while (priorNumsStack.length !== 0) {
                const operator = priorOpStack.pop()
                const secondNum = priorNumsStack.pop()
                const firstNum = res || priorNumsStack.pop()

                if (operator === "*") res = multiply(firstNum, secondNum)
                if (operator === "/") res = divide(firstNum, secondNum)
        }
	while (numsStack.length !== 0) {
                const operator = opStack.pop()
                const secondNum = numsStack.pop()
                const firstNum = res || numsStack.pop()

                if (operator === "+") res = add(firstNum, secondNum)
                if (operator === "-") res = substract(firstNum, secondNum)
        }

        return res;
}

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
