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
    trim: true,


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
    
  },
  Duree_demploi: {
    startDate: { type: Date },
    
  },
  Chatiment: [{
    type: Array,
    default: [{fdgfd:"Nettoyer le fichier"}]
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
    }),
    Chatiment:joi.array(),
  });
  return Schema.validate(opj);
}

//valadtoin update
function valadtoinupdate(opj) {
  const Schema = joi.object({
    daysavlabels: joi.number(),
    Duree_demploi: joi.object({
      startDate: joi.date().iso(),
      endDate: joi.date().iso()
    }),
    numero: joi.number(),
    Fonction:joi.string(),
  });
  return Schema.validate(opj);
}

module.exports = {
  employees,
  valadtoinrejsterd,
  valadtoinupdate,
};
