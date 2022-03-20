const db = require('../config/connection')
var collection = require('../config/collection');
var bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');


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
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: data.email })
            if (user) {
                if (user.blocked) {
                    resolve({ status: false, message: 'user has been blocked' })
                } else {
                    let password = data.password
                    bcrypt.compare(password, user.password).then((resp) => {
                        if (resp) {

                            resolve({ status: true, userDetail: user })
                        } else {
                            resolve({ status: false })
                        }
                    })
                }

            } else {
                resolve({ status: false })
            }

        })
    }
    ,
    findEmail: (email) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: email })
            resolve(user)
        })
    },
    //change password
    changePassword: (data) => {
        let id = data.id
        return new Promise(async (resolve, reject) => {
            data.pass1 = await bcrypt.hash(data.pass1, 10)
            db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(id) },
                {
                    $set: {
                        password: data.pass1
                    }
                }).then((response) => {
                    resolve({ status: true })
                })
        })
    },
    googleLogin: (data) => {
        return new Promise(async(resolve, reject) => {
            let obj = {
                fname: data.givenName,
                lname: data.familyName,
                email: data.email,
                uname: data.name,
                phone: data.googleId,
                google: true,
                status:true
            }
            await db.get().collection(collection.USER_COLLECTION).insertOne(obj).then((resp) => {
                resolve({status:true})
            })
        })
    }
}