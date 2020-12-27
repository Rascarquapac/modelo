var Macro = function (ref) {
  this.ref = ref;
  /**
  
  */
  this.newstep = function(step){
    if (step > 1){
      return((step - step%2)/2);
    }
    else return(1);
  }
  this.greater = function(itemRef, offset){
    if (itemRef >= this.macro[offset][0]) return(true);
    else return(false);
  }
  this.lesser = function(itemRef, offset){
    const shape = this.macro[this.ref];
    if (itemRef < this.macro[offset][0]) {
      if (offset == 0) return(false);
      else if (itemRef < this.macro[offset-1][0]) return(true);
      else return(false);
    }
    else return(false);
  }
  

  this.adaptRefNameToSplit = function(metaItem,macroRef,isDebit){
    switch(macroRef) {
      case "DCsplit" : return( (isDebit) ? ("↑" + metaItem): ("↓" + metaItem));
      case "CDsplit" : return( (isDebit) ? ("↓" + metaItem): ("↑" + metaItem));
      case "":         return(metaItem);
      default : throw "Unexpected macro split instruction";
    }
  }
  
  this.getMacroItemRef = function (item,isDebit){
    var macroRef = "";
    var length = this.macro.lentgh;
    var offset = this.newstep(length);
    var step   = this.newstep(offset);
    while (true){
      if (this.greater(item,offset)){
        offset = offset + step;
      }
      else if (this.lesser(item,offset)){
        offset = offset - step;
      }
      else {
        return(this.adaptRefNameToSplit(this.macro[offset][1],this.macro[offset][2],isDebit));
      }
      step = this.newstep(step);
    }
  }
  
  this.macros = {
    cyanview2020 : [
      [140000, "Δcapital",""],
      [150000, "Δreport",""],                   
      [160000, "ΔgrantCapital","CDsplit"],             
      [170000, "ΔliabilitiesMisc",""],          
      [200000, "ΔloanLT","CDsplit"],                     
      //[210000, "ΔSetup",""],            
      [220000, "ΔfictiveAssets","DCsplit"],            
      //[230000, "ΔFixeAssets_immovable","DCsplit"],
      //[240000, "ΔFixeAssets_tools","DCsplit"],
      //[250000, "ΔFixeAssets_running","DCsplit"],
      //[260000, "ΔFixeAssets_renting","DCsplit"],
      //[270000, "ΔFixeAssets_other","DCsplit"],
      //[280000, "ΔFixeAssets_account","DCsplit"],
      [280000, "ΔfixeAssets","DCsplit"],               
      [290000, "ΔfinancialAssets","DCsplit"],          
      [300000, "ΔreceivablesLT",""],          
      //[310000, "ΔStocks_raw",""], 
      //[320000, "ΔStocks_furnitures",""], 
      //[330000, "ΔStocks_manufacturing",""], 
      //[340000, "ΔStocks_products",""], 
      //[350000, "ΔStocks_goods",""], 
      //[360000, "ΔStocks_immovable",""], 
      //[370000, "ΔStocks_accounts",""], 
      //[380000, "ΔStocks_orders",""], 
      //[400000, "ΔStocks_unused",""], 
      [400000, "Δstocks",""], 
      [410000, "Δcustomers",""],
      [411000, "ΔassetsMisc",""],               
      [412000, "ΔvatCustomers",""], //ΔDutiesReceivable        
      [420000, "ΔassetsMisc",""],               
      [440000, "ΔloanCT","DCsplit"], //ΔLiabilitiesMisc               
      [450000, "Δsuppliers",""],                
      //[451000, "ΔDutiesPayables_ISOC"],
      [451000, "ΔincomeTax",""],                
      //[452000, "ΔDutiesPayables_VAT"],
      //[453000, "ΔDutiesPayables_MISC"],
      //[454000, "ΔDutiesPayables_PRCP"],
      //[455000, "ΔDutiesPayables_ONSS"],
      [454000, "ΔvatSuppliers",""], //ΔDutiesPayable           
      [460000, "Δpayroll",""],                  
      [490000, "ΔloanCT","CDsplit"],                     
      [492000, "ΔassetsMisc",""],               
      [494000, "ΔliabilitiesMisc",""],          
      [495000, "ΔassetsMisc",""],               
      [496000, "ΔliabilitiesMisc",""],          
      [497000, "ΔassetsMisc",""],               
      [498000, "ΔliabilitiesMisc",""],          
      [499000, "ΔassetsMisc",""],               
      [499500, "ΔliabilitiesMisc",""],          
      [500000, "ΔassetsMisc",""],               
      [600000, "Δcash",""],
      //[601000, "Goods_raw",""],   
      //[602000, "Goods_furnitures",""],   
      [602000, "goods",""],                     
      //[603000, "Subcontractors_services",""],   
      //[604000, "Subcontractors_general",""],   
      [604000, "subcontractors",""],            
      //[609000, "Goods_misc",""],                     
      [609000, "goods",""],                     
      [610000, "varStocksRaw",""],                 
      [611005, "r&d costs",""],                 
      [611019, "office costs",""],              
      [611025, "r&d costs",""],                 
      [611030, "employees costs",""],              
      [612000, "office costs",""],              
      [612020, "it costs",""],                 
      [612100, "employees costs",""],           
      [612331, "office costs",""],              
      [612332, "r&d costs",""],                 
      [612333, "marketing costs",""],                 
      [613120, "office costs",""],              
      [613200, "employees costs",""],           
      [613205, "consulting & experts",""],      
      [613225, "employees costs",""],           
      [613235, "marketing costs",""],           
      [613300, "office costs",""],              
      [613400, "cogsOther costs",""],          
      [614000, "office costs",""],              
      [614400, "marketing costs",""],           
      [618000, "office costs",""],           
      [618500, "partners costs",""],            
      [620000, "employees costs",""],           
      [621000, "brute payroll",""],            
      [622000, "onss",""],            
      [630000, "other payroll",""],           
      //[630200, "Setup depreciation",""],
      [630200, "fictiveAssets depreciation",""],
      [630800, "fixeAssets depreciation",""],   
      [630900, "fictiveAssets depreciation",""],
      [631000, "fixeAssets depreciation",""],   
      [632000, "varStocks depreciation",""],    
      [640000, "other depreciation",""],       
      [650000, "other exploitation expenses",""],        
      [660000, "financial expenses",""],        
      [670000, "exceptionnal expenses",""],              
      [680000, "income Tax",""],                
      [690000, "transfers INTO capital",""],         
      [690100, "report exPrec",""],             
      [693000, "transfers INTO capital",""],  
      //[693100, "↓Report",""],
      [693100, "report",""],                    
      [700000, "distribution Out",""],              
      //[705000, "Sales_products",""],            
      //[710000, "Sales_services",""],            
      [710000, "sales",""],            
      [720000, "varStocksProd",""],                 
      [730000, "prodImmob",""],
      //[740100, "Other Revenues_GrantsComExpl",""],             
      //[740300, "Other Revenues_GrantsR&DExpl",""],             
      //[740500, "Other Revenues_GrantsEmployExpl",""],          
      //[740600, "Other Revenues_GrantsR&DExpl",""],             
      //[741000, "Other Revenues_GrantsEmployExpl",""],          
      //[749000, "Other Revenues_misc",""],             
      //[749100, "Other Revenues_GrantsEmployExpl",""],          
      //[750000, "Other Revenues_misc",""],             
      [740100, "grantsComExpl",""],             
      [740300, "grantsR&DExpl",""],             
      [740500, "grantsEmployExpl",""],          
      [740600, "grantsR&DExpl",""],             
      [741000, "grantsEmployExpl",""],          
      [749000, "other revenues",""],             
      [749100, "grantsEmployExpl",""],          
      [750000, "other revenues",""],             
      //[753000, "Financial incomes_financial",""],         
      //[754000, "Financial incomes_grants-amortiz",""],         
      //[760000, "Financial incomes_others",""],         
      [753000, "financial incomes",""],         
      [754000, "grantsCap amorti",""],          
      [760000, "financial incomes",""],         
      [763000, "exceptionnal incomes_virtual",""],       
      [770000, "exceptionnal incomes_real",""],             
      [790000, "exceptionnal incomes_virtual",""],       
      [791000, "report exPrec",""],             
      [793000, "transfers FROM capital",""],
      //[793100, "↑Report",""],
      [793100, "report",""],                    
      [800000, "distribution in",""]
	],
  cvh2020 : [
      [140000, "Δcapital",""],
      [150000, "Δreport",""],                   
      [160000, "ΔgrantCapital","CDsplit"],             
      [170000, "ΔliabilitiesMisc",""],          
      [200000, "ΔloanLT","CDsplit"],                     
      //[210000, "ΔSetup",""],            
      [220000, "ΔfictiveAssets","DCsplit"],            
      //[230000, "ΔFixeAssets_immovable","DCsplit"],
      //[240000, "ΔFixeAssets_tools","DCsplit"],
      //[250000, "ΔFixeAssets_running","DCsplit"],
      //[260000, "ΔFixeAssets_renting","DCsplit"],
      //[270000, "ΔFixeAssets_other","DCsplit"],
      //[280000, "ΔFixeAssets_account","DCsplit"],
      [280000, "ΔfixeAssets","DCsplit"],               
      [290000, "ΔfinancialAssets","DCsplit"],          
      [300000, "ΔreceivablesLT",""],          
      //[310000, "ΔStocks_raw",""], 
      //[320000, "ΔStocks_furnitures",""], 
      //[330000, "ΔStocks_manufacturing",""], 
      //[340000, "ΔStocks_products",""], 
      //[350000, "ΔStocks_goods",""], 
      //[360000, "ΔStocks_immovable",""], 
      //[370000, "ΔStocks_accounts",""], 
      //[380000, "ΔStocks_orders",""], 
      //[400000, "ΔStocks_unused",""], 
      [400000, "Δstocks",""], 
      [410000, "Δcustomers",""],
      [411000, "ΔassetsMisc",""],               
      [412000, "ΔvatCustomers",""], //ΔDutiesReceivable        
      [420000, "ΔassetsMisc",""],               
      [440000, "ΔloanCT","DCsplit"], //ΔLiabilitiesMisc               
      [450000, "Δsuppliers",""],                
      //[451000, "ΔDutiesPayables_ISOC"],
      [451000, "ΔincomeTax",""],                
      //[452000, "ΔDutiesPayables_VAT"],
      //[453000, "ΔDutiesPayables_MISC"],
      //[454000, "ΔDutiesPayables_PRCP"],
      //[455000, "ΔDutiesPayables_ONSS"],
      [454000, "ΔvatSuppliers",""], //ΔDutiesPayable           
      [460000, "Δpayroll",""],                  
      [490000, "ΔloanCT","CDsplit"],                     
      [492000, "ΔassetsMisc",""],               
      [494000, "ΔliabilitiesMisc",""],          
      [495000, "ΔassetsMisc",""],               
      [496000, "ΔliabilitiesMisc",""],          
      [497000, "ΔassetsMisc",""],               
      [498000, "ΔliabilitiesMisc",""],          
      [499000, "ΔassetsMisc",""],               
      [499500, "ΔliabilitiesMisc",""],          
      [500000, "ΔassetsMisc",""],               
      [600000, "Δcash",""],
      //[601000, "Goods_raw",""],   
      //[602000, "Goods_furnitures",""],   
      [602000, "goods",""],  //CVH-OK             
      //[603000, "Subcontractors_services",""],   
      //[604000, "Subcontractors_general",""],   
      [604000, "subcontractors",""],//CVH-OK            
      //[609000, "Goods_misc",""],                     
      [609000, "goods",""], //CVH-OK                    
      [610000, "varStocksRaw",""], //CVH-OK              
      /* Replacement of 61 to 62
      SUPPRESSIN?G meta ITEMS: 
      [611005, "R&D costs",""],                 
      [611019, "Office costs",""],              
      [611025, "R&D costs",""],                 
      [611030, "Employees costs",""],              
      [612000, "Office costs",""],              
      [612020, "IT costs",""],                 
      [612100, "Employees costs",""],           
      [612331, "Office costs",""],              
      [612332, "R&D costs",""],                 
      [612333, "Marketing costs",""],                 
      [613120, "Office costs",""],              
      [613200, "Employees costs",""],           
      [613205, "Consulting & Experts",""],      
      [613225, "Employees costs",""],           
      [613235, "Marketing costs",""],           
      [613300, "Office costs",""],              
      [613400, "CogsOther costs",""],          
      [614000, "Office costs",""],              
      [614400, "Marketing costs",""],           
      [618000, "Office costs",""],           
      [618500, "Partners costs",""],            
      [620000, "Employees costs",""],         
      */
      //START-CVH differences
      //"R&D costs" , "Employees costs" ,"Cogs Other costs" ,SUPPRESSED
      // "Vans costs", "Insurances costs","Misc costs" ADDED
      [612100, "office costs",""],              
      [612400, "vans costs",""],                 
      [613000, "office costs",""],       
      [614000, "consulting & experts",""],       
      [615000, "insurances costs",""],              
      [616000, "it costs",""],              
      [617000, "marketing costs",""],              
      [618000, "brute payroll",""],//Intérimaires                 
      //STOP-CVH differences
      [620200, "partners costs",""],           
      [621000, "brute payroll",""],            
      [622000, "onss",""],            
      [630000, "other payroll",""],           
      //[630200, "Setup depreciation",""],
      [630200, "fictiveAssets depreciation",""],
      [630800, "fixeAssets depreciation",""],   
      [630900, "fictiveAssets depreciation",""],
      [631000, "fixeAssets depreciation",""],   
      [632000, "varStocks depreciation",""],    
      [640000, "other depreciation",""],       
      [650000, "other exploitation expenses",""],        
      [660000, "financial expenses",""],        
      [670000, "exceptionnal expenses",""],              
      [680000, "income tax",""],                
      [690000, "transfers INTO capital",""],         
      [690100, "report exPrec",""],             
      [693000, "transfers INTO capital",""],  
      //[693100, "↓Report",""],
      [693100, "report",""],                    
      [700000, "distribution Out",""],              
      //[705000, "Sales_products",""],            
      //[710000, "Sales_services",""],            
      [710000, "sales",""],            
      [720000, "varStocksProd",""],                 
      [730000, "prodImmob",""],
      //[740100, "Other Revenues_GrantsComExpl",""],             
      //[740300, "Other Revenues_GrantsR&DExpl",""],             
      //[740500, "Other Revenues_GrantsEmployExpl",""],          
      //[740600, "Other Revenues_GrantsR&DExpl",""],             
      //[741000, "Other Revenues_GrantsEmployExpl",""],          
      //[749000, "Other Revenues_misc",""],             
      //[749100, "Other Revenues_GrantsEmployExpl",""],          
      //[750000, "Other Revenues_misc",""],             
      [740100, "grantsComExpl",""],             
      [740300, "grantsR&DExpl",""],             
      [740500, "grantsEmployExpl",""],          
      [740600, "grantsR&DExpl",""],             
      [741000, "grantsEmployExpl",""],          
      [749000, "other revenues",""],             
      [749100, "grantsEmployExpl",""],          
      [750000, "other revenues",""],             
      //[753000, "Financial incomes_financial",""],         
      //[754000, "Financial incomes_grants-amortiz",""],         
      //[760000, "Financial incomes_others",""],         
      [753000, "financial incomes",""],         
      [754000, "grantsCap amorti",""],          
      [760000, "financial incomes",""],         
      [763000, "exceptionnal incomes_virtual",""],       
      [770000, "exceptionnal incomes_real",""],             
      [790000, "exceptionnal incomes_virtual",""],       
      [791000, "report ExPrec",""],             
      [793000, "transfers FROM capital",""],
      //[793100, "↑Report",""],
      [793100, "report",""],                    
      [800000, "distribution in",""]
	]
  }
  this.order={};
    this.order.cyanview2020 = [
    "↑ΔfictiveAssets","↓ΔfictiveAssets","↑ΔfixeAssets","↓ΔfixeAssets", 
    "↑ΔfinancialAssets","↓ΔfinancialAssets","ΔreceivablesLT",          
    "Δstocks", "Δcustomers","ΔvatCustomers",             
    "Δcash",
    "ΔassetsMisc",               
    "Δcapital","Δreport", "↑ΔgrantCapital","↓ΔgrantCapital",             
    "↑ΔloanLT","↓ΔloanLT",               
    "Δsuppliers",
    "ΔincomeTax","ΔvatSuppliers", "Δpayroll",
    "↑ΔloanCT","↓ΔloanCT",
    "ΔliabilitiesMisc",
    "goods", "subcontractors","varStocksRaw",  
    "it costs",
    "r&d costs","office costs", "consulting & experts","marketing costs",         
    "employees costs", "partners costs",
    "cogsOther costs",       
    "brute payroll", "onss","other payroll",
    "fictiveAssets depreciation", "fixeAssets depreciation", 
    "varStocks depreciation","other depreciation",
    "other exploitation expenses",         
    "financial expenses", 
    "exceptionnal expenses",
    "other revenues",
    "income tax",
    "report",                    
    "distribution Out",              
    "transfers INTO capital",    
    "sales","VarStocksProd","ProdImmob",
    "grantsComExpl", "GrantsR&DExpl","GrantsEmployExpl",              
    "financial incomes", "GrantsCap amorti",                  
    "exceptionnal incomes_virtual",       
    "exceptionnal incomes_real",             
    "report ExPrec",             
    "transfers FROM capital",         
    "distribution in"];
  
  this.order.cvh2020 = [
    "↑ΔfictiveAssets","↓ΔfictiveAssets","↑ΔfixeAssets","↓ΔfixeAssets", 
    "↑ΔfinancialAssets","↓ΔfinancialAssets","ΔreceivablesLT",          
    "Δstocks", "Δcustomers","ΔvatCustomers",             
    "Δcash",
    "ΔassetsMisc",               
    "Δcapital","Δreport", "↑ΔgrantCapital","↓ΔgrantCapital",             
    "↑ΔloanLT","↓ΔloanLT",               
    "Δsuppliers",
    "ΔincomeTax","ΔvatSuppliers", "Δpayroll",
    "↑ΔloanCT","↓ΔloanCT",
    "ΔliabilitiesMisc",
    "goods", "subcontractors","varStocksRaw",  
    "it costs",
    "vans costs","office costs", "consulting & experts","marketing costs", //CVH        
    "insurances costs", "partners costs",//CVH
    "misc costs",       //CVH
    "brute payroll", "onss","other payroll",
    "fictiveAssets depreciation", "fixeAssets depreciation", 
    "varStocks depreciation","other depreciation",
    "other exploitation expenses",         
    "financial expenses", 
    "exceptionnal expenses",
    "other revenues",
    "income tax",
    "report",                    
    "distribution out",              
    "transfers INTO capital",    
    "sales","varStocksProd","prodImmob",
    "grantsComExpl", "grantsR&DExpl","grantsEmployExpl",              
    "financial incomes", "grantsCap amorti",                  
    "exceptionnal incomes_virtual",       
    "exceptionnal incomes_real",             
    "report exPrec",             
    "transfers FROM capital",         
    "distribution in"];
 
  // select one macro definition from this.macros object
  this.macro = this.macros[ref];
  this.displayOrder = this.order[ref];

  this.checkMacroDefinition = function (){
    var previousItemRef = 0;
    var currentItemRef = 0;
    for (let i=0; i < this.macro.length; i++){
      currentItemRef = this.macro[i][0];
      if (previousItemRef >= currentItemRef) {
        Message = `Shape ${ref} not coherent: bound ${previousItemRef} is greater than next bound ${currentItemRef} -> must be striclty smaller`;
        throw Message;
      }
      previousItemRef = currentItemRef;
    }
  }
  this.checkMacroDefinition();
}
