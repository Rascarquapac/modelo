var Block = function(block){
  this.block = block;
  this.check = function(){
    if (Array.isArray(this.block) === false) throw 'Blok is not an array: badly constructed method';
    for (let i=0; i< this.block.length; i++){
      if (Array.isArray(this.block[i]) === false)  throw 'Row '+ i +' is not an array: badly constructed method';
      if (this.block[i].length != this.block[0].length) throw 'Row '+ i +' has not the right length';
    }
    this.high  = this.block.length;
    this.length= this.block[0].length;
    return(this);
  }
  this.initiate = function(sheet,rowI,colI){
    this.sheet = sheet;
    this.rowI = rowI;
    this.colI = colI;
    return(this);
  }
  this.setRange = function(high,length){
    this.range = this.sheet.getRange(this.rowI,this.colI,high,length);
    return(this);
  }

  this.setValues = function(){
    this.range = this.sheet.getRange(this.rowI,this.colI,this.high,this.length);
    this.range.setValues(this.block);
    return this;
  }
  this.setStyle = function(style,zone){
    var range= zone || this.range;
    this.style = style;
    switch (style) {
      case "STANDARD_HEADER" : {
        range.setFontWeight('bold')
        .setFontColor('#000000')
        .setBackgroundColor('#ffffff')
        .setBorder(true, true, true, true, true, false,null,SpreadsheetApp.BorderStyle.SOLID)
        .setHorizontalAlignment("center")
        .setVerticalAlignment("middle")
        .setNumberFormat("mmm")
        .setWrap(true);
        break;
      }
      case "STANDARD_NUMBER" : {
        range.setFontWeight('normal').setFontColor('#000000').setBackgroundColor('#ffffff')
        .setBorder(true, true, true, true, true, false,null,SpreadsheetApp.BorderStyle.SOLID);
        range.setNumberFormat("#,##0[$€]");
        break;
      }         
      // Style including conditionnal rules for value 0 and 1
      case "STANDARD_COND" : {
        var rules = sheet.getConditionalFormatRules();
        range.setBorder(true, true, true, true, false, false,null,SpreadsheetApp.BorderStyle.SOLID);
        // Building rules
        var ruleA = SpreadsheetApp.newConditionalFormatRule()
        .whenNumberEqualTo(0)
        .setBackground("#ffad99")
        .setFontColor("#ffad99")
        .setRanges([range])
        .build();
        rules.push(ruleA);
        var ruleB = SpreadsheetApp.newConditionalFormatRule()
        .whenNumberEqualTo(1)
        .setBackground("#ccffdc")
        .setFontColor("#ccffdc")
        .setRanges([range])
        .build();
        rules.push(ruleB);
        //Apply rules
        sheet.setConditionalFormatRules(rules);
        break;
      }          
    }
    return(this);
  }
  this.setPeriodicStyle=function(periodicity){ 
    var blockMatrix = [];
    var range = {};
    var rowI  = this.rowI;
    var colI  = this.colI;
    for (let i=0; i< this.length; i+=periodicity){
      range = this.sheet.getRange(rowI,colI+i,this.high,periodicity);
      this.setStyle(this.style,range);
    }
    return(this);
  }
  this.setColumnSize=function(columnSize){ 
    if (typeof columnSize === 'number') this.sheet.setColumnWidths(this.colI,this.length,columnSize);    
    return(this);
  }
  return(this);
  this.merge = function(){ 
    this.range = this.sheet.getRange(this.rowI,this.colI,this.high,this.length).merge();
    return(this);
  }
  this.setPeriodicMergeHeader=function(periodicity){ 
    var blockMatrix = [];
    var range = {};
    var rowI  = this.rowI;
    var colI  = this.colI;
    var high = 1; // first line of header
    for (let i=0; i< this.length; i+=periodicity){
      range = sheet.getRange(rowI,colI+i,high,periodicity);
      this.merge();
    }
    return(this);
  }
  this.banding = function(){ 
    this.range.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY,true,false);
    return(this);
  }
  return(this);
}
function testBlock(){
  var sheet = new Sheets("Modelo-debug", "tests");
  var block = new Block([[1.0,2.0],[1.0,2.0]]).check().initiate(sheet.sheet,1,1).setValues().setStyle("STANDARD_NUMBER").setPeriodicStyle(12).setColumnSize(50);
}