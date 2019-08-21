const csvFilePath = './COBIDAS_MRI.csv'
const jsonFilePath = './COBIDAS_MRI.json'
const csv = require('csvtojson')
const fs = require('fs')

// This is the function in which you can clean up your attributes
function replacer(key, value) {
  // For example, not to include empty values
  if (value === "") {
    return undefined;
    // or whatever mapping you feel like. 'value' is a string variable so don't
    // use triple equal ===, which would check the type AND the value
  } else if (value == 42) {
    return "potato"
  }
  return value;
}

// The stuff to log when the file is written
function  writeFileLogging(err) {
  if (err) {
    console.log("An error occured while writing JSON Object to File.");
    return console.log(err);
  }
  console.log("JSON file has been saved.");
};


csv()
  // read file
  .fromFile(csvFilePath)
  // what to do with the file:
  .then((jsonObj) => {
    // stringify the JSON with the replacer function as defined previously
    const jsonContent = JSON.stringify(jsonObj, replacer, 2);

    // write the file, with some logging
    fs.writeFile(jsonFilePath, jsonContent, 'utf8', writeFileLogging)
  })
