/**
 * Represents a Timed view for moves associated to a accounting items (a number) on a "length" months period.
 * @constructor
 * @param {filename} string - name of GSheet file containing dated moves (debit or credit amount on a given date).
 * @param {startPeriod} string - staring date (DD/MM/YYYY) of the exercice.
 * @param {accountingTool} string - name of the accounting tool genertor of the file.
 * @return {lines} array - an array of 8 values array [itemRef,...,dateOfMove,period,...,debitAmount,creditAmount] depending of accountingTool
*/

var LeafMoves = function(fileName, startPeriod,periodsPerYear,periodsInFile,accountingTool){
  //DEFINING PROPERTIES
  // setting properties
  // Reading input file
  this.periodsPerYear = periodsPerYear;
  this.periodsInFile  = periodsInFile;
  this.fileName   = fileName;
  this.startPeriod = new Date(startPeriod);
  this.accountingTool = accountingTool;
  var file        = DriveApp.getFilesByName(fileName).next();
  var spreadsheet = SpreadsheetApp.open(file);
  var sheetData   = spreadsheet.getSheets()[0];
  var range       = sheetData.getRange('A2:H');
  this.lines      = range.getValues();
  
  this.checkPeriodsParams = function(){
    if (this.periodsPerYear <= 0 || this.periodsInFile <= 0) throw ("Number of periods per year and periods in files MUST BE greater than 0");
    if ((this.periodsPerYear % this.periodsInFile) != 0) throw ("Periods in file MUST BE a multiple of periods in years");
    if ((12 % this.periodsPerYear) != 0) throw ("Periods per year MUST BE a integer number of months");
    this.periodSizeInMonths = 12 / this.periodsPerYear;
  }
  this.checkLines = function(){
    var line = new Line(this.startPeriod,this.periodSizeInMonths,this.accountingTool);
    const lines = this.lines;
    var total = 0.0;
    for (let i=0; i < lines.length; i++){
      debit   = line.getDebit(lines[i]);
      total  += debit;
    }
    Message = `TOTAL cumulated lines = ${total.toFixed(0)}`;
    console.log(Message);
  }
  
  //Xtract moves definition
  /**
  * Extract LeafMoves from accounting file
  * @constructor
  * @param {lines} array - name of GSheet file containing dated moves (debit or credit amount on a given date).
  * @param {startPeriod} string - staring date (DD/MM/YYYY) of the exercice.
  * @param {accountingTool} string - name of the accounting tool genertor of the file.
  * @return {leafMoves} array - an array of 
  */
  this.xtract = function(){
    // Body of merge function
    var lines = this.lines;
    var leafMoves = {};
    var line = new Line(this.startPeriod,this.periodSizeInMonths,this.accountingTool);
    var itemRef = "";
    var period  = 0;
    var debit   = 0.0;
    var total   = 0.0;
    for (let i=0; i < lines.length; i++){
      itemRef = line.getItemRef(lines[i]);
      period  = line.getPeriod(lines[i]);
      debit   = line.getDebit(lines[i]);
      total  += debit;
      //console.log("Combination="+ itemRef + "," + period +","+debit); 
      if (leafMoves.hasOwnProperty(itemRef) == false){
        leafMoves[itemRef] = [];
        for (let j=0; j<=this.periodsPerYear;j++){
          leafMoves[itemRef][j] = 0; 
        }
      }
      leafMoves[itemRef][period] += debit;                      
    }
    total =total.toFixed(0);
    console.log("TOTAL of raws and columns = " + total);
    this.leafMoves= leafMoves;
  }
  
  //Check Items array
  this.checkMoves = function(){
    var checkSum =[];
    for (let property in this.leafMoves){
      if (checkSum.length == 0) checkSum = this.leafMoves[property].concat([]);
      else {
        for (let i =0;i<checkSum.length;i++){ checkSum[i] += this.leafMoves[property][i];}
      }
    }
    for (let i=0; i < checkSum.length ; i++){
      checkSum[i] = checkSum[i].toFixed(0);
    }
    console.log ("Period in file = " + this.periodsInFile);
    this.checkSum = checkSum;
    console.log(`Sum of lines is: ${checkSum}`);
  }
  
  /**
  * Convert leafMoves object as a Gsheet-compatible array for writing
  * @method
  * @param {leafMoves} array - name of GSheet file containing dated moves (debit or credit amount on a given date).
  * @return {gsheetLines} array - an array of 
  */
  this.convert2GsheetArray = function(){
    this.gsheetArray = [];
    var header = [];
    var Item = "Item name";
    switch (this.periodsPerYear){
      case (12) : {header = [Item,"Rep","Jan","Fev","Mars","Avr","Mai","Juin","Juil","Aout","Sept","Oct","Nov","Dec"];break;}
      case (6)  : {header = [Item,"Rep","BM1","BM2","BM3","BM4","BM5","BM6"];break;}
      case (4)  : {header = [Item,"Rep","Q1","Q2","Q3","Q4"];break;}
      case (3)  : {header = [Item,"Rep","QM1","QM2","QM3"];break;}
      case (2)  : {header = [Item,"Rep","S1","S2"];break;}
      case (1)  : {header = [Item,"Rep","AN"];break;}
      default   : throw ("Bad number of periods per Year");
    }
    const simplifiedYear =this.startPeriod.getFullYear()%100;
    const postfix = "-".concat(simplifiedYear.toString());
    for (i=0;i<header.length;i++){
      header[i] = header[i].concat(postfix);
    }
    this.checkSum.unshift("CHECKSUMS");
    var index = 0;
    var line =[];
    //Creates a line array for each property of the Move object
    for (let property in this.leafMoves){
      line[0] = property; 
      this.gsheetArray[index] = line.concat(this.leafMoves[property]);
      index++;
    }
    this.gsheetArray.sort(function(a, b){return a[0] - b[0]}); 
    this.gsheetArray.unshift(header);
    this.gsheetArray.push(this.checkSum);
  }
  // Compute moves data object  
  console.log("START logging MOVES of file " + this.fileName);
  this.checkPeriodsParams();
  this.xtract();
  this.checkLines();
  this.checkMoves();
  this.convert2GsheetArray();
  console.log("STOP logging MOVES of file " + this.fileName);
  console.log("");

}