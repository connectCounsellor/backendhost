// controllers/appointmentController.js
const AppointmentModel = require('../models/Appointment');
const nodemailer = require('nodemailer');
const UserModel = require('../models/userModel');
const AppointmentController = async function (req, res) {
  let { reason, date } = req.body;
  const userId = req.user._id;

  try {
    const newAppointment = await AppointmentModel.create({ userId, reason, date });
    res.status(200).json({ message: "Appointment booked successfully" });
  } catch (err) {
    console.error('Error in AppointmentController:', err.message);
    res.status(500).json({ message: "Error booking appointment" });
  }
};

const getAppointment = async function (req, res) {
  try {
    const appointments = await AppointmentModel.find().populate('userId', 'username');
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error in getAppointment:', error.message);
    res.status(500).json({ error: error.message });
  }
};


const updateAppointmentStatus = async function (req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    console.log(`Updating appointment status for appointment ID: ${id} to ${status}`);

    const appointment = await AppointmentModel.findById(id).populate({
      path: 'userId',
      model: UserModel, // Reference to User model where email is stored
      select: 'email' // Select only the email field
    });

    if (!appointment) {
      console.log(`Appointment not found for ID: ${id}`);
      return res.status(404).json({ message: "Appointment not found" });
    }

    console.log('Current appointment:', appointment);

    appointment.status = status;
    await appointment.save();

    console.log('Appointment status updated:', appointment);

    // Send email notification if status is 'rejected'
    if (appointment.userId && appointment.userId.email) {
      const userEmail = appointment.userId.email;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: `"counsillhub" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: `Your appointment request has been ${status}`,
        text: `Your appointment request on ${new Date(appointment.date).toLocaleString()} for ${appointment.reason} has been ${status}.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    // Respond with updated appointment details
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error in updateAppointmentStatus:', error.message);
    res.status(500).json({ message: "Error updating appointment status" });
  }
};


module.exports = { AppointmentController, getAppointment, updateAppointmentStatus };
