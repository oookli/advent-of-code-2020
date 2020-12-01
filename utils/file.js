const fs = require("fs");
const util = require("util");

const readFile = (filePath) => util.promisify(fs.readFile)(filePath, "utf8");

const file = {
  readFile,
  readFileAsArray: async (filePath) => {
    const data = await readFile(filePath);

    return data.replace(/\n$/, "").split("\n");
  },
};

module.exports = file;
