function Melody (beatsArray, fillsArray) {
  var beats = [];
  var fills = [];
  var cum = [];
  this.currentKey = null;

  //populate the beats array for each melody
  for (var i = 0; i < beatsArray.length; i++) {
    beats[i] = beatsArray[i];
    fills[i] = fillsArray[i];
  }

  //create cumulative arrays to advance time through
  this.buildCumulativeArray = function() {
    for (i = 0; i < beats.length; i++) {
      cum[i] = 0;
      for (var j = 0; j <= i; j++) {
        cum[i] += beats[j];
      }
    }
  }

}