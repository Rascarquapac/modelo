var RD = function(RDparameters){
  this.size=12;
  this.synthesis = RDparameters.synthesis;
//  this.totalItems = Object.keys(this.total);
  this.parts = RDparameters.parts;
  this.partsItems = Object.keys(this.parts);
  this.series={};
  this.synth={};
  // for component keys described in "synthesis"
  for (let componentKey in RDparameters.synthesis){
    this.synth[componentKey]= {};
    this.synth[componentKey].series={};
    this.synth[componentKey].series["-"] = new Serie(componentKey,this.size,0);
    this.series[componentKey] = {};
    //for parts described in "parts"
    console.log("SERIES in " + componentKey);
    for (let partsKey in RDparameters.parts){
      console.log("   Part = " + partsKey);
      this.series[componentKey][partsKey]={};
      // the component 
      let component = RDparameters.parts[partsKey].spec[componentKey];
      let serie = new Serie(componentKey,this.size,0);
      // computes the series
      // no series specified
      if ((typeof component === 'undefined') || (typeof component === 'null')){}
      else if (typeof component.sequence !== 'undefined') 
        serie.expand(component.sequence);
      else {
        for (let key in component){
          serie.expand(component[key].sequence);
        }  
      }
      console.log(serie.sequence);
      this.series[componentKey][partsKey]= serie;
      this.synth[componentKey].series["-"].add(serie);
    }
    console.log("   synthesis of "+ componentKey);
    console.log(this.synth[componentKey].series["-"].sequence);
    console.log("=================");
  }
  
}

function testRD() {
  var RDparameters=
    {synthesis:{subcontractors:{name: "Subcontractor-Capex",debit:"",credit:""},
                equipment:{name: "Equipment",debit:"",credit:""},
                furnitures: {name: "Furnitures",debit:"",credit:""}},
     parts:{
       global:{
         title:"General",
         spec: {
           furnitures:{name:"Furnitures",sequence:[[0,0.5]]},
           equipment:{laboratory:{sequence:[[0,0.5]]},
                      broadcast:{sequence:[[0,1.5]]},
                      software:{sequence:[[0,1.5]]}
                     },
           subcontractors:{general:{sequence:[[0,7.2]]},
                           simon:{sequence:[[0,3]]}}}
       },
       solutions:{
         title:"Solutions",
         spec: {
           furnitures:{sequence:[[0,0.2]]},
           subcontractors:{sequence:[[0,0.2]]}}
       },
       specialty:{
         title:"Specialty cams",
         spec: {
           furnitures:{sequence:[[0,0.2]]},
           subcontractors:{sequence:[[0,0.2]]}}
       },
       miniCams:{
         title:"Mini-cams",
         spec: {
           furnitures:{sequence:[[0,0.2]]},
           subcontractors:{sequence:[[0,0.2]]}}
       },
       remoteControl:{
         title:"Remote control",
         spec: {
           furnitures:{sequence:[[0,0.2]]},
           subcontractors:{sequence:[[0,0.2]]}}
       },
       remoteProduction:{
         title:"Remote production",
         spec: {
           furnitures:{sequence:[[0,0.2]]},
           subcontractors:{sequence:[[0,0.2]]}}
       },
       dCinema:{
         title:"D-Cinema",
         spec: {
           furnitures:{sequence:[[0,0.2]]},
           subcontractors:{sequence:[[0,0.2]]}}
       }
     }
    }
  var rd= new RD(RDparameters);
  var sheet = new Sheets("Modelo-debug", "R&D");
  rd.tablify= {type  : "serie",
               title : "SYNTHESE  R&D",
                 rows  : {data:"synth",
                          series:["-"]},
                 cols  : {format:"STANDARD_COND",
                          formatSpec:{1:"STANDARD_COND"}},
                 corner: {name:"Staff",format:"STANDARD_HEADER"},
                 header: {format:"STANDARD_HEADER",
                          generated:{}},
                 col0:   {format:"STANDARD_HEADER"}
             };
  console.log("RD VARIABLE");
  console.log(rd);
  var test = new Tablify(sheet.sheet,1,1,rd);
  /*
  rd.tablify= {type  : "serie",
               title : "Equipment R&D",
                 rows  : {data:"parts",
                          series:["global","solutions","miniCams"]},
                 cols  : {format:"STANDARD_COND",
                          formatSpec:{1:"STANDARD_COND"}},
                 corner: {name:"Staff",format:"STANDARD_HEADER"},
                 header: {format:"STANDARD_HEADER",
                          generated:{}},
                 col0:   {format:"STANDARD_HEADER"}
             };
  var test = new Tablify(sheet.sheet,80,1,rd);
  */
}
