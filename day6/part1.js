const { lineReaderConstructor } = require("../utils/file");

const generateResult = async () => {
  const lineReader = lineReaderConstructor(`${__dirname}/input.txt`);

  let sumOfYesAnswers = 0;
  let groupYesAnswers = new Set();
  lineReader.on("line", (line) => {
    if (line.length === 0) {
      sumOfYesAnswers += groupYesAnswers.size;
      groupYesAnswers = new Set();
      return;
    }

    lineYesAnswers = line.split("");

    lineYesAnswers.forEach((answer) => groupYesAnswers.add(answer));
  });

  lineReader.on("close", () => {
    sumOfYesAnswers += groupYesAnswers.size;

    console.log("Sum of yes answers for each group: ", sumOfYesAnswers);
  });
};

generateResult();
