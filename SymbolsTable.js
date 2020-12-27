var SymbolsTable = function (){
  var macro = new Macro("cvh2020");
  var metas = macro.displayOrder;
  this.displays  = {};
  this.definition = {};
  this.flatten = function(symbols){
    var result = [];
    for (let i=0; i< symbols.length ; i++){
      if (this.definition.hasOwnProperty(symbols[i])){
        result = result.concat(this.definition[symbols[i]]);
      }
      else
        console.log("ERROR: symbol definition uses a undefined symbol in is right side: "+symbols[i]);    
    }
    return(result);
  }
  this.push = function(symbol,definition){
    console.log("Definition of symbol " + symbol);
    this.definition[symbol] = this.flatten(definition);
  }
  //initiate definition with array of meta items
  this.definition["BSPNL"] = metas.concat([]);
  for (let i=0; i < metas.length; i++){
    this.definition[metas[i]]=[metas[i]];
  }
  //push new symbols
  this.push("Actif",["↑ΔfictiveAssets","↓ΔfictiveAssets","↑ΔfixeAssets","↓ΔfixeAssets","↑ΔfinancialAssets","↓ΔfinancialAssets","ΔreceivablesLT","Δstocks","Δcustomers","ΔvatCustomers","Δcash","ΔassetsMisc"]);               
  this.push("Passif",["Δcapital","Δreport", "↑ΔgrantCapital","↓ΔgrantCapital","↑ΔloanLT","↓ΔloanLT","Δsuppliers","ΔincomeTax","ΔvatSuppliers", "Δpayroll","↑ΔloanCT","↓ΔloanCT","ΔliabilitiesMisc"]);
  this.push("Charges",["goods", "subcontractors","varStocksRaw","it costs","vans costs","office costs", "consulting & experts","marketing costs", //CVH        
                       "insurances costs", "partners costs","misc costs","brute payroll", "onss","other payroll","fictiveAssets depreciation", "fixeAssets depreciation", 
                       "varStocks depreciation","other depreciation","other exploitation expenses",         
                       "financial expenses","exceptionnal expenses","income tax"]);
  this.push("Produits",["sales","varStocksProd","prodImmob","grantsComExpl", "grantsR&DExpl","grantsEmployExpl","other revenues",
                        "financial incomes", "grantsCap amorti","exceptionnal incomes_virtual","exceptionnal incomes_real"]);          
  this.push("Répartitions",["report","distribution out","transfers INTO capital","report exPrec","transfers FROM capital","distribution in"]);
  //Real operational losses
  this.push("Goods",["goods"]);
  this.push("Stock variation",["varStocksRaw","varStocksProd"]);
  this.push("Subcontractors",["subcontractors"]);
  this.push("Goods used",["Goods","Stock variation"]);
  this.push("Variable costs",["Goods used","Subcontractors"]);
  this.push("Payroll",["brute payroll","onss","other payroll"]);
  this.push("Management",["partners costs"]);
  this.push("Payroll full",["Payroll","Management"]);
  this.push("Assurances",["insurances costs"]);//ici
  this.push("Camionettes",["vans costs"]);//ici
  this.push("Working costs",["Assurances","Camionettes"]);
  this.push("Marketing",["marketing costs"]);
  this.push("Consultance",["consulting & experts"]);
  this.push("Marketing & Consultance",["Marketing","Consultance"]);
  this.push("IT costs",["it costs"]);
  this.push("Bureaux",["office costs"]);
  this.push("Other costs",["misc costs","other exploitation expenses"]);//ici
  this.push("Fixed costs",["IT costs","Bureaux","Other costs"]);
  // Fictive operational losses
  this.push("Depreciations",["fictiveAssets depreciation","other depreciation","fixeAssets depreciation","varStocks depreciation"]);
  // Real financial losses
  this.push("Financial expenses",["financial expenses"]);
  //Real extra products & expenses
  this.push("Real extra revenues",["exceptionnal incomes_real","exceptionnal expenses"]);
  //All fictives losses
  this.push("Fictive losses",["Depreciations"]);
  
  //Operational products
  this.push("Sales",["sales"]);
  this.push("Other OP revenues",["grantsComExpl","grantsR&DExpl","grantsEmployExpl","other revenues"]);
  this.push("Revenues",["Sales","Other OP revenues"]);
  //Fictive operational products
  this.push("Fictive production",["prodImmob"]); 
  //Financial products
  this.push("Financial incomes",["financial incomes"]);
  //Fictive financial products
  this.push("Financial amortization",["grantsCap amorti"]);
  //Fictive extra products 
  this.push("Fictive extra",["exceptionnal incomes_virtual"]);
  //All fictives products
  this.push("Amortization",["Fictive production","Financial amortization","Fictive extra"]);

  //Taxation
  this.push("Income tax",["income tax"]);
  //Transfers
  this.push("Transfers",["distribution in","distribution out","transfers INTO capital","transfers FROM capital"]);
  //Assets
  this.push("ΔFictiveAssets",["↑ΔfictiveAssets","↓ΔfictiveAssets"]);
  this.push("ΔFixeAssets",["↑ΔfixeAssets","↓ΔfixeAssets"]);
  this.push("ΔFinancialAssets",["↑ΔfinancialAssets","↓ΔfinancialAssets"]);
  this.push("ΔAssets",["ΔFictiveAssets","ΔFixeAssets","ΔFinancialAssets",]);

  this.push("ΔSuppliers",["Δsuppliers"]);
  this.push("ΔCustomers",["Δcustomers"]);
  this.push("ΔStocks",["Δstocks"]);
  this.push("ΔOthers creances",["ΔvatCustomers","ΔassetsMisc"]);
  this.push("ΔOthers debts",["Δpayroll","ΔvatSuppliers","ΔliabilitiesMisc","↑ΔloanCT","↓ΔloanCT","ΔincomeTax"]);
  //Investment
  this.push("ΔInvestment",["↑ΔfictiveAssets","↓ΔfictiveAssets","↑ΔfixeAssets","↓ΔfixeAssets"]);  
  this.push("ΔReceivablesLT",["ΔreceivablesLT"]);

  //Financement
  this.push("ΔEquities",["Δcapital","Δreport","report","report exPrec"]);
  this.push("ΔGrantCapital",["↑ΔgrantCapital","↓ΔgrantCapital"]);
  this.push("Distribution",["distribution in","distribution out","transfers INTO capital","transfers FROM capital"]);
  this.push("ΔLoanLT",["↑ΔloanLT","↓ΔloanLT"]);
  //Cash
  this.push("ΔCash",["Δcash"]);

  this.push("Marge Brute",["Sales","Variable costs"]);
  this.push("Ebitda",["Marge Brute","Other OP revenues","Payroll full","Working costs","Marketing & Consultance","Fixed costs"]);
  this.push("Profit before taxes",["Ebitda",
                                   "Financial incomes","Financial expenses",
                                   "Real extra revenues",
                                   "Amortization","Depreciations"]);
  this.push("Profit net",["Profit before taxes","Income tax"]);
  //Here, check on "profit net" vs products and charges
  this.push("Cash Flow (BS excl)",["Ebitda",
                                   "Financial incomes","Financial expenses",
                                   "Real extra revenues",
                                   "Income tax"]);
  this.push("Operating Gross Cashflow",["ΔSuppliers","ΔCustomers",
                                        "ΔStocks",
                                        "ΔOthers creances",
                                        "ΔOthers debts"]); 
  this.push("Investing Gross Cashflow",["ΔAssets",
                                        "ΔReceivablesLT",
                                        "Fictive production",
                                        "Depreciations"
                                       ]); 
  this.push("Financing Gross Cashflow",["ΔEquities",
                                        "ΔGrantCapital",
                                        "Financial amortization","Fictive extra",
                                        "ΔLoanLT",
                                        "Transfers"]);
  this.push("Net Cashflow",["Cash Flow (BS excl)",
                            "Operating Gross Cashflow",
                            "Investing Gross Cashflow",
                            "Financing Gross Cashflow"]);
  
  this.check = function(definition,listOfDefinitions){
    var elements= new Elements();
    var left  =[];
    var right =[];
    var merge =[];
    if (this.definition.hasOwnProperty(definition)){
      left = elements.create(this.definition[definition]);
    }
    else
      console.log("ERROR: symbol definition uses a undefined symbol in is right side: "+definition);    
    for (let i=0;i < listOfDefinitions.length;i++){
      if (this.definition.hasOwnProperty(listOfDefinitions[i])){
        merge = merge.concat(this.definition[listOfDefinitions[i]]);
      }
      else
        console.log("ERROR: symbol definition uses a undefined symbol in is right side: "+listOfDefinitions[i]);    
    }
    right =  elements.create(merge);
    elements.equal(left,right);
  }
  console.log("Checking -BSPNL- definition");
  this.check("BSPNL",["Actif","Passif","Charges","Produits","Répartitions"]);
  console.log("Checking -Profit Net- definition");
  this.check("Profit net",["Charges","Produits"]);
  console.log("Checking -Net Cash Flow- definition");
  this.check("BSPNL",["Net Cashflow","ΔCash"]);
  
/*
  this.push("Créances LT",["ΔReceivablesLT"]);
  this.push("Stocks",["ΔStocks"]);
  this.push("Clients",["ΔCustomers"]);
  this.push("Autres créances",["ΔVATcustomers"]);
  this.push("Valeurs disponibles",["ΔCash"]);
  this.push("Régularisations_A",["ΔAssetsMisc"]);
  this.push("Capital et réserves",["ΔCapital"]);
  this.push("Report précédent",["ΔReport"]);
  this.push("Subsides en capital",["↑ΔGrantCapital","↓ΔGrantCapital"]);
  this.push("Dettes LT",["↑ΔLoanLT","↓ΔLoanLT"]);
  this.push("Fournisseurs",["ΔSuppliers"]);
  this.push("Dettes fiscales, salariales et sociales",["ΔIncomeTax","ΔVATsuppliers", "ΔPayroll"]);
  this.push("Autres dettes",["↑ΔLoanCT","↓ΔLoanCT"]);
  this.push("Régularisations_P",["ΔLiabilitiesMisc"]);
  this.push("Chiffre d'affaires",["Sales"]);
  this.push("Production immobilisée",["ProdImmob"]);
  this.push("Variation de stocks produits",["VarStocksProd"]);
  this.push("Autres produits d'exploitation",["GrantsComExpl", "GrantsR&DExpl","GrantsEmployExpl","Other Revenues"]);
  this.push("Achats",["Goods", "Subcontractors","VarStocksRaw"]);
  //this.push("Var Stocks",[""]);//
  this.push("Services et biens divers",["IT costs",
    "Insurances costs","Office costs", "Consulting & Experts","Marketing costs",         
    "Vans costs", "Partners costs",
    "Misc costs"]);//iciCVH
  this.push("Rémunérations, charges sociales et pensions",["Brute payroll", "ONSS","Other payroll",]);
  this.push("Amortissements et réductions de valeur ",["FictiveAssets depreciation", "FixeAssets depreciation", 
    "VarStocks depreciation","Other depreciation"]);
  this.push("Autres charges d'exploitation",["Other exploitation expenses"]);
  this.push("Produits financiers",["Financial incomes", "Financial amortization"]);
  this.push("Charges financières",["Financial expenses"]);
  this.push("Charges exceptionnelles",["Exceptionnal expenses"]);
  this.push("Produits exceptionnels",["Exceptionnal incomes_virtual","Exceptionnal incomes_real"]);
  this.push("Impôts sur le résultat",["Income Tax"]);
  this.push("Transferts aux réserves",["Transfers INTO capital"]);
  this.push("Affectations résultats-69",["Report ExPrec","Report","Distribution Out"]);
  this.push("Affectations résultats-77-79",["Transfers FROM capital","Distribution In"]);
    //Creating display order of the detailedBS items
  */
  this.displays.top= ["Matériaux/Souscontractants",
                       "Ouvriers/Employés/Dirigeant",
                       "Dirigeants",
                       "Personnel Brut",
                       "Lois sociales",
                       "Personnel autres",
                       "Locations/Assurances",
                       "Gestion/Consultance/Marketing",
                       "Bénéfice exploitation",
                       "Sales",
                       "Marge Brute",
                       "ΔStocks",
                       "Production Immobilisée",
                       "Ebitda",
                       "Amortissements","Amortis. Capital","Produits financiers","Résultats exceptionnels",
                       "Profit avant taxes",
                       "Taxe sur le bénéfice",
                       "Profit net",
                       "Cash Flow (BS excl)",
                       "Evolution Dettes fournisseurs",
                       "Evolution Créances clients",
                       "ΔStocks",
                       "ΔAutres dettes et créances",
                       "Operating Gross Cashflow",
                       "ΔInvestissement",
                       "ΔCréances LT",
                       "Investing Gross Cashflow",
                       "Augmentation de capital",
                       "Quasi-capital",
                       "Distribution",
                       "Prêts",
                       "Financing Gross Cashflow",
                       "Net Cashflow",
                       "ΔCash"];
  this.displays.cashflow=["sales","Sales","Marge Brute","Bénéfice exploitation",
                       "Production Immobilisée",
                       "Ebitda",
                       "Profit avant taxes",
                       "Profit net",
                       "Cash Flow (BS excl)",
                       "Operating Gross Cashflow",
                       "Investing Gross Cashflow",
                       "Augmentation de capital",
                       "Quasi-capital",
                       "Distribution",
                       "Prêts",
                       "Financing Gross Cashflow",
                       "Net Cashflow",
                       "ΔCash"];

  this.displays.detailed =["Immobilisations incorporelles","Immobilisations corporelles","Immobilisations financières","Créances LT","Stocks","Clients","Autres créances","Valeurs disponibles","Régularisations_A",
  "Capital et réserves","Report précédent","Subsides en capital","Dettes LT","Fournisseurs","Dettes fiscales, salariales et sociales","Autres dettes","Régularisations_P",
  "Chiffre d'affaires","Production immobilisée","Variation de stocks produits","Autres produits d'exploitation",
  "Achats","Services et biens divers","Rémunérations, charges sociales et pensions","Amortissements et réductions de valeur ","Autres charges d'exploitation",
  "Produits financiers","Charges financières","Produits exceptionnels","Charges exceptionnelles",
  "Impôts sur le résultat","Transferts aux réserves","Affectations résultats-69","Affectations résultats-77-79"];
  
  
}