const express = require('express');
const nodemailer = require('nodemailer');

require('dotenv').config();

const router = express.Router();

const {getAppointment,updateAppointmentStatus,AppointmentController} =require('../controllers/appointmentController')
const {authenticateToken} = require('../middleware/authMiddleware');




router.post('/api/appointments/book', authenticateToken,AppointmentController);


router.get('/api/appointments/get',authenticateToken,getAppointment);

router.post('/api/appointments/:id',authenticateToken ,updateAppointmentStatus);

// 

// 















// Endpoint to book an appointment
// router.post('/api/appointments/book', async (req, res) => {
//   const { name, phone, date } = req.body;

//   // const newAppointment = new Appointment({ name, phone, date });
  
//   try {
//     // await newAppointment.save();
//     const newappointment= await AppointmentModel.create({name,phone,date})
//     // Send email notification
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: 'bhaiyuvirathod123@gmail.com', // replace with doctor's email
//       subject: 'New Appointment Booking',
//       text: `New appointment booking:\nName: ${name}\nPhone: ${phone}\nDate: ${new Date(date).toLocaleString()}`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//         return res.status(500).send('Error booking appointment and sending email');
//       } else {
//         console.log('Email sent:', info.response);
//         return res.status(200).send('Appointment request send successfully');
//       }
//     });
//   } catch (error) {
//     console.error('Error saving appointment:', error);
//     res.status(500).send('Error booking appointment');
//   }
// });

// Endpoint to get all appointments
/*
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).send('Error fetching appointments');
  }
});
*/

module.exports = router;
