function test() {
  const pPY   = 4;
  const pILF  = 1;
  var leafMoves17 = new LeafMoves("2017-GRAND LIVRE-201701-201712","01/01/2017",pPY,pPY,"integral");
  var metaView    = new MetaView(leafMoves17,"cvh2020");  
  var leafMoves18 = new LeafMoves("2018-GRAND LIVRE-201801-201812","01/01/2018",pPY,pPY,"integral");
  var metaView18    = new MetaView(leafMoves18,"cvh2020");  
  metaView.append(metaView18);
  var leafMoves19 = new LeafMoves("2019-GRAND LIVRE-201901-201912","01/01/2019",pPY,pPY,"integral");
  var metaView19    = new MetaView(leafMoves19,"cvh2020");  
  metaView.append(metaView19);
  var leafMoves20 = new LeafMoves("2020-GRAND LIVRE-202001-202003","01/01/2020",pPY,pILF,"integral");
  var metaView20  = new MetaView(leafMoves20,"cvh2020");
  metaView.append(metaView20);
  console.log("SUPER DUMP of this.metaView LENGTH=  "+ metaView.metaView["Δcash"].length+ " SUPER DUMP");

  //Missing actions in "append" function..
  metaView.checkMoves();
  metaView.convert2GsheetArray();
  console.log(metaView.checkSum);
  
  var resView  = new ResultView(metaView.metaView,"ebitda",false);
  
  /*
  //Define target spreadsheet
  var file = DriveApp.getFilesByName("Accounting import").next();
  var spreadsheet=SpreadsheetApp.open(file);
  var newsheet = spreadsheet.insertSheet(1);

  //??var newsheet = SpreadsheetApp.getActiveSheet();
  // Prepare range limits
  var row = 1;
  var col = 1;
  var numRows = 15;
  var numCols = 15;
  //var range  = newsheet.getRange(rangeOriginRow,rangeOriginCol,rangeNumberRow,rangeNumberCol);

 // var gsheetArray = leafMoves19.gsheetArray;
  
  //var gsheetArray = metaView.gsheetArray;
  // var gsheetArray = finView.gsheetArray;
  var gsheetArray = resView.gsheetArray;
  row  += 1;
  col  = col;
  numRows  = gsheetArray.length;
  numCols  = gsheetArray[0].length;
  console.log ("#ROWS: " + numRows + "   #COLS = " + numCols);
  var range = newsheet.getRange(row,col,numRows,numCols);
  range.setValues(gsheetArray); 
  */
}
