const express = require('express');
const router = express.Router();
const userCtrl = require("../controller/user");

//register API route
router.post('/register',               userCtrl.register);

//login API route
router.post('/login',                  userCtrl.login);

//delete API route
router.delete('/delete',               userCtrl.delete);

//find API route
router.get('/userRecord',             userCtrl.find)

//find API data
router.get('/usersDetails',           userCtrl.findAll)

module.exports = router;