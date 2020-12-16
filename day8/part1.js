const { lineReaderConstructor } = require("../utils/file");

const generateResult = async () => {
  const lineReader = lineReaderConstructor(`${__dirname}/input.txt`);

  let commands = [];
  let result = 0;
  let cursor = 0;
  let cursorsHistory = [];

  const pushCursorToHistory = (cursor) => {
    const foundPositionIndex = cursorsHistory.findIndex(
      ({ position }) => position === cursor
    );

    if (foundPositionIndex !== -1) {
      cursorsHistory[foundPositionIndex] = {
        ...cursorsHistory[foundPositionIndex],
        times: cursorsHistory[foundPositionIndex].times + 1,
      };
    } else {
      cursorsHistory.push({ position: cursor, times: 1 });
    }
  };

  const checkIfCursorExists = (cursor) => {
    const foundPotentialLoopIndexElem = cursorsHistory.find(
      ({ position }) => position === cursor
    );

    return (
      foundPotentialLoopIndexElem && foundPotentialLoopIndexElem.times >= 1
    );
  };

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

  lineReader.on("line", (line) => {
    const [_, command, digit] = line.match(/^(\w+) ((-|\+)\d+)/);

    commands.push({ command, digit });
  });

  lineReader.on("close", () => {
    while (true) {
      const { command, digit } = commands[cursor];

      if (checkIfCursorExists(cursor)) {
        break;
      }

      pushCursorToHistory(cursor);

      commandsMapping[command](digit);
    }

    console.log("Result is: ", result);
  });
};

generateResult();
