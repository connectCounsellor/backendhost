const mongoose = require('mongoose');

const WebinarSchema = mongoose.Schema({
    title: String,
    date: Date,
    time: String,
    presenter: String,
    description: String,
    meetingLink: String,
    meetingId: String,
    meetingPass: String,
    platform: String,
})

const Webinar = mongoose.model('Webinar', WebinarSchema);

module.exports = Webinar;