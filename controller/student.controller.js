const StudentModel = require("../model/index").student;
const assert = require("assert");

module.exports = {
    allStudents: (req, res) => {
        // read all students
        StudentModel.find( (err, response) => {
            if(err) assert.equal(err, null);
            res.json(response);
        });
    },
    createStudent: (req, res) => {
        // adding new student to db
        let student = new StudentModel(req.body);

        student
        .save()
        .then((response) => {
            res.status(200).json({ code: 200, message: "Student Created "});
        })
        .catch((err) => {
            res.status(200).json({ code: 301, message: "unable to save student data" });
        });


    },
    showStudent: (req, res) => {
        // viewing single contact info
        let id = req.params.id;
        StudentModel.findById({ _id: id }, (err, data) => {
            if (err) assert.equal(err, null);
            res.json(data);
        });
    },
    updateStudent: (req, res) => {
        let id = req.params.id; // read id from url address

       
        StudentModel.findById({ _id: id}, contact, (err, response) => {
            if (err) assert.equal(null, err);
            if (!response) {
                assert.equal(err, null);
                res.status(200).json({ code: 301, message: 'No data found..'})
            } else {
                response.name = req.body.name;
                response.gender = req.body.gender;
                response.phone = req.body.phone;
                response.email = req.body.email;
                response.courseId = req.body.courseId;
                response.status = req.body.status;
                response.address = req.body.address;

                response.save().then( obj => {
                    res.status(200).json({ code: 200, message: "Successfully updated"});
                })
                .catch((err) => {
                    assert.equal(null, err);
                    res.status(200).json({ code: 301, message: "Unable to update " });
                });
            }
        });
    },
    deleteStudent: (req, res) => {
        let id = req.params.id;

        StudentModel.findByIdAndDelete({ _id: id }, (err, response) => {
            if (err) {
                assert.equal(null, err);
                res.status(200).json({ code: 301, message: "Unable to delete" });
            } else {
                res.status(200).json({ code: 200, message: "student deleted successfully" });
            }
        });
    },
};