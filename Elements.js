var Elements = function(){
  this.elements={};
  this.create = function (list){
    var value = 0;
    var element = "";
    var elements = {};
    for (let i=0; i < list.length;i++){
      element = list[i];
      if (elements.hasOwnProperty(element) ){
        value = elements[element];
        value = value + 1;
        elements[element] = value;
      }
      else {
        elements[element] = 1;
      }
    }
    return(elements);
  }
  
  this.add = function(elementsA,elementsB){
    var elements = {};
    for (var element in elementsA){
      if (elementsB.hasOwnProperty(element)){ // element is in A INTER B
        elements[element] = elementsA[element] + elementsB[element];
      }
      else {
        elements[element] = elementsA[element];
      }
    }
    for (var element in elementsB){
      if (elements.hasOwnProperty(element) == false){//so element is in B but not in A
        elements[element] = elementsB[element];
      }
    }
    return(elements);
  }
  
  this.minus = function(elementsA,elementsB){
    var elements ={};
    for (var element in elementsA){
      if (elementsB.hasOwnProperty(element)){
        elements[element] = elementsA[element] - elementsB[element];
      }
      else {
        elements[element] = elementsA[element];
      }
    }
    for (var element in elementsB){
      if (elements.hasOwnProperty(element) == false){//so element is in B but not in A
        elements[element] = -elementsB[element];
      }
    }
    return(elements);
  }
  
  this.normalize = function (elements){
    var normalized={};
    for (var element in elements){
      if (elements[element] != 0){
        normalized[element] = elements[element];
      }
    }
    return(normalized);
  }
  
  this.isEmpty = function(elements) {
    for(var prop in elements) {
        if(elements.hasOwnProperty(prop))
            return false;
    }
    return true;
  }
  
  this.equal = function (elementsA,elementsB){
    var elements = {};
    elements = this.normalize(this.minus(elementsA,elementsB));
    if (this.isEmpty(elements)) 
      console.log("Operands are equal");
    else {
      console.log("Difference between lists: ");
      console.log(elements);
    }
  }
  
  this.isequal = function (elementsA,elementsB){
    var elements = {};
    elements = this.normalize(this.minus(elementsA,elementsB));
    return (this.isEmpty(elements) ? true : false)
  }
  
  /**
  * Compare the difference of two lists of Items to the reference metaItems
  */
  this.compare2Meta =  function (listPlus,listMinus){
    // load meta definitions as references to compare
    var macro      = new Macro("cvh2020");
    var elemsRef   = this.create(macro.displayOrder);
    // Elements
    var elemsPlus,elemsMinus,elemsDiff,elemsRes,elemsTest= {};
    elemsPlus  = this.create(listPlus);
    elemsMinus = this.create(listMinus);
    elemsDiff  = this.minus(elemsPlus,elemsMinus);
    elemsRes   = this.minus(elemsRef,elemsDiff);
    elemsTest  = this.normalize(elemsRes);
    console.log("DIFFERENCE BETWEEN LIST =");
    console.log (elemsTest);
  }
}