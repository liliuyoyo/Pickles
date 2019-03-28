/*************************************************************************************************
 * description: user routes
***************************************************************************************************/
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
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

    const result = Array();
    result.push(password.salt);
    result.push(password.passwordHash);

    return result;
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
router.post("/user/profile", (req, res, next) => {

   // console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);
  
    User.find({'userName': username}).exec().then(docs => {
        if(Object.keys(docs).length === 0){
            console.log("empty");
            const output = Array();
            output.push(0);
            output.push("Error: Please input right Name");
            res.status(200).json(output);
        }else {
            Object.entries(docs).forEach(doc => {
                const hashpassword = sha512(password, doc[1].userPassword[0]);
                if(doc[1].userPassword[1] == hashpassword.passwordHash){
                    const currentuserinfo = new Object();
                    currentuserinfo._id = doc[1]._id;
                    currentuserinfo.userName = doc[1].userName;
                    currentuserinfo.isUser = doc[1].isUser;
                    const token = jwt.sign(currentuserinfo, 'secret', {expiresIn: '1h'});
                    const output = Array();
                    console.log(token);
                    output.push(1);
                    output.push(token);
                    res.status(200).json(output);
                }else {
                    const output = Array();
                    output.push(0);
                    output.push("Error: Please input right Password");
                    res.status(200).json(output);
                }               
            });

        }
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
 * note: unused
***************************************************************************************************/
// router.post("/user/register", (req, res, next) => {
//     // console.log(req.body);
//     const newPassword = saltHashPassword(password);
//     const user = new User({
//         _id: new mongoose.Types.ObjectId(),
//         userName: name,
//         userEmail: email,
//         userPassword: newPassword,
//         userImage: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ4MTY5NzU2M15BMl5BanBnXkFtZTgwNDc5NTgwMTI@._V1_SY100_SX100_.jpg"
//     });

//     user.save().then(
//         result => {
//             console.log(result);
//             res.status(200).json(user);
//         }
//     ).catch(err => console.log(err));
// });
/*************************************************************************************************
 * test status: no
 * description: add admin user
***************************************************************************************************/
router.post("/user/register", (req, res, next) => {

    console.log(req.body);

    const name = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const status = req.body.isUser;
    const newPassword = saltHashPassword(password);

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        userName: name,
        userEmail: email,
        userPassword: newPassword,
        isUser: status,
        userImage: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ4MTY5NzU2M15BMl5BanBnXkFtZTgwNDc5NTgwMTI@._V1_SY100_SX100_.jpg"
    });

   // console.log(user);

    user.save().then(
        result => {
            console.log(result);
            res.status(200).json(user);
        }
    ).catch(err => console.log(err));
});


module.exports = router;