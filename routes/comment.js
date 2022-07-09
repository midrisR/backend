const router = require('express').Router();
const {
	getComment,
	postComment,
	deleteComment,
	getCommentByArticlId,
} = require('../controllers/commentController');

router.get('/', getComment);
router.get('/:id', getCommentByArticlId);
router.post('/', postComment);
router.delete('/', deleteComment);
module.exports = router;
