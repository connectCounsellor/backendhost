const WebinarModel = require("../models/Webinar");

const getWebinars = async (req, res) => {
  try {
    const webinar = await WebinarModel.find();
    if (webinar) {
      res.status(200).json(webinar);
    } else {
      res.status(404).json({ message: "No webinars found." });
    }
  } catch (e) {
    res.status(404).json(e);
  }
};

const postWebinar = async (req, res) => {
    const { title,
        date,
        time,
        presenter,
        description,
        meetingLink,
        meetingId,
        meetingPass,
        platform,price} = req.body;

        try {
            const newWebinar = await  WebinarModel.create({
                title,
                date,
                time,
                presenter,
                description,
                meetingLink,
                meetingId,
                meetingPass,
                platform,
                price,
            });
            res.status(201).json(newWebinar);

        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
}

module.exports={getWebinars,postWebinar}