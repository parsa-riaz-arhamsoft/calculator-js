let expression = "";
let result = 0;

//creating expression to calculate
const createExp = (val) => {
  const length = expression.length
  const lastVal = expression[length - 1];

  if (val === "+" || val === "-" || val === "*" || val === "/" || val === "%") {
    if (
      lastVal === "+" ||
      lastVal === "-" ||
      lastVal === "*" ||
      lastVal === "/" ||
      lastVal === "%" ||
      expression.length === 0
    ) {
      expression = expression;
    } else {
      expression = expression + val;
      document.getElementById("expression").innerHTML = expression;
    }
  } else {
    expression = expression + val;
    document.getElementById("expression").innerHTML = expression;
  }
}

//clear expression
const clearExp = () => {
  expression = "";
  result = 0;
  document.getElementById("expression").innerHTML = "0";
  document.getElementById("expression").style.color = "black"
}

//negative the last value on pressing +- sign
const negativeVal = () => {
  const lastOperator = expression.match(/[+\-*%\/\(](?=[^\-\+\/\*]*$)/g);
  if (lastOperator !== null && expression.length !== 0) {
    const indexOfLastOperator = expression.lastIndexOf(
      lastOperator[lastOperator.length - 1]
    );

    let firstHalfExp = expression.slice(0, indexOfLastOperator + 1);
    let secondHalfExp = "-" + expression.slice(indexOfLastOperator + 1);
    expression = firstHalfExp + secondHalfExp;
    document.getElementById("expression").innerHTML = expression;
  } else if (lastOperator === null && expression.length !== 0) {
    expression = "-" + expression;
    document.getElementById("expression").innerHTML = expression;
  }
}

//console log the expression
function consoleLog() {
  let exp = document.getElementById("expression").innerHTML;
  console.log(exp);
}

//calculate final result
const calculateResult = () => {
  let operator = "+";
  let operand = "";
  const tokens = expression.match(/(\d+\.\d+|\d+|[+\-*/%])/g);
  const consecutiveOperators = /([+\-*/%]){3}/g
  const tokenLen = tokens.length
  if (consecutiveOperators.test(expression) || tokens[tokenLen - 1] === "+" ||
    tokens[tokenLen - 1] === "-" ||
    tokens[tokenLen - 1] === "*" ||
    tokens[tokenLen - 1] === "/") {
    document.getElementById("expression").innerHTML = "unexpected expression"
    document.getElementById("expression").style.color = "rgb(184, 51, 51)"
  } else if (tokenLen === 2 && tokens[1] === "%") {
    percent(result, tokens[0])
    expression = result
    document.getElementById("expression").innerHTML = expression
  } else if (tokenLen === 1) {
    expression = tokens[0]
    document.getElementById("expression").innerHTML = expression
  } else if (tokenLen === 2 && tokens[0] === "-") {
    document.getElementById("expression").innerHTML = expression
  } else {

    for (let i = 0; i <= tokenLen-1;) {
      if (
        tokens[i] === "+" ||
        tokens[i] === "-" ||
        tokens[i] === "*" ||
        tokens[i] === "/" ||
        tokens[i] === "%"
      ) {
        operator = tokens[i];
        if (
          tokens[i + 1] === "+" ||
          tokens[i + 1] === "-" ||
          tokens[i + 1] === "*" ||
          tokens[i + 1] === "/" ||
          tokens[i + 1] === "%"
        ) {
          operand = `${tokens[i + 1]}${tokens[i + 2]}`;
          i += 3;
        } else {
          operand = tokens[i + 1];
          i += 2;
        }
      } else {
        operand = tokens[i];
        i++;
      }
      switch (operator) {
        case "+":
          {
            add(result, operand)
            break
          }
        case "-": {
          minus(result, operand)
          break
        }
        case "*": {
          multiply(result, operand)
          break
        }
        case "/": {
          divide(result, operand)
          break
        }
        case "%": {
          percent(result, operand)
          break
        }

      }
    }
    expression = result.toFixed(10)
    document.getElementById("expression").innerHTML = expression
  }

};

//methematical functions
const add = (a, b) => {

  result = Number(a) + Number(b)
}
const minus = (a, b) => {
  result = Number(a) - Number(b)
}
const multiply = (a, b) => {
  result = Number(a) * Number(b)
}
const divide = (a, b) => {
  result = Number(a) / Number(b)
}
const percent = (a, b) => {
  if (b === "" || b === undefined || b === "0" || a === 0 || a === null) {
    if (b === "" || b === undefined || b === "0") {
      result = Number(a) / 100
    } else {
      result = Number(b) / 100
    }
  } else {
    result = Number(a) / 100 * Number(b)
  }
}