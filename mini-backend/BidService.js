import mongoose, { Schema } from "mongoose";

const BidRegistrationSchema = new Schema({
  artWorkNumber: String,
  bidderName: String,
  bidderPrice: String,
  bidderEmail: String,
  contactNumber: String,
});

export const BidRegistration = mongoose.model(
  "BidRegistrationInfo",
  BidRegistrationSchema
);
