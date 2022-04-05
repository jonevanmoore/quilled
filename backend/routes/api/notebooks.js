const express = require('express');
const router = express.Router()
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Notebook } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


//GET ALL NOTEBOOKS FROM USER
router.get('/users/:userId(\\d+)/notebooks', asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const notebooks = await Notebook.findAll({
        where: { userId }
    })

    return res.json({ notebooks })
})
);

//CREATE NEW NOTEBOOK
router.post('/users/:userId(\\d+)/notebooks', asyncHandler(async (req, res) => {
    const { userId } = req.body

    const newNotebook = await Notebook.create({ userId })

    res.json({ newNotebook })
}))





module.exports = router;
