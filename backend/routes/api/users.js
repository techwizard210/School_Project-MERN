const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

const Message = require("../../models/Messages");

const Task = require("../../models/Task")

router.get("/task", (req, res) => {
    Task.find()
        .then(tasks => {
            res.send(tasks);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving users "
            })
        })
})

router.post('/updatetask/:id',(req, res, next) => {

            Task.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },(error,data)=> {
                if(error){
                    return res.status(400).json(error);
               } else {
                    res.json(data)
                }
           })
})

router.get("/messages", (req, res) => {
    Message.find()
        .then(messages => {
            res.send(messages);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving users "
            })
        })
})

router.post("/register", (req,res) => {
       
    const { errors, isValid } = validateRegisterInput(req.body);

    console.log(isValid)

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists"});
        } else {
            const newUser = new User({
                name: req.body.name,
                userid: req.body.userid,
                email: req.body.email,
                password: req.body.password,
                role:req.body.role,
                admin:"admin"
            });

            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post("/add", (req,res) => {

    console.log(req.body)
       
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists"});
        } else {
            const newUser = new User({
                name: req.body.name,
                userid: req.body.userid,
                email: req.body.email,
                password: req.body.password,
                role:req.body.role,
                admin:"user"
            });

            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {

        if(!user) {
            return res.status(404).json({ emailnotfound: "Email not found"});
        }

        if(user.role != "active") {
            errors.role = "your account is inactive";
            return res.status(400).json(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    userid: user.userid
                };

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926
                    },
                    (err, token)=> {
                        res.json({
                            id:user._id,
                            sucess:true,
                            token: "Bearer"+token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });    
            }
        });
    })
});

router.get("/", (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving users "
            })
        })
})

router.delete("/delete-user/:id", (req, res)=> {
    User.findByIdAndRemove(req.params.id)
        .then(user=>{
            if (!user) {
                return res.status(404).send({
                    message:"User not found with id" + req.params.id
                })
            }
            //res.send({message:"User deleted sucessfully"});
            User.find()
                .then(users => {
                    res.send(users);
                })
        }).catch(err=>{
            if(err.kind === 'ObjectId' || err.name === 'UserFound'){
                return res.status(404).send({
                    message:"User not found with id"+req.params.users
                })
            }
            return res.status(500).send({
                message:"Could not delete user  with id"+req.params.id
            })
        })
})

router.delete("/delete-task/:id", (req, res)=> {
    Task.findByIdAndRemove(req.params.id)
        .then(task=>{
            if (!task) {
                return res.status(404).send({
                    message:"User not found with id" + req.params.id
                })
            }
            //res.send({message:"User deleted sucessfully"});
            Task.find()
                .then(tasks => {
                    res.send(tasks);
                })
        }).catch(err=>{
            if(err.kind === 'ObjectId' || err.name === 'UserFound'){
                return res.status(404).send({
                    message:"User not found with id"+req.params.users
                })
            }
            return res.status(500).send({
                message:"Could not delete user  with id"+req.params.id
            })
        })
})
  
router.get("/:id", (req, res)=> {
  
    const id = req.params.id; 
    User.findOne({_id:id})
        .then(user=>{
            if (!user) {
                return res.status(404).send({
                    message:"User not found with id" + req.params.id
                })
            }
            res.send(user);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving users "
            })
        })
}) 

router.route('/update-user/:id').put((req, res, next)=>{
    const data = req.body;
    const oldpassword = data.oldpassword;
    User.findOne({_id:req.params.id})
        .then(user=>{
            //  bcrypt.compare(oldpassword, user.password).then(isMatch => {
            //      if (!isMatch) {
                      let errors = {};
            //          errors.oldpassword = "Current  password is not matched";
            //          return res.status(404).json( errors);
            //      } else{
            //          const { errors, isValid } = validateRegisterInput(req.body);
            //          if (!isValid) {
            //              return res.status(400).json(errors);
            //          }

                     user.userid = data.userid;
                     user.name = data.name;
                     user.email = data.email;
                    //  const password = data.password;
                     user.formdata = data.formData;
                    //console.log(user.formdata)
                    // bcrypt.genSalt(10, (err, salt)=>{
                    //     bcrypt.hash(password, salt, (err,hash) => {
                    //         if (err) throw err;
                    //         password = hash;
                    //     });
                    // })
                     //data.password = password;
                    // console.log(data)
                     User.findByIdAndUpdate(req.params.id,{
                          $set:user
                      },(error,data)=> {
                          if(error){
                              return res.status(400).json(error);
                         } else {
                              res.json(data)
                          }
                     })

                 })
              })   
// })})


router.route('/change-action/:id').put((req, res, next)=>{
    const data = req.body;
    //console.log(data)
    User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error)
            console.log(error)
        } else {
            res.json(data)
            console.log('Active updated successfully')
        }
    })
}
)

let multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4')

const DIR = 'public'; 

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (_req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

router.post('/upload-images/:id',upload.array('imgCollection',6),(req, res, next) => {

    const reqFiles = [];
    if (req.files.length == 0) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
      }
    //const url = req.protocol + '://' + req.get('host')
    const url = 'http://10.10.10.193:5000';
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/public/' + req.files[i].filename)
    }
    User.findOne({_id:req.params.id})
        .then(user=>{
            console.log(reqFiles)
            user.imgurl = reqFiles;
            User.findByIdAndUpdate(req.params.id,{
                $set:user
            },(error,data)=> {
                if(error){
                    return res.status(400).json(error);
               } else {
                    res.json(data)
                }
           })
        })
})

router.post('/upload-images/',upload.array('imgCollection',6),(req, res, next) => {
    const reqFiles = [];
    if (req.files.length == 0) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
      }
    //const url = req.protocol + '://' + req.get('host')
    const url = 'http://10.10.10.193:5000';
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/public/' + req.files[i].filename)
    }

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists"});
        } else {
            const newUser = new User({
                name: req.body.name,
                userid: req.body.userid,
                email: req.body.email,
                password: req.body.password,
                imgurl: reqFiles,
                role: req.body.role,                
            });

            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
    
})

router.get("/search/:id", (req, res)=> {
    if (req.params.id == ''){
        User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving users "
            })
        })
    } else{
    const searchname = req.params.id;
    User.find({ name: searchname})
        .then(user => {
            console.log(user)
            if(user){
                res.json(user);
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving users "
            })
        })
    }
})

router.post('/addtask/',upload.array('imgCollection',6),(req, res, next) => {
    const reqFiles = [];
    if (req.files.length == 0) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
      }
    //const url = req.protocol + '://' + req.get('host')
    const url = 'http://10.10.10.193:5000';
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/public/' + req.files[i].filename)
    }

    // const { errors, isValid } = validateRegisterInput(req.body);

    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    // Task.findOne({ email: req.body.email }).then(user => {
    //     if (user) {
    //         return res.status(400).json({ email: "Email already exists"});
    //     } else {

            const now = new Date();
            const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Oug', 'Sep', 'Oct', 'Nov', 'Dec']
            const date = month[now.getMonth()]+" "+now.getDate()+","+now.getFullYear(); 


            const newTask = new Task({
                client: req.body.client,
                tasktitle: req.body.tasktitle,
                country: req.body.country,
                level: req.body.level,
                imgurl: reqFiles,
                type: req.body.type,
                budget: req.body.budget,
                deadline: req.body.deadline,
                description: req.body.description,
                payment: req.body.payment,
                date: date,
                progress: 0,
                active: "active"

            });

            // bcrypt.genSalt(10, (err, salt)=>{
            //     bcrypt.hash(newUser.password, salt, (err,hash) => {
            //         if (err) throw err;
            //         newUser.password = hash;
                    newTask
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
    //             });
    //         });
    //     }
    // });
    
})

module.exports = router;