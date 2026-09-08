import express from "express";
import bcrypt from "bcrypt"
import cors from "cors";
const app = express();
const port = 3030;
import mysql from "mysql"
import { env }  from "process";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/router.js";
import postRoutes from "./routes/post.js";
import cookieParser from "cookie-parser"

import 'dotenv/config'; 
app.use(cors({
   origin: 'http://localhost:3000', credentials: true }
));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json()); 
app.use(cookieParser()); 

app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

var con = mysql.createConnection({
  host: env.Host,
  user: env.Username,
  port: env.Port,
  password: env.Password,
});

mongoose
  .connect(env.db_con)
  .then(() => {
    if(mongoose.connection.readyState == 1)
      console.log(`Connected to MongoDB`);

  })
  .catch((err) => {
    console.log("MongoDB connection error: ", err);
  });


con.connect(function (err) {
  try {
    if (err) throw err;
    console.log("#####---Connected---#####");
  } catch (err) {
    console.warn("Error while connecting to SQL DB: ", err);
  }
});


app.get("/", (req, res) => {
  res.send({message: "Hello from express servor"});
  console.log("we gotta request.");
});

app.get("/total_users", (req, res) => {
  // console.log("we gotta request.");
   con.query(
    "Select count(*) as total_users from demo.users",
    function (err, result, fields) {
      if (err) throw err;
      console.log(result[0]);
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
      //res.end(JSON.stringify({"total_users": result[0].total}));
    }
  );
});

app.post("/login", (req, res) => {
  console.log("we gotta login request.", req.body);
  let message = {message : "login error"}
  con.query(
    "Select username,password from demo.users where email=(?)",[req.body.email],
    function (err, result, fields) {
      if (err) {
        // Step 2: Log the error
        console.error("Database query error:", err);
        // Step 3: Send a response with an appropriate message
        return res.status(500).send("An internal server error occurred.");
      }
      // Record not match
      if(result.length == 0){
        return res.status(200).send(JSON.stringify(message));
      }
      bcrypt.compare(req.body.password, result[0].password, (err,result) => {
        if(result){
          res.status(200).send(JSON.stringify({message: "login successful"}));
        } else {
          es.status(200).send(JSON.stringify(message));
        }
      });
      // res.status(200);
      // res.setHeader("Content-Type", "application/json");
      // res.end(JSON.stringify(message));
      //res.end(JSON.stringify({"total_users": result[0].total}));
    }
  );
});


app.listen(port, () => {
  console.warn(`Server started on ${port}`);
});
