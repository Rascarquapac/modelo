/**
 * Represents a financial timed view of the accounting on a given period.
 * @constructor
 * @param {Macro} macroMoves - a macro accounting timed view on the given period.
 */
var MetaView = function(leafMoves,macroDefRef){
  this.periodsInFile  = leafMoves.periodsInFile;
  this.periodsPerYear = leafMoves.periodsPerYear;
  this.startPeriod    = leafMoves.startPeriod;
  //getting macro definition
  this.macro        = new Macro(macroDefRef);
  this.displayOrder = this.macro.displayOrder;
  //store leafMoves
  this.leafMoves = leafMoves.leafMoves;
  
  this.initialize = function(){
    console.log ("this.periodsInFile = " + this.periodsInFile);
    this.metaView = {};
    var property = "";
    for (let i=0; i < this.displayOrder.length;i++){
      property = this.displayOrder[i];
      this.metaView[property] = [];
      for (let j=0; j <= this.periodsInFile ; j++){
        this.metaView[property][j] =  0.0;
      } 
    }
    console.log("Init-> #columns: " + this.metaView[property].length + "  #lines: " + Object.keys(this.metaView).length);
  }
  /**
  * Merge leaf rows in meta rows
  * @param {string} macroDefRef - Referenve of the macro definition
  */
  this.leaf2MetaView = function(){
    var metaItem = "";
    var isDebit  = false;
    var body =[];
    var itemSum = 0.0;
    var item = "";
    for (item in this.leafMoves){
      body = this.leafMoves[item];
      // Checking if move is more debit or credit 
      // correct ?-> itemSum = body => body.reduce((a,b) => a + b, 0);
      var itemSum = 0.0;
      for (let i = 0; i <= this.periodsInFile; i++){
       itemSum += body[i]; 
      }
      isDebit = (itemSum > 0.0) ? true : false;
      //
      metaItem = this.macro.getMacroItemRef(item,isDebit);
      //console.log("Item = " + item +"  metaItem =  " + metaItem);
      for (let i=0; i <= this.periodsInFile; i++){
        this.metaView[metaItem][i] +=  body[i];
      }
    }
    console.log("Filled-> #columns: " + this.metaView[metaItem].length + "  #lines: " + Object.keys(this.metaView).length);

  }
  
  //Check Items array
  this.checkMoves = function(){
    var checkSum =[];
    // Initiate checksum row, including "Report"column
    for (let i=0; i<= this.periodsInFile;i++)
      checkSum.push(0.0);
    //Cumulate metaView rows in checkSum
    for (let property in this.metaView){
      // Add current metaView row to checkSum row
      for (let i =0;i< checkSum.length; i++)
        checkSum[i] += this.metaView[property][i];
    }
    //Rounding vales
    for (let i=0; i < checkSum.length ; i++){
      checkSum[i] = checkSum[i].toFixed(0);
    }

    this.checkSum = checkSum;
    console.log(`Sum of lines is: ${checkSum}`);
  }

  /**
  * Convert Moves object as a Gsheet-compatible array for writing
  * @method
  * @param {leafMoves} array - name of GSheet file containing dated moves (debit or credit amount on a given date).
  * @return {gsheetLines} array - an array of 
  */
  this.append = function(metaView2add){
    console.log("DUMP of metaView2Add LENGTH=  "+ metaView2add.metaView["Δcash"].length);
    console.log("DUMP of this.metaView LENGTH=  "+ this.metaView["Δcash"].length + " BEFORE");

    for (let key in this.metaView){
      //console.log("For key -> " + key +"  size of line is : " + this.metaView[key].length + " Before concat");
      metaView2add.metaView[key].shift();
      this.metaView[key] = this.metaView[key].concat(metaView2add.metaView[key]);
      //console.log("For key -> " + key +"  size of line is : " + this.metaView[key].length + " After concat" );
    }
    this.periodsInFile += metaView2add.periodsInFile;
//    console.log("DUMP of metaView");
//    console.log(this.metaView);
    console.log("DUMP of this.metaView LENGTH=  "+ this.metaView["Δcash"].length+ " AFTER");


  }
  this.summary =function(){
  }
  
  this.computeHeader = function(){
    var header   = ["Item Name","Rep"];
    var periodNames = [];
    switch (this.periodsPerYear){
      case (12) : {periodNames = ["Jan","Fev","Mars","Avr","Mai","Juin","Juil","Aout","Sept","Oct","Nov","Dec"];break;}
      case (6)  : {periodNames = ["BM1","BM2","BM3","BM4","BM5","BM6"];break;}
      case (4)  : {periodNames = ["Q1","Q2","Q3","Q4"];break;}
      case (3)  : {periodNames = ["QM1","QM2","QM3"];break;}
      case (2)  : {periodNames = ["S1","S2"];break;}
      case (1)  : {periodNames = ["AN"];break;}
      default   : throw ("Bad number of periods per Year");
    }
    var simplifiedYear =this.startPeriod.getFullYear()%100;
    var periodName = "";
    var postfix ="";
    for (let i=0; i < this.periodsInFile;i++){
      if (((i % this.periodsPerYear) == 0) && (i != 0)){
        simplifiedYear++;
      }
      postfix = "-".concat(simplifiedYear.toString());
      periodName = periodNames[i%this.periodsPerYear];
      header.push(periodName.concat(postfix));
    }
    return(header);
  }

  /**
  * Convert Moves object as a Gsheet-compatible array for writing
  * @method
  * @param {leafMoves} array - name of GSheet file containing dated moves (debit or credit amount on a given date).
  * @return {gsheetLines} array - an array of 
  */
  this.convert2GsheetArray = function(){
    this.gsheetArray = [];
    var property = "";
    var line     = [];
    //Creates a line array for each property of the Move object
    //console.log("DISPLAY ORDER= " + this.displayOrder[4] +"...legnth= " + this.displayOrder.length);
    var index = 0;
    var tmp =[];
    for (let i=0; i< this.periodsInFile;i++)
      tmp.push(0.0);
     for (let i=0; i < this.displayOrder.length;i++){
      property = this.displayOrder[i];
      line[0] = property;
      if (this.metaView.hasOwnProperty(property))
        this.gsheetArray[index] = line.concat(this.metaView[property]);
      else
        this.gsheetArray[index] = line.concat(tmp);
      index++;
    }
    //
    this.gsheetArray.unshift(this.computeHeader());
    this.checkSum.unshift("CHECKSUMS");
    this.gsheetArray.push(this.checkSum);
    
  }
  console.log("START logging METAVIEW" );
  this.initialize();
  this.leaf2MetaView();
  this.checkMoves();
  this.convert2GsheetArray();
  console.log("STOP logging METAVIEW" );
  console.log("");

}

