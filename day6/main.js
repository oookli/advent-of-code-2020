const { lineReaderConstructor } = require("../utils/file");

const generateResult = async () => {
  const lineReader = lineReaderConstructor(`${__dirname}/input.txt`);

  let sumOfYesAnswers = 0;
  let groupYesAnswers = new Set();
  let singleYesAnswersArray = [];

  const groupCalculation = () => {
    groupYesAnswers.forEach((yesAnswer) => {
      if (singleYesAnswersArray.every((elem) => elem.includes(yesAnswer))) {
        sumOfYesAnswers += 1;
      }
    });
  };

  lineReader.on("line", (line) => {
    if (line.length === 0) {
      groupCalculation();

      singleYesAnswersArray = [];
      groupYesAnswers.clear();
      return;
    }

    lineYesAnswers = line.split("");
    singleYesAnswersArray.push(lineYesAnswers);

    lineYesAnswers.forEach((answer) => groupYesAnswers.add(answer));
  });

  lineReader.on("close", () => {
    groupCalculation();

    console.log("Sum of yes answers for each group: ", sumOfYesAnswers);
  });
};

generateResult();
