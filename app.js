var asciify = require('asciify-image');
var NodeWebcam = require("node-webcam");

var options = {
  fit:    'box',
  width:  process.stdout.columns,
  height: process.stdout.rows - 4,
  color:  true
}

var opts = {
  callbackReturn: "buffer",
  width: options.width,
  height: options.height,
  quality: 0,
  frames: 3,
  saveShots: true
};


setInterval(function() {
  const precapturetime = performance.now();
  NodeWebcam.capture( "test_picture", opts, function( err, data ) {
    const postcapturetime = performance.now();
    asciify(data, options, function (err, asciified) {
      const postasciifytime = performance.now();
      if (err) throw err;
      
      console.clear();
      // Print to console
      // console.log(asciified);
      process.stdout.write(asciified);
      process.stdout.write('\n');
      console.log("Capture time: " + (postcapturetime - precapturetime) + "ms");
      console.log("Asciify time: " + (postasciifytime - postcapturetime) + "ms");
      console.log("Log time: " + (performance.now() - postasciifytime) + "ms");
    });
  });
}, 1000/3);