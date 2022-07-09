const router = require('express').Router();
const upload = require('../utils/upload');
const {
	getArticles,
	addArticle,
	updateArticle,
	getArticleId,
	deleteArticle,
	getArticleBySlug,
} = require('../controllers/articleController');
const { authMiddleware } = require('../middleware/autMiddleware');

router.get('/', getArticles);
router.post('/', upload, authMiddleware, addArticle);
router.put('/:id', upload, authMiddleware, updateArticle);
router.get('/:id', getArticleId);
router.get('/slug/:slug', getArticleBySlug);
router.delete('/:id', deleteArticle);

module.exports = router;
