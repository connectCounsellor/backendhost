const Webinar = require('../models/Webinar');
const User = require('../models/userModel');

// Function to handle enrollment requests


// Function to handle payment confirmation
const confirmPayment = async (req, res) => {
    try {

        const userId =req.user._id.toString();
        
        
        const { webinarId,paymentId, orderId, signature } = req.body;
        const webinar = await Webinar.findById(webinarId);

        // Verify payment
        const crypto = require('crypto');
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${orderId}|${paymentId}`)
            .digest('hex');

        if (expectedSignature !== signature) {
            return res.status(400).json({ success: false, message: 'Payment verification failed' });
        }

        // Payment verified, add user to paidUsers list
        
        if (!webinar) {
            return res.status(404).json({ success: false, message: 'Webinar not found' });
        }

        if (!webinar.paidUsers.includes(userId)) {
            webinar.paidUsers.push(userId);
            await webinar.save();
        }

        // Redirect user to the details page after payment confirmation
        return res.status(200).json({ success: true, messsage:'enrolled successfully'});
    } catch (error) {
        console.error('Error confirming payment:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
// Endpoint to check enrollment status
const checkEnrollmentStatus = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const { webinarId } = req.body;

        if (!webinarId) {
            return res.status(400).json({ success: false, message: 'Webinar ID is required' });
        }

        const webinar = await Webinar.findById(webinarId);
        if (!webinar) {
            return res.status(404).json({ success: false, message: 'Webinar not found' });
        }

        const alreadyPaid = webinar.paidUsers.includes(userId);
        return res.status(200).json({ success: true, alreadyPaid });
    } catch (error) {
        console.error('Error checking enrollment status:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};




module.exports = {
  confirmPayment,
    checkEnrollmentStatus,
};
