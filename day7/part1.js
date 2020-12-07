const { lineReaderConstructor } = require("../utils/file");

const generateResult = async () => {
  const lineReader = lineReaderConstructor(`${__dirname}/input.txt`);

  const bagsObj = {};

  const colorsContainGold = new Set();

  function getAllColors(color) {
    colorsContainGold.add(color);

    if (!bagsObj[color]) {
      return;
    }

    const colors = bagsObj[color];
    colors.forEach((color) => getAllColors(color));
  }

  lineReader.on("line", (line) => {
    const [_, bagColorContains] = line.match(/^(\w+ \w+) .+ contain /);

    const result = line.match(/(\d \w+ \w+ bag)/g);
    result &&
      result.forEach((bb) => {
        const [_, color] = bb.match(/\d (\w+ \w+) bag(|s)/);

        bagsObj[color] = [...(bagsObj[color] || []), bagColorContains];
      });
  });

  lineReader.on("close", () => {
    const colors = bagsObj["shiny gold"];

    colors.forEach((color) => {
      getAllColors(color);
    });

    console.log("Result is: ", colorsContainGold.size);
  });
};

generateResult();
