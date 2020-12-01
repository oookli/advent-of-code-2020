const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

const readFile
const data = await readFile("./input.txt", "utf8");
