const fs = require("fs");

const YEAR = 2020;

fs.readFile(`${__dirname}/input.txt`, "utf8", (_, data) => {
  const dataArray = data.split("\n").map((str) => Number(str));

  let number1 = dataArray[0];
  let number2;

  dataArray.forEach((number) => {
    const potentialNumber = YEAR - number;

    if (dataArray.indexOf(potentialNumber) !== -1) {
      number1 = number;
      number2 = potentialNumber;

      return;
    }
  });

  console.log("result is: ", number1, number2);
  console.log("result is: ", number1 * number2);
});
