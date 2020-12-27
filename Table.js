var Table = function(sheet,rowI,colI,structure){
  this.data= structure.tablify.data;
  this.view= structure.tablify.view;
  this.type= structure.tablify.type;
  this.title= structure.tablify.title;
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
  
  this.extensive = function(sheet,rowI,colI,structure){
    var corner = new Block([[this.data.corner]]).check().initiate(sheet,rowI,colI).setValues().setStyle("STANDARD_HEADER");
    var list = [];
    for (let key of structure.expose.cols){
      if (this.data.header.hasOwnProperty(key)) list.push(this.data.header[key]);
      else list.push([key]);
    }
    var header =  new Block([list]).check().initiate(sheet,rowI,colI+1).setValues().setStyle("STANDARD_HEADER");
    var list = [];
    for (let key of structure.expose.rows){
      if (this.data.lefter.hasOwnProperty(key)) list.push([this.data.lefter[key]]);
      else list.push([[key]]);
    }
    var lefter =  new Block(list).check().initiate(sheet,rowI+1,colI).setValues().setStyle("STANDARD_HEADER").setColumnSize(100);
    var core   =  new Block(structure.expose.core).check().initiate(sheet,rowI+1,colI+1).setValues().setStyle("STANDARD_NUMBER").setColumnSize(40);
  }
  
  
  this.serie = function(sheet,rowI,colI,structure){
    var corner = new Block([[this.data.corner],[this.data.corner]]).check().initiate(sheet,rowI,colI).setValues().setStyle("STANDARD_HEADER");  
    var header =  new Block(this.computeHeader(12,12,2010,0)).check().initiate(sheet,rowI,colI+1).setValues().setStyle("STANDARD_HEADER").setPeriodicStyle(12);
    var list = [];
    for (let key of structure.expose.rows){
      if (this.data.lefter.hasOwnProperty(key)) list.push([this.data.lefter[key]]);
      else list.push([[key]]);
    }
    var lefter =  new Block(list).check().initiate(sheet,rowI+2,colI).setValues().setStyle("STANDARD_HEADER").setColumnSize(100);
    var core   =  new Block(structure.expose.core).check().initiate(sheet,rowI+2,colI+1).setValues().setStyle("STANDARD_NUMBER").setColumnSize(40);
  }
  
  if (this.type == "extensive") this.extensive(sheet,rowI,colI,structure);
  else if (this.type == "serie") this.serie(sheet,rowI,colI,structure);
                                               
}
function testTable(){
  //    ["corner", "header","lefter","core","leftBotter","botter"]){
  var sheet = new Sheets("Modelo-debug", "Staff");
  var structure ={};
  structure.expose={core: [[1,2,3],[4,5,9],[7,8,9]],
                    cols: ["A","B","C"],
                    rows: ["R1","R2","R3"]};
  structure.tablify= {type : "extensive",title: "Trial",
                data: 
                {corner: "CORNER",
                 header:{A:"Première Colonne",B:"Deuxième Colonne",C:"Troisième Colonne"},
                 lefter:{R1:"Première ligne",R2:"Deuxième ligne",R3:"Troisième ligne"},
                 core:{},
                 leftBotter:"Total",
                 botter:{}},
                view:{}
               };
  table = new Table(sheet.sheet,1,1,structure);

//Exemple 2
  structure.expose={core:[[1,2,3,4,5,6,7,8,9,10,11,12],[1,2,3,4,5,6,7,8,9,10,11,12],[1,2,3,4,5,6,7,8,9,10,11,12]],
                    cols:[],
                    rows: ["R1","R2","R3"]};
  structure.tablify= {type:"serie",title: "SERIES",
                      data: 
                      {corner: "CORNER",
                       header:{},
                       lefter:{R1:"Première série",R2:"Deuxième série",R3:"Troisième série"},
                       core:{},
                       leftBotter:"Total",
                       botter:{}},
                      view:{}
                     }
  var tableNormal = new Table(sheet.sheet,8,1,structure);
 
}