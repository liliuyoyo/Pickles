/*************************************************************************************************
 * description: user routes
***************************************************************************************************/
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const mongoose = require("mongoose");
const crypto = require("crypto");
/*************************************************************************************************
 * test status: yes
 * description: generate saltpassword
***************************************************************************************************/
//generates random string of characters
const genRandomString = function(length) {
    return crypto.randomBytes(Math.ceil(length/2)).toString("hex").slice(0, length);
};
//hash password with sha512
const sha512 = function(password, salt) {
    const hash = crypto.createHmac("sha512", salt);
    hash.update(password);
    const value = hash.digest("hex");
    return {
        salt: salt,
        passwordHash: value
    };
};

function saltHashPassword(userpassword) {
    var salt = genRandomString(16);
    var password = sha512(userpassword, salt);

    return {
        salt: password.salt,
        newPassword: password.passwordHash
    }
}

/*************************************************************************************************
 * test status: yes
 * description: signup get all users
***************************************************************************************************/
router.get("/user/register", (req, res, next) => {
    User.find().exec().then(docs => {
        const output = new Array();
        Object.entries(docs).forEach(doc => {
            const currentDoc = new Object(); 
            currentDoc.userName = doc[1].userName;
            currentDoc.userEmail = doc[1].userEmail;        
            output.push(currentDoc);
        });
        res.status(200).json(output);            
    }).catch(err => console.log(err));
});

/*************************************************************************************************
 * test status: no
 * description: login
 * note: only use email to check user
***************************************************************************************************/
router.get("/user/profile", (req, res, next) => {
    const email = req.query.userEmail;
    const password = req.query.userPassword;
    const newPassword = saltHashPassword(password);
    const output = new Array();
    User.find({'userEmail': email}).exec().then(docs => {
        if(docs.userPassword.passwordHash == newPassword.passwordHash){
            output.push(docs);
        }
        res.status(200).json(output);            
    }).catch(err => console.log(err));
});

/*************************************************************************************************
 * test status: no
 * description: edit image
 * note: /:id/edit/image?image=
***************************************************************************************************/
router.get("/user/profile/:id/edit/image", (req, res, next) => {
    User.findById(req.params.id).exec().then(docs => {
        const image = req.query.image;
        docs.userImage = image;
        res.status(200).json(docs);
    }).catch(err => console.log(err));
});
/*************************************************************************************************
 * test status: no
 * description: edit name
 * note: /:id/edit/image?name=
***************************************************************************************************/
router.get("/user/profile/:id/edit/username", (req, res, next) => {
    User.findById(req.params.id).exec().then(docs => {
        const name = req.query.name;
        docs.userName = name;
        res.status(200).json(docs);
    }).catch(err => console.log(err));
});

/*************************************************************************************************
 * test status: no
 * description: user homepage
***************************************************************************************************/
router.get("/user/profile/:id", (req, res, next) => {
    User.findById(req.params.id).exec().then(docs => {
        res.status(200).json(docs);
    }).catch(err => console.log(err));
});
/*************************************************************************************************
 * test status: no
 * description: add new user into database
***************************************************************************************************/
router.post("/user/register", (req, res, next) => {

    console.log("user");

    const name = req.query.username;
    const email = req.query.useremail;
    const password = req.query.userpassword;

    console.log(req.parames);
   

    // const newPassword = saltHashPassword(password);

    // const user = new User({
    //     _id: new mongoose.Types.ObjectId(),
    //     userName: name,
    //     userEmail: email,
    //     userPassword: newPassword,
    //     userImage: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ4MTY5NzU2M15BMl5BanBnXkFtZTgwNDc5NTgwMTI@._V1_SY100_SX100_.jpg"
    // });

    // user.save().then(
    //     result => {
    //         console.log(result);
    //         res.status(200).json(user);
    //     }
    // ).catch(err => console.log(err));
});

module.exports = router;