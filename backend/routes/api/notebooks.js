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
        where: { userId },
        order: [['updatedAt', 'DESC']]
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

//DELETE NOTEBOOK
router.delete('/users/:userId(\\d+)/notebooks/:notebookId(\\d+)', asyncHandler(async (req, res) => {
    const { userId, notebookId } = req.params
    // const { id } = req.body

    const notebook = await Notebook.findOne({
        where: {
            userId,
            id: notebookId
        }
    })

    await notebook.destroy()

    res.json({ notebook })
}))

//EDIT NOTEBBOOK
router.put('/users/:userId(\\d+)/notebooks/:notebookId(\\d+)', asyncHandler(async (req, res) => {
    const { userId, notebookId } = req.params
    const { title } = req.body

    const notebook = await Notebook.findOne({
        where: {
            id: notebookId,
            userId,
        }
    })

    await notebook.update({
        title
    })

    await notebook.save()

    res.json({ notebook })
}))




module.exports = router;
