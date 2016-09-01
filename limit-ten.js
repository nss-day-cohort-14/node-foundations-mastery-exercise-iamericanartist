#!/usr/bin/env node

"use strict";

// You will also create your own `Transform` stream as a module called
// `limit-ten.js`. This `Transform` should be a limiter before finally `pipe`ing
// the results to stdout.

/////////////////////////////// TRANSFORM STREAM ///////////////////////////////

const { Transform } = require("stream")

console.log("limit 10");
let counter = 0                                         // setup counter for if/else below
const limitTenTransform = Transform()

transformStream._transform = (buffer, _, cb) => {
  if (counter < 10) {                                   // if counter is under 10 add buffered word...
    cb(null, `${buffer.toString().toLowerCase()}`)      // ...then .toLowerCase() word added from buffer...
    counter++                                           // ...and increment counter 
  } else {
    cb()                                                // callback returns nothing here
  }
}

module.exports = limitTenTransform
