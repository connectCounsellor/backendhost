const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  slot: { 
    type: String, 
    required: true,
    enum: [
      "10-11", "11-12", "12-1", 
      "1-2", "2-3", "3-4", "4-5", "5-6",
      "6-7", "7-8", "8-9", "9-10"
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