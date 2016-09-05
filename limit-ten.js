#!/usr/bin/env node

"use strict"

// You will also create your own `Transform` stream as a module called
// `limit-ten.js`. This `Transform` should be a limiter before finally `pipe`ing
// the results to stdout.

/////////////////////////////// TRANSFORM STREAM ///////////////////////////////

const { Transform } = require("stream")

// setup counter for if/else below
let counter = 0
const limitTenTransform = Transform()


limitTenTransform._transform = (buffer, _, cb) => {
  // if counter is under 10...
  if (counter < 10) {
    // ...add buffered word...
    cb(null, `${buffer.toString()}\n`)
    // ...and increment counter 
    counter++

  } else {
    // callback returns nothing here
    cb()
  }
}


module.exports = limitTenTransform
