const asynchandler = require("express-async-handler")
const { employees } = require('../models/employees')
require('dotenv').config()
const {  valadtoinupdate ,valadtoinrejsterd } = require("../models/employees")



/**-----------------------------------*
 * @access private
 * @rout /api/employees
 * @description create new employees
 * @method post
 -------------------------------------*/




module.exports.savenewemployees = asynchandler(async (req, res) => {

  //validation
  const { error } = valadtoinrejsterd(req.body)
  if (error) {
      return res.status(400).json({ message: error.details[0].message })
      
  }


  user = new employees({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    daysavlabels: req.body.daysavlabels,
    Fonction:req.body.Fonction,
    Duree_demploi:req.body.Duree_demploi,
    Chatiment:req.body.Chatiment,
    numero:req.body.numero,
  })

  const empoliss =  await user.save()

  //send a response to client
  res.status(201).json(empoliss)

})






/**-----------------------------------*
 * @access private
 * @rout /api/employees/profile
 * @description get all Users (only admin)
 * @method post
 -------------------------------------*/
module.exports.getallemployees = asynchandler(async (req, res) => {

    const user = await employees.find()
    res.json(user)
})

/**-----------------------------------*
 * @access public
 * @rout /api/users/profile/:id
 * @description get Userni id (only person or admin)
 * @method get
 -------------------------------------*/

module.exports.getuserbyid = asynchandler(async (req, res) => {

    const user = await employees.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ message: 'this User not found' })
    }
    res.json(user)
})


/**-----------------------------------*
 * @access private
 * @rout /api/users/profile/:id
 * @description update user by id (only authirzthions (peson verefiy token id and params id == true ) or  admin)
 * @method put
 -------------------------------------*/
module.exports.updateUser = asynchandler(async (req, res) => {
    const { error } = valadtoinupdate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    
    const updateUser = await employees.findByIdAndUpdate(req.params.id, {
        $set: {
            daysavlabels: req.body.daysavlabels,
        }
    }, {
        new: true,
    })
    res.json(updateUser)
})

/**-----------------------------------*
 * @access private
 * @rout /api/USERs/count
 * @description get length User (only admin)
 * @method get
 -------------------------------------*/
module.exports.getlengthalluser = asynchandler(async (req, res) => {
    const users = await employees.countDocuments()
    console.log(users)
    res.json(users)
})



/**-----------------------------------*
 * @access private
 * @rout /api/USERs/profile/:id
 * @description delite user (account) by id 
 * @method delete
 -------------------------------------*/

module.exports.delituserprofile = asynchandler(async(req,res)=>{
    //1.get the user from db 

    const user = await employees.findById(req.params.id)
    if(!user){
        return res.status(404).json({message:"this user not found"})
    }


    //7.delete the user himeself
    await employees.findByIdAndDelete(req.params.id)

    //send a response to the clint 
    res.json({message:"your employees has ben deleted "}) 

 })