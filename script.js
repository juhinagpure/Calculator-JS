console.log("Hello");

let expression = "";
let lastClickedOperator = false;

const buttons = document.querySelectorAll("#buttons-container button");
const output = document.getElementById("calc-output");

function onClick(e) {
  const val = e.target.getAttribute("data-val");

  if (val === "=") {
    console.log("Evaluate called!");
    try {
      // Use a regular expression to remove leading zeros
      expression = expression.replace(/(^|[^.])0+(\d)/g, "$1$2");
      output.innerHTML = eval(expression);
    } catch (err) {
      console.log(err);
      output.innerHTML = "Error";
    }

    expression = "";
    lastClickedOperator = false;
    return;
  }

  if (val === "clear") {
    console.log("clear called!");
    expression = "";
    output.innerHTML = "";
    lastClickedOperator = false;
    return;
  }

  if (val === "delete") {
    console.log("delete called!");
    expression = expression.slice(0, -1);
    output.innerHTML = expression;
    lastClickedOperator = false;
    return;
  }

  // Check if the last clicked button was an operator
  if (lastClickedOperator && isNaN(parseInt(val))) {
    // Do not allow consecutive operators
    return;
  }

  // Append the value to the expression
  expression = expression + val;
  output.innerHTML = expression;

  // Update the flag based on the current click
  lastClickedOperator = isNaN(parseInt(val));
}

for (let button of buttons) {
  button.addEventListener("click", onClick);
}
