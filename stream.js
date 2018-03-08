"use strict";
const { createReadStream, createWriteStream, appendFile, writeFile } = require('fs');

const fileArg = process.argv[2];
const { Transform, Writable } = require('stream');
const upperCase = Transform();
const writeStream = Writable();

upperCase._transform = (buffer, _, cb) => {
    cb(null, buffer.toString().toUpperCase());
}

writeStream._write = (buffer, _, next) => {
    writeFile(fileArg, buffer, (err) => {
        if (err) throw err;
        process.stdout.write('The data has been added\n');
    });
    next();
};

createReadStream("languages.json")
    .pipe(upperCase)
    .pipe(writeStream);