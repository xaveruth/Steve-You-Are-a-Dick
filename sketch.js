//***********************************************************************************************
// TODO LIST
// 1. get the crossover thing working
// 2. code the rest of the melodies
// 3. decrease frame rate to improve performance?
// 4. add more functinoality to the button
// 5. sync the track
// 6. (SOLVED - set up button in setup, only call playVideo function if button is pressed) start it with a button
// 7. load interactive sounds
// 8. format the lyrics properly
// 9. get the lyrics fading with the fill
// 10. only introduce the lyric the first time it's played? (video only, not for interactive)
// 11. move variable declarations to a separate file?
// 12. (SOLVED - added variable 'startAheadBy') how to start from a specific place?
// 13. fix apostrophes in lyrics
// 14. make melodies into objects?  
// 15. create a slider for song volume
//***********************************************************************************************


//geometric note parameters
var whiteNoteWidth = 30;
var noteRatio = 5;
var noteHeight = whiteNoteWidth * noteRatio;

//starting x-y coord on the canvas
var startingX = 150;
var startingY = 250;


var numOfKeys = 41;
var keys = [];
var lyrics = [null,null,null,null,'I',null,'d\ne\ns\np\ni\ns\ne','h\na\nt\ne',null,'l\no\na\nt\nh\ne',
            null,'s\nu\nc\nh','a\nn\nd',null,'m\na\ny\nb\ne','h\na\nn\nd\ns\no\nm\ne','d\ni\nc\nk',
            't\nh\ne','p\nh\no\nn\ny','a',null,'a\nr\ne','s\nu\nc\nk','y\no\nu','s\no','I\nm',
            'n\no\no\nn\ne\ns','n\ni\nc\ne','S\nt\ne\nv\ne','i\nt\ns','t\nh\na\nt','m\na\nk\ne',
            null,'m\ne',null,'s\ni\nc\nk',null,null,null,'s\nt\nu\np\ni\nd','j\ne\nr\nk'];

//timing variables
var bpm = 108;
var startingTime = 0;
var spacing = 112; //why? 7 bars * 4 beats * 4 sixteenth notes = 112
var startAheadBy = 0;
var t = 0;
var delay = 2000;

//button variables
var buttonState = false;



var codes = [1, 4, 3, 4, 2, 1, 4, 3, 4, 3, 4, 2, 1, 4, 3, 4, 2, 1, 4, 3, 4, 3, 4, 2, 1, 4, 
            3, 4, 2, 1, 4, 3, 4, 3, 4, 2, 1, 4, 3, 4, 2];
var gaps = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9, 10, 10, 11, 11, 12, 12, 13, 
            14, 14, 15, 15, 16, 17, 17, 18, 18, 19, 19, 20, 21, 21, 22, 22, 23];
            
//TODO: put each melody into a single, multi-dimensional array?
var m1Beats = [4,4,4,4,8,4,2,2,4,4,4,4,4,4,4,4,4,2,2,4,4,8,4,4,16];
var m1Fills = [28,23,21,19,16,null,11,19,18,18,15,15,16,23,21,24,27,30,23,31,33,35,11,19,16];
var m1Cum = [];

//EXTRA BASS BETWEEN M1 AND M2
var extraBassBeats = [8,4,4,8,4,4];
var extraBassFills = [4,7,23,4,7,23];
var extraBassCum = [];

//MELODY TWO: BASSLINE
var m2Beats = [8,4,4,8,4,4,8,4,4,8,4,4,8,8,8,24];
/*var m2Lyrics = ['I','hate','you','I','hate','you','despise','despise','you','I','loathe',
                'and','despise','despise','you'];*/
var m2Fills = [4,7,23,4,7,23,6,6,23,4,9,12,6,6,23,null];
var m2Cum = [];

//EXTRA: "SUCH A DICK"
var suchADBeats = [20,2,2,4];
var suchADFills = [null,11,19,16];
var suchADCum = [];

//MELODY THREE: FIRST COUNTERMELODY
var m3Beats = [8,8,4,12,4,4,4,4,20,4,4,4,8,24];
var m3Fills = [28,23,21,11,11,19,18,18,16,26,26,30,27,null];
var m3Cum = [];

//MELODY FOUR: SECOND COUNTERMELODY
var m4Beats = [4,8,4,8,8,8,8,8,4,4,8,8,8,24];
var m4Fills = [23,31,33,35,23,15,15,16,23,31,33,24,35,null];
var m4Cum = [];

//TO CODE: MIDDLE SECTION

//TO CODE: THIRD SECTION INTRO

//THIRD SECTION ONE: DICK DICK DICK
var ts1Beats = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];
var ts1Fills = [16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,23,22,23,22,23,22,23,22,28,28,28,23,16,16,23,16,15,15,18,18,16,23,23,23,22,23,22,23,22,23,21,19,16,16,16,16,16,16,16,16,];
var ts1Cum = [];

//THIRD SECTION TWO: BASS
var ts2Beats = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];
var ts2Fills = [4,7,23,4,7,23,4,7,4,7,23,4,7,23,4,7,6,6,23,6,6,23,6,6,4,7,23,4,9,23,12,4,6,6,12,4,9,12,6,6,23,6,6,23,6,6,23,28,4,7,23,4,7,23,4,7];
var ts2Cum = [];

//THIRD SECTION THREE: MAKE ME SICK MAKE ME SICK
//I THINK I NEED TO WRITE THIS DOWN
//var ts3Beats = [2,1,1,2,1,1,2,1,1,1,1,2,2,1,1,2,1,1,2,1,1,1,1,2,2,1,1,2,2,2,1,1,1,1,2,2,1,1,2,2,1,1,1,1,2,2,1,1,2,1,1,2,2,1,1,1,1,2,

//this is a native JS function that runs in the background BEFORE setup
//but it should only be used for things like loading files
function preload() {
  //song = loadSound("3seconds.mp3");
}

//setup runs BEFORE draw
function setup() {
  	
  	//youTube aspect ratio is 16:9
  	//var scale = 70;
  	pixelDensity(3); //higher numbers mean lower res?
  	createCanvas(windowWidth, windowHeight);
  	colorMode(RGB);

    keyboardSetup();

    //build the cumulative arrays for each voice
	  buildCumulativeArray(m1Beats, m1Cum);
	  buildCumulativeArray(extraBassBeats, extraBassCum);
	  buildCumulativeArray(m2Beats, m2Cum);
	  buildCumulativeArray(suchADBeats, suchADCum);
	  buildCumulativeArray(m3Beats, m3Cum);
	  buildCumulativeArray(m4Beats, m4Cum);
    buildCumulativeArray(ts1Beats, ts1Cum);
    buildCumulativeArray(ts2Beats, ts2Cum);

    //song.play();
    
 
}

function keyboardSetup() {

  //create a button to play the video
  if (buttonState === false) button = createButton('Play Video');
  else if (buttonState === true) button = createButton('Stop Video');
  button.position(0.9 * width, 0.9 * height);

  //initialize and draw key objects
  for (var i = 0; i < numOfKeys; i++) { 
    keys[i] = new Key(startingX + (gaps[i] * whiteNoteWidth), startingY, codes[i], i);
    keys[i].display();
  } 

}

function mouseClicked() {
  //for (var i = 0; i < numOfKeys; i++) {

}

function draw() {
  //clear();

  button.mousePressed(checkButton);

  //if button is pressed, play the video!
  button.mousePressed(getStartingTime);
  if (buttonState === true) { 
    playVideo();
  }


  else if (buttonState === false) {
    //clear();
    //setup();
  }


}

function checkButton() {
  if (buttonState === true) buttonState = false;
  else if (buttonState === false) buttonState = true;

  if (buttonState === true) { 
    getStartingTime();
    button.html('Stop Video');
  }

  else if (buttonState === false) {
    button.html('Play Video');
    clear();
    keyboardSetup();  
  }

}

function getStartingTime() {

  t = millis();
/*
  if (buttonPressed === true) {
    buttonPressed = false;
    button.html('Play Video');
  }

  else if (buttonPressed === false) {
    buttonPressed = true;
    button.html('Stop Video');
  }
  */
}


function getTime(startingTime) {
  var m = millis() - startingTime;
  return m;
}

	  
function playVideo() {

  //colours
  var w = color(0,0,0,0); //blank
  var r = color(255,0,0,255); //red - goes with main melody
  var g = color(0,255,0,255); //green - goes with bass
  var b = color(0,50,200,255); //blue - goes with first countermelody
  var y = color(200,200,0,255); //yellow - goes with second countermelody
  var p = color(128,0,128,255); //purple - goes with "dick dick dick"
 
  //set up number of beats that have elapsed since button was pressed based on cumulative milliseconds and bpm
  var numBeats = floor(getTime(t) * bpm / 15000) + startAheadBy;
  var numBeatsDec = getTime(t) * bpm / 15000 + startAheadBy;

  //first time through
  playMelody(startingTime, numBeats, numBeatsDec, m1Cum, m1Fills, m1Beats, r);

  //bass intro
  playMelody(startingTime + spacing, numBeats, numBeatsDec, extraBassCum, extraBassFills, extraBassBeats, g);
  
  //second time through
  playMelody(startingTime + 32 + spacing, numBeats, numBeatsDec, m1Cum, m1Fills, m1Beats, r);
  playMelody(startingTime + 32 + spacing, numBeats, numBeatsDec, m2Cum, m2Fills, m2Beats, g);
  playMelody(startingTime + 32 + spacing, numBeats, numBeatsDec, suchADCum, suchADFills, suchADBeats, b);
  
  //third time through
  playMelody(startingTime + 32 + spacing * 2, numBeats, numBeatsDec, m1Cum, m1Fills, m1Beats, r);
  playMelody(startingTime + 32 + spacing * 2, numBeats, numBeatsDec, m2Cum, m2Fills, m2Beats, g);
  playMelody(startingTime + 32 + spacing * 2, numBeats, numBeatsDec, m3Cum, m3Fills, m3Beats, b);
  
  //fourth time through
  playMelody(startingTime + 32 + spacing * 3, numBeats, numBeatsDec, m1Cum, m1Fills, m1Beats, r);
  playMelody(startingTime + 32 + spacing * 3, numBeats, numBeatsDec, m2Cum, m2Fills, m2Beats, g);
  playMelody(startingTime + 32 + spacing * 3, numBeats, numBeatsDec, m3Cum, m3Fills, m3Beats, b);
  playMelody(startingTime + 32 + spacing * 3, numBeats, numBeatsDec, m4Cum, m4Fills, m4Beats, y);

  //third section - first iteration
  playMelody(1000, numBeats, numBeatsDec, m1Cum, m1Fills, m1Beats, r);
  playMelody(1000, numBeats, numBeatsDec, ts1Cum, ts1Fills, ts1Beats, p);
  playMelody(1000, numBeats, numBeatsDec, ts2Cum, ts2Fills, ts2Beats, g);

}



function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
}

//create cumulative arrays to advance time through
function buildCumulativeArray(beatsArray, cumArray) {
	for (i = 0; i < beatsArray.length; i++) {
	  cumArray[i] = 0;
	  for (var j = 0; j <= i; j++) {
      cumArray[i] += beatsArray[j];
	  }
	}
}

function playMelody(startingTime, numBeats, numBeatsDec, cumArray, fillsArray, beatsArray, col) {
    
    /******************************************************
     * FUNCTION THAT PLAYS MELODIES
     * index variable keeps track of where you are in the 
     * cumArray - which keeps track of cumulative number
     * of beats in that melody
     * ****************************************************/
    
    //TODO: IF IT'S NOT THE FIRST ONE IN ARRAY, CHANGE previous ONE BACK TO DEFAULT COLOR
    //COROLLARY: ASSIGN A DEFAULT COLOR
    
    
    
    //case 1: between startingTime and first 
    var index = -1;
    if (numBeats >= startingTime && numBeats < startingTime + cumArray[0]) {
      index = 0;
    }
    
    //case 2: somewhere in the array
    for (i = 0; i < fillsArray.length; i++) {
      if (numBeats >= startingTime + cumArray[i] && numBeats < startingTime + cumArray[i + 1]) {
        index = i + 1;
      }
    }
    
    //fill in the proper key
    if (index >= 0 && fillsArray[index] !== null) {
      keys[fillsArray[index]].fillKey(col, startingTime, numBeats, numBeatsDec, cumArray[index], beatsArray[index]);
    }

    //clear the previous key
    if (index >= 1 && fillsArray[index - 1] !== null) {
      keys[fillsArray[index - 1]].fillKey(keys[fillsArray[index - 1]].col, startingTime, numBeats, numBeatsDec, cumArray[index], beatsArray[index]);
    }
    
    //TODO: clear the LAST key
    // if (index == fillsArray.length && less than 0.2 seconds left or something

    /*
    else {
      keys[fillsArray[index]].active = 0;
    }
      */
      
}
    

//this is working but it's just really laggy so it only works like every 5 clicks that you try???
//SOLVED: not redrawing the whole thing constantly fixes this problem, as expected 
//(i.e. putting the draw loop in setup instead of draw)
//however, this messes up the video - keys don't revert to white/black - gotta fix
function mouseClicked() {

  for (var i = 0; i < numOfKeys; i++) {

    if (keys[i].isClicked(mouseX, mouseY) === true) {
      
      //change colour of the key that was clicked
      keys[i].col = color(255,0,0,255);

      //find max value of this.active2 and which key it corresponds to
      var maxIndex = findMax();
      var maxActive = keys[maxIndex].active2;
 
      //set active number to one higher than the highest active number
      //UNLESS THE HIGHEST ACTIVE NUMBER IS THE SAME KEY
      if (maxIndex != i) {
        keys[i].active2 = maxActive + 1;
      }

      //display key
      keys[i].display();
      
      //wait 2 seconds and change back the colour of ONLY the earliest one still active
      setTimeout(reDraw, delay);
     
    }
  }
}

function reDraw () {
  
  //find the top number in the stack and only change that colour back
  for (var i = 0; i < numOfKeys; i++) {
    if (keys[i].active2 === 1) {
      if (keys[i].code == 4) keys[i].col = color(0,0,0,255);
      else keys[i].col = color(253,253,253,255);
      keys[i].display();
      keys[i].active2 = 0;
    }
  }
  updateQueue();
}

function findMax() {

  //find max value of this.active2
  var maxActive = 0;
  var index = 0;
  for (var j = 0; j < numOfKeys; j++) {
    if (keys[j].active2 > maxActive) {
      maxActive = keys[j].active2;
      index = j;
    }
  }
  return index;
}

function updateQueue() {
  for (var i = 0; i < numOfKeys; i++) {
    if (keys[i].active2 !== 0) keys[i].active2--;
  }
}
