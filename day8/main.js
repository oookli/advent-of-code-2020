const { lineReaderConstructor } = require("../utils/file");

const calculateInstructions = (commands) => {
  let result = 0;
  let cursor = 0;
  const cursorsHistory = new Set();

  const commandsMapping = {
    acc: (digit) => {
      result += Number(digit);
      cursor++;
    },
    jmp: (digit) => {
      cursor += Number(digit);
    },
    nop: () => {
      cursor++;
    },
  };

  while (true) {
    if (cursorsHistory.has(cursor)) {
      return result;
    }

    const { command, digit } = commands[cursor];

    cursorsHistory.add(cursor);

    commandsMapping[command](digit);
  }
};

const generateResult = async () => {
  const lineReader = lineReaderConstructor(`${__dirname}/input.txt`);

  let commands = [];

  lineReader.on("line", (line) => {
    const [_, command, digit] = line.match(/^(\w+) ((-|\+)\d+)/);

    commands.push({ command, digit });
  });

  lineReader.on("close", () => {
    console.log("Result is: ", calculateInstructions(commands));
  });
};

generateResult();
