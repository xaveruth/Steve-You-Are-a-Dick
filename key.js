//start each white note from bottom left corner since it's consistent
//i dunno, maybe this is annoying - consider changing back to top left
//TODO: put into own file
function Key (x, y, code, index) {

  //putting this. in front of it does NOT! whether in this function or another
  //TODO: 2d array???
  var points = [];
  this.code = code;
  this.index = index;
  this.active = 0;      //active keeps track of whether a key is active while playing the video
  this.active2 = 0;     //active2 keeps track of whether a key is active while the user is doing interactive stuff

  this.whiteCol = color(253,253,253,255);
  this.blackCol = color(0,0,0,255);

  var c;
  
  //C, F - FIX TO START FROM BOTTOM LEFT
  if (this.code == 1) {
    points[0] = x;                              //top left x
    points[1] = y - noteHeight;                 //top left y
    points[2] = x + whiteNoteWidth * (3/4);     //top right x
    points[3] = y - noteHeight;                 //top right y
    points[4] = x + whiteNoteWidth * (3/4);     //elbow x
    points[5] = y - noteHeight * (1/3);         //elbow y
    points[6] = x + whiteNoteWidth;             //mid right x
    points[7] = y - noteHeight * (1/3);         //mid right y
    points[8] = x + whiteNoteWidth;             //bottom right x
    points[9] = y;                              //bottom right y
    points[10] = x;                             //bottom left x
    points[11] = y;                             //bottom left y
    this.col = this.whiteCol;
  }
  
  //B, E
  else if (this.code == 2) {
    points[0] = x;                            //bottom left x
    points[1] = y;                            //bottom left y
    points[2] = x;                            //mid left x
    points[3] = y - noteHeight * (1/3);       //mid left y
    points[4] = x + whiteNoteWidth * (1/4);   //elbow x
    points[5] = y - noteHeight * (1/3);       //elbow y
    points[6] = x + whiteNoteWidth * (1/4);   //top left x
    points[7] = y - noteHeight;               //top left y
    points[8] = x + whiteNoteWidth;           //top right x
    points[9] = y - noteHeight;               //top right y
    points[10] = x + whiteNoteWidth;          //bottom right x
    points[11] = y;                           //bottom right y
    this.col = this.whiteCol;
  }
  
  //G, D, A
  else if (this.code == 3) {
    points[0] = x;                              //bottom left x
    points[1] = y;                              //bottom left y
    points[2] = x;                              //mid left x
    points[3] = y - noteHeight * (1/3);         //mid left y
    points[4] = x + whiteNoteWidth * (1/4);     //elbow left x
    points[5] = y - noteHeight * (1/3);         //elbow left y
    points[6] = x + whiteNoteWidth * (1/4);     //top left x
    points[7] = y - noteHeight;                 //top left y
    points[8] = x + whiteNoteWidth * (3/4);     //top right x
    points[9] = y - noteHeight;                 //top right y
    points[10] = x + whiteNoteWidth * (3/4);    //elbow right x
    points[11] = y - noteHeight * (1/3);        //elbow right y
    points[12] = x + whiteNoteWidth;            //mid right x
    points[13] = y - noteHeight * (1/3);        //mid right y
    points[14] = x + whiteNoteWidth;            //bottom right x
    points[15] = y;                             //bottom right y
    this.col = this.whiteCol;
  }
  
  //black notes
  else if (this.code == 4) {
    points[0] = x + whiteNoteWidth * (3/4);   //top left x
    points[1] = y - noteHeight;               //top left y
    points[2] = x + whiteNoteWidth * (5/4);   //top right x
    points[3] = y - noteHeight;               //top right y
    points[4] = x + whiteNoteWidth * (5/4);   //bottom right x
    points[5] = y - noteHeight * (1/3);       //bottom right y
    points[6] = x + whiteNoteWidth * (3/4);   //bottom left x
    points[7] = y - noteHeight * (1/3);       //bottom left y
    this.col = this.blackCol;
  }


  //CODE!
  //actually, i seem to have fixed the problem - can't remember how
  //still might be a good function to code
  this.clearKey = function() {

  }

  //on mouse click, check if the click was in one of the keys
  //this function works perfectly! it gets the right keys. it's just the color fill that isn't working
  this.isClicked = function(x, y) {
    var check = 0;

    if (code == 1) {
      if (x > points[0] && x < points[2] && y > points[1] && y < points[5]) check = 1;    //upper box
      if (x > points[0] && x < points[8] && y > points[5] && y < points[11]) check = 1;   //lower box
    }

    else if (code == 2) {
      if (x > points[0] && x < points[10] && y < points[1] && y > points[3]) check = 1;   //lower box
      if (x > points[4] && x < points[8] && y < points[5] && y > points[9]) check = 1;    //upper box
    }

    else if (code == 3) {
      if (x > points[0] && x < points[14] && y < points[1] && y > points[3]) check = 1;   //lower box
      if (x > points[4] && x < points[10] && y < points[5] && y > points[7]) check = 1;   //upper box
    }

    else if (code == 4) {
      if (x > points[0] && x < points[2] && y < points[7] && y > points[1]) check = 1;
    }

    if (check == 1) return true;
  }

  //initially display keys
  this.display = function(opac) {

    //reset color for inactive keys
    if (this.active === 0 && this.active2 === 0 && code == 4) this.col = this.blackCol;
    else if (this.active === 0 & this.active2 === 0) this.col = this.whiteCol;

    //fill color 
    fill(red(this.col), green(this.col), blue(this.col), opac);
    
    //draw the shape
    beginShape();
    for (i = 0; i < points.length/2; i++) {
      vertex(points[2 * i], points[2 * i + 1]);
    }
    endShape(CLOSE);
    
    /*
    //TODO: can't get lyrics aligned on the bottom
    //display the lyric
    if (lyrics[this.index] !== null) {
      if (this.code == 4) {
        fill(color('white'));
        textAlign(CENTER,CENTER);
        text(lyrics[this.index], x + whiteNoteWidth * (7/8), y - noteHeight, whiteNoteWidth * (1/4), noteHeight * (2/3));
      }
      
      else {
        fill(color('black'));
        textAlign(CENTER,BOTTOM);
        textWidth(whiteNoteWidth);
        text(lyrics[this.index], x + (1/8) * whiteNoteWidth, y - noteHeight, (3/4) * whiteNoteWidth, noteHeight);
      }
       
    }
    */
  }
  
  //fills the given key with the given colour for the given amount of time, with fade in and fade out
  //stopped using opacity because it was messing up the colours - now alter the rgb values for fades
  this.fillKey = function(col, startingTime, numBeats, numBeatsDec, cumAmt, duration) {
    //TODO: different fade amounts for fade in vs fade out?
    
    var fadeAmount = 0.7; //number of beats
    var diff = numBeatsDec + duration - (startingTime + cumAmt);
    var endDiff = duration - diff;
    var threshold = 0.2;
    var maxOpacity = 255;
    var opac = 0;
    var whiteRGB = 253;
    var rDiff, gDiff, bDiff, r, g, b;


    //set fade amount
    if (code == 4) {
      rDiff = red(col);
      gDiff = green(col);
      bDiff = blue(col);
    }

    else {
      rDiff = whiteRGB - red(col);
      gDiff = whiteRGB - green(col);
      bDiff = whiteRGB - blue(col);
    }

    //black keys
    if (code == 4) {

      //fade in
      if (diff < fadeAmount) {  
        r = 0 + diff / fadeAmount * rDiff;
        g = 0 + diff / fadeAmount * gDiff;
        b = 0 + diff / fadeAmount * bDiff;
        this.col = color(r, g, b);  
      }              

      //fade out
      else if (endDiff < fadeAmount) {
        r = red(col) - (fadeAmount - endDiff) / fadeAmount * rDiff;
        g = green(col) - (fadeAmount - endDiff) / fadeAmount * gDiff;
        b = blue(col) - (fadeAmount - endDiff) / fadeAmount * bDiff;
        this.col = color(r, g, b);
      }

      //neither
      else {
        this.col = col;
      }
    }

    //white keys
    else {
      //fade in
      if (diff < fadeAmount) {                            
        r = whiteRGB - diff / fadeAmount * rDiff;  
        g = whiteRGB - diff / fadeAmount * gDiff;  
        b = whiteRGB - diff / fadeAmount * bDiff;
        this.col = color(r, g, b);  
      }              

      //fade out
      else if (endDiff < fadeAmount) {
        r = red(col) + (fadeAmount - endDiff) / fadeAmount * rDiff;
        g = green(col) + (fadeAmount - endDiff) / fadeAmount * gDiff;
        b = blue(col) + (fadeAmount - endDiff) / fadeAmount * bDiff;
        this.col = color(r, g, b);
      }

      //neither
      else {
        this.col = col;
      }
    }

    this.active = 1;
    //this.col = col;
    this.display(255);
  }
  
  //CODE!
  this.displayLyrics = function() {
  }



}