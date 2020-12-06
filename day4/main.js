const { lineReaderConstructor } = require("../utils/file");

const validTypes = [
  {
    type: "ecl",
    isValid(value) {
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value);
    },
  },
  {
    type: "pid",
    isValid(value) {
      return /^\d{9}$/.test(value);
    },
  },
  {
    type: "eyr",
    isValid(value) {
      const year = Number(value);

      return /^\d{4}/.test(value) && year >= 2020 && year <= 2030;
    },
  },
  {
    type: "hcl",
    isValid(value) {
      return /^#[0-9a-fA-F]{6}$/.test(value);
    },
  },
  {
    type: "byr",
    isValid(value) {
      const year = Number(value);

      return /^\d{4}/.test(value) && year >= 1920 && year <= 2002;
    },
  },
  {
    type: "iyr",
    isValid(value) {
      const year = Number(value);

      return /^\d{4}/.test(value) && year >= 2010 && year <= 2020;
    },
  },
  {
    type: "hgt",
    isValid(value) {
      const [_, numberStr, type] = value.match(/(\d+)(cm|in)/) || [];
      const number = Number(numberStr);

      if (type === "cm" && number >= 150 && number <= 193) {
        return true;
      }

      if (type === "in" && number >= 59 && number <= 76) {
        return true;
      }

      return false;
    },
  },
];

const optionalTypes = ["cid"];

const generateResult = async () => {
  const lineReader = lineReaderConstructor(`${__dirname}/input.txt`);
  let correctPassports = 0;

  let passportInfoArray = [];

  const checkValid = () =>
    validTypes.every(({ type }) => passportInfoArray.includes(type));

  lineReader.on("line", (line) => {
    if (line.length === 0) {
      checkValid() && correctPassports++;

      passportInfoArray = [];

      return;
    }

    const temp = line.match(/(\w{3}):(\W*\w+)/g).reduce((result, str) => {
      const [_, type, value] = str.match(/(\w{3}):(\W*\w+)/);

      const validTypeObj = validTypes.find((entity) => entity.type === type);

      return validTypeObj && validTypeObj.isValid(value)
        ? result.concat(type)
        : result;
    }, []);

    passportInfoArray = passportInfoArray.concat(temp);
  });

  lineReader.on("close", () => {
    checkValid() && correctPassports++;

    console.log("correct passports: ", correctPassports);
  });
};

generateResult();
