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


const getWebinarById = async (req, res) => {
  try {
      const webinar = await WebinarModel.findById(req.params.id);
      if (!webinar) {
          return res.status(404).json({ message: 'Webinar not found' });
      }

      // Check if the webinar is paid
      if (webinar.price > 0) {
          // Check if the user has paid for the webinar
          const userPaid = webinar.paidUsers.includes(req.user._id);
          if (!userPaid) {
              return res.status(403).json({ message: 'Access denied. Payment required.' });
          }
      }

      res.status(200).json(webinar);
  } catch (error) {
      console.error('Error fetching webinar:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};


const deleteWebinarById = async (req, res) => {
  const webinar_id  = req.params.webinar_id;
console.log(webinar_id);
  // Validate the webinar_id
  if (!webinar_id) {
    return res.status(400).json({ message: 'Webinar ID is required' });
  }
 
  try {
    const webinar = await WebinarModel.findOneAndDelete({ _id: webinar_id });

    if (!webinar) {
      return res.status(404).json({ message: 'Webinar not found' });
    }

    res.status(200).json({ message: 'Webinar deleted successfully' });
  } catch (error) {
    console.error('Error deleting webinar:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


const updateWebinarById = async (req, res) => {

  const editWebinarid= req.params.id;
  const { title,
    date,
    time,
    presenter,
    description,
    meetingLink,
    meetingId,
    meetingPass,
    platform,price} = req.body;


    try
  {
    const webinar = await WebinarModel.findByIdAndUpdate(
      editWebinarid,
      {
        date,
        time,
        presenter,
        description,
        meetingLink,
        meetingId,
        meetingPass,
        platform,
        price
      },
      {
        new: true, // Return the updated document
      }
    );
    if (!webinar) {
      return res.status(404).json({ message: 'Webinar not found' });
    }
    res.status(200).json(webinar);

  }
  catch(error){
res.status(404).json({ message:"Error updating the webinar"})

  }



}

module.exports={getWebinars,postWebinar,getWebinarById,deleteWebinarById,updateWebinarById}