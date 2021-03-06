const express = require('express');
const router = express.Router()
const asyncHandler = require('express-async-handler')

const { Note } = require('../../db/models')

//GET ALL NOTES FROM USER
router.get('/users/:userId(\\d+)/notes', asyncHandler(async (req, res) => {
    const userId = req.params.userId

    const notes = await Note.findAll({
        where: { userId },
        order: [['updatedAt', 'DESC']]
    })

    return res.json({ notes })
})
)

//CREATE NEW NOTE
router.post('/users/:userId(\\d+)/notes', asyncHandler(async (req, res) => {
    const { userId } = req.body

    const newNote = await Note.create({ title: 'NEW NOTE', content: 'EMPTY CONTENT', userId, notebookId: 1 })

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

//EDIT NOTE
router.put('/users/:userId(\\d+)/notes/:noteId(\\d+)', asyncHandler(async (req, res) => {
    const { userId, noteId } = req.params
    const { title, content, notebookId } = req.body

    const note = await Note.findOne({
        where: {
            id: noteId,
            userId,
        }
    })

    const newNbId = notebookId || null

    await note.update({
        title,
        content,
        notebookId: newNbId
    })

    await note.save()

    res.json({ note })
}))

module.exports = router;
