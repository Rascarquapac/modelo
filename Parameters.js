var Parameters = function(simulationLentgh){
  this.size= simulationLentgh;
  this.setSize = function(simulationLentgh){
    this.size = simulationLentgh;
  }
}
var Team = function(){
  this.members = {};
  this.tablify= {type  : "extensive",
                 title : "Trial",
                 rows  : {},//all the rows
                 cols  : {profile:{title:"Titre",firstname:"Prénom", lastname:"Nom", kids:"#Enf.", BU_allocation:"BU alloc"},
                          revenue:{timeWorked:"Temps partiel",fullYearSalaryCost:"Coût annuel total",
                                   grossSubjectToSocSecurity:"Brut soumis à SecSoc",totalSalaryAndSocSec:"Total, Salaire et SecSoc",
                                   socialSec:"ONSS",monthlyGross:"Brut mensuel",gross12Mth:"Brut 12 mois",gross13Mth:"Treizième mois",
                                   meanMonthlyCost:"Coût mensuel moyen",netIncome:"Revenu net",holidayPayOnBonus:"Congés payés sur bonus",
                                   doubleHolidayPay:"Double paie sur congés"},
                          bonus:{grossBonus:"Bonus brut",salesCom:"Commission sur ventes"},
                          extras:{mealTickets:"Tickets repas",dailyAllowance:"Défraiement journalier",monthlyAllowance:"Défaiement mensuel",
                                  cyCarTCO:"Voiture société",phone:"GSM",groupIns:"Assur. groupe",attentia:"Médecine du travail",DKVIns:"DKV"}},
                 corner: {name:"Payroll Profiles Corner"},
                 header: {},
                 col0:   {}};
  this.header = [...Object.keys(this.tablify.rows.profile),...Object.keys(this.tablify.rows.revenue),...Object.keys(this.tablify.rows.bonus),...Object.keys(this.tablify.rows.extras)];
  this.row0 = [];//
  this.merge = function(){
    //build table data
    this.table =[];
    var index = 0;
    var name  = "";
    var member = {};
    for (let key in this.members){
      member = this.members[key];
     //console.log(member);
      var follower = 0;
      this.table[index]=[];
      for(let subKey in  this.profile){
        this.table[index].push(member.profile[subKey]);
        follower++;
      }
      for(let subKey in  this.revenue){
        this.table[index].push(member.revenue[subKey]);
        follower++;
      }
      for(let subKey in  this.bonus){
        this.table[index].push(member.bonus[subKey]);
        follower++;
      }
      for(let subKey in  this.extras){
        this.table[index].push(member.extras[subKey]);
        follower++;
      }
      index++;
    }
  }
}                                                 
  
var TeamMember = function(profile,bonus,extras,filters){
  this.size=24;
  //Initiate revenue property
  this.profile = profile;
  this.bonus = bonus;
  this.extras = extras;
  this.revenue ={timeWorked:1.0, fullYearSalaryCost:0, grossSubjectToSocSecurity:0, totalSalaryAndSocSec:0, socialSec:0, monthlyGross:0,
                 gross12Mth:0,gross13Mth:0,meanMonthlyCost:0,netIncome:0,holidayPayOnBonus:0,doubleHolidayPay:0};
  this.filters=filters;
}
TeamMember.prototype = new Parameters(24);
/*
* Convert parameters into Serie
*
* @constructor
* @this Partner
* @param {object} profile  Team member data
* @param {number} fullYearSalaryCost Slary cost on one year
*/
var Partner = function(profile,bonus,extras,filters,fullYearSalaryCost,team){
  team.members[profile.title] = this;
  //store profile object in father
  this.base = TeamMember;
  this.base(profile,bonus,extras,filters);
  // Compute costs
  this.revenue.timeWorked                = 1.0;
  this.revenue.fullYearSalaryCost        = fullYearSalaryCost;
  this.revenue.grossSubjectToSocSecurity = this.revenue.fullYearSalaryCost / 2;
  this.revenue.totalSalaryAndSocSec      = this.revenue.grossSubjectToSocSecurity * 1.3;
  this.revenue.socialSec                 = 0.3 * this.revenue.grossSubjectToSocSecurity;
  this.revenue.monthlyGross              = this.revenue.grossSubjectToSocSecurity / 12;
  this.revenue.gross12Mth                = this.revenue.monthlyGross * 12; //! when used as a serie must be multiplied by the timeWorked serie!
  this.revenue.gross13Mth                = 0.0 ;
  this.revenue.meanMonthlyCost           = this.revenue.fullYearSalaryCost / 12;
  this.revenue.netIncome                 = (function(x,a0,a1,a2,a3){return(a0+a1*x+a2*x**2+a3*x**3)})(this.revenue.monthlyGross,1032.85679962216,0.213,+0.0000471,-0.00000000351);
  this.revenue.netIncome                += (function(x,a0,a1,a2,a3){return(a0+a1*x+a2*x**2+a3*x**3)})(this.profile.kids,-35,39.17,-15.0,10.83);
  this.revenue.holidayPayOnBonus         = 0.0;	
  this.revenue.doubleHolidayPay          = 0.0;
  // Basic monthlyCost serie build
  var normalMonthCost = this.revenue.fullYearSalaryCost / 12; //Total is 13 (attribute depending on company?)
  this.series={};
  // Profile of payments definition: total = 13 (attribute depending on company?)
  this.series.payProfile = new Serie("payProfile",this.size);
  this.series.payProfile.initSequence([1,1,1,1,1,1.25,1,1,1,1,1,1.75]); 
  //Initialisation of series associated to filters
  for (let key in this.filters){
    this.series[key] = new Serie(this.profile.title,this.size);
    console.log(this.filters[key]);
    this.series[key].expand(this.filters[key]);
  }
  //Computing series
  this.series.timedCost = new Serie(this.profile.title,this.size,this.revenue.meanMonthlyCost);
  for (let key in this.filters){
    this.series.timedCost.product(this.series[key]);
  }
}  

/*
* Convert parameters into Serie
*
* @constructor
* @this Partner
* @param {object} profile  Team member data
* @param {number} motnhlyGross Monthly gross salary is negotaited with the employee
* @param {object} extras Extra advantages negotiated
*/
var Employee = function(profile,bonus,extras,filters,monthlyGross,team){
  this.profile=profile;
  team.members[profile.title]=this;
  //store profile object in father
  this.base = TeamMember;
  this.base(profile,bonus,extras,filters);
  // Sum of bonus and extras
  this.bonus = bonus;
  this.totalBonus = this.bonus.grossBonus + this.bonus.salesCom;
  this.extras = extras;
  this.totalExtras =0.0;
  for (let key in this.extras){ this.totalExtras += this.extras[key];}
  // Revenues
  this.revenue.timeWorked                = 1.0; //! when used as a serie must be multiplied by the timeWorked serie!
  this.revenue.monthlyGross              = monthlyGross; 
  this.revenue.gross12Mth                = this.revenue.monthlyGross * 12 * this.revenue.timeWorked; 
  this.revenue.gross13Mth                = this.revenue.monthlyGross * this.revenue.timeWorked ;
  this.revenue.grossSubjectToSocSecurity = this.revenue.gross12Mth + this.revenue.gross13Mth + this.totalBonus;  
  this.revenue.holidayPayOnBonus         = 0.188 * this.totalBonus;	
  this.revenue.socialSec                 = 0.25 * this.revenue.grossSubjectToSocSecurity;
  this.revenue.doubleHolidayPay          = 0.92 * this.revenue.gross12Mth / 12;
  this.revenue.totalSalaryAndSocSec      = this.revenue.grossSubjectToSocSecurity + this.revenue.holidayPayOnBonus + this.revenue.socialSec + this.revenue.doubleHolidayPay;
  this.revenue.fullYearSalaryCost        = this.totalExtras + this.revenue.totalSalaryAndSocSec;
  this.revenue.meanMonthlyCost           = this.revenue.fullYearSalaryCost / 12;
  this.revenue.netIncome                 = (function(x,a0,a1,a2,a3){return(a0+a1*x+a2*x**2+a3*x**3)})(this.revenue.monthlyGross,1032.85679962216,0.213,0.0000471,-0.00000000351);
  this.revenue.netIncome                += (function(x,a0,a1,a2,a3){return(a0+a1*x+a2*x**2+a3*x**3)})(this.profile.kids,-35,39.17,-15.0,10.83);
  // Basic monthlyCost serie build
  var normalMonthCost = this.revenue.fullYearSalaryCost / 13; //Total is 13 (attribute depending on company?)
  this.series={};
  // Profile of payments definition: total = 13 (attribute depending on company?)
  this.series.payProfile = new Serie("payProfile",this.size);
  this.series.payProfile.initSequence([1,1,1,1,1,1.25,1,1,1,1,1,1.75]); 
  //Initialisation of series associated to filters
  for (let key in this.filters){
    this.series[key] = new Serie(this.profile.title,this.size);
    this.series[key].expand(this.filters[key]);
  }
  //Computing series
  this.series.timedCost = new Serie(this.profile.title,this.size,this.revenue.meanMonthlyCost);
  for (let key in this.filters){
    this.series.timedCost.product(this.series[key]);
  }
}

function testProfile(){
  var bonus  = {grossBonus:0, salesCom:0};
  var extras = {mealTickets:0,dailyAllowance:0,monthlyAllowance:0,cyCarTCO:0,phone:0,groupIns:0,attentia:0,DKVIns:0};
  var cyanview = new Team();
  var profile = {};
  var filters = {};
  profile = {title:"CEO",firstname: "David", lastname:"Bourgeois",kids: 2, BU_allocation : "-"}
  filters = {workingZone:[[0,1]],partTime:[[0,1]],weighted: [[0,1]]};
  var dbo = new Partner(profile,bonus,extras,filters,72000,cyanview);
  profile={title:"COO",firstname: "Thierry", lastname:"Nancy",kids: 0, BU_allocation : "-"};
  filters = {workingZone:[[21,1]],partTime:[[0,1]],weighted: [[0,1]]};
  var tna = new Employee(profile,bonus,extras,filters,6527.5,cyanview);
  profile={title:"HRD",firstname: "Xavier", lastname:"Deschuyteneer",kids: 0, BU_allocation : "-"};
  filters = {workingZone:[[18,1]],partTime:[[0,1]],weighted: [[0,1]]};
  var xde = new Employee(profile,bonus,extras,filters,5400,cyanview);
  profile={title:"DRI",firstname: "Xavier", lastname:"Deschuyteneer",kids: 0, BU_allocation : "-"};
  filters = {workingZone:[[0,1]],partTime:[[0,1]],weighted: [[0,1]]};
  var gle = new Employee(profile,bonus,extras,filters,5400,cyanview);
  cyanview.merge();

  var sheet = new Sheets("Modelo-debug", "Parameters");
  var table = new Table();
  table.set("CORNER",cyanview.header,[],cyanview.table);
  table.write(sheet.sheet,1,1);
  
  var test = new Tablify(sheet.sheet,15,1,cyanview);
  cyanview.tablify= {type  : "serie",
                 title : "Trial",
                 rows  : {data:"members",
                          series:["workingZone","partTime","weighted","timedCost"]},
                 cols  : {format:"STANDARD_NUMBER",
                          formatSpec:{1:"STANDARD_NUMBER"}},
                 corner: {name:"Payroll Profiles Corner",format:"STANDARD_HEADER"},
                 header: {format:"STANDARD_HEADER",
                          generated:{}},
                 col0:   {format:"STANDARD_HEADER"}
             };
  var test = new Tablify(sheet.sheet,40,1,cyanview);
  
  cyanview.tablify= {type  : "serie",
                 title : "Working profile",
                 rows  : {data:"members",
                          series:["workingZone"]},
                 cols  : {format:"STANDARD_COND",
                          formatSpec:{1:"STANDARD_COND"}},
                 corner: {name:"Staff",format:"STANDARD_HEADER"},
                 header: {format:"STANDARD_HEADER",
                          generated:{}},
                 col0:   {format:"STANDARD_HEADER"}
             };
  var test = new Tablify(sheet.sheet,80,1,cyanview);

}

