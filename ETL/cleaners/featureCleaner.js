// Import the necessary modules
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const fs = require('fs');
const csv = require("csv-parser");
const Transform = require("stream").Transform;

// define the CSV cleaner class
class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }
  _transform(chunk, encoding, next) {
    // Clean and transform the data here
    // Example: Remove whitespace and filter out non-numeric characters
    // Write the cleaned data to the output stream
    // Call the callback function to proceed to the next chunk
    for (let key in chunk) {
      // Trims whitespace
      let trimKey = key.trim();
      chunk[trimKey] = chunk[key];
      if (key !== trimKey) {
        delete chunk[key];
      }
    }
    //remove id header dont need it
    delete chunk.id;
    // uses our csvStringifier to turn our chunk into a csv string
    chunk = csvStringifier.stringifyRecords([chunk]);
    this.push(chunk);
    next();
  }
}

// define the CSV stringifier for headers
const csvStringifier = createCsvStringifier({
  header: [
    { id: "product_id", title: "product_id" },
    { id: "feature", title: "feature" },
    { id: "value", title: "value" },
  ],
});

// define paths for the read and write streams
let readStream = fs.createReadStream("./data/features.csv");
let writeStream = fs.createWriteStream("./data/featuresClean.csv");

// create an instance of the CSV cleaner with writable object mode set to true
const transformer = new CSVCleaner({ writableObjectMode: true });

// write the header to the output CSV file
writeStream.write(csvStringifier.getHeaderString());

// pipe the read stream through the CSV parser, transformer, and write stream
readStream
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("Data cleaning finished.");
  });