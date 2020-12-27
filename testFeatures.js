function testResultDefinitions(){
  var definition = new ResultDefinition();
  var elements   = new Elements();
  var macro      = new Macro("cvh2020");
  var listPlus   = definition.listerPlus("detailed");
  //console.log("LISTPLUS");
  //console.log(listPlus);
  var listMinus  = definition.listerMinus("detailed");
  //console.log("LISTMINUS");
  //console.log(listMinus);
  var elemsPlus  = elements.create(listPlus);
  //console.log("ELEMSPLUS");
  //console.log(elemsPlus);
  var elemsMinus  = elements.create(listMinus);
  //console.log("ELEMSMINUS");
  //console.log(elemsMinus);
  var elemsRes   = elements.minus(elemsPlus,elemsMinus);
  var elemsRef   = elements.create(macro.displayOrder);
  var result     = elements.minus(elemsRes, elemsRef);
  var test       = elements.normalize(result);
  console.log("DIFFERENCE");
  console.log(test);
  var equal = elements.equal(elemsRes, elemsRef);
  console.log("EQUALITY");
  Logger.log(equal);
}

function testFinancialDefinitions(){
  var definition = new FinancialDefinition();
  var elements   = new Elements();
  var macro = new Macro("cvh2020");
  var list = definition.lister("standard");
  var elems2test = elements.create(list);
  var elemsAsRef  = elements.create(macro.displayOrder);
  var result      = elements.minus(elems2test, elemsAsRef);
  Logger.log(result);
  var test = elements.normalize(result);
  Logger.log(test);
  var equal = elements.equal(elems2test, elemsAsRef);
  Logger.log(equal);
}

function testElements(){
  
  var ListA=["A","B","C","A","B","C","D","E","F"]; 
  var ListB=["A","B","C","E","F"];
  var ListC=["A","B","C","A","B","C","D"];  
  var ListD=["A","B","C"];
  var A = new Elements();
  var ObjectA = A.create(ListA);
  var ObjectB = A.create(ListB);
  var ObjectC = A.create(ListC);
  ObjectA = A.minus(ObjectA,ObjectB)
  console.log(ObjectA);
  ObjectA = A.minus(ObjectA,ObjectC)
  console.log(ObjectA);
  ObjectA = A.normalize(ObjectA);
  console.log(ObjectA);
  var ObjectD = A.create(ListD);
  ObjectA= A.add(ObjectA,ObjectD);
  ObjectA = A.normalize(ObjectA);
  console.log(ObjectA);
  console.log(A.isEmpty(ObjectA));
  //var res = new Elements(ListC);
  //A.add(B);
  //console.log(A.syms);
}
function testEqualElements(){
  var ListA=["A","B","C","A","B","C","D","E","F"]; 
  var ListB=["A","B","C","E","F"];
  var ListC=["A","B","C","A","B","C","D"];  
  var ListD=["A","B","C"];
  var A = new Elements();
  var ObjectA = A.create(ListA);
  var ObjectB = A.create(ListB);
  var ObjectC = A.create(ListC);
  var ObjectD = A.create(ListD);
  A.equal(ObjectA,ObjectB);
  A.equal(ObjectD,ObjectB);
}
