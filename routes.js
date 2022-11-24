const User = require("./models/UserModels"),

userController = require("./controllers/UserController.js");
module.exports = function (app) {
  /**
   * @swagger
   * /user:
   *  get:
   *    tags: [user]
   *    description: "Get all users"
   *    responses:
   *      200:
   *        description: "success"
   *        schema:
   *                type: array
   *                items: 
   *                  properties:
   *                    name: 
   *                      type: string
   *                      example: Anastasia
   *                    age:
   *                      type: integer
   *                      example: 18
   */
  app.get("/user", userController.getListOfUsers);
  app.get("/user/:name", userController.getUsersByName);
  app.post("/user", userController.addUser);
  app.delete("/user/:userId", userController.removeUser);
  app.put("/user/:userId", userController.updateUser);
  app.get("/user/user-by-age/:from/:to",userController.getUsersByAge);
  app.delete("/remove-empty-document", userController.removeEmptyDocument);
  app.put("/add-height", userController.addFildHeight);
  app.get("/heights", userController.getHeightsUser);
  app.get("/avr-height-gender", userController.getAverageHeightByGender)
  app.get("/youngest", userController.getYoungest)
};




// 13) Додати поле стать в бд, якщо його не існує. За допомогою функції агрегації 
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/avg/ 
// реалізувати отримання середнього зросту жінок і чоловіків

// 9) Показати наймолодшого користувача, використати функцію findOne(). 
// Додати перевірку, щоб поле вік існувало в документі 

// 1) Видалити документи в яких порожнє АБО ім'я, АБО вік (використайте $or)

// 7) Показати користувачів зі зростом ВІД і ДО, ці поля надходять від клієнта