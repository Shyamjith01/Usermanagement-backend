const db = require('../config/connection')
var collection = require('../config/collection');
var bcrypt = require('bcrypt')


module.exports = {
    UserSignUp: (data) => {
        return new Promise(async (resolve, reject) => {
            let user = db.get().collection(collection.USER_COLLECTION).findOne({ email: data.email })
            if (user.status == true) {
                resolve({ status: false, message: 'this user already exist!' })
            } else {

                data.password = await bcrypt.hash(data.password, 10)
                user = {
                    fname: data.fname,
                    lname: data.lname,
                    uname: data.uname,
                    MobileNumber: data.MobileNumber,
                    password: data.password,
                    email: data.email,
                    status: true
                }
                db.get().collection(collection.USER_COLLECTION).insertOne(user).then((resp) => {
                    resolve({ status: true, message: 'Registered', user })
                })
            }
        })
    },
    UserLogin: (data) => {
        return new Promise(async (resolve, reject) => {
            let response = {}
            console.log(data, "data in params")
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: data.email })
            console.log(user, "user details in userlogin")
            if (user) {
                let password = data.password
                console.log(user, "login user")
                console.log(data.password, user.password, "passwordss")
                bcrypt.compare(password, user.password).then((resp) => {
                    if (resp) {
                        console.log(resp,"login success");
                        
                        resolve({status:true,userDetail:user})
                    } else {
                        console.log("login failed")
                        resolve({ status: false })
                    }
                })
            } else {
                console.log("user not found")
                resolve({ status: false })
            }

        })
    }
}