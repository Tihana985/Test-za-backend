const Course = require("../pkg/course/courseSchema");

exports.createCourse = async (req, res) => {
  try{
    const newCourse = await Course.create(req.body);
    res.send(newCourse);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.getAllCourse = async (req, res) => {
  try{
  const queryObj = {...req.query};
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g,
  (match)=> `$${match}`
  );
  const query = JSON.parse(queryString);
  const course = await Course.find(query);
  res.send(course);
}catch(err){
  res.status(400).json({
    status: "fail",
    message: err
  });
}
};

exports.getOneCourse = async (req, res) => {
  try{
    const getOneCourse = await Course.findById(req.params.id);
    res.send(oneCourse);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.updateCourse = async (req, res) => {
  try{
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body,
      {
        new: true,
        runValidators: true
      });
      res.send(updatedCourse);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

// exports.deleteCourse = async (req, res) => {
//   try{
//     await Course.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//       status: "success",
//       data: null
//     });
//   }catch(err){
//     res.status(400).json({
//       status: "fail",
//       message: err
//     });
//   }
// };