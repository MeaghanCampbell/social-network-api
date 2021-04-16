const router = require('express').Router()

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    addReaction,
    updateThought,
    removeReaction,
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
    .put(addReaction)
    .delete(removeThought)

router
    .route('/updatethoughts/:userId/:thoughtId')
    .put(updateThought)

router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;