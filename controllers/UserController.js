const { updateMany } = require("../models/UserModels");

const mongoose = require("mongoose"),
  user = mongoose.model("Users");

exports.getListOfUsers = function (req, res) {
  user.find((err, users) => {
    if (err) res.send(err);

    res.json(users);
  });
};
exports.getUsersByName = function (req, res) {
  user.find(
    {
      name: { $regex: req.params.name, $options: "i" },
    },
    (err, users) => {
      if (err) res.send(err);

      res.json(users);
    }
  )
  .sort({"age":-1})
  .limit(2);
};
exports.addUser = function (req, res) {
  let newUser = new user(req.body);
  console.log(req);
  newUser.save((err, user) => {
    if (err) res.send(err);

    res.json(user);
  });
};
exports.removeUser = (req , res) => {
  user.remove({
    _id:req.params.userId,
  },
  (err, user) => {
    if(err) res.send(err);
    res.json({message:"Success"})
  })
}
exports.updateUser = (req, res)=>{
  user.findOneAndUpdate({
    _id: req.params.userId
  },
  req.body, {new:true},
  (err, user) => {
    if(err) res.send(err);
    res.json(user)
  })
}
exports.getUsersByAge = (req,res)=>{
  user.find({
    age: {
      $gt: req.params.from,
      $lte: req.params.to,
    }
  },
  (err, users) => {
    if(err) res.send(err);
    res.json(users)
  })
}
exports.removeEmptyDocument = (req,res)=>{
  user.remove({
    "name":{$exists:false}
  }, (err,users)=>{
    if(err)
      res.status(404).send(err);
    res.status(200).json({message:"Successful"})
  }

  )
}
exports.addFildHeight = (req,res)=>{
  user.updateMany({},{$set:{"height":170}},
  (err,users)=>{
    if(err)
      res.status(404).send(err);
    res.status(200).json({message:"Successful"})}
  )
}
exports.getHeightsUser = (req,res)=>{
  user.find({},
  (err, users) => {
    if(err) res.send(err);
    res.json(users)
  })
  .sort({"height":-1})
  .limit(1)
}
exports.getAverageHeightByGender = (res,req) => {
  user.aggregate()
  .group({
      _id:"gender",
      avg: {$avg:"height"}
        },
    (err, users) => {
      if(err) res.send(err);
      res.json(users)
    }
  )
}
exports.getYoungest = (res,req) => {
  user.findOne({},
    (err, users) => {
      if(err) res.send(err);
      res.json(users)
    })
  .sort({"age":1})
}