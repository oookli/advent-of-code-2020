const { readFileAsArray } = require("../utils/file");

let number1;
let number2;
let number3;

const YEAR = 2020;

const generateResult = async () => {
  const array = await readFileAsArray(`${__dirname}/input.txt`);

  const dataArray = array.map((str) => Number(str));

  for (let i = 0; i < dataArray.length - 1; i++) {
    for (let j = 1; j < dataArray.length; j++) {
      const potentialNumber = YEAR - dataArray[i] - dataArray[j];

      if (dataArray.indexOf(potentialNumber) !== -1) {
        number1 = dataArray[i];
        number2 = dataArray[j];
        number3 = potentialNumber;

        break;
      }
    }
  }

  console.log("numbers are: ", number1, number2, number3);
  console.log("result is: ", number1 * number2 * number3);
};

generateResult();
