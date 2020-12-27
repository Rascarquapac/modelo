/**
 * Represents a financial timed view of the accounting on a given period.
 * @constructor
 * @param {MetaView} metaView - metaView of current accounting
 */
var ResultView = function(metaView,resDefRef,absolute){
  //Getting financial definition
  this.resDefRef =resDefRef;
  this.absolute= absolute;
  var resultDefinition = new ResultDefinition(resDefRef);
  this.definition   = resultDefinition.definition;
  this.displayOrder = resultDefinition.displayOrder;
  this.title        = resultDefinition.level;
  this.invert       = resultDefinition.invert;
  //Getting metaView
  this.metaView = metaView.metaView;
  this.periodsInFile  = metaView.periodsInFile;
  this.periodsPerYear = metaView.periodsPerYear;
  this.startPeriod    = metaView.startPeriod;

  /**
  * From a metaView object and definition of a financial view creates a FinancialView object
  * @method
  * @param {string} title - The title of the book.
  * @param {string} author - The author of the book.
  */
  this.meta2resView = function(){
    // Definition of associations between a financial item and a set of metaItems 
    // Object containing the financial view
    var finMoves = {};
    // Line containing the sum of lines of metaItems associated to a financial item
    var cumulLine = [];
    // Length of a line, should be defiend as a property, not as a const.
    const lineLength = this.periodsInFile;
    // Financial Item initialisation
    var finItem = "";
    //For each definition "finItem" key of the finDef
    for (finItem of this.displayOrder){
      console.log("FinItem =" + finItem);
      //Intitiate cumulLine et decumLine
      for (let i=0;i <= lineLength;i++) {cumulLine[i]=0.0;}

      var metaItem = "";
      var metaLine = [];
      var metaItemListPair = [];
      if (this.definition.hasOwnProperty(finItem)){
        metaItemListPair = this.definition[finItem];
      }
      else if (this.title.hasOwnProperty(finItem)){
        metaItemListPair = this.title[finItem];
      }
      else {
        //message = "Element of displayOrder not in definition nor in title:" + finItem;
        throw ("Element of displayOrder not in definition nor in title:" + finItem);
      }
      var metaItemListPlus = metaItemListPair[0];
      //For each of the metaItem defined in the finItem of finDef
      for (let j=0; j < metaItemListPlus.length;j++) {
        metaItem = metaItemListPlus[j];
        metaLine = this.metaView[metaItem];
        //Si il y a un une ligne dans metaView avec index = metaItem
        if (typeof(metaLine) != 'undefined') {
          for (let i=0; i <= lineLength;i++){cumulLine[i] +=  metaLine[i];} 
        }
      }
      var metaItemListMinus = metaItemListPair[1];
      //For each of the metaItem defined in the finItem of finDef
      for (let j=0; j < metaItemListMinus.length;j++) {
        metaItem = metaItemListMinus[j];
        metaLine = this.metaView[metaItem];
        //Si il y a un une ligne dans metaView avec index = metaItem
        if (typeof(metaLine) != 'undefined') {
          for (let i=0; i <= lineLength;i++){cumulLine[i] -=  metaLine[i];} 
        }
      }
      
      finMoves[finItem] = cumulLine.concat([]);
    } 
    this.resView =finMoves;
  }

  //Check Items array
  this.checkMoves = function(){
    var checkSum = [];
    var finLine = [];
    var lineNumber = 0;
    for (let property in this.resView) {
      finLine = this.resView[property];
      //Initiate checkSum
      if (checkSum.length == 0) checkSum = finLine.concat([]);
      else {
        lineNumber++;
        for (let i=0; i<checkSum.length;i++) {checkSum[i] += finLine[i];}
      }
    }
    this.checkSum = checkSum;
    var Message = `For ${this.resDefRef} FINANCIAL VIEW, the sum of ${lineNumber} lines is: ${checkSum}`
    console.log(Message);
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
    var resViewLine = [];
    //Creates a line array for each property of the Move object
    //console.log("DISPLAY ORDER= " + this.order[4] +"...legnth= " + this.order.length);
    var index = 0;
    for (let i=0; i < this.displayOrder.length;i++){
      property = this.displayOrder[i];
      line[0] = property;
      //If property exist in resView, convert
      if (this.resView.hasOwnProperty(property)){
        //inverting lines included in this.invert array
        resViewLine = this.resView[property];
        for (let j=0; j < this.invert.length;j++){
          if (this.invert[j] == property){
            for (let k=0; k < resViewLine.length;k++){
              resViewLine[k] = -resViewLine[k];
            }
          }
        }    
        this.gsheetArray[index] = line.concat(resViewLine);
        index++;
      }
    }
    // Working in absolute values in palce of monthly variation
    if (this.absolute){
      line=[];
      for (let i=0; i < this.gsheetArray.length ; i++){
        line=this.gsheetArray[i];
        for (let j=2;j<line.length;j++){
          line[j] += line[j-1];
        }
      }
    } 
    
    this.gsheetArray.unshift(this.computeHeader());
    this.checkSum.unshift("CHECKSUMS");
    this.gsheetArray.push(this.checkSum);
    
  }
  
  console.log("START logging RESULTVIEW");
  this.meta2resView();
  this.checkMoves();
  this.convert2GsheetArray();
  console.log("STOP logging RESULTVIEW");
  console.log("");

}