// !!! Solving decimal point problem

const calculator = document.querySelector(".calculator");
const screen = document.querySelector("input");

const items = [
	document.getElementById("+"),
	document.getElementById("-"),
	document.getElementById("*"),
	document.getElementById("0"),
	document.getElementById("1"),
	document.getElementById("2"),
	document.getElementById("3"),
	document.getElementById("4"),
	document.getElementById("5"),
	document.getElementById("6"),
	document.getElementById("7"),
	document.getElementById("8"),
	document.getElementById("."),
	document.getElementById("9"),
	document.getElementById("÷"),
	document.getElementById("="),
];

let numbers;
let result;
// let lastItem = screen.value[screen.value.length - 1];

let regex1 = /\+/g;
let regex2 = /\-/g;
let regex3 = /\*/g;
let regex4 = /\÷/g;
let regex5 = /\.$/g;
let regex6 = /\./g;

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

calculator.addEventListener("click", (e) => {
	const rules = () => {
		if (screen.value === "") {
			return "Error";
		} else if (
			screen.value.match(regex1) ||
			screen.value.match(regex2) ||
			screen.value.match(regex3) ||
			screen.value.match(regex4)
		) {
			return "Error";
		} else if (screen.value.endsWith(".") === true) {
			return "Error";
		} else {
			screen.value += e.target.id;
		}
	};

	const decimalPointRules = () => {
		if (screen.value.match(regex5)) {
			return "Error";
		} else if (
			screen.value.endsWith("+") === true ||
			screen.value.endsWith("-") === true ||
			screen.value.endsWith("*") === true ||
			screen.value.endsWith("÷") === true
		) {
			return "Error";
		} else if (
			(!screen.value.match(regex1) && screen.value.match(regex6)) ||
			(!screen.value.match(regex2) && screen.value.match(regex6)) ||
			(!screen.value.match(regex3) && screen.value.match(regex6)) ||
			(!screen.value.match(regex4) && screen.value.match(regex6))
		) {
			return "Error";
		} else {
			screen.value += e.target.id;
		}
	};

	switch (e.target) {
		case items[0]:
			rules();
			break;
		case items[1]:
			rules();
			break;
		case items[2]:
			rules();
			break;
		case items[3]:
			screen.value += e.target.id;
			break;
		case items[4]:
			screen.value += e.target.id;
			break;
		case items[5]:
			screen.value += e.target.id;
			break;
		case items[6]:
			screen.value += e.target.id;
			break;
		case items[7]:
			screen.value += e.target.id;
			break;
		case items[8]:
			screen.value += e.target.id;
			break;
		case items[9]:
			screen.value += e.target.id;
			break;
		case items[10]:
			screen.value += e.target.id;
			break;
		case items[11]:
			screen.value += e.target.id;
			break;
		case items[12]:
			return "Error";
			break;
		case items[13]:
			screen.value += e.target.id;
			break;
		case items[14]:
			rules();
			break;
		case items[15]:
			numbers = screen.value
				.replaceAll("-", "+")
				.replaceAll("*", "+")
				.replaceAll("÷", "+")
				.split("+");
			numbers = [Number(numbers[0]), Number(numbers[1])];
			if (screen.value.match(regex1)) {
				add(numbers[0], numbers[1]);
				screen.value = result;
			}
			if (screen.value.match(regex2)) {
				substract(numbers[0], numbers[1]);
				screen.value = result;
			}
			if (screen.value.match(regex3)) {
				multiply(numbers[0], numbers[1]);
				screen.value = result;
			}
			if (screen.value.match(regex4)) {
				divide(numbers[0], numbers[1]);
				screen.value = result;
			}
			break;
	}
});
