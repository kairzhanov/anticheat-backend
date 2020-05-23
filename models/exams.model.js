var mongoose = require('mongoose');
// Setup schema
var examSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    user_id: mongoose.Types.ObjectId,
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    is_active: Boolean,
    duration: Number,
    create_date: {
        type: Date,
        default: Date.now
    }
});

const ExamModel = mongoose.model('exams', examSchema);



exports.findById = (id) => {
    return ExamModel.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createExam = (examData) => {
    const exam = new ExamModel(examData);
    return exam.save();
};

exports.patchExam = (id, examData) => {
    return new Promise((resolve, reject) => {
        ExamModel.findById(id, function (err, exam) {
            if (err) reject(err);
            for (let i in examData) {
                exam[i] = examData[i];
            }
            exam.save(function (err, updatedExam) {
                if (err) return reject(err);
                resolve(updatedExam);
            });
        });
    })
};

exports.list = function (perPage, page) {
    return new Promise((resolve, reject) => {
        ExamModel.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, exams) {
                if (err) {
                    reject(err);
                } else {
                    resolve(exams);
                }
            })
    });
};

exports.removeById = (examId) => {
    return new Promise((resolve, reject) => {
        ExamModel.remove({_id: examId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};