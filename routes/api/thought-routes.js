const router = require('express').Router()

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    // updateThought,
    removeThought
} = require('../../controllers/thought-controller')

router 
    .route('/')
    .get(getAllThoughts)

router
    .route('/:id')
    .get(getThoughtById)

router
    .route('/:userId')
    .post(addThought)

router
    .route('/:userId/:thoughtId')
    // .put(updateThought)
    .delete(removeThought)

module.exports = router;