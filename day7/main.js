const { lineReaderConstructor } = require("../utils/file");

const generateResult = async () => {
  const lineReader = lineReaderConstructor(`${__dirname}/input.txt`);

  const bagsObj = {};

  lineReader.on("line", (line) => {
    const [_, bagColorContains] = line.match(/^(\w+ \w+) .+ contain /);

    const result = line.match(/(\d \w+ \w+ bag)/g);
    result &&
      result.forEach((bb) => {
        const [_, count, color] = bb.match(/(\d) (\w+ \w+) bag(|s)/);

        bagsObj[bagColorContains] = [
          ...(bagsObj[bagColorContains] || []),
          { count: Number(count), color },
        ];
      });
  });

  lineReader.on("close", () => {
    function countColors(color) {
      const rule = bagsObj[color];
      console.log(color);
      console.log(rule);

      if (!rule) {
        return 1;
      }

      const count = rule.reduce(
        (acc, cur) => acc + cur.count * countColors(cur.color),
        0
      );

      return count + 1;
    }

    console.log("Result is: ", countColors("shiny gold") - 1);
  });
};

generateResult();
