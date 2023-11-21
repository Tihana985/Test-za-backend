const Academy = require("../pkg/academy/academySchema");

exports.createAcademy = async (req, res) => {
  try{
    const newAcademy = await Academy.create(req.body);
    res.send(newAcademy);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.getAllAcademy = async (req, res) => {
  try{
  const queryObj = {...req.query};
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g,
  (match)=> `$${match}`
  );
  const query = JSON.parse(queryString);
  const academy = await Academy.find(query);
  res.send(academy);
}catch(err){
  res.status(400).json({
    status: "fail",
    message: err
  });
}
};

exports.getOneAcademy = async (req, res) => {
  try{
    const oneAcademy = await Academy.findById(req.params.id);
    res.send(oneAcademy);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.updateAcademy = async (req, res) => {
  try{
    const updatedAcademy = await Academy.findByIdAndUpdate(req.params.id, req.body,
      {
        new: true,
        runValidators: true
      });
      res.send(updatedAcademy);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

// exports.deleteAcademy = async (req, res) => {
//   try{
//     await Academy.findByIdAndDelete(req.params.id);
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