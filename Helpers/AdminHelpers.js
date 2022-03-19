const db = require('../../BackendMangement/config/connection');
var collection = require('../config/collection');
var bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

module.exports = {
    adminLogin: (data) => {
        return new Promise(async (resolve, reject) => {
            let admin = await db.get().collection(collection.ADMIN_COLLECTION).findOne({ email: data.email })
            if (admin) {
                if (data.password == admin.password) {
                    console.log("Admin login done");
                    resolve({ status: true, admin })
                } else {
                    resolve({ status: false, message: "incorrect password" })
                }
            } else {
                resolve({ status: false, message: "incorrect email or password" })
            }
        })
    },
    getAllUser: () => {
        return new Promise(async (resolve, reject) => {
            let AllUsers = await db.get().collection(collection.USER_COLLECTION).find().toArray()
            console.log(AllUsers, "All users")
            resolve(AllUsers)
        })
    },
    deleteUser: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).deleteOne({ _id: ObjectId(id) }).then((resp) => {
                resolve({ status: true, message: "user deleted" })
            })
        })
    },
    blockUser: (id) => {
        return new Promise(async (resolve, reject) => {
            await db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(id) },
                {
                    $set: {
                        blocked: true,
                        status: false
                    }
                }
            ).then((resp) => {
                resolve({ status: true, message: "user blocked" })
            })
        })
    },
    UnblockUser: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(id) },
                {
                    $unset: {
                        blocked: false,

                    },
                    $set: {
                        status: true
                    }
                }
            ).then((response) => {
                resolve({ status: true, message: "user unblocked" })
            })
        })
    }
    //edit user 
    ,
    getUserdetials: (id) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectId(id) })
            resolve(user)

        })
    },
    edituserDetails: (data) => {
        return new Promise(async (resolve, reject) => {
            // let user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectId(id) })

            db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(data.id) },
                {
                    $set: {
                        fname: data.fname,
                        sname: data.sname,
                        uname: data.uname,
                        email: data.email,
                        MobileNumber: data.phone
                    }
                }
            ).then((resp) => {
                resolve({status:true,message:'Edits updated'})
            })
        })
    }
}