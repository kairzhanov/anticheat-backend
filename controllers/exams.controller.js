var ExamModel = require('./../models/exams.model'); 

exports.insert = (req, res) => {
    ExamModel.createExam(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
 };

exports.getById = (req, res) => {
    ExamModel.findById(req.params.examId).then((result) => {
        res.status(200).send(result);
    });
};
 
exports.patchById = (req, res) => {
    ExamModel.patchExam(req.params.examId, req.body).then((result) => {
            res.status(204).send({});
    });
};


exports.list = function (req, res) {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    ExamModel.list(limit, page).then((result) => {
        res.status(200).send(result);
    })
};

exports.removeById = (req, res) => {
    ExamModel.removeById(req.params.examId)
    .then((result)=>{
        res.status(204).send({});
    });
};
 