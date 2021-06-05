/*
    Path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewUserToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/valiate_fields');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();

router.post('/new', [
    check('name', 'The name is required.').not().isEmpty(),
    check('email', 'The email is invalid.').isEmail(),
    check('password', 'The password should be a combination of at least one uppercase, a lower case, one special character, one digit and should be 8 to 20 chararacters long.').isStrongPassword(),
    validateFields,
], createUser);

router.post('/', [
    check('email', 'The email is invalid.').isEmail(),
    check('password', 'The password should be a combination of at least one uppercase, a lower case, one special character, one digit and should be 8 to 20 chararacters long.').isStrongPassword(),
    validateFields,
], loginUser);

router.get('/renew', validateJWT, renewUserToken);

module.exports = router;