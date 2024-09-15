const coursesModel = require('../models/courses');




const writeCourse = async (req, res) => {
    try {
        const course = await coursesModel.create({
            name: req.body.name,
            image: req.body.image,
            shortdescription: req.body.shortdescription,
            description: req.body.description,
            content: req.body.content,
            category: req.body.category,
            author: req.body.author,
            youtubeLink: req.body.youtubeLink,
            date: req.body.date,

        });
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const readCourse = async (req, res) => {
    try {
        const courses = await coursesModel.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const readcourseById = async (req, res) => {
    try {
        const course = await coursesModel.findOne({ _id: req.params.id });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await coursesModel.findOneAndDelete({ _id: courseId });
        if (!course) {
            return res.status(404).send('Course not found');
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCourse = async(req,res)=>{
    try{
        const{courseId} = req.params;
        const updateCourse = req.body;

        const course = await coursesModel.findByIdAndUpdate(courseId,updateCourse,{new:true});

        if(!course){
            return res.status(400).json({message : 'course not found'});
        }
        res.json(course);
    }
    catch(error){
        res.status(500).json({message : 'error updating course',error})
    }
};





module.exports = { writeCourse, readCourse, readcourseById, deleteCourse ,updateCourse};
