function debug() {
  var leafMoves17 = new LeafMoves("2017-GRAND LIVRE-201701-201712","01/01/2017",4,4,"integral");
//  var metaView    = new MetaView(leafMoves17,"cvh2020");  
//  var leafMoves18 = new LeafMoves("2018-GRAND LIVRE-201801-201812","01/01/2018",12,12,"integral");
//  var metaView18    = new MetaView(leafMoves18,"cvh2020");  
//  metaView.append(metaView18);
//  var leafMoves19 = new LeafMoves("2019-GRAND LIVRE-201901-201912","01/01/2019",12,12,"integral");
//  var metaView19    = new MetaView(leafMoves19,"cvh2020");  
//  metaView.append(metaView19);
//  var leafMoves20 = new LeafMoves("2020-GRAND LIVRE-202001-202003","01/01/2020",12,3,"integral");
//  var metaView20  = new MetaView(leafMoves20,"cvh2020");
//  metaView.append(metaView20);
//  var resView  = new ResultView(metaView,"standard",false);
  
  //Define target spreadsheet
  var file = DriveApp.getFilesByName("Accounting import").next();
  var spreadsheet=SpreadsheetApp.open(file);
  var newsheet = spreadsheet.insertSheet(1);

  //??var newsheet = SpreadsheetApp.getActiveSheet();
  // Prepare range limits
  var rangeOriginRow = 1;
  var rangeOriginCol = 1;
  var rangeNumberRow = 14;
  var rangeNumberCol = 14 ;
  //var range  = newsheet.getRange(rangeOriginRow,rangeOriginCol,rangeNumberRow,rangeNumberCol);

  var gsheetArray = leafMoves17.gsheetArray;
// var gsheetArray = metaView.gsheetArray;
// var gsheetArray = resView.gsheetArray;
  rangeOriginRow += 1;
  rangeOriginCol  = rangeOriginCol;
  rangeNumberRow  = gsheetArray.length;
  rangeNumberCol  = gsheetArray[0].length;
  range = newsheet.getRange(rangeOriginRow,rangeOriginCol,rangeNumberRow,rangeNumberCol);
  range.setValues(gsheetArray);  
}
