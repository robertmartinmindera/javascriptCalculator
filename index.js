const buttons = document.querySelectorAll("button");
const inputEquationElement = document.querySelector("input#inputEquation");

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
    }
  });
});
