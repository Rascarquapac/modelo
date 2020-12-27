/**
 * Object describing a dated list of costs/revenues amounts; the index is the period reference
 *
 * @constructor
 * @this {Serie}
 * @param {string} name : Symbol name associated to the serie 
 * @param {size}   size : The number of amounts to be stored
 * @param {array}  ranges : array of doublons indicating [0]
 */
var Serie = function (name,size,value) {
  this.value = value || 0;
  this.name = name;
  this.size = size;
  this.sequence = [];
  for (let i = 0; i < size; i++) this.sequence[i]=this.value;
  
  this.expand = function (seqDef){
    var index    = 0;
    var currentValue = 0;
    var period = seqDef [index][0] || 0;
    var value  = seqDef [index][1] || 0;
    for (let i = 0; i < this.size; i++){
      if (i == period){
        index++;
        currentValue = value;
        if (index < seqDef.length) {
          period = seqDef [index][0];
          value  = seqDef [index][1];
          if (i > period) console.log("Error in sequence definition, range is not stricly increasing");
        }
      }
      this.sequence[i] += currentValue;
    }
  }
  
  this.initSequence = function (sequence){
    for (let i = 0; i < this.size; i++) 
      this.sequence[i] = sequence[i%sequence.length];
  } 

  this.add = function(serie){
    var result = [];
    for (let i=0; i< this.size; i++){
      this.sequence[i]= this.sequence[i] + serie.sequence[i];
    }
  }
  this.product = function(serie){
    var result = [];
    for (let i=0; i< this.size; i++){
      this.sequence[i]= this.sequence[i] * serie.sequence[i];
    }
  }
}

function testSequence(){
  var serieA = new Serie("Test",10);
  serieA.expand([[1,10],[5,5]]);
  console.log("Sequence A original");
  console.log(serieA.sequence);
  var serieB = new Serie("B",10);
  serieB.expand([[1,0],[5,1]]);
  console.log("Sequence B original");
  console.log(serieB.sequence);
  serieA.product(serieB);
  console.log("Sequence A multiplied");
  console.log(serieA.sequence);
}

function testGsheet(){
  var res = Math.cos(45);
  console.log("Cos of value:  " + res);
}
  
