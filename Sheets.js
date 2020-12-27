var Sheets = function(filename,sheetName){
  var file        = DriveApp.getFilesByName(filename).next();
  var spreadsheet = SpreadsheetApp.open(file);
  var sheet   = spreadsheet.getSheetByName(sheetName);
  if (sheet != null) sheet.clear();
  else {
    sheet = spreadsheet.duplicateActiveSheet();
    sheet.setName(sheetName);
  }
  this.sheet = sheet;
  this.spreadsheet = spreadsheet;
}

