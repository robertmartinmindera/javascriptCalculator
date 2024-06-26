const buttons = document.querySelectorAll("button");
const inputEquationElement = document.querySelector("input#inputEquation");

function runCalculator() {
  console.log(
    "I want to calculate:",
    document.querySelector("#inputEquation").value
  );
  //Pseudocode for logic:
  //1 - Split input into an array of inputs.
  //'123*123'.split("*") => ['123','123'] => ['123','*','123']
  //2 - Find and execute exponents
  //3 - Find and execute multiplication and division
  //4 - Find and execute addition and subtraction.

  const inputString = document.querySelector("#inputEquation").value;
  let inputArray = [];
  const exponentArray = inputString.split("^");
  exponentArray.forEach((exp, i) => {
    inputArray.push(exp);
    if (i < exponentArray.length - 1) {
      inputArray.push("^");
    }
  });
  console.log(exponentArray);
  console.log(inputArray);
}

Array.from(buttons).forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentString = inputEquationElement.value;
    let newCharacter = "";
    let newString = "";
    switch (btn.parentElement.className) {
      case "numbersContainer":
        newCharacter = btn.id === "decimal" ? "." : btn.id;
        newString = currentString + newCharacter;
        inputEquationElement.value = newString;
        break;
      case "operatorContainer":
        switch (btn.id) {
          case "add":
            newCharacter = "+";
            break;
          case "subtract":
            newCharacter = "-";
            break;
          case "multiply":
            newCharacter = "*";
            break;
          case "divide":
            newCharacter = "/";
            break;
          case "raise":
            newCharacter = "^";
            break;
        }
        newString = currentString + newCharacter;
        inputEquationElement.value = newString;
        break;
      case "constantContainer":
        switch (btn.id) {
          case "pi":
            newCharacter = "pi";
            break;
          case "exp":
            newCharacter = "e";
            break;
        }
        newString = currentString + newCharacter;
        if (btn.id === "clear") newString = "";
        if (btn.id === "back") {
          newString = currentString.substring(0, currentString.length - 1);
        }
        inputEquationElement.value = newString;
        break;
      case "equationHeader":
        if (btn.id === "run") runCalculator();
        break;
    }
  });
});
