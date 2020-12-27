var Line = function (startPeriod,periodSizeInMonths,accountingTool) {
  //DEFINING METHODS
  //Set position of lines element according to accounting tool used for file generation
  this.periodSizeInMonths = periodSizeInMonths;
  this.dataPosition = function(accountingTool){
    try{
      switch (accountingTool){
        case "winbooks": {
          this.emptyWhenRepPeriod = 4; //when Report period this position is empty string
          this.itemRefPos  = 0;
          this.periodPos   = 4;
          this.hasCreditColumn = true;
          this.debitPos    = 6;
          this.creditPos   = 7;
          break;
        }
        case "integral": {
          this.emptyWhenRepPeriod = 4;
          this.itemRefPos  = 0;
          this.periodPos   = 2;
          this.hasCreditColumn = false;
          this.debitPos    = 7;
          this.creditPos   = 0;
          break;
        }
        default:
          throw "non existent accounting tool";          
      }
    }
    catch(err) {
      message = `Aborting due to ${err} definition`;
      console.log(message);
    }
  }
  this.startPeriod = startPeriod;
  this.dataPosition(accountingTool);

  
  //Compute period index (0 is Report period, 1 to 12 is period index relative to accounting start date
  this.toPeriod = function (moveDate){
    var period = 0;
    // Find period of the move in months
    var startYear     = this.startPeriod.getFullYear();
    var startMonth    = this.startPeriod.getMonth();
    var moveDateYear  = moveDate.getFullYear();
    var moveDateMonth = moveDate.getMonth();
    var monthPeriod = (moveDateYear * 12 + moveDateMonth) - (startYear * 12 + startMonth);
    if (monthPeriod < 0)       throw "move period is lower than start period date";
    if (monthPeriod > 11)      throw "move period is greater than start period date plus one year";
    //find period of the move in periodsPerYear
    var remainder = monthPeriod % this.periodSizeInMonths;
    period = (monthPeriod - remainder) / this.periodSizeInMonths;
    //Add "1" because the Report Period is "0"
    period++;
    return(period);
  }
    
  // Get and check the date reference of move from "line"
  this.getPeriod= function(line){
    var moveDate;
    moveDate = line[this.periodPos];
    var checkRepPeriod = line[this.emptyWhenRepPeriod];
    if ((checkRepPeriod === "") || (checkRepPeriod == 0))
      //Report period critera matched
      return(0);
    else
      //Report period critera NOT matched, period ≠ 0
      return(this.toPeriod(moveDate));
  } 
    
  // Get and check the item reference of move from "line"
  this.getItemRef = function(line){
    var itemRef = line[this.itemRefPos];
    try {
      var parsed = parseInt(itemRef);
      if (isNaN(parsed))    throw "Item reference is not a number";
      else if (parsed <= 0) throw "Item reference cannot be negative or equal to 0";
      
      //Extend to 6 digit number in case bad accounting number
      while (parsed < 100000) {
        parsed = parsed *10;
        itemRef = itemRef.concat("0");
      }
      if ((parsed > 0) && (parsed <= 800000)) return (itemRef);
      else if (parsed < 4000000) throw "Item reference cannot be between 800000 and 3999999";
      else if (parsed < 4100000) return ("400000");
      else if (parsed < 4400000) throw "Item reference cannot be between 4100000 and 4399999"; 
      else if (parsed < 4500000) return ("440000");
      else throw "Item reference cannot be between greater than 4499999"; 
    }
    catch(err){
      message = `Aborting due to ${err} definition`;
      console.log(message);
    }
  }

  //Get and check the standardized debit value from "line"
  this.getDebit = function (line){
    var debit = 0.0;
    if (this.hasCreditColumn){debit = line[this.debitPos] - line[this.creditPos];}
    else {debit = line[this.debitPos];}
    return(debit);          
  }
}
