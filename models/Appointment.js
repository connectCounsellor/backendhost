const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  slot: { 
    type: String, 
    required: true,
    enum: [
    
      "9","10","11","12","13","14","15","16","17","18","19","20",
    ] // Predefined time slots
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  reason: { type: String, required: true },
});

module.exports = mongoose.model("Appointment", appointmentSchema);