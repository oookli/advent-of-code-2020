const fs = require("fs");
const readline = require("readline");
const util = require("util");

const readFile = (filePath) => util.promisify(fs.readFile)(filePath, "utf8");

const file = {
  readFile,
  readFileAsArray: async (filePath) => {
    const data = await readFile(filePath);

    return data.replace(/\n$/, "").split("\n");
  },
  lineReaderConstructor: (filePath) =>
    readline.createInterface({
      input: fs.createReadStream(filePath),
    }),
};

module.exports = file;
