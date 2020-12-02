const { lineReaderConstructor } = require("../utils/file");

const generateResult = async () => {
  const lineReader = lineReaderConstructor(`${__dirname}/input.txt`);
  let correctPasswords = 0;

  lineReader.on("line", (line) => {
    const {
      groups: { min, max, letter, password },
    } = line.match(/^(?<min>\d+)-(?<max>\d+) (?<letter>\w): (?<password>\w*)$/);

    let exactLetters = 0;

    for (let i = 0; i < password.length; i++) {
      if (i > max) {
        break;
      }

      if (password[i] === letter && [min - 1, max - 1].includes(i)) {
        exactLetters++;
      }
    }

    if (exactLetters === 1) {
      correctPasswords++;
    }
  });

  lineReader.on("close", () => {
    console.log("correct passwords: ", correctPasswords);
  });
};

generateResult();
