const express = require("express");
const dotenv = require("dotenv").config()
// dotenv.config();
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const gymRoutes = require("./routes/gym");
const reclamationRoutes = require("./routes/reclamation");

const authRoutes = require("./routes/auth");
const passwordResetRoutes = require("./routes/passwordReset");
const path = require("path");
const cookieParser=require('cookie-parser');
const session= require('express-session');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const coachingRoutes = require("./routes/coachings"); // import products router
const reservationcRoutes = require("./routes/reservationcs"); // import products router

const productRoutes = require("./routes/products"); // 
const cartRoutes = require("./routes/Cart"); // 
const blogRoutes = require("./routes/blog"); // 
const comment = require("./routes/comment")
// const chatRoutes = require("./routes/chat")



const twilio = require('twilio');



const scRoutes = require("./routes/scraping"); // 

// const http = require('http');
// const createSocketServer = require('./routes/socket');

// const server = http.createServer(app);

// createSocketServer(server);



// Définir le chemin pour les fichiers statiques, y compris les images

//chat 
// const webSocketsServerPort = 8000;
// const webSocketServer = require('websocket').server;
// const http = require('http');

// // Spinning the http server and the websocket server.
// const server = http.createServer();
// server.listen(webSocketsServerPort);
// console.log('listening on port 8000');


// const wsServer = new webSocketServer({
//   httpServer: server
// });

// const clients = {};

// // This code generates unique userid for everyuser.
// const getUniqueID = () => {
//     const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
//     return s4() + s4() + '-' + s4();
//   };
  
//   wsServer.on('request', function (request) {
//     var userID = getUniqueID();
//     console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  
//     // You can rewrite this part of the code to accept only the requests from allowed origin
//     const connection = request.accept(null, request.origin);
//     clients[userID] = connection;
//     console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
  
//     connection.on('message', function(message) {
//       if (message.type === 'utf8') {
//         console.log('Received Message: ', message.utf8Data);
  
//         // broadcasting message to all connected clients
//         for(key in clients) {
//           clients[key].sendUTF(message.utf8Data);
//           console.log('sent Message to: ', clients[key]);
//         }
//       }
//     })
//   });



const db=process.env.DBURL


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

app.use(cookieParser());

app.use(session({
    secret:'my-secret-key',
    resave:false,
    saveUninitialized:true
}));


// routes
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);
// Route to display users
// Route to display users
app.get("/api/users", userRoutes.get);

// Route to delete a user
app.delete("/api/users/:id", userRoutes.delete);
// Route to block a user
app.put("/api/users/:id/block", userRoutes.put);
//jawher routes
app.use("/api/coachings", coachingRoutes); // use products router
app.use('/uploads', express.static('uploads'));
app.use("/api/reservations", reservationcRoutes); // use products router
//end jawher routes

//chedi routes
app.use("/api/products", productRoutes); // use products router
app.use("/api/cart", cartRoutes); // use products router 
app.get("/api/blog/recent", blogRoutes.get); // use products router 

app.use("/api/blog", blogRoutes); // use products router 


app.use("/api/commentaire", comment); // use products router 
// app.use("/api/chat", chatRoutes); // use products router 

//chedi routes fin


app.use("/api/gyms",gymRoutes);
app.use("/api/reclamations",reclamationRoutes);





app.use("/api/sc",scRoutes);
const port = process.env.PORT || 5000;
/** POST: http://localhost:8080/uploads  */
//  app.post("/uploads", async (req, res) => {
//      const body = req.body;
//      try{
//          const newImage = await Post.create(body)
//          newImage.save();
//          res.status(201).json({ msg : "New image uploaded...!"})
//      }catch(error){
//          res.status(409).json({ message : error.message })
//     }
//  })

app.listen(port, console.log(`Listening on port ${port}...`));

console.log("")

