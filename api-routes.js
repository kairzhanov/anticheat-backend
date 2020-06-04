const config = require('./config/env.config');
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

var UserVerifyMiddleware = require('./middlewares/verify.user.middleware');
var AuthController = require('./controllers/authorization.controller');
var PermissionMiddleware = require('./middlewares/auth.permission.middleware');
var AuthMiddleware = require('./middlewares/auth.validation.middleware');

var UsersController = require('./controllers/users.controller');
var ExamsController = require('./controllers/exams.controller');
var SessionController = require('./controllers/exam_session.controller');

const ADMIN = config.permissionLevels.ADMIN;
const TEACHER = config.permissionLevels.TEACHER;
const STUDENT = config.permissionLevels.STUDENT;
// TODO: USER PERMISSIONS

router.route('/users/:userId')
    .get([AuthMiddleware.validJwtNeeded, UsersController.getById])
    .patch([AuthMiddleware.validJwtNeeded, UsersController.patchById])
    .delete([AuthMiddleware.validJwtNeeded, UsersController.removeById]);

router.route('/users/')
    .get([AuthMiddleware.validJwtNeeded, UsersController.list])    
    .post([UsersController.insert]);

router.route('/exams/')
    .get([AuthMiddleware.validJwtNeeded, ExamsController.list])    
    .post([AuthMiddleware.validJwtNeeded, ExamsController.insert]);
        
router.route('/exams/:examId')
    .get([AuthMiddleware.validJwtNeeded, ExamsController.getById])
    .patch([AuthMiddleware.validJwtNeeded, ExamsController.patchById])
    .delete([AuthMiddleware.validJwtNeeded, ExamsController.removeById]);

router.route('/sessions/')
    .get([AuthMiddleware.validJwtNeeded, SessionController.list])    
    .post([AuthMiddleware.validJwtNeeded, SessionController.insert]);
        
router.route('/sessions/:sessionId')
    .get([AuthMiddleware.validJwtNeeded, SessionController.getById])
    .patch([AuthMiddleware.validJwtNeeded, SessionController.patchById])
    .delete([AuthMiddleware.validJwtNeeded, SessionController.removeById]);

router.post('/auth', [
    UserVerifyMiddleware.hasAuthValidFields,
    UserVerifyMiddleware.isPasswordAndUserMatch,
    AuthController.login
]);

// Export API routes
module.exports = router;
