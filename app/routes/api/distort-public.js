const router = require('express').Router();
const distortUtils = require('../../utilities/utils_distort');


// [Public] Get an active session by a provide UID.
/*
	- By default, the session will be set to false (not broadcasting)
*/
router.get('/:uid', (req, res) => {

	//  Look up uid from our URL path
	console.log('req: ' + req.params.uid);

	if(req.params.uid){
		distortUtils.getActiveDistortSessionByDistortSessionUID(req.params.uid)
			.then(session => {
				if(!session){
					console.log('ERROR [-1], no active session exists with that ID' )
					return res.sendStatus(404)
				}else{
					console.log('SUCCESS [], session found with that ID' )
					return res.status(200).send(session);
				}
			});
	}
});









module.exports = router;
