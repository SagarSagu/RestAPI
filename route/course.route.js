const express = require('express');
const courseRoute = express.Router();
const appCourse = require('../controller/index').courseController;

courseRoute.route("/course").get(appCourse.allCourse); // read all
courseRoute.route("/course").post(appCourse.createCourse);  // create
courseRoute.route("/course/:id").get(appCourse.showCourse);  // read single
courseRoute.route("/course/:id").patch(appCourse.updateCourse);  // update
courseRoute.route("/course/:id").delete(appCourse.deleteCourse);  // delete

module.exports = courseRoute;