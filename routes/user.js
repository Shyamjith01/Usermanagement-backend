var express = require('express');
const AdminHelpers = require('../Helpers/AdminHelpers');
const LoginHelpers = require('../Helpers/LoginHelpers');
var router = express.Router();

var loginHelpers = require('../Helpers/LoginHelpers')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/signUp', (req, res) => {
  const userData = req.body;
  loginHelpers.UserSignUp(req.body).then((response) => {
    if (res.status) {
      // req.session.user = 
      // req.session.user.Login = true

      let obj = {
        id: response.user._id.toString(),
        name: response.user.uname,
        email: response.user.email
      }
      res.json(obj)
    } else {
      res.json(response)
    }
  })

})

router.post('/login', (req, res) => {
  LoginHelpers.UserLogin(req.body).then((resp) => {
    if (resp.status) {
      res.json({ status: true, userdetails: resp.userDetail })
    } else {
      res.json({ status: false, resp })
    }
  })
})


router.get('/emailFinder/:email', async (req, res) => {
  let user = await LoginHelpers.findEmail(req.params.email)
  res.json({ status: true, user })
})

//change password
router.post('/changePassword', (req, res) => {
  LoginHelpers.changePassword(req.body).then((resp) => {
    if (resp.status) {
      res.json({ status: true, message: 'password change succesfuly' })
    } else {
      res.json({ status: false, message: 'something went wrong' })
    }
  })
})

router.post('/googleOauth', async(req,res) => {
  await LoginHelpers.googleLogin(req.body).then((response)=>{
    res.json(response)
  })
})

module.exports = router;
