// searchRoutes.js — defines all API endpoints
const express = require('express');
const router = express.Router();
const {
  createSearch,
  getAllSearches,
  getSearchById,
  updateSearch,
  deleteSearch,
  exportSearches,
  getYoutubeVideos,
} = require('../controllers/searchController');

// Export route (must be before /:id routes)
router.get('/export', exportSearches);

// YouTube route
router.get('/youtube', getYoutubeVideos);

// CRUD routes
router.route('/')
  .get(getAllSearches)
  .post(createSearch);

router.route('/:id')
  .get(getSearchById)
  .put(updateSearch)
  .delete(deleteSearch);

module.exports = router;