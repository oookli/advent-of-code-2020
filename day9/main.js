const { lineReaderConstructor } = require("../utils/file");

const SEARCH_NUMBER = 373803594;

const generateResult = async () => {
  const lineReader = lineReaderConstructor(`${__dirname}/input.txt`);

  const allNumbers = [];

  lineReader.on("line", (number) => {
    allNumbers.push(Number(number));
  });

  lineReader.on("close", () => {
    for (let i = 0; i < allNumbers.length; i++) {
      let sum = allNumbers[i];
      let sumElements = [allNumbers[i]];

      for (let j = i - 1; j >= 0; j--) {
        sum += allNumbers[j];
        sumElements.push(allNumbers[j]);

        if (sum >= SEARCH_NUMBER) {
          break;
        }
      }

      if (sum === SEARCH_NUMBER) {
        const min = Math.min(...sumElements);
        const max = Math.max(...sumElements);

        console.log("Result is: ", min + max);

        return;
      }
    }
  });
};

generateResult();
