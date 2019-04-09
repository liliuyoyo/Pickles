/*************************************************************************************************
 * description: user routes
 ***************************************************************************************************/
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware");
const Movie = require("../models/movies");
/*************************************************************************************************
 * test status: yes
 * description: generate saltpassword
 ***************************************************************************************************/
//generates random string of characters
const genRandomString = function(length) {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString("hex")
        .slice(0, length);
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
 * note: unused
 ***************************************************************************************************/
// router.get("/user/register", (req, res, next) => {
//     User.find()
//         .exec()
//         .then(docs => {
//             const output = new Array();
//             Object.entries(docs).forEach(doc => {
//                 const currentDoc = new Object();
//                 currentDoc.userName = doc[1].userName;
//                 currentDoc.userEmail = doc[1].userEmail;
//                 output.push(currentDoc);
//             });
//             res.status(200).json(output);
//         })
//         .catch(err => console.log(err));
// });

/*************************************************************************************************
 * test status: no
 * description: login personal interface
 * note:
 * input schema{
 *  token:
 * }
 * output schema {
 *  status:
 *  id:
 *  name:
 *  email:
 *  isuser:
 *  list: array
 * }
 * element in list schema {
 *  id:
 *  image:
 *  name:
 * }
 ***************************************************************************************************/
router.post("/user/profile", middleware.isLoggedIn, (req, res, next) => {
    const legit = req.legit;
    User.findById(legit._id)
        .populate("userList")
        .populate("historyList")
        .exec(function(err, user) {
            if (err) {
                const output = {
                    status: "false",
                    message: "not find"
                };
                return res.status(200).json(output);
            }
            const userobject = new Object();
            userobject.status = "true";
            userobject.id = user._id;
            userobject.name = user.userName;
            userobject.email = user.userEmail;
            userobject.isuser = user.isUser;
            userobject.image = user.userImage;
            userobject.list = [];
            user.userList.forEach(function(list) {
                const movieinfo = new Object();
                movieinfo.id = list._id;
                movieinfo.image = list.smallImagePath;
                movieinfo.name = list.title;
                if (!list.deleted || list.deleted == null) {
                    movieinfo.exist = true;
                } else {
                    movieinfo.exist = false;
                }
                userobject.list.push(movieinfo);
            });
            userobject.history = [];
            user.historyList.forEach(function(list) {
                const moviehistory = new Object();
                moviehistory.id = list._id;
                moviehistory.image = list.smallImagePath;
                moviehistory.name = list.title;
                if (!list.deleted || list.deleted == null) {
                    moviehistory.exist = true;
                } else {
                    moviehistory.exist = false;
                }
                userobject.history.push(moviehistory);
            });
            // console.log(userobject);
            return res.status(200).json(userobject);
        });
});

/*************************************************************************************************
 * test status: yes
 * description: login
 * note:
 * input: {
 *  username:
 *  password:
 * }
 * output: {
 *  isuser:
 *  token:
 * }
 ***************************************************************************************************/
router.post("/user/login", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    var result;

    //User.find({ userName: username }, { deleted: true })
    User.find({ userName: username })
        .exec()
        .then(docs => {
            if (Object.keys(docs).length === 0) {
                console.log("empty");
                return res.status(200).json("false");
            }

            Object.entries(docs).forEach(doc => {
                const hashpassword = sha512(password, doc[1].userPassword[0]);
                if (doc[1].userPassword[1] == hashpassword.passwordHash) {
                    const currentuserinfo = new Object();
                    currentuserinfo._id = doc[1]._id;
                    currentuserinfo.userName = doc[1].userName;
                    currentuserinfo.isUser = doc[1].isUser;
                    const token = jwt.sign(currentuserinfo, "secret", {
                        expiresIn: 60 * 60
                    });
                    console.log(token);
                    result = {
                        isuser: doc[1].isUser,
                        token: token
                    };
                    return res.status(200).json(result);
                }
                return res.status(200).json("false");
            });
        })
        .catch(err => {
            return res.status(200).json("false");
        });
});

/*************************************************************************************************
 * test status: no
 * description: edit image
 * input: {
 *  token:
 *  type:
 *  value:
 * }
 * output: {
 *  status:
 *  message:
 * }
 ***************************************************************************************************/
router.post("/user/profile/edit", middleware.isLoggedIn, (req, res, next) => {
    console.log(req.body);
    const legit = req.legit;
    if (!legit.isUser) {
        // return res.status(200).json("false");
        return res.status(200).json({
            status: "false",
            message: "no permit"
        });
    }
    if (legit.isUser) {
        if (req.body.type == "image") {
            query = {
                userImage: req.body.value
            };
        } else if (req.body.type == "name") {
            query = {
                userName: req.body.value
            };
        }

        User.findOneAndUpdate({ userName: legit.userName }, { $set: query }, { multi: true, new: true }, function(err, user) {
            if (err) {
                const output = {
                    status: "false",
                    message: "failure to find user"
                };
                return res.status(200).json(output);
                //return res.status(200).json("false");
            }
            console.log(user);
            //  return res.status(200).json("true");
            const output = {
                status: "true",
                message: user
            };
            return res.json(output);
        });
    }
});

/*************************************************************************************************
 * test status: no
 * description: user delete
 * note: soft delete
 * input: {
 *  token:
 * }
 * output: {
 *  status:
 *  message:
 * }
 ***************************************************************************************************/
router.delete("/user/profile/delete", middleware.isLoggedIn, (req, res, next) => {
    const legit = req.legit;
    User.findById(legit._id, function(err, user) {
        if (err) {
            const output = {
                status: "false",
                message: "failure to find user"
            };
            return res.status(200).json(output);
        }
        user.softdelete(function(err) {
            if (err) {
                const output = {
                    status: "false",
                    message: "failure to delete"
                };
                return res.status(200).json(output);
            }
            const output = {
                status: "true",
                message: ""
            };
            return res.status(200).json(output);
        });
    });
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
 * test status: yes
 * description: check username if valid
 * input: {
 *  username:
 * }
 * output: String => true or false
 ***************************************************************************************************/
router.post("/user/register/username", (req, res, next) => {
    const username = req.body.username;
    var output;
    if (username == null) {
        return res.status(200).json("false");
    } else {
        User.find({ userName: username })
            .exec()
            .then(docs => {
                if (Object.keys(docs).length == 0) {
                    return res.status(200).json("true");
                }
                return res.status(200).json("false");
            })
            .catch(err => console.log(err));
    }
});
/*************************************************************************************************
 * test status: yes
 * description: check email if valid
 * input: {
 *  email:
 * }
 * output: String => true or false
 ***************************************************************************************************/
router.post("/user/register/email", (req, res, next) => {
    const email = req.body.email;
    if (email == null) {
        return res.status(200).json("false");
    } else {
        User.find({ userEmail: email })
            .exec()
            .then(docs => {
                if (Object.keys(docs).length == 0) {
                    return res.status(200).json("true");
                }
                return res.status(200).json("false");
            })
            .catch(err => console.log(err));
    }
});
/*************************************************************************************************
 * test status: yes
 * description: add user in database
 * input: {
 *  name:
 *  email:
 *  password:
 *  status:
 * }
 * output: String => true or false
 ***************************************************************************************************/
router.post("/user/register", (req, res, next) => {
    //  console.log(req.body);
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
        userImage: "https://image.flaticon.com/icons/svg/149/149071.svg",
        userList: [],
        historyList: []
    });

    user.save()
        .then(result => {
            res.status(200).json("true");
        })
        .catch(err => {
            console.log(err);
            res.status(200).json("false");
        });
});

module.exports = router;
