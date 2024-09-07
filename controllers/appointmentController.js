const AppointmentModel = require('../models/Appointment');
const nodemailer = require('nodemailer');
const UserModel = require('../models/userModel');
const cron = require('node-cron');

// Booking an Appointment with Slot
const AppointmentController = async function (req, res) {
  let { reason, date, slot } = req.body; // Added slot in the request body
  const userId = req.user._id;
  console.log(slot);
  
  try {
    // Format the incoming date to exclude the time (YYYY-MM-DD)
    const formattedDate = new Date(date).toISOString().split('T')[0];

    // Check if the slot is already booked for the selected date (ignoring time)
    const existingAppointment = await AppointmentModel.findOne({ 
      date: formattedDate, 
      slot
    });
    console.log(existingAppointment)
    if (existingAppointment && existingAppointment.status === 'pending' ) {
      return res.status(409).json({
        message: "This slot is already booked. Please select another slot.",
        existingAppointment
      });
    }

    // Create a new appointment with the formatted date
    const newAppointment = await AppointmentModel.create({ 
      userId, 
      reason, 
      date: formattedDate, 
      slot 
    });
    
    res.status(200).json({ message: "Appointment booked successfully" });
    
  } catch (err) {
    console.error('Error in AppointmentController:', err.message);
    res.status(500).json({ message: "Error booking appointment" });
  }
};

// Get all appointments
const getAppointment = async function (req, res) {
  try {
    const appointments = await AppointmentModel.find().populate('userId', 'username');
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error in getAppointment:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Update appointment status
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
        from:` "counsillhub" <${process.env.EMAIL_USER}>`,
        to:` userEmail`,
        subject:` Your appointment request has been ${status}`,
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

// Cron job to update appointment statuses daily at midnight
cron.schedule('0 12 * * *', async () => {
  try {
    const currentDate = new Date();

    // Find appointments where the date is less than the current date
    // and the status is either 'pending' or 'accepted'
    const appointments = await AppointmentModel.find({
      date: { $lt: currentDate },
      status: { $in: ['pending', 'accepted','rejected'] }
    });

    // Update the status to 'completed'
    for (const appointment of appointments) {
      appointment.status = 'completed';
      await appointment.save();
    }

    console.log('Daily cron job: Appointment statuses updated');
  } catch (err) {
    console.error('Error in cron job:', err.message);
  }
});







module.exports = { AppointmentController, getAppointment, updateAppointmentStatus,};