const router = require('express').Router();
const {
  getThoughts,
} = require('../../controllers/thoughtControllers');

// /api/users
router.route('/').get(getThoughts)

module.exports = router;