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
    const { userId } = req.params

    const newNote = await Note.create({ title: 'NEW NOTE', content: 'EMPTY CONTENT', userId })

    return res.json({ newNote })

}))

//DELETE NOTE
router.delete('/users/:userId(\\d+)/notes/:noteId(\\d+)', asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { id } = req.body;

    const note = await Note.findOne({
        where: {
            userId,
            id,
        }
    })

    await note.destroy()

    res.json({ note })
}))

router.put('/users/:userId(\\d+)/notes/:noteId(\\d+)', asyncHandler(async (req, res) => {
    const { userId, noteId } = req.params
    const { title, content } = req.body

    const note = await Note.findOne({
        where: {
            id: noteId,
            userId,
        }
    })

    await note.update({
        title,
        content
    })

    await note.save()

    res.json({ note })
}))

module.exports = router;
