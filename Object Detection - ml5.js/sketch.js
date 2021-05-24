let input;
let img;
let detector;

function preload() { //load model before anything happens
  detector = ml5.objectDetector('cocossd');
  document.getElementById("result").innerHTML = "Model Loaded. Choose an image to continue.";
}

function setup() { // create file input to load image
  input = createFileInput(handleFile);
  input.position(360,750);
  input.style('font-size', '30px');
  button = createButton('Predict');
  button.position(1000,750);
  button.style('font-size', '30px');
  input.style('color', 'white');
  button.style('border-radius', '25%');
  button.mousePressed(detectImage);
}

function draw() { // create canvas to place image on
  createCanvas(1500,500);
  background(255);
  if (img) {
    image(img, 350,0, 750, height);
    img.center();
  }
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
	document.getElementById("result").innerHTML = "Please use an image file.";
    img = null;
	
  }
  document.getElementById("result").innerHTML = "Click on Predict.";
}

function detectImage() {
  detector.detect(img, function(error,results) {
	let object;
    if(error){
         console.error(error);
       }
     for(let i = 0; i<results.length; i++){
       object = results[i];
       stroke(0,255,0);
       strokeWeight(4);
       noFill();
       rect(object.x+350,object.y,object.width,object.height);
       noStroke();
       fill(255);
       textSize(34);
       text(object.label,object.x+350,object.y);
	   break;
     }
	 detectImage();
	 document.getElementById("result").innerHTML = "The image contains a " + object["label"];
	 document.getElementsByTagName("input")[0].style.display = "none";
	 document.getElementsByTagName("button")[0].style.display = "block";
	 document.getElementsByTagName("button")[1].style.display = "none";
  });
}

function reloadPage(){
	console.log("Reload Page");
	location.reload();
}