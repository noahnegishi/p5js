let video;
let classifier;
let label = "Staying safe...?";
let modelURL = 'https://teachablemachine.withgoogle.com/models/aweGfWmUc/';

function preload() {
 classifier = ml5.imageClassifier (modelURL + 'model.json');
}

function setup() {
  createCanvas(640, 520);
  video = createCapture(VIDEO);
  video.hide();
  classifyVideo();
}

function classifyVideo() {
  classifier.classify(video, gotResult);
}

function draw() {
background(0);
image(video, 0, 0);
  
  textSize(32);
  textAlign(CENTER,CENTER);
  fill (255)
  text (label,width/2, height-16);
  
  let message = "Staying safe?";
  if (label == "Mask On") {
    fill(255)
    message = "NOT A RISK";
  } else if (label == "No Mask") {
    fill(255,255,0)
    message = "⚠️DANGER⚠️";
  }
  
  textSize (56);
  text(message, width/2, height/2);
}

function gotResult(error, result) {
  if (error) {
    console.error(error);
    return;
  }
  label = result[0].label;
  //console.log();
  classifyVideo();
}