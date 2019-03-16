//upload() creates copies of the uploaded image so the original isn't altered and can be displayed again in its original form
//need image to be a global variable so all functions can use it 
var uploadImage = null; //null so check can be made before filter is applied
var grayImage = null;
var rainbowImage = null;
var blurImage = null;
var redImage = null;
var hueImage = null;
var opacityImage = null;
var invStripeImage = null;
var canvas;

function upload(){
  canvas = document.getElementById("uploadCanvas");
  var fileInput = document.getElementById("findInput");
  uploadImage = new SimpleImage(fileInput);
  grayImage = new SimpleImage(fileInput);
  rainbowImage = new SimpleImage(fileInput);
  blurImage = new SimpleImage(fileInput);
  redImage = new SimpleImage(fileInput);
  hueImage = new SimpleImage(fileInput);
  opacityImage = new SimpleImage(fileInput);
  invStripeImage = new SimpleImage(fileInput);
  uploadImage.drawTo(canvas);
}

function imageIsLoaded(myImage){
  if(myImage == null || ! myImage.complete()) {
    alert("image not loaded");
    return;
  }
  else
    return true;
}

function doAllTheThings(){
  makeItGray();
  rainbow();
  makeBlurry();
  makeItRed();
  makeHue();
  makeOpacity();
  doStripe();
}

function grayFilter(){
  for (var pixel of grayImage.values()) {
    var average = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;  
    pixel.setRed(average);
    pixel.setGreen(average);
    pixel.setBlue(average);
  }
}

function makeItGray(){
  var grayCanvas = document.getElementById("grayCanvas"); //only accessed here so doesn't need to be global
  if(imageIsLoaded(grayImage)){ //check if image is loaded
    grayFilter(); //perform the grayscale work in other function
    grayImage.drawTo(grayCanvas); //display the image
  }
}

function redFilter(){
  for (var pixel of redImage.values()) {
    var average = (pixel.getRed() + pixel.getGreen() + pixel.getRed())/3;
    if(average < 128){
        pixel.setRed(average * 2);
        pixel.setGreen(0);
        pixel.setBlue(0);
    }
    else {
        pixel.setRed(255);
        pixel.setGreen((average * 2) - 255);
        pixel.setBlue((average * 2) - 255);
    }
  }
}

function makeItRed(){
  var redCanvas = document.getElementById("redCanvas");
  if(imageIsLoaded(redImage)){ 
    redFilter(); 
    redImage.drawTo(redCanvas); 
  }
}

function rainbowFilter(){
  var position = rainbowImage.getHeight()/7;
  
  for (var pixel of rainbowImage.values()) {
    var average = (pixel.getRed() + pixel.getGreen() + pixel.getRed())/3;
    
    //red
    if(pixel.getY() < position){ 
      if(average < 128){ 
          pixel.setRed(2 * average); 
          pixel.setGreen(0); 
          pixel.setBlue(0); 
     } 
     else { 
          pixel.setRed(255); 
          pixel.setGreen(2 * average - 255); 
          pixel.setBlue(2 * average - 255); 
     } 
    }
    
    //orange
    else if(pixel.getY() < 2 * position){ 
      if(average < 128){ 
          pixel.setRed(2 * average); 
          pixel.setGreen(0.8 * average); 
          pixel.setBlue(0); 
      } 
      else { 
          pixel.setRed(255); 
          pixel.setGreen(1.2 * average - 51); 
          pixel.setBlue(2 * average - 255); 
      } 
    }
    
    //yellow
    else if(pixel.getY() < 3 * position){ 
      if(average < 128){ 
          pixel.setRed(2 * average); 
          pixel.setGreen(2 * average); 
          pixel.setBlue(0); 
      } 
      else { 
          pixel.setRed(255); 
          pixel.setGreen(255); 
          pixel.setBlue(2 * average - 255); 
      } 
    }
    
    //green
    else if(pixel.getY() < 4 * position){ 
      if(average < 128){ 
          pixel.setRed(0); 
          pixel.setGreen(2 * average); 
          pixel.setBlue(0); 
      } 
      else { 
          pixel.setRed(2 * average - 255); 
          pixel.setGreen(255); 
          pixel.setBlue(2 * average - 255); 
      } 
    }
    
    //blue
    else if(pixel.getY() < 5 * position){ 
      if(average < 128){ 
          pixel.setRed(0); 
          pixel.setGreen(0); 
          pixel.setBlue(2 * average); 
      } 
      else { 
          pixel.setRed(2 * average - 255); 
          pixel.setGreen(2 * average - 255); 
          pixel.setBlue(255); 
      } 
    }
    
    //indigo
    else if(pixel.getY() < 6 * position){ 
      if(average < 128){ 
          pixel.setRed(0.8 * average); 
          pixel.setGreen(0); 
          pixel.setBlue(2 * average); 
      } 
      else { 
          pixel.setRed(1.2 * average - 51); 
          pixel.setGreen(2 * average - 255); 
          pixel.setBlue(255); 
      } 
    }
    
    //violet 
    else { 
      if(average < 128){ 
          pixel.setRed(1.6 * average); 
          pixel.setGreen(0); 
          pixel.setBlue(1.6 * average); 
      } 
      else { 
          pixel.setRed(0.4 * average + 153); 
          pixel.setGreen(2 * average - 255); 
          pixel.setBlue(0.4 * average + 153); 
      } 
    }
    
}
}


function rainbow(){
  var rainbowCanvas = document.getElementById("rainbowCanvas");
  if(imageIsLoaded(rainbowImage)){
    rainbowFilter();
    rainbowImage.drawTo(rainbowCanvas);
  }
}

function blurFilter(){
  for (var pixel of blurImage.values()) {
    if(Math.random() >= 0.85){ //approx. 1/4 the time 
      pixel.setRed(0);
      pixel.setGreen(0);
      pixel.setBlue(0);
    }
    
    if(Math.random() <= 0.15){ //approx. 1/4 the time 
      pixel.setRed(255);
      pixel.setGreen(255);
      pixel.setBlue(255);
    }
    
  }
}

function makeBlurry(){
  var blurCanvas = document.getElementById("blurCanvas");
  if(imageIsLoaded(blurImage)){ //check if image is loaded
    blurFilter(); //perform the grayscale work in other function
    blurImage.drawTo(blurCanvas); //display the image
  }
}

function makeHue(){
  var hueCanvas = document.getElementById("hueCanvas"); 
  if(imageIsLoaded(hueImage)){  
    hueImage.drawTo(hueCanvas); //display the image
  }
}

function makeOpacity(){
  var opacityCanvas = document.getElementById("opacityCanvas"); 
  if(imageIsLoaded(opacityImage)){  
    opacityImage.drawTo(opacityCanvas); 
  }
}

function doStripe(){
  var iRainbowCanvas = document.getElementById("iRainbowCanvas");
  if (imageIsLoaded(invStripeImage)) {
    filterStripe();
    invStripeImage.drawTo(iRainbowCanvas);
  }
}

function filterStripe() {
  var width = invStripeImage.getWidth();
  var stripe = invStripeImage.getWidth()/5;

  for (var pixel of invStripeImage.values()){
    var x = pixel.getX();
    var y = pixel.getY();

    if (x < stripe || x >= width - stripe){
        pixel.setRed(255 - pixel.getRed());
    }
    else if ((x >= stripe && x < 2 * stripe) || (x > width - 2 * stripe && x <= width - stripe)){
        pixel.setGreen(255 - pixel.getGreen());
    }
    else {
        pixel.setBlue(255 - pixel.getBlue());
    }   
  }
}


//used to reset the images
function reset(){
  if(imageIsLoaded(uploadImage)){ //if the original image is uploaded
    uploadImage.drawTo(canvas); //draw it to the canvas
    grayImage = new SimpleImage(uploadImage); //then set the other images back to it
    rainbowImage = new SimpleImage(uploadImage);
    blurImage = new SimpleImage(uploadImage);
    redImage = new SimpleImage(uploadImage);
  }
}