const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const notebooksRouter = require('./notebooks.js');
const notesRouter = require('./notes')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use(notebooksRouter);
router.use(notesRouter);


module.exports = router;
