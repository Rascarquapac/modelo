var ResultDefinition = function (resDefRef){
  //Creating display 
  this.order  = {};
  this.resDef = {};
  this.title  = {};

  this.resDef.standard ={};
  this.resDef.standard["↑ΔFictiveAssets"]=[["↑ΔFictiveAssets"],[]];
  this.resDef.standard["↓ΔFictiveAssets"]=[["↓ΔFictiveAssets"],[]];
  this.resDef.standard["↑ΔFixeAssets"]=[["↑ΔFixeAssets"],[]];
  this.resDef.standard["↓ΔFixeAssets"]=[["↓ΔFixeAssets"],[]];
  this.resDef.standard["ΔReceivablesLT"]=[["ΔReceivablesLT"],[]];
  this.resDef.standard["ΔStocks"]=[["ΔStocks"],[]];
  this.resDef.standard["ΔCustomers"]=[["ΔCustomers"],[]];
  this.resDef.standard["ΔVATcustomers"]=[["ΔVATcustomers"],[]];
  this.resDef.standard["ΔCash"]=[["ΔCash"],[]];
  this.resDef.standard["ΔAssetsMisc"]=[["ΔAssetsMisc","↑ΔFinancialAssets","↓ΔFinancialAssets"],[]];

  this.resDef.standard["ΔCapital"]=[["ΔCapital"],[]];
  this.resDef.standard["ΔReport"]=[["ΔReport"],[]];
  this.resDef.standard["ΔGrantCapital"]=[["↑ΔGrantCapital","↓ΔGrantCapital"],[]];
  this.resDef.standard["↑ΔLoan"]=[["↑ΔLoanLT"],[]];
  this.resDef.standard["↓ΔLoan"]=[["↓ΔLoanLT"],[]];
  this.resDef.standard["ΔIncomeTax"]=[["ΔIncomeTax"],[]];
  this.resDef.standard["ΔVATsuppliers"]=[["ΔVATsuppliers"],[]];
  this.resDef.standard["ΔPayroll"]=[["ΔPayroll"],[]];
  this.resDef.standard["ΔSuppliers"]=[["ΔSuppliers"],[]];
  this.resDef.standard["ΔLiabilitiesMisc"]=[["ΔLiabilitiesMisc","↑ΔLoanCT","↓ΔLoanCT"],[]];

  this.resDef.standard["Sales"]=[["Sales"],[]];
  this.resDef.standard["Sales credits"]=[["VarStocksProd"],[]];//check how "null item" is processed
  this.resDef.standard["ProdImmob"]=[["ProdImmob"],[]];
  this.resDef.standard["GrantsComExpl"]=[["GrantsComExpl"],[]];
  this.resDef.standard["GrantsR&DExpl"]=[["GrantsR&DExpl"],[]];
  this.resDef.standard["GrantsEmployExpl"]=[["GrantsEmployExpl"],[]];
  this.resDef.standard["OthersExpExpl"]=[["Other Revenues"],[]];
  //CVH SUPPRESSED: "R&D costs" , "Employees costs" ,"Cogs Other costs"
  //CVH ADDED:  "Vans costs", "Insurances costs","Misc costs" 

  this.resDef.standard["Goods"]=[["Goods"],[]];
  this.resDef.standard["Subcontractors"]=[["Subcontractors"],[]];
  this.resDef.standard["VarStocks"]=[["VarStocksRaw"],[]];
  this.resDef.standard["IT costs"]=[["IT costs"],[]];
  this.resDef.standard["Office costs"]=[["Office costs"],[]];
  this.resDef.standard["Partners costs"]=[["Partners costs"],[]];
  this.resDef.standard["Vans costs"]=[["Vans costs"],[]];//ici
  this.resDef.standard["Misc costs"]=[["Misc costs"],[]];//ici
  this.resDef.standard["Consulting & Experts"]=[["Consulting & Experts"],[]];
  this.resDef.standard["Marketing costs"]=[["Marketing costs"],[]];
  this.resDef.standard["Insurances costs"]=[["Insurances costs"],[]];//ici

  this.resDef.standard["Brute payroll"]=[["Brute payroll"],[]];
  this.resDef.standard["ONSS"]=[["ONSS"],[]];
  this.resDef.standard["Other payroll"]=[["Other payroll"],[]];
  this.resDef.standard["FictiveAssets depreciation"]=[["FictiveAssets depreciation","Other depreciation"],[]];
  this.resDef.standard["RealAssets depreciation"]=[["FixeAssets depreciation","VarStocks depreciation"],[]];

  this.resDef.standard["Financial incomes"] =[["Financial incomes"],[]];
  this.resDef.standard["GrantsCap amorti"]  =[["GrantsCap amorti"],[]];
  this.resDef.standard["Financial expenses"]=[["Financial expenses"],[]];
  this.resDef.standard["Extraord incomes"]  =[["Exceptionnal incomes_real","Exceptionnal incomes_virtual","Exceptionnal expenses","Other exploitation expenses"],[]];
  this.resDef.standard["Income Tax"]=[["Income Tax"],[]];
  this.resDef.standard["Distribution"]=[["Distribution In","Distribution Out","Transfers INTO capital","Transfers FROM capital"],[]];
  this.resDef.standard["Report"]=[["Report"],[]];
  this.resDef.standard["Report ExPrec"]=[["Report ExPrec"],[]];

  this.order.standard = ["↑ΔFictiveAssets","↓ΔFictiveAssets","↑ΔFixeAssets","↓ΔFixeAssets","ΔStocks","ΔCustomers","ΔVATcustomers","ΔCash","ΔAssetsMisc",
                         "ΔCapital","ΔReport","ΔGrantCapital","↑ΔLoan","↓ΔLoan","ΔIncomeTax","ΔVATsuppliers","ΔPayroll","ΔSuppliers","ΔLiabilitiesMisc",
                         "Sales","Sales credits","ProdImmob","GrantsComExpl","GrantsR&DExpl","GrantsEmployExpl","OthersExpExpl",
                         "Goods","Subcontractors","VarStocks",
                         "IT costs","Office costs","Partners costs","Vans costs","Misc costs","Consulting & Experts","Marketing costs","Insurances costs", //ici
                         "Brute payroll","ONSS","Other payroll",
                         "FictiveAssets depreciation","RealAssets depreciation",
                         "Financial incomes","GrantsCap amorti","Financial expenses",
                         "Extraord incomes",
                         "Income Tax","Distribution","Report","Report ExPrec"];  
  this.title.standard={};
  
  this.resDef.ebitda ={};
  this.resDef.ebitda["Sales"]=[["sales"],[]];
  this.resDef.ebitda["Goods"]=[["goods"],[]];
  this.resDef.ebitda["Variation de Stock"]=[["varStocksRaw","varStocksProd"],[]];
  this.resDef.ebitda["IT costs"]=[["it costs"],[]];
//  this.resDef.ebitda["Ouvriers et employés"]=[["brute payroll","other payroll"],[]];
//  this.resDef.ebitda["Ouvriers/employés/dirigeant"]=[["brute payroll","onss","other payroll"],[]];
  this.resDef.ebitda["Dirigeants"]=[["partners costs"],[]];
  this.resDef.ebitda["Personnel Brut"]=[["brute payroll"],[]];
  this.resDef.ebitda["Lois sociales"]=[["onss"],[]];
  this.resDef.ebitda["Personnel autres"]=[["other payroll"],[]];
  this.resDef.ebitda["Sous-contractants"]=[["subcontractors"],[]];
  this.resDef.ebitda["Assurances"]=[["insurances costs"],[]];//ici
  this.resDef.ebitda["Camionettes"]=[["vans costs"],[]];//ici
  this.resDef.ebitda["Marketing"]=[["marketing costs"],[]];
  this.resDef.ebitda["Consultance & Experts"]=[["consulting & experts"],[]];
  this.resDef.ebitda["Frais de bureau"]=[["office costs"],[]];
  this.resDef.ebitda["Autres coûts"]=[["misc costs"],[]];//ici
  this.resDef.ebitda["Autres résultats d'exploitation"]=[["grantsComExpl","grantsR&DExpl","grantsEmployExpl","other revenues"],[]];
  this.resDef.ebitda["ΔStocks"]=[["Δstocks"],[]];
  this.resDef.ebitda["Production Immobilisée"]=[["prodImmob"],[]]; 
  //
  this.resDef.ebitda["Amortissements"]=[["fictiveAssets depreciation","other depreciation","fixeAssets depreciation","varStocks depreciation"],[]];
  this.resDef.ebitda["Amortis. Capital"]=[["grantsCap amorti"],[]];
  this.resDef.ebitda["Produits financiers"] =[["financial incomes"],[]];
  this.resDef.ebitda["Résultats exceptionnels"]  =[["exceptionnal incomes_real","exceptionnal incomes_virtual","exceptionnal expenses","other exploitation expenses"],[]];
  this.resDef.ebitda["Taxe sur le bénéfice"]=[["income tax"],[]];
  //
  this.resDef.ebitda["Evolution Dettes fournisseurs"]=[["Δsuppliers"],[]];
  this.resDef.ebitda["Evolution Créances clients"]=[["Δcustomers"],[]];
  this.resDef.ebitda["ΔStocks"]=[["Δstocks"],[]];
  this.resDef.ebitda["ΔAutres dettes et créances"]=[["Δpayroll","ΔvatCustomers","ΔvatSuppliers","ΔliabilitiesMisc","↑ΔloanCT","↓ΔloanCT","ΔincomeTax","ΔassetsMisc"],[]];
  //Investissement
  this.resDef.ebitda["ΔInvestissement"]=[["↑ΔfictiveAssets","↓ΔfictiveAssets","↑ΔfixeAssets","↓ΔfixeAssets"],[]];  
  this.resDef.ebitda["ΔCréances LT"]=[["↑ΔfinancialAssets","↓ΔfinancialAssets","ΔreceivablesLT"],[]];

  //Financement
  this.resDef.ebitda["Augmentation de capital"]=[["Δcapital","Δreport","report","report exPrec"],[]];
  this.resDef.ebitda["Quasi-capital"]=[["↑ΔgrantCapital","↓ΔgrantCapital"],[]];
  this.resDef.ebitda["Distribution"]=[["distribution in","distribution out","transfers INTO capital","transfers FROM capital"],[]];
  this.resDef.ebitda["Prêts"]=[["↑ΔloanLT","↓ΔloanLT"],[]];
  this.resDef.ebitda["Intérêts"]=[["financial expenses"],[]];
  
  this.resDef.ebitda["ΔCash"]=[["Δcash"],[]];

  this.order.ebitda = ["Matériaux/Souscontractants",
                       "Ouvriers/Employés/Dirigeant",
                       "Dirigeants",
                       "Personnel Brut",
                       "Lois sociales",
                       "Personnel autres",
                       "Locations/Assurances",
                       "Gestion/Consultance/Marketing",
                       "Bénéfice exploitation",
                       "Ventes",
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
  this.invert = ["Ventes","Marge Brute","Bénéfice exploitation",
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

  //CVH SUPPRESSED: "R&D costs" , "Employees costs" ,"Cogs Other costs"
  //CVH ADDED:  "Vans costs", "Insurances costs","Misc costs" 
  this.title.ebitda ={};
  this.title.ebitda["Ventes"]=[["Sales","GrantsComExpl","GrantsR&DExpl","GrantsEmployExpl","Other Revenues"],[]];
  this.title.ebitda["Matériaux/Souscontractants"]=[["Goods","Variation Stocks","Subcontractors"],[]]; 
  this.title.ebitda["Marchandises"]=[["Goods","Variation Stocks"],[]];
  this.title.ebitda["Marge Brute"]=[["Sales","GrantsComExpl","GrantsR&DExpl","GrantsEmployExpl","Other Revenues",
                               "Goods","Variation Stocks","Subcontractors"],[]];
  this.title.ebitda["Bénéfice exploitation"]=[["Sales","GrantsComExpl","GrantsR&DExpl","GrantsEmployExpl","Other Revenues",
                                               "Goods","VarStocksRaw","VarStocksProd","Subcontractors",
                                               "Brute payroll","ONSS","Other payroll","Partners costs",
                                               "Vans costs","Insurances costs",
                                               "Consulting & Experts","Marketing costs","Office costs","Misc costs"
                                              ],[]];
  this.title.ebitda["Ebitda"]=[["Sales","GrantsComExpl","GrantsR&DExpl","GrantsEmployExpl","Other Revenues",
                                "Goods","VarStocksRaw","VarStocksProd","Subcontractors",
                                "Brute payroll","ONSS","Other payroll","Partners costs",
                                "Vans costs","Insurances costs",
                                "Consulting & Experts","Marketing costs","Office costs","Misc costs",
                                "ΔStocks",
                                "ProdImmob"],[]]; //ProdImmob ???
  this.title.ebitda["Ouvriers/Employés/Dirigeant"]=[["Brute payroll","ONSS","Other payroll","Partners costs"],[]];
  this.title.ebitda["Locations/Assurances"]=[["Vans costs","Insurances costs"],[]];
  this.title.ebitda["Gestion/Consultance/Marketing"]=[["Consulting & Experts","Marketing costs","Office costs","Misc costs"],[]];
  //
  this.title.ebitda["Sous-contractants"]=[["Subcontractors"],[]];
  this.title.ebitda["Locations"]=[["Vans costs"],[]];
  this.title.ebitda["Assurances"]=[["Insurances costs"],[]];
  this.title.ebitda["Frais de gestion"]=[["Office costs","Misc costs"],[]];
  this.title.ebitda["Consultance et marketing"]=[["Consulting & Experts","Marketing costs"],[]];
  
  this.title.ebitda["Coût Main d'oeuvre et dirigeants"]=[["Brute payroll","ONSS","Other payroll","Partners costs","Subcontractors"],[]];
  this.title.ebitda["Revenus d'exploitation"]=[["IT costs","Brute payroll","ONSS","Other payroll","Subcontractors","Office costs","Vans costs"],[]];
  this.title.ebitda["Profit avant taxes"]=[["Sales","Goods","VarStocksRaw","VarStocksProd",
                                            "IT costs",
                                            "Brute payroll","ONSS","Other payroll","Subcontractors",
                                            "Office costs","Vans costs","Misc costs","Marketing costs","Insurances costs","Consulting & Experts",
                                            "GrantsComExpl","GrantsR&DExpl","GrantsEmployExpl","Other Revenues",
                                            "ΔStocks",
                                            "ProdImmob",
                                            "FictiveAssets depreciation","Other depreciation","FixeAssets depreciation","VarStocks depreciation",
                                            "GrantsCap amorti",
                                            "Financial incomes",
                                            "Exceptionnal incomes_real","Exceptionnal incomes_virtual","Exceptionnal expenses","Other exploitation expenses"],[]];
  this.title.ebitda["Profit net"]=[["Sales","Goods","VarStocksRaw","VarStocksProd",
                                    "IT costs",
                                    "Brute payroll","ONSS","Other payroll","Subcontractors",
                                    "Office costs","Vans costs","Misc costs","Marketing costs","Insurances costs","Consulting & Experts",
                                    "GrantsComExpl","GrantsR&DExpl","GrantsEmployExpl","Other Revenues",
                                    "ΔStocks",
                                    "ProdImmob",
                                    "FictiveAssets depreciation","Other depreciation","FixeAssets depreciation","VarStocks depreciation",
                                    "GrantsCap amorti",
                                    "Financial incomes",
                                    "Exceptionnal incomes_real","Exceptionnal incomes_virtual","Exceptionnal expenses","Other exploitation expenses",
                                    "Income Tax"],[]];
  this.title.ebitda["Cash Flow (BS excl)"]=[["Sales","Goods",
                                             "VarStocksRaw","VarStocksProd",
                                             "IT costs",
                                             "Brute payroll","ONSS","Other payroll","Subcontractors",
                                             "Partners costs",
                                             "Office costs","Vans costs","Misc costs","Marketing costs","Insurances costs","Consulting & Experts",
                                             "GrantsComExpl","GrantsR&DExpl","GrantsEmployExpl","Other Revenues",
                                             //"ProdImmob",
                                             "FictiveAssets depreciation","Other depreciation","FixeAssets depreciation","VarStocks depreciation",
                                             //"GrantsCap amorti",
                                             "Financial incomes",
                                             "Exceptionnal incomes_real","Exceptionnal incomes_virtual","Exceptionnal expenses","Other exploitation expenses",
                                             "Income Tax"],[]];
  this.title.ebitda["Operating Gross Cashflow"]=[["ΔSuppliers","ΔCustomers",
                                                  "ΔStocks",
                                                  "ΔPayroll","ΔVATcustomers","ΔVATsuppliers","ΔLiabilitiesMisc","↑ΔLoanCT","↓ΔLoanCT","ΔIncomeTax","ΔAssetsMisc"],[]];
  
  this.title.ebitda["Investing Gross Cashflow"]=[["↑ΔFictiveAssets","↓ΔFictiveAssets","↑ΔFixeAssets","↓ΔFixeAssets",
                                                  "↑ΔFinancialAssets","↓ΔFinancialAssets","ΔReceivablesLT",
                                                  "ProdImmob"//(+)"ProdImmob"
                                                 ],[]];
  
  this.title.ebitda["Financing Gross Cashflow"]=[["ΔCapital","ΔReport","Report","Report ExPrec",
                                                  "↑ΔGrantCapital","↓ΔGrantCapital",
                                                  "GrantsCap amorti",//(+)"GrantsCap amorti",
                                                  "Distribution In","Distribution Out","Transfers INTO capital","Transfers FROM capital",
                                                  "↑ΔLoanLT","↓ΔLoanLT",
                                                  "Financial expenses"],[]];
  this.title.ebitda["Net Cashflow"]=[["Sales","Goods", //Cashflow (BS excl)
                                      //(-)"VarStocksRaw","VarStocksProd",
                                      "IT costs",
                                      "Partners costs",
                                      "Brute payroll","ONSS","Other payroll","Subcontractors",
                                      "Office costs","Vans costs","Misc costs","Marketing costs","Insurances costs","Consulting & Experts",
                                      "GrantsComExpl","GrantsR&DExpl","GrantsEmployExpl","Other Revenues",
                                      //(-)"ProdImmob",
                                      "FictiveAssets depreciation","Other depreciation","FixeAssets depreciation","VarStocks depreciation",
                                      //(-)"GrantsCap amorti",
                                      "Financial incomes",
                                      "Exceptionnal incomes_real","Exceptionnal incomes_virtual","Exceptionnal expenses","Other exploitation expenses",
                                      "Income Tax",
                                      //Operating Gross Cashflow
                                      "ΔSuppliers","ΔCustomers",
                                      "ΔStocks",
                                      "VarStocksRaw","VarStocksProd",//(+)"VarStocksRaw","VarStocksProd",
                                      //(-)"ProdImmob"
                                      "ΔPayroll","ΔVATcustomers","ΔVATsuppliers","ΔLiabilitiesMisc","↑ΔLoanCT","↓ΔLoanCT","ΔIncomeTax","ΔAssetsMisc",
                                      //Investing Gross cashflow
                                      "↑ΔFictiveAssets","↓ΔFictiveAssets","↑ΔFixeAssets","↓ΔFixeAssets",
                                      "↑ΔFinancialAssets","↓ΔFinancialAssets","ΔReceivablesLT", 
                                      "ProdImmob",//(+)"ProdImmob"
                                      //Financing Gross Cashflow
                                      "ΔCapital","ΔReport","Report","Report ExPrec",
                                      "↑ΔGrantCapital","↓ΔGrantCapital",
                                      "GrantsCap amorti",//(+)"GrantsCap amorti",
                                      "Distribution In","Distribution Out","Transfers INTO capital","Transfers FROM capital",
                                      "↑ΔLoanLT","↓ΔLoanLT",
                                      "Financial expenses"],[]];
  

  this.resDef.detailed={};
  this.resDef.detailed["Immobilisations incorporelles"] = [["↑ΔFictiveAssets","↓ΔFictiveAssets"],[]];
  this.resDef.detailed["Immobilisations corporelles"] = [["↑ΔFixeAssets","↓ΔFixeAssets"],[]];
  this.resDef.detailed["Immobilisations financières"] = [["↑ΔFinancialAssets","↓ΔFinancialAssets"],[]];
  this.resDef.detailed["Créances LT"]=[["ΔReceivablesLT"],[]];
  this.resDef.detailed["Stocks"] = [["ΔStocks"],[]];
  this.resDef.detailed["Clients"] = [["ΔCustomers"],[]];
  this.resDef.detailed["Autres créances"] = [["ΔVATcustomers"],[]];
  this.resDef.detailed["Valeurs disponibles"] = [["ΔCash"],[]];
  this.resDef.detailed["Régularisations_A"] = [["ΔAssetsMisc"],[]];
  this.resDef.detailed["Capital et réserves"] = [["ΔCapital"],[]];
  this.resDef.detailed["Report précédent"] = [["ΔReport"],[]];
  this.resDef.detailed["Subsides en capital"] = [["↑ΔGrantCapital","↓ΔGrantCapital"],[]];
  this.resDef.detailed["Dettes LT"] = [["↑ΔLoanLT","↓ΔLoanLT"],[]];
  this.resDef.detailed["Fournisseurs"] = [["ΔSuppliers"],[]];
  this.resDef.detailed["Dettes fiscales, salariales et sociales"] = [["ΔIncomeTax","ΔVATsuppliers", "ΔPayroll"],[]];
  this.resDef.detailed["Autres dettes"] = [["↑ΔLoanCT","↓ΔLoanCT"],[]];
  this.resDef.detailed["Régularisations_P"] = [["ΔLiabilitiesMisc"],[]];
  this.resDef.detailed["Chiffre d'affaires"] = [["Sales"],[]];
  this.resDef.detailed["Production immobilisée"] = [["ProdImmob"],[]];
  this.resDef.detailed["Variation de stocks produits"] = [["VarStocksProd"],[]];
  this.resDef.detailed["Autres produits d'exploitation"] = [["GrantsComExpl", "GrantsR&DExpl","GrantsEmployExpl","Other Revenues"],[]];
  this.resDef.detailed["Achats"] = [["Goods", "Subcontractors","VarStocksRaw"],[]];
  //this.resDef.detailed["Var Stocks"] = [[""],[]];//
  this.resDef.detailed["Services et biens divers"] = [["IT costs",
    "Insurances costs","Office costs", "Consulting & Experts","Marketing costs",         
    "Vans costs", "Partners costs",
    "Misc costs"],[]];//iciCVH
  this.resDef.detailed["Rémunérations, charges sociales et pensions"] = [["Brute payroll", "ONSS","Other payroll",],[]];
  this.resDef.detailed["Amortissements et réductions de valeur "] = [["FictiveAssets depreciation", "FixeAssets depreciation", 
    "VarStocks depreciation","Other depreciation"],[]];
  this.resDef.detailed["Autres charges d'exploitation"] = [["Other exploitation expenses"],[]];
  this.resDef.detailed["Produits financiers"] = [["Financial incomes", "GrantsCap amorti"],[]];
  this.resDef.detailed["Charges financières"] = [["Financial expenses"],[]];
  this.resDef.detailed["Charges exceptionnelles"]=[["Exceptionnal expenses"],[]];
  this.resDef.detailed["Produits exceptionnels"] =[["Exceptionnal incomes_virtual","Exceptionnal incomes_real"],[]];
  this.resDef.detailed["Impôts sur le résultat"]=[["Income Tax"],[]];
  this.resDef.detailed["Transferts aux réserves"]=[["Transfers INTO capital"],[]];
  this.resDef.detailed["Affectations résultats-69"]=[["Report ExPrec","Report","Distribution Out"],[]];
  this.resDef.detailed["Affectations résultats-77-79"]=[["Transfers FROM capital","Distribution In"],[]];
    //Creating display order of the detailedBS items
  this.order.detailed = ["Immobilisations incorporelles","Immobilisations corporelles","Immobilisations financières","Créances LT","Stocks","Clients","Autres créances","Valeurs disponibles","Régularisations_A",
  "Capital et réserves","Report précédent","Subsides en capital","Dettes LT","Fournisseurs","Dettes fiscales, salariales et sociales","Autres dettes","Régularisations_P",
  "Chiffre d'affaires","Production immobilisée","Variation de stocks produits","Autres produits d'exploitation",
  "Achats","Services et biens divers","Rémunérations, charges sociales et pensions","Amortissements et réductions de valeur ","Autres charges d'exploitation",
  "Produits financiers","Charges financières","Produits exceptionnels","Charges exceptionnelles",
  "Impôts sur le résultat","Transferts aux réserves","Affectations résultats-69","Affectations résultats-77-79"];
  this.title.detailed ={};
  
  this.listerPlus = function(finDefRef){
    const obj = this.resDef[finDefRef];
    var list  = [];
    for (var key in obj){
      list = list.concat(obj[key][0]);
    }
    return(list);
  }
  this.listerMinus = function(finDefRef){
    const obj = this.resDef[finDefRef];
    var list  = [];
    for (var key in obj){
      list = list.concat(obj[key][1]);
    }
    return(list);
  }
  
  this.checkResDef = function(){
    // load library
    var elements   = new Elements();
    // load meta definitions as references to compare
    var macro      = new Macro("cvh2020");
    var elemsRef   = elements.create(macro.displayOrder);
    var resDefRef  = "";
    // Flattening a resDef object
    var listPlus = [];
    var listMinus = [];
    // Elements
    for (resDefRef in this.resDef){
      console.log("CHECKING definitions " + resDefRef);
      listPlus   = this.listerPlus(resDefRef);
      listMinus  = this.listerMinus(resDefRef);
      elements.compare2Meta(listPlus,listMinus);
    }
  }
  this.checkOrder = function(){
    //For each definition in order (standard, ebitda, detailed, ..) do
    for (let resDefRef in this.order){
      console.log("CHECKING order " + resDefRef);
      //For each item listed in definition, the item must be in title or in resDef
      for (let finItem of this.order[resDefRef]){
        console.log(finItem);
        if (this.resDef[resDefRef].hasOwnProperty(finItem) == false){
          if (this.title[resDefRef].hasOwnProperty(finItem) == false){
            console.log("Item in order but nor in definition nor in title: " + finItem);
          }
        }
      }
    }
  }
  
  this.checkTitles = function(){
    // load library
    var elements   = new Elements();
    console.log("CHECKING title NET Cashflow");
    var itemsList = this.title.ebitda["Net Cashflow"][0];
    elements.compare2Meta(itemsList,[]);
    console.log("CHECKING title SUMS OF CASH FLOWS");
    var A = this.title.ebitda["Cash Flow (BS excl)"][0];
    var B = this.title.ebitda["Operating Gross Cashflow"][0];
    var C = this.title.ebitda["Financing Gross Cashflow"][0];
    var D = this.title.ebitda["Investing Gross Cashflow"][0];
    var remind = elements.compare2Meta(A.concat(B,C,D),[]);
  }
  this.definition   = this.resDef[resDefRef];
  this.displayOrder = this.order[resDefRef];
  this.level        = this.title[resDefRef];
  this.checkResDef();
  this.checkOrder();
  this.checkTitles();
}