const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");

const path = require("path");

dotenv.config();

const app =express();
app.use(express.json());
app.use(cors({ 
  origin: ["http://mycarapp-ai9d.vercel.app" ],
            methods: ["POST", "GET"],
            credentials: true
  }
  ));



const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/api/users", userRoutes);
app.use("/api", productRoutes);

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(3000, () => console.log('Server running on 3000'));
