/*
* Convert object with "tablify" proprety to be prety written in a sheet
* tablify->

*@constructor this
*@param (object) structure The object to be converted
*/
            
var Tablify = function(sheet,rowInit,colInit,structure){
  /*
  * Create a chronologic header uin two rows for series tables
  *@param (number) size : total number of periods, a multiple of "periodsPerYear" parameter
  *@param (number) periodsPerYear : number of periods per year
  *@param (number) startYear   : starting year ACN for the header
  *@param (number) startPeriod : month (0 to 11) first month of the header
  *@return (list) : year names as a list of strings (YYYYMM-YYYYMM) indicating starting month and ending month 
  *@return (list) : period names as a list of strings  
  */
  this.computeHeader = function(size,periodsPerYear,startYear,startPeriod){
    var periodNameList = [];
    var yearNameList   = [];
    var periodNames    = [];
    switch (periodsPerYear){
      case (12) : {periodNames = ["Jan","Fev","Mar","Avr","Mei","Jun","Jui","Aug","Sep","Oct","Nov","Dec"];break;}
      case (6)  : {periodNames = ["BM1","BM2","BM3","BM4","BM5","BM6"];break;}
      case (4)  : {periodNames = ["Q1","Q2","Q3","Q4"];break;}
      case (3)  : {periodNames = ["QM1","QM2","QM3"];break;}
      case (2)  : {periodNames = ["S1","S2"];break;}
      case (1)  : {periodNames = ["AN"];break;}
      default   : throw ("Bad number of periods per Year");
      }
    var period = 0;
    var currentYear = 0;
    var periodName = "";
    var yearName ="";
    var startPeriodName = (startPeriod < 9) ? "0" + (startPeriod+1).toString():(startPeriod+1).toString(); 
    var endPeriodName = (startPeriod < 10) ? "0" + startPeriod.toString():startPeriod.toString(); 
    for (let k=startPeriod; k < startPeriod+size;k++){
      period   = k % periodsPerYear;
      periodName = periodNames[period];  
      periodNameList.push(periodName);
      
      currentYear = startYear + (k-period)/periodsPerYear;
      if (period == startPeriod){
        yearName = currentYear.toString().concat(startPeriodName, " - ",(currentYear+1).toString(),endPeriodName);
      }
      yearNameList.push(yearName);
    }
    return([yearNameList,periodNameList]);
  }

  /*
  * set a predefined style to a range of cells 
  *@param (range) range : range to be styled
  *@param (string) style : predefined name of a style
  */
  this.setStyle = function(range,style){
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
  }

  this.writeRange = function(sheet,rowInit,colInit,data,style){
    var range = sheet.getRange(rowInit,colInit,data.rows,data.cols);
    range.setValues(data.data);
    this.setStyle(range,style);
  }
   
  this.writeMultipleRange = function(sheet,rowInit,colInit,matrix,style,periodicity,merge,banding,columnSize){ 
    var block={};
    var blockMatrix =[];
    var range ={};
    for (let i=0; i< matrix.cols; i+=periodicity){
      blockMatrix =[];
      for(let j=0; j< matrix.rows;j++){
        blockMatrix.push(matrix.data[j].slice(i,i+periodicity));
      }
      block = {rows:matrix.rows,cols:periodicity,data:blockMatrix.data}
      range = sheet.getRange(rowInit,colInit+i,block.rows,block.cols);
      console.log("RANGE: row0 =" + rowInit + "  col0= " + (colInit+i)+ "  #rows= " + block.rows + " #cols= " + block.cols);
      //console.log(blockMatrix);
      range.setValues(blockMatrix);
      this.setStyle(range,style,merge,banding);
      if (merge == true) range.merge();
      //if (banding == true) range.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY,true,false);
      if (typeof columnSize === 'number') sheet.setColumnWidths(colInit+i, periodicity,columnSize);
    }
  }
  
  if (structure.hasOwnProperty('tablify') == false) {throw 'Tablify object message: {$structure.name} has no tablify property';}
  var tablify = structure.tablify;
  if (tablify.type == "extensive"){
    var corner = {rows:1,cols:1,data:[[tablify.corner.name]]};
    this.writeRange(sheet,rowInit,colInit,corner,"STANDARD_HEADER");
    //var headerList =tablify.cols.data;
    var cols = tablify.cols.data; //may be to flatten
    var headerList=[];
    console.log("HEADERS:");
    for (let key of cols){
      if (typeof structure[key] === 'object'){ 
        for (let subKey in structure[key]){
          headerList.push(structure[key][subKey][0]);
        }
      }
      else {
        headerList.push(cols[j]);
        console.log("Bad branch, bad test expression: objec type is:");
        console.log(typeof line[cols[j]]);
      }
      console.log(headerList);
    }
    console.log("HEADER:");
    console.log(headerList);

    var header = {rows:1,cols:headerList.length,data:[headerList]};
    this.writeRange(sheet,rowInit,colInit+1,header,"STANDARD_HEADER");
    
    var core = [];
    var rowNames = [];
    var rowObjects = structure[tablify.rows.data]; 
    //For properties store as cols.data
    var i = 0;
    var line = {};
    for (let rowKey in rowObjects){
      rowNames.push([rowKey]);
      line = rowObjects[rowKey];
      core[i]=[];
      var index = 0;
      var tmp;
      for (let key of cols){
        if (typeof line[key] === 'object'){
          for (let subKey in line[key]){
            tmp=line[key][subKey];
            core[i][index]=tmp;
            index++;
          }
        }
        else {
          core[i][index] = line[cols[j]];
          index++;
        }
        console.log(index);
      }
      i++;

    }
    //Another Build of core array
    //Put the format
    var body ={data:core,rows:core.length,cols:index};
    this.writeRange(sheet,rowInit+1,colInit+1,body,tablify.cols.format);
    var row0 ={data:rowNames,rows:core.length,cols:1}; 
    this.writeRange(sheet,rowInit+1,colInit,row0,"STANDARD_HEADER");
    var range = sheet.getRange(rowInit,colInit,core.length+1,core[0].length+1);
    range.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY,true,false);
    //range.applyColumnBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY,true,true);
    sheet.setColumnWidths(colInit, core[0].length+1, 80);
  }
  else if (tablify.type == "serie"){
    var size =24; var periodPerYear =12; var startingYear=2018; var startingPeriod=6;
    //Corner
    var corner = {rows:1,cols:1,data:[[tablify.corner.name]]};
    this.writeRange(sheet,rowInit,colInit,corner,"STANDARD_HEADER");
    var corner = {rows:1,cols:1,data:[[tablify.corner.name]]};
    this.writeRange(sheet,rowInit+1,colInit,corner,"STANDARD_HEADER");
    var range = sheet.getRange(rowInit,colInit,2,1).merge();
    //Header
    var headerBi = this.computeHeader(24,12,2018,6);
    //console.log(headerBi);
    var header = {rows:1,cols:headerBi[0].length,data:[headerBi[0]]};
    this.writeMultipleRange(sheet,rowInit,colInit+1,header,"STANDARD_HEADER",12,true,true,50)
    //this.writeRange(sheet,rowInit,colInit+1,header,"STANDARD_HEADER");
    //range = sheet.getRange(rowInit,colInit+1,1,headerBi[0].length).merge();

    var header = {rows:1,cols:headerBi[1].length,data:[headerBi[1]]};
    this.writeMultipleRange(sheet,rowInit+1,colInit+1,header,"STANDARD_HEADER",12,false,true,50)
    //this.writeRange(sheet,rowInit+1,colInit+1,header,"STANDARD_HEADER");
    //Body
    var rowNames =[];
    var rowIndex = 0;
    var core = [];
    var series ={};
    // Rows objects
    var rowObjects = structure[tablify.rows.data]; 
    var seriesKeysToPrint= tablify.rows.series;
    for (let rowObjectsKey in rowObjects){
      //console.log("rowOjectsKey : " + rowObjectsKey);
      series = rowObjects[rowObjectsKey]["series"];
      console.log(series);
      for (let rowKey of seriesKeysToPrint){
        console.log("RowKey: " + rowKey);
        console.log(series[rowKey].sequence);
        core[rowIndex] = series[rowKey].sequence;
        rowIndex++;
        rowNames.push([rowObjectsKey + "-" + series[rowKey].name]);
      }
    }
    var body ={data:core,rows:core.length,cols:core[0].length};
    this.writeMultipleRange(sheet,rowInit+2,colInit+1,body,tablify.cols.format,12,false,true,50)
//    this.writeRange(sheet,rowInit+2,colInit+1,body,"STANDARD_NUMBER");
    var row0 ={data:rowNames,rows:core.length,cols:1}; 
    this.writeRange(sheet,rowInit+2,colInit,row0,"STANDARD_HEADER");
    var range = sheet.getRange(rowInit+1,colInit,core.length+1,core[0].length+1);
    //range.applyRowBanding(SpreadsheetApp.BandingTheme.CYAN,true,false);
  }
  //////////////////////////////////////////////
  else if (tablify.type == "normal"){
    var size =12; var periodsPerYear =12; var startYear=2018; var startPeriod=1;
    var corner = new Block([[structure.tablify.corner.name],[structure.tablify.corner.name]]);
    corner.check().initiate(sheet,rowInit,colInit)
    .setValues()
    .setStyle(structure.tablify.corner.format)
    .merge();
    var header = new Block(this.computeHeader(size,periodsPerYear,startYear,startPeriod));
    header 
    .check().initiate(sheet,rowInit,colInit+1)
    .setValues()
    .setStyle(structure.tablify.header.format)
    .setPeriodicStyle(size)
    .setPeriodicMergeHeader(periodsPerYear);
    index = 0;
    for (key in structure.tablify.rows.data){
      row0[index] =structure.tablify.row0.data[i];//row names
      core[index] = structure[key];
      index ++;
    }
    var data = new Block(core);
    data
    .check().initiate(sheet,rowInit+1,colInit+1)
    .setValues()
    .setStyle(structure.tablify.header.format)
    .setPeriodicStyle(size);
    var intitule = new Block(row0);
    intitule
    .check().initiate(sheet,rowInit+1,colInit)
    .setValues()
    .setStyle(structure.tablify.header.format)
    .setPeriodicStyle(size);
    
    var bandingZone=new Block([[]]).initiate(sheet,rowInit+1,colInit).setRange(index-1, size+1).banding();
  }
  //if (structure.tablify.hasOwnProperty('header') == false) {throw 'Tablify object message: ${structure.name} has no tablify.header property';}
  //if (structure.tablify.hasOwnProperty('core')   == false) {throw 'Tablify object message: ${structure.name} has no tablify.core property';
}


var Tabe = function(){
  /*
  this.sheet= sheet;
  var block = {};
  for (let key in data){
    block[key] = new Block(data[key],view[key]).check().initiate(sheet,rowI,colI).setValues().setStyle;
  }
  block.header.setPeriodicStyle();
  block.core.setPeriodicStyle();
  */
  /* 
  * check coherency of this.data and this.view structures
  * returns (boolean) only when tests passed
  */
  this.check = function(){
    //check structure of view and data
    for (let property of ["corner", "header","col0","core","cornerBot","bottom"]){
      if ((this.data.hasOwnProperty(property)) == false) throw ('No ' + property +' property in "data" object in Table');  
      if ((this.view.hasOwnProperty(property)) == false) throw ('No ' + property +' property in "view" object in Table');
    }
    //check highs in data
    if (this.data.corner.length != this.data.header.length) throw ('Corner high is different from header high in Table'); 
    if (this.data.row0.length != this.data.core.length) throw ('Row0 high is different from core high in Table'); 
    if (this.data.row0.length != this.data.core.length) throw ('Row0 high is different from core high in Table'); 
    //check lengths in data
    if (this.data.corner[0].length != this.data.row0[0].length) throw ('Corner length is different from row0 length in Table'); 
    if (this.data.header[0].length != this.data.core[0].length) throw ('Header length is different from core length in Table'); 
    if (this.data.cornerBot[0].length != this.data.row0[0].length) throw ('CornerBot length is different from row0 length in Table'); 
    if (this.data.header[0].length != this.data.bottom[0].length) throw ('Header length is different from bottom length in Table'); 
    return(true);
  }
    
  this.setCorner = function(){
    /*
    var h = this.data.corner.length;
    var l = this.data.corner[0].length;
    this.range = this.sheet.getRange(this.currentPosition.top,this.currentPosition.left,h,l);
    this.range.setValues(this.data.corner);
    this.setStyle(range,style);
*/
    //create range
    var corner = {rows:1,cols:1,data:[[tablify.corner.name]]};
    this.writeRange(sheet,rowInit,colInit,corner,"STANDARD_HEADER");
    var corner = {rows:1,cols:1,data:[[tablify.corner.name]]};
    this.writeRange(sheet,rowInit+1,colInit,corner,"STANDARD_HEADER");
    var range = sheet.getRange(rowInit,colInit,2,1).merge();
    //write range
    //style range
  }
  this.setRowNames =function(rowNames){
    this.rowNames = {};
    this.rowNames.rows  = rowNames.length;
    this.rowNames.cols  = 1;    
    if (rowNames.length != 0) this.cols += 1;
    this.rowNames.data = [];
    for (let i=0; i< rowNames.length; i++){
      this.rowNames.data[i] = [rowNames[i]];
    }
  };
  this.setHeader = function(header){
    this.header =  {};
    this.header.data = [header] ;
    this.header.rows  = 1;    
    this.header.cols  = header.length;
    this.rows = 1;
    this.cols += this.header.cols;
  };
  this.setCore = function(core){
    this.core =  {};
    this.core.data = core;
    this.core.rows = core.length ;
    this.core.cols = core[0].length;
    this.rows += this.core.rows;
  };
  this.set = function(corner, header,rowNames,core){
    this.rows   = 0;
    this.cols   = 0;
    if ((rowNames.length !=0) && (rowNames.length != core.length))  throw "Length of rowNames  not equal to number of data rows";
    if (header.length != core[0].length) throw ("Length of header not equal to number of data columns: "+header.length +", ... "+core[0].length);
    this.setCorner(corner);
    this.setRowNames(rowNames);
    this.setHeader(header);
    this.setCore(core);
  };
  this.write = function(sheet,initX,initY){
    function writeRange(sheet,rowInit,colInit,data,style){
      var range = sheet.getRange(rowInit,colInit,data.rows,data.cols);
      range.setValues(data.data);
      switch (style) {
        case "STANDARD_HEADER" : {
          range.setFontWeight('bold')
          .setFontColor('#000000')
          .setBackgroundColor('#ffffff')
          .setBorder(true, true, true, true, true, false,null,SpreadsheetApp.BorderStyle.SOLID)
          .setHorizontalAlignment("center")
          .setVerticalAlignment("medium")
          .setWrap(true);
          break;
        }
        case "STANDARD_NUMBER" : {
          range.setFontWeight('normal').setFontColor('#000000').setBackgroundColor('#ffffff')
          .setBorder(true, true, true, true, true, false,null,SpreadsheetApp.BorderStyle.SOLID);
          range.setNumberFormat("0.00€");
          break;
        }          
      }
    }
    var range={};
    var rowInit =initX;
    var colInit =initY;
    // Writing corner and rowNames when needed
    if (this.rowNames.data.length != 0){
      writeRange(sheet,rowInit,colInit,this.corner,"STANDARD_HEADER");
      rowInit += this.header.rows;
      writeRange(sheet,rowInit,colInit,this.rowNames,"STANDARD_HEADER");
      colInit += this.corner.cols;
    }
    rowInit = initX;
    writeRange(sheet,rowInit,colInit,this.header,"STANDARD_HEADER");
    rowInit += this.header.rows;
    writeRange(sheet,rowInit,colInit,this.core,"STANDARD_NUMBER");
    //Apply Banding theme to the range
    range = sheet.getRange(initX,initY,this.rows,this.cols);
    range.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY,true,false);
    //range.applyColumnBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY,true,true);
    sheet.setColumnWidths(initY, this.cols, 80);
  }
}
function testSheets(){
  var sheet = new Sheets("Modelo-debug", "Parameters");
  /*
  var table = new Table();
  var tablify= {type : "extensive",
                title: "Trial",
                rows:{data:"rowObjects"},
                cols:{data:["profile","bonus"],
                      format:"STANDARD_NUMBER",
                      formatSpec:{"cellC":"STANDARD_NUMBER"}},
                corner:{name:"CORNER",format:"STANDARD_HEADER"},
                header:{format:"STANDARD_HEADER",
                        generated:{}},
                col0:{format:"STANDARD_HEADER"}
             };
  table.set("CORNER",["A","B","C"],["Row Name 1","Row Name 2","Row Name 3"],[[4,5,6],[1,2,3],[1,2,3]]);
  table.write(sheet.sheet,2,2);
  table.set("CORNER",["A","B","C"],[],[[4,5,6],[1,2,3], [1,2,3]]);
  table.write(sheet.sheet,8,1);
  var structure={rowObjects:{row1:{profile:{cellA:1},bonus:{cellB:2,cellC:3}},
                             row2:{profile:{cellA:5},bonus:{cellB:8,cellC:13}},
                             row3:{profile:{cellA:21},bonus:{cellB:34,cellC:55}}},
                 profile:{cellA:["Première Colonne"]},
                 bonus:{cellB:["Deuxième Colonne"], cellC:["Troisième colonne"]},
                 tablify:tablify,
                  };
 
  table = new Tablify(sheet.sheet,8,10,structure);
*/
//Exemple 2
  var tablify= {type : "normal",
                title: "Trial",
                rows:{data:["A","B","C"]},
                cols:{format:"STANDARD_NUMBER",
                      formatSpec:{"cellC":"STANDARD_NUMBER"}},
                corner:{name:"CORNER",format:"STANDARD_HEADER"},
                header:{format:"STANDARD_HEADER",
                        generated:{}},
                col0:{data:["MonA","MonB","MonC"]},
                format:"STANDARD_HEADER"};
  var structure={series:{A:[1,2,3,4,5,6,7,8,9,10,11,12],B:[1,2,3,4,5,6,7,8,9,10,11,12],C:[1,2,3,4,5,6,7,8,9,10,11,12]},
                 tablify:tablify,
                };
  var tableNormal = new Tablify(sheet.sheet,20,1,structure);
  
}