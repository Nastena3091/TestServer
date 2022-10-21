const User = require("./models/UserModels"),
<<<<<<< HEAD
      userController = require("./controllers/userController.js")
=======
  userController = require("./controllers/UserController.js");

>>>>>>> a0bb355ca607a9b40affbb42212d230320d5f932
module.exports = function (app) {
  app.get("/user", userController.getListOfUsers);
  app.get("/user/:name", userController.getUsersByName);
  app.post("/user", userController.addUser);
};
