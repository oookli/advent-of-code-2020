const { readSymbol, open } = require("../utils/file");

const startPosition = 0;
const fileLineLength = 32;

const getSymbolFromFile = async (fileDescriptor, x, y) => {
  const pointer = y * fileLineLength + (x + 1);
  const symbol = await readSymbol(fileDescriptor, pointer - 1);

  return symbol;
};

const generateResult = async (pointerPath) => {
  const fileDescriptor = await open(`${__dirname}/input.txt`);

  async function* asyncReadSymbolPathGenerator() {
    let pointerX = startPosition;
    let pointerY = 0;

    while (true) {
      const symbol = await getSymbolFromFile(
        fileDescriptor,
        pointerX,
        pointerY
      );

      if (![".", "#", "\n"].includes(symbol)) {
        return;
      }

      if ([".", "#"].includes(symbol)) {
        yield symbol;
      }

      pointerPath.forEach(({ direction, cells }) => {
        if (direction === "down") {
          pointerY = pointerY + cells;
        }
        if (direction === "right") {
          pointerX = (pointerX + cells) % (fileLineLength - 1);
        }
      });
    }
  }

  let treesCount = 0;

  for await (let symbol of asyncReadSymbolPathGenerator()) {
    if (symbol === "#") {
      treesCount++;
    }
  }

  return treesCount;
};

(async function () {
  const pointerPaths = [
    [
      { direction: "right", cells: 1 },
      { direction: "down", cells: 1 },
    ],
    [
      { direction: "right", cells: 3 },
      { direction: "down", cells: 1 },
    ],
    [
      { direction: "right", cells: 5 },
      { direction: "down", cells: 1 },
    ],
    [
      { direction: "right", cells: 7 },
      { direction: "down", cells: 1 },
    ],
    [
      { direction: "right", cells: 1 },
      { direction: "down", cells: 2 },
    ],
  ];

  const resultPromises = pointerPaths.map((pointerPath) =>
    generateResult(pointerPath)
  );

  const results = await Promise.all(resultPromises);

  console.log(
    "Result is: ",
    results.reduce((multiplyResult, cur) => multiplyResult * cur, 1)
  );
})();
