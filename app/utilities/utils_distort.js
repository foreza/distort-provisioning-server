const distortSessionModel =  require('../models/distortSession');
const distortSessionUtils = {};

// [Admin] This utility method creates a new session
distortSessionUtils.createSession = newDistortSession => {
    return new Promise((resolve, reject) => {
        distortSessionModel.create(newDistortSession, (err, createdDistortSession) => {
            if (err) reject(err);
            resolve(createdDistortSession);
        });
    });
}

// [Admin] This utility returns a session information given a session unique ID
distortSessionUtils.getDistortSessionByDistortSessionUID = distortSessionID => {
    return new Promise((resolve, reject) => {
        console.log('Performing lookup on this id: ', distortSessionID);
        distortSessionModel.findOne({broadcastUID : distortSessionID}, (err, returnedDistortSession) => {
            if (err) reject(err);
            resolve(returnedDistortSession);
        });
    });
};

// [Public] This utility returns an ACTIVE session information given a session unique ID
distortSessionUtils.getActiveDistortSessionByDistortSessionUID = distortSessionID => {
    return new Promise((resolve, reject) => {
        console.log('Performing lookup on this id: ', distortSessionID);
        distortSessionModel.findOne({broadcastUID : distortSessionID, isSessionActive: true}, (err, returnedDistortSession) => {
            if (err) reject(err);
            resolve(returnedDistortSession);
        });
    });
};


// [Admin] This utility starts a session information given a session unique ID
distortSessionUtils.startDistortSessionWithDistortSessionUID = distortSessionID => {
    return new Promise((resolve, reject) => {

        const filter = {broadcastUID : distortSessionID}
        const update = { isSessionActive: true};

        distortSessionModel.findOneAndUpdate(filter, update, (err, ret) => {
            if (err) { reject(err); }
            else { resolve(ret); }
        });
    });
};

// [Admin] This utility stops a session given a session unique ID
distortSessionUtils.stopDistortSessionWithDistortSessionUID = distortSessionID => {
    return new Promise((resolve, reject) => {

        const filter = {broadcastUID : distortSessionID}
        const update = { isSessionActive: false};

        distortSessionModel.findOneAndUpdate(filter, update, (err, ret) => {
            if (err) { reject(err); }
            else { resolve(ret); }
        });
    });
};


// [Admin] This utility removes a session given a session unique ID
distortSessionUtils.removeDistortSessionWithDistortSessionUID = distortSessionID => {
    return new Promise((resolve, reject) => {

        const filter = {broadcastUID : distortSessionID}

        distortSessionModel.findOneAndDelete(filter, (err, ret) => {
            if (err) { reject(err); }
            else { resolve(ret); }
        });
    });
};




// [Admin] This utility lists all known distort sessions in the DB
distortSessionUtils.listAllDistortSessions = () => {
  return new Promise((resolve, reject) => {
    distortSessionModel.find({}, function(err, distortSessionList) {
      if (err){
        reject(err);
      }
      resolve(distortSessionList);

    });

});
};


// [Admin] This utility lists all known distort sessions in the DB
distortSessionUtils.deleteAllDistortSessions = () => {
    return new Promise((resolve, reject) => {
      distortSessionModel.remove({}, function(err, emptiness) {
        if (err){
          reject(err);
        }
        resolve(emptiness);
      });
  
  });
  };

module.exports = distortSessionUtils;
