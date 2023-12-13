const mongoose = require("mongoose");
const joi = require("joi");

const UserScam = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,

  },
  lastname: {
    type: String,
    required: true,

  },
  numero: {
    type: Number,
    default:"0"
  },
  daysavlabels: {
    type: Number,
  },
  Fonction: {
    type: String,
    required: true,
    
     enum: ["Manager", "Employee", "Supervisor"] 
  },
  Duree_demploi: {
    startDate: { type: Date },
    endDate: { type: Date, default: Date.now }
  },
  Chatiment: [{
    type: String,
    default: ["Nettoyer le fichier"]
  }]
});

//USERmodel
const employees = mongoose.model("employees", UserScam);
//valadtoin resterd

function valadtoinrejsterd(opj) {
  const Schema = joi.object({
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    Fonction: joi.string().required(),
    daysavlabels: joi.number(),
    numero: joi.number(),
    Duree_demploi: joi.object({
      startDate: joi.date().iso().required(),
      endDate: joi.date().iso()
    })

  });
  return Schema.validate(opj);
}

//valadtoin update
function valadtoinupdate(opj) {
  const Schema = joi.object({
    daysavlabels: joi.number().required(),
    Duree_demploi: joi.object({
      startDate: joi.date().iso(),
      endDate: joi.date().iso()
    }),
    numero: joi.number(),
  });
  return Schema.validate(opj);
}

module.exports = {
  employees,
  valadtoinrejsterd,
  valadtoinupdate,
};
