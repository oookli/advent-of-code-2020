const { lineReaderConstructor } = require("../utils/file");

const generateResult = async () => {
  const lineReader = lineReaderConstructor(`${__dirname}/input.txt`);

  const allNumbers = [];

  lineReader.on("line", (number) => {
    allNumbers.push(Number(number));
  });

  lineReader.on("close", () => {
    for (let i = 26; i < allNumbers.length; i++) {
      const last5Numbers = allNumbers.slice(i - 25, i);
      let isCorrect = false;
      for (let j = 0; j < last5Numbers.length; j++) {
        const searchNumber = allNumbers[i] - last5Numbers[j];

        if (last5Numbers.includes(searchNumber)) {
          isCorrect = true;
        }
      }

      if (!isCorrect) {
        console.log("Result is: ", allNumbers[i]);
        return;
      }
    }
  });
};

generateResult();
