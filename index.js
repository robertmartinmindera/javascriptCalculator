const buttons = document.querySelectorAll("button");
const inputEquationElement = document.querySelector("input#inputEquation");

function splitAndBuildArray(characterToSplit, inputArray) {
  let newArray = [];
  //["12^2+3^3-1^0"]
  inputArray.forEach((input) => {
    if (input === characterToSplit) newArray.push(input); //error handling
    else {
      //"12^2+3^3-1^0"
      const subArray = input.split(characterToSplit);
      //subArray === ["12","2+3","3-1","0"]
      subArray.forEach((inp, i) => {
        newArray.push(inp);
        if (i < subArray.length - 1) {
          newArray.push(characterToSplit);
        }
      });
    }
  });

  return newArray;
}

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

  //part 1 - build array of inputs
  const inputArray = [document.querySelector("#inputEquation").value];

  let outputArray = [];

  outputArray = splitAndBuildArray("^", inputArray);

  console.log(inputArray);
  console.log("Split by ^:", outputArray);
  outputArray = splitAndBuildArray("*", outputArray);
  console.log("Split by *:", outputArray);
  outputArray = splitAndBuildArray("/", outputArray);
  console.log("Split by /:", outputArray);
  outputArray = splitAndBuildArray("+", outputArray);
  console.log("Split by +:", outputArray);
  outputArray = splitAndBuildArray("-", outputArray);
  console.log("Split by -:", outputArray);

  //Part 2 - Find and execute exponents
  //1 - Tell JS to go through the array, one by one, and find '^'.
  //2 - When it finds the ^, take the previous number and raise it to the next number
  //3 - rebuild the array with the new, combined, value

  outputArray.forEach((input, i) => {
    if (input === "^" && i !== 0 && i < outputArray.length) {
      //step 2 - get combined exponent
      const lastNumber = outputArray[i - 1];
      const nextNumber = outputArray[i + 1];
      const combinedValue = Number(lastNumber) ** Number(nextNumber);
      //step 3
      let updatedArray = [];
      for (let j = 0; j < outputArray.length; j++) {
        if (j !== i && j !== i - 1 && j !== i + 1)
          updatedArray.push(outputArray[j]);
        else if (j === i) updatedArray.push(combinedValue);
      }
      console.log("Calculate exponents", updatedArray);
    }
  });
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
