const express = require('express');
const router = express.Router()
const asyncHandler = require('express-async-handler')

const { Note } = require('../../db/models')

//GET ALL NOTES FROM USER
router.get('/users/:userId(\\d+)/notes', asyncHandler(async (req, res) => {
    const userId = req.params.userId

    const notes = await Note.findAll({
        where: { userId }
    })

    return res.json({ notes })
})
)

//CREATE NEW NOTE
router.post('/users/:userId(\\d+)/notes', asyncHandler(async (req, res) => {
    const { userId } = req.body

    const newNote = await Note.create({ title: 'howdy', content: 'content', userId })

    return res.json({ newNote })

}))

module.exports = router;
