import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import bookRoute from "./route/book.route.js"
import cors from "cors"
import userRoute from "./route/user.route.js";
import paymentRoute from "./route/payment.route.js"
import sendemailRoute from "./route/sendEmail.route.js"
import { isSubcribe } from "./controller/payment.controller.js";
import User from "./modal/user.modal.js";
// import  bodyParser from "bodyparser"
// import cors from "cors"

const app = express()
dotenv.config();

// Enable CORS for all requests
app.use(cors());
// parse application/json
app.use(express.json());
// app.use(bodyParser.json());
const PORT=process.env.PORT || 4000;
const URI=process.env.MongoDBURI;
//connect the mongoDB
try {
    mongoose.connect(URI,{
       
    });
    console.log("Connected to MongoDB")
} catch (error) {
    console.log("Error connecting to MongoDB  :error are  :"  ,error)
}

//definig routes
app.use("/book",bookRoute);
app.use("/user",userRoute);
app.use("/subscription" , paymentRoute)
app.use("/",sendemailRoute)
app.post('/update-subscription-status', isSubcribe )

app.get('/subscription-status/:userId/:bookId', async (req, res) => {
  const { userId, bookId } = req.params;
  try {
      const user = await User.findById(userId);
      const isSubscribed = user.subscriptions.includes(bookId);
      res.status(200).json({ isSubscribed });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching subscription status', error });
  }
});




app.listen(PORT, () => {
  console.log(` app is listening on port ${PORT}`)
}) 