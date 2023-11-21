
// Vo terminal
// npm init -y
// npm install express
// npm install mongoose
// npm install dotenv
// npm install express-jwt 
// npm install jsonwebtoken
// npm install bcryptjs 
// npm install bcrypt
// npm install validator

//Povikuvanje na paketi
const express = require ("express");
const jwt = require ("express-jwt");// zastita na url za nenajaveni 
const db = require("./pkg/db/index")
const cookieParser = require("cookie-parser");

//Ja inicijalizirame app
const app = express();

//Izvrsuvanje na f-ja so koja se konektirame so databaza
db.init();

//Povikuvanje-importiranje na handler
const  academyHandler = require("./handlers/academyHandler");
const courseHandler = require("./handlers/courseHandler"); 
const testHandler = require("./handlers/testHandler");
const authHandler = require("./handlers/authHandler"); 


//* Povikuvanje middlewares
app.set("view engine", "ejs"); //app da koristi ejs
app.use(express.json()); //parsiranje na podatoci
app.use(express.urlencoded({extended: true})); //od front gi isprakjame podatocite, se persiraat i prakjaat do serverot
app.use(express.static("public"));
app.use(cookieParser());



app.use(jwt.expressjwt({
    algorithms: ["HS256"],
    secret: process.env.JWT_SECRET,
    getToken: (req) => {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      }
      if (req.cookies.jwt) {
        return req.cookies.jwt;
      }
      return null; // vo slucaj ako nemame isprateno token
    },
    })
    .unless({
        path: ["/api/register", "/api/login", "/register", "/", "login"],
    })
);

// Authentication routes
app.post("/api/register", authHandler.register);
app.post("/api/login", authHandler.login);



//Academy handler routes
app.post("/Exams/academy", academyHandler.createAcademy);
app.get("/Exams/academy", academyHandler.getAllAcademy);
app.get("/Exams/academy/:id", academyHandler.getOneAcademy);
app.patch("/Exams/academy/:id", academyHandler.updateAcademy);
// app.delete("/Exams/academy/:id", academyHandler.deleteAcademy);

//Course handler routes
app.post("/Exams/course", courseHandler.createCourse);
app.get("/Exams/course", courseHandler.getAllCourse);
app.get("/Exams/course/:id", courseHandler.getOneCourse);
app.patch("/Exams/course/:id", courseHandler.updateCourse);
// app.delete("/Exams/course/:id", academyHandler.deleteCourse);

//Test handler routes
app.get("/test", testHandler.getTest);

//* Slusame app
app.listen(process.env.PORT, (err) => {
  if(err){
      return console.log("Couldn't start the service.");
  }
  console.log(`Service started successfully on port ${process.env.PORT}`);
})






  
 
