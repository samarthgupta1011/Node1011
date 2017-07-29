var express = require('express');
var schoolRouter = express.Router();
var schoolController = require('./../controllers/schoolController');

schoolRouter.route('/students').get(schoolController.getStd).
			patch(schoolController.updateStd);
schoolRouter.route('/students/register').post(schoolController.addStd);
schoolRouter.route('/students/login').post(schoolController.loginStd);
schoolRouter.route('/students/names').get(schoolController.getStdNames);


schoolRouter.route('/teachers').get(schoolController.getTeachers);

module.exports = schoolRouter;