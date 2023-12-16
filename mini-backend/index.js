import express, { request, response } from "express"; //create Express server
import mongoose from "mongoose";
import { Registration } from "./Signup.js";
import cors from "cors";
import { BidRegistration } from "./BidService.js";

const app = express();
app.use(cors());
app.use(express.json());

const connectdb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/projectdb");
    console.log("connection established");
  } catch (error) {
    console.log(error);
  }
};


app.post("/signup", async (request, response) => {
  try {
    const reqdata = request.body;
    console.log("Received Data:", reqdata); // Add this line for logging
    const Registrations = new Registration(reqdata);
    await Registrations.save();
    response.send({ message: "Registered successfully" });
  } catch (error) {
    response.send({ message: "Error connecting to" });
  }
});

app.get("/signup", async (request, response) => {
  try {
    const Registrations = await Registration.find();
    response.send({ Registrations: Registrations });
  } catch (error) {
    response.send({ message: "Error connecting to" });
  }
});

app.delete("/signup/:username", async (request, response) => {
  try {
    await Registration.deleteOne({ username: request.params.username });
    response.send({ message: "Deleted Successfully" });
  } catch (error) {
    response.send({ message: "Error connecting to" });
  }
});

app.put("/signup/:username", async (request, response) => {
  try {
    const updatedData = request.body;
    await Registration.findOneAndUpdate(
      { username: request.params.username },
      { $set: updatedData },
      { new: true }
    );
    response.send({ message: "Updated Successfully" });
  } catch (error) {
    response.send({ message: "Error updating data" });
  }
});

app.listen(4503, () => {
  console.log("Server is running");
  connectdb();
});

// For BId Modal API's
//====================

app.get("/bid", async (request, response) => {
  try {
    const BidRegistrations = await BidRegistration.find();
    response.send({ BidRegistrations: BidRegistrations });
  } catch (error) {
    response.send({ message: "Error connecting to" });
  }
});

app.post("/bid", async (request, response) => {
  try {
    const reqdata = request.body;
    console.log("Received Data:", reqdata); // Add this line for logging
    const BidRegistrations = new BidRegistration(reqdata);
    await BidRegistrations.save();
    response.send({ message: "Registered successfully" });
  } catch (error) {
    response.send({ message: "Error connecting to" });
  }
});

app.delete("/bid/:bidderName", async (request, response) => {
  try {
    await BidRegistration.deleteOne({ bidderName: request.params.bidderName });
    response.send({ message: "Deleted Successfully" });
  } catch (error) {
    response.send({ message: "Error connecting to" });
  }
});

app.put("/bid/:bidderName", async (request, response) => {
  try {
    const updatedData = request.body;
    await BidRegistration.findOneAndUpdate(
      { bidderName: request.params.bidderName },
      { $set: updatedData },
      { new: true }
    );
    response.send({ message: "Updated Successfully" });
  } catch (error) {
    response.send({ message: "Error updating data" });
  }
});
