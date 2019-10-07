const router = require('express').Router();
const studentsUtils = require('../../utilities/students');


router.get('/', (req, res) => {

	console.log('req: ' + req.query.studentID);

	if(req.query.studentID){
		studentsUtils.getStudentByStudentID(req.query.studentID)
			.then(student => {
				if(!student){
					console.log('ERROR [-1], no student with that ID' )
					return res.sendStatus(404)
				}else{
					console.log('SUCCESS [], student found with that ID' )
					return res.send(student);
				}
			});
	}	

	else{

		studentsUtils.listAllStudents().then(studentsList => {
			if (!studentsList){
				return res.sendStatus(400);
			} else {
				return res.send(studentsList);
			}
		});
	}
});

router.post('/', (req, res) => {
	const { studentID, firstName, lastName } = req.body;

	// if (!first_name) {
	// 	first_name = "bob";
	// }

	// if (!last_name) {
	// 	last_name = "bloat";
	// }

	// If we are not provided the ID or fname or last name in the req body, fail it
	if (!studentID || !firstName|| !lastName)
		return res.sendStatus(400);
		console.log('SUCCESS [] No student with that ID' );
		studentsUtils.createStudent({ studentID, firstName, lastName}), () => res.sendStatus(400);
		res.sendStatus(201);

	// studentsUtils.getStudentByID(id)
	// 	.then(student => {
	// 		if(!student){
	// 			console.log('SUCCESS [] No student with that ID' );
	// 			studentsUtils.createStudent({ id, first_name, last_name}), () => res.sendStatus(400);
	// 		}else{
	// 			console.log('ERROR [-2], student found with that ID, will not allow duplicate' )
	// 			return res.send(200);
	// 		}
	// 	});


});



module.exports = router;
