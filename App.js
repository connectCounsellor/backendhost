const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config();

const cors = require('cors');
const path = require('path');
const connectDB = require('./Util/dbconfig');

const coursesRoute = require('./routes/courses');
const app = express();
const port = process.env.PORT || 3000;
const passport = require('passport');
const gAuth = require('./routes/googleAuth')
require('./configs/passportconfig')
const FcmToken = require('./routes/FcmToken')
const BlogRoute = require('./routes/blog');
const authRoute = require('./routes/authRoute');
const appointmentRoutes = require('./routes/Appointment')
// const UserprofileRoutes = require('./routes/UserProfile')
const sendDailyQuote = require('./controllers/notificationController')
const UserprofileRoutes = require('./routes/UserProfile');
const accountsettingRoute = require('./routes/Acountsetting')
const paymentRoutes = require('./routes/payment')
const enrollmentRoute = require('./routes/EnrollmentRoute');
const WebinarRoute = require('./routes/Webinar');
// const {authenticateToken} = require('./middleware/authenticate'); 
// Middleware

const QuotesRoutes = require('./routes/QuotesRoutes')
app.use(cors());
app.use(express.json()); // To parse JSON bodies






// Connect to MongoDB
connectDB();


app.use(passport.initialize());
app.use('/api',QuotesRoutes)
app.use('/api',FcmToken)
app.use('/auth', gAuth);
app.use(BlogRoute);
app.use(coursesRoute);
app.use(authRoute);
app.use(appointmentRoutes);
app.use(UserprofileRoutes);
app.use(accountsettingRoute)
app.use(paymentRoutes);
app.use(enrollmentRoute);
app.use(WebinarRoute); // Route
app.get('/',(req,res)=>{
    res.send('on  / route visit other routes......')  // Homepage route for testing purposes
});
app.listen(port, () => console.log(`Server listening on port ${port}!`));
