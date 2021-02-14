const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'Temp/' });
const fs = require('fs');
const path = require('path');
//import * as tf from '@tensorflow/tfjs-node';
//require('@mapbox/node-pre-gyp').find;
const tf = require('@tensorflow/tfjs');
const tfm = require("@tensorflow/tfjs-node");
const handler = tfm.io.fileSystem("C:/Users/zhang/Desktop/TreeHacks/model.json");
const model = tf.loadLayersModel(handler);

//const model = require('../model.json')
/*
const { Image } = require('image-js');
async function getImage() {
    let image = await Image.load('/path/to/image.jpg');
    return image;
}
*/
router.put('/upload', upload.array('photos', 10), function (req, res, next) {
console.log("hello");

  var uploadedPics = [];
  req.files.forEach(function(file){
      uploadedPics.push(path.join(__dirname, "..", "Temp", file.filename));
  });
  console.log(uploadedPics);


  model.then(function(res){
    //const base64Test = base64_encode(uploadedPics[0]);
    //const b = Buffer.from(base64Test, 'base64')
     // get the tensor
    const t = tfm.node.decodeImage(fs.readFileSync(uploadedPics[0]));

    //const ta = tf.reshape(t,[1,1024,1666,4]);
    var ta = t.resizeNearestNeighbor([224,224]).toFloat();
	  let offset = tf.scalar(127.5);
    ta = ta.sub(offset).div(offset).expandDims();
    console.log(ta);
    //console.log(Object.keys(model));
    const prediction = res.predict(ta.reshape([1,224,224,3]));
    //prediction = prediction.reshape(1, prediction);
    //console.log(prediction.shape);
  }, function(err){
    console.log(err);
  });
  //console.log(hello)






  /*const im = new Image();
  var fr = new FileReader();
  fr.onload = function () {
      im.src = fr.result;
  }
  fr.readAsDataURL(uploadedPics[0]);
  im.onload = () => {
    const a = tf.browser.fromPixels(im)
  }
  const output = model.predict(example);
  console.log(output);
/*
  //run pics through model - save each output for json output
  for (int i = 0; i < uploadedPics.length; i++){

  }
*/

/*
  const test = loadLocalImage();
  const example = tf.browser.fromPixels(test);

  */


});
/*

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

*/




/*
async function loadLocalImage(filename) {
    return new Promise((res,rej)=>{
    imageGet(filename, (err, info) => {
      if(err){
         rej(err);
         return;
      }
      const image = tf.fromPixels(info.data);
      console.log(image, '127');
      res(image);
    });
  });
};
*/


router.get('/test', function(req,res,next){
  res.send(JSON.stringify({ErrorType : "Mel REPLACE HERE"}))

})

module.exports = router;
