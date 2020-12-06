const { lineReaderConstructor } = require("../utils/file");

const pathMapping = [
  {
    letter: "F",
    position: "lower",
  },
  {
    letter: "B",
    position: "upper",
  },
  {
    letter: "L",
    position: "lower",
  },
  {
    letter: "R",
    position: "upper",
  },
];

const allRows = Array.from(Array(128).keys());
const allColumns = Array.from(Array(8).keys());

const generateResult = async () => {
  const seatIDs = [];

  const lineReader = lineReaderConstructor(`${__dirname}/input.txt`);

  lineReader.on("line", (line) => {
    let startIndex = 0;
    let endIndex = allRows.length - 1;
    let seatID;

    for (let i = 0; i < 7; i++) {
      const middleIndex = Math.floor((startIndex + endIndex) / 2);

      const { position } = pathMapping.find(({ letter }) => letter === line[i]);

      if (position === "lower") {
        endIndex = middleIndex - 1;
      }

      if (position === "upper") {
        startIndex = middleIndex + 1;
      }
    }

    seatID = allRows[startIndex] * 8;

    startIndex = 0;
    endIndex = allColumns.length - 1;

    for (let i = 7; i < 7 + 3; i++) {
      const middleIndex = Math.floor((startIndex + endIndex) / 2);

      const { position } = pathMapping.find(({ letter }) => letter === line[i]);

      if (position === "lower") {
        endIndex = middleIndex - 1;
      }

      if (position === "upper") {
        startIndex = middleIndex + 1;
      }
    }

    seatID += allColumns[startIndex];

    seatIDs.push(seatID);
  });

  lineReader.on("close", () => {
    const highestSeatID = Math.max(...seatIDs);
    const flightSeadIds = Array.from(Array(highestSeatID).keys());

    console.log("the highest seat ID: ", highestSeatID);

    console.log(
      "my seat is: ",
      Math.max(...flightSeadIds.filter((x) => !seatIDs.includes(x)))
    );
  });
};

generateResult();
