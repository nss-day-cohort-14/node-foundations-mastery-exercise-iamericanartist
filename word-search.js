#!/usr/bin/env node

"use strict"

/////// ran "chmod +x word-search.js" from TERMINAL for direct execution ///////
//////////////// EXECUTE with "./word-search.js (search term)`" ////////////////

// Start with a createReadStream and use the event-stream module's split and map 
//methods to manipulate the stream.
////////////////////////////////// READ STREAM //////////////////////////////////

// grabs our argument from the command line and assigns it to argWord[0]
const [, , ...argWord] = process.argv

// refers to our limit-ten.js which houses our "limitTenTransform" function
const limitTen = require("./limit-ten")

// fs required & createReadStream is method within
const { createReadStream } = require("fs")
const readStream = createReadStream("/usr/share/dict/words")

const { split, map } = require("event-stream")

// Break up a stream and reassemble it so that each line is a chunk
readStream.pipe(split())

  // creates a through stream form async function
  .pipe(map((data, cb) => {
    // toLowerCase() results and arguments here for comparison only 
    if(data.toString().toLowerCase().startsWith(argWord[0].toLowerCase())) {
    // callback returns the lowercased data we checked for with startsWith()
      cb(null, data)

    } else{
      // callback returns nothing here
      cb()
    }
  }))

  // mapped callback data piped to "limitTenTransform"...
  .pipe(limitTen)

  // ...and back through process.stdout  - Voila!
  .pipe(process.stdout)
  process.stdout.write(`Words starting with ${argWord}:\n`)
