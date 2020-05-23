var mongoose = require('mongoose');
// Setup schema
var sessionSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId, 
        required: true 
    },
    exam_id: {
        type: mongoose.Types.ObjectId, 
        required: true 
    },
    start_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    end_date: {
        type: Date
    },
    duration: Number,
    logs: {
        type: Array
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

const SessionModel = mongoose.model('exam_sessions', sessionSchema);

exports.findById = (id) => {
    return SessionModel.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createSession = (sessionData) => {
    const session = new SessionModel(sessionData);
    return session.save();
};

exports.patchSession = (id, sessionData) => {
    return new Promise((resolve, reject) => {
        SessionModel.findById(id, function (err, session) {
            if (err) reject(err);
            for (let i in sessionData) {
                session[i] = sessionData[i];
            }
            session.save(function (err, updatedSession) {
                if (err) return reject(err);
                resolve(updatedSession);
            });
        });
    })
};

exports.list = function (perPage, page) {
    return new Promise((resolve, reject) => {
        SessionModel.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, sessions) {
                if (err) {
                    reject(err);
                } else {
                    resolve(sessions);
                }
            })
    });
};

exports.removeById = (sessionId) => {
    return new Promise((resolve, reject) => {
        SessionModel.remove({_id: sessionId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};