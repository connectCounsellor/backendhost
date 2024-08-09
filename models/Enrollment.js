const mongoose = require("mongoose");

const enrollmentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  payment: {
    paymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    orderId: { type: String, required: true },
    status: { type: String, required: true },
    paymentMethod: { type: String, required: true },
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  receiptId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = Enrollment;
