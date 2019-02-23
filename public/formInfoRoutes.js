const express = require('express');
const formInfoRoutes = express.Router();

// Require FormInfo model in our routes module
let FormInfo = require('./formInfoModel');

// Defined store route
formInfoRoutes.route('/add').post(function (req, res) {
  let formInfo = new FormInfo(req.body);
  formInfo.save()
    .then(formInfo => {
      res.status(200).json({'formInfo': 'formInfo in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
// formInfoRoutes.route('/').get(function (req, res) {
//     FormInfo.find(function(err, formInfos){
//     if(err){
//       console.log(err);
//     }
//     else {
//       res.json(formInfos);
//     }
//   });
// });

// // Defined edit route
// formInfoRoutes.route('/edit/:id').get(function (req, res) {
//   let id = req.params.id;
//   FormInfo.findById(id, function (err, formInfo){
//       res.json(formInfo);
//   });
// });

// //  Defined update route
// formInfoRoutes.route('/update/:id').post(function (req, res) {
//     FormInfo.findById(req.params.id, function(err, formInfo) {
//     if (!formInfo)
//       res.status(404).send("data is not found");
//     else {
//         formInfo.person_name = req.body.person_name;
//         formInfo.formInfo_name = req.body.formInfo_name;
//         formInfo.formInfo_gst_number = req.body.formInfo_gst_number;

//         formInfo.save().then(formInfo => {
//           res.json('Update complete');
//       })
//       .catch(err => {
//             res.status(400).send("unable to update the database");
//       });
//     }
//   });
// });

// // Defined delete | remove | destroy route
// formInfoRoutes.route('/delete/:id').get(function (req, res) {
//     FormInfo.findByIdAndRemove({_id: req.params.id}, function(err, formInfo){
//         if(err) res.json(err);
//         else res.json('Successfully removed');
//     });
// });

module.exports = formInfoRoutes;