const fs = require("fs");
const readline = require("readline");
const util = require("util");

const readFile = (filePath) => util.promisify(fs.readFile)(filePath, "utf8");
const open = (filePath) => util.promisify(fs.open)(filePath);
const read = util.promisify(fs.read);

const file = {
  readFile,
  open,
  readFileAsArray: async (filePath) => {
    const data = await readFile(filePath);

    return data.replace(/\n$/, "").split("\n");
  },
  lineReaderConstructor: (filePath) =>
    readline.createInterface({
      input: fs.createReadStream(filePath),
    }),
  readSymbol: async (fileDescriptor, pointerPosition = 0) => {
    const buffer = Buffer.alloc(1);

    const { buffer: readBuffer } = await read(
      fileDescriptor,
      buffer,
      0,
      buffer.length,
      pointerPosition
    );

    return readBuffer.toString();
  },
};

module.exports = file;
