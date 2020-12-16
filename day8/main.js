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

  while (cursor < commands.length) {
    if (cursorsHistory.has(cursor)) {
      throw new Error("Infinite loop is possible here");
    }

    const { command, digit } = commands[cursor];

    cursorsHistory.add(cursor);

    commandsMapping[command](digit);
  }

  return result;
};

const generateResult = async () => {
  const lineReader = lineReaderConstructor(`${__dirname}/input.txt`);

  let commands = [];

  lineReader.on("line", (line) => {
    const [_, command, digit] = line.match(/^(\w+) ((-|\+)\d+)/);

    commands.push({ command, digit });
  });

  lineReader.on("close", () => {
    const result = () => {
      for (let i = 0; i < commands.length; i++) {
        const { command } = commands[i];

        if (command !== "jmp") {
          continue;
        }

        commands[i].command = "nop";

        try {
          return calculateInstructions(commands);
        } catch (e) {
          commands[i].command = "jmp";
        }
      }
    };
    console.log("Result is: ", result());
  });
};

generateResult();
