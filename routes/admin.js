const e = require('express');
var express = require('express');
const AdminHelpers = require('../Helpers/AdminHelpers');
var router = express.Router();
var adminHelpers = require("../Helpers/AdminHelpers");



/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/login', (req, res) => {
  console.log("done")
  adminHelpers.adminLogin(req.body).then((response) => {
    if (response.status) {
      console.log(response, "admin ressss")
      res.json({ status: true, response })
    } else {
      res.json({ status: false, response })
    }
  })
})

router.get('/admin', async (req, res) => {
  console.log("inside of admin")
  let AllUsers = await adminHelpers.getAllUser();
  res.json(AllUsers)
})

router.delete('/user-delete/:id', (req, res) => {
  let userId = req.params.id
  adminHelpers.deleteUser(userId).then((response) => {
    res.json(response)
  })
})

router.get('/block-user/:id', async (req, res) => {
  let userId = req.params.id;
  AdminHelpers.blockUser(userId).then((resp) => {
    if (resp.status) {
      res.json(resp)
    } else {
      res.json({ status: false, message: "something went wrong" });
    }
  })
})

router.get('/Unblock-user/:id', (req, res) => {
  console.log("inside of unblk user")
  let userId = req.params.id;
  adminHelpers.UnblockUser(userId).then((resp) => {
    if (resp.status) {
      res.json(resp);
    } else {
      res.json({ status: false, message: 'something went wrong' })
    }
  })
})

//get user details
router.get('/Edit-user/:id', async (req, res) => {
  console.log("entered the edit user")
  let user = await adminHelpers.getUserdetials(req.params.id)
  res.json(user);
})

router.post('/userEdit-updation', (req, res) => {
  console.log(req.body, "this is the req.body")
  adminHelpers.edituserDetails(req.body).then((resp) => {
    if (resp.status) {
      res.json(resp)
    }
  })
})



module.exports = router;
