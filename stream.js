"use strict";
const { createReadStream, createWriteStream, appendFile, writeFile } = require('fs');

const fileArg = process.argv[2];
const { Transform, Writable } = require('stream');
const upperCase = Transform();
const writeStream = Writable();

upperCase._transform = (buffer, _, callback) => {
    callback(null, buffer.toString().toUpperCase());
}

writeStream._write = (buffer, _, next) => {
    writeFile(fileArg, buffer, (err) => {
        if (err) throw err;
        console.log("Data Added!")
    });
    next();
};

createReadStream("languages.json")
.pipe(upperCase)
.pipe(writeStream);