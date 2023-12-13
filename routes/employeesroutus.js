const router = require("express").Router();
const {
  savenewemployees,
  getallemployees,
  getuserbyid,
  updateUser,
  getlengthalluser,
  delituserprofile,
} = require("../controllers/employees");

router.route("/newemployees").post(savenewemployees);
router.route("/").get(getallemployees);
router.route("/length").get(getlengthalluser);
router.route("/:id").get(getuserbyid)
                    .put(updateUser)
                    .delete(delituserprofile)
module.exports = router;
