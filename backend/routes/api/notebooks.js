const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Notebook } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

//GET ALL NOTEBOOKS FROM USER
router.get('/users/:userId(\\d+)/notebooks', asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const notebooks = Notebook.findAll({
        where: { userId },
        order: [['UpdatedAt', ASC]]
    })

    return res.json({ notebooks })
})
);





module.exports = router;
