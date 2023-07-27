const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const noteModel = require('./models/notes');
const cors =  require('cors')
const userModel = require('./models/users');

 mongoose.connect(  "mongodb+srv://hrideshp2:ntrmhx0IEraGI8hT@newcluster.ecvuffk.mongodb.net/notesApp")

const app = express();
app.use(express.json());
app.use(cors());

const secretKey = "ThisIsTheSecretKey";

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, secretKey, { expiresIn: "7d" });
};
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/getpost", (req,res) =>{
  noteModel.find({}) .then( (err, result) =>{
        err? res.json(err) : res.json(result)
    
    })
})



app.post("/createpost", async(req,res)=>{ 
    const post = req.body;
    const newPost = new noteModel(post);
    await newPost.save();

    res.json(post);
})
// app.post('/createpost', async (req, res) => {
//   const { title, post } = req.body;
//   const token = req.header('Authorization');

//   try {
//     // Get the user ID from the token
//     const decodedToken = jwt.verify(token, secretKey);
//     const userId = decodedToken.userId;

//     // Create a new note with the user ID
//     const newPost = new noteModel({ title, post, user: userId });
//     await newPost.save();

//     res.json(newPost);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'An error occurred while creating the note' });
//   }
// });

app.delete("/delete/:id", async(req,res)=>{
  const id =req.params.id;
  
  await noteModel.findByIdAndRemove(id).exec();

 

})

app.put("/update",async(req,res)=>{
  const newTitle = req.body.title
  const newPost = req.body.post
  const id = req.body.id

  // try{
  //   await noteModel.findById(id).then((error, noteToUpdate)=>{
  //       noteToUpdate.title = newTitle
  //       noteToUpdate.post= newPost
  //       noteToUpdate.save();

  //   })
  // }catch(err){
  //   console.log(err);
  // }
  try {
    await noteModel.findByIdAndUpdate(id, { title: newTitle, post: newPost });
    res.json({ message: "Note updated successfully" });
  } catch (err) {
    console.log(err);
    res.json({ error: "An error occurred while updating the note" });
  }

})



app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token and send it in the response
    const token = generateToken(newUser);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred during sign-up" });
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token and send it in the response
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});


app.listen(3001, ()=>{
    console.log("It is runnign in 3001");
})