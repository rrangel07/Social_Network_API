const router = require('express').Router();
const {
  getThoughts,
  createThought,
  getSingleThought,
  updateThought,
  deleteThought,
  newReaction,
  deleteReaction
} = require('../../controllers/thoughtControllers');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);
// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(newReaction).delete(deleteReaction);

module.exports = router;