#!/usr/bin/env node

"use strict"

/////// ran "chmod +x word-search.js" from TERMINAL for direct execution ///////
//////////////// EXECUTE with "./word-search.js (search term)`" ////////////////

// Start with a createReadStream and use the event-stream module's split and map 
//methods to manipulate the stream.
////////////////////////////////// READ STREAM //////////////////////////////////

const [, , ...argWord] = process.argv                               // grabs our argument from the command line and assigns it to argWord[0]
const limitTen = require("./limit-ten")                             // refers to our limit-ten.js which houses our "limitTenTransform" function

const { createReadStream } = require("fs")
const readStream = createReadStream("/usr/share/dict/words")     // fs required above, createReadStream is method within
// console.log("rea", readStream);

const { split, map } = require("event-stream")
readStream.pipe(split())                                            // Break up a stream and reassemble it so that each line is a chunk
  .pipe(map((data, cb) => {                                         // creates a through stream form async function
    if(data.toString().toLowerCase().startsWith(argWord[0].toLowerCase())) {
      cb(null, data)                                                // callback returns the lowercased data we checked for .startsWith
    } else{
      cb()                                                          // callback returns nothing here
    }
  }))

  .pipe(limitTen)                                                   // mapped callback data piped to "limitTenTransform"...
  .pipe(process.stdout)                                             // ...and back through process.stdout  - Voila!
