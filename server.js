const express = require("express"),
  app = express(),
  port = process.env.port || 3000;
  (routes = require("./routes.js")),
  (mongoose = require("mongoose")),
  (User = require("./models/UserModels"));
const swaggerJsDocs=require("swagger-jsdoc");
const swaggerUiExpress=require("swagger-ui-express");
const bodyParser= require("body-parser");
mongoose.connect("mongodb://localhost/users_db");



const swaggerOption = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "API for users",
            description:"users",
            servers:["http://localhost:3000/"]
        },
    },
    apis: ["./routes.js"]
}
const swaggerDocs = swaggerJsDocs(swaggerOption);
  app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));


app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
routes(app);
app.listen(port);
