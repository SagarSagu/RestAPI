const TrainerModel = require("../model/index").trainer;
const assert = require("assert");

module.exports = {
    allTrainers: (req, res) => {
        // read all students
        TrainerModel.find( (err, response) => {
            if(err) assert.equal(err, null);
            res.json(response);
        });
    },
    createTrainer: (req, res) => {
        // adding new student to db
        let trainer = new TrainerModel(req.body);

        trainer
        .save()
        .then((response) => {
            res.status(200).json({ code: 200, message: "Trainer Created "});
        })
        .catch((err) => {
            res.status(200).json({ code: 301, message: "unable to save trainer data" });
        });


    },
    showTrainer: (req, res) => {
        // viewing single contact info
        let id = req.params.id;
        TrainerModel.findById({ _id: id }, (err, data) => {
            if (err) assert.equal(err, null);
            res.json(data);
        });
    },
    updateTrainer: (req, res) => {
        let id = req.params.id; // read id from url address

        
        TrainerModel.findById({ _id: id}, trainer, (err, response) => {
            if (err) assert.equal(null, err);
            if (!response) {
                assert.equal(err, null);
                res.status(200).json({ code: 301, message: 'No data found..'})
            } else {
                response.trainerId = req.body.trainerId;
                response.name = req.body.name;
                response.skills = req.body.skills;
                response.gender = req.body.gender;
                response.phone = req.body.phone;
                response.email = req.body.email;
                
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
    deleteTrainer: (req, res) => {
        let id = req.params.id;

        TrainerModel.findByIdAndDelete({ _id: id }, (err, response) => {
            if (err) {
                assert.equal(null, err);
                res.status(200).json({ code: 301, message: "Unable to delete" });
            } else {
                res.status(200).json({ code: 200, message: "Trainer deleted successfully" });
            }
        });
    },
};