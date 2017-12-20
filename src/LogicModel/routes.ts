import * as Router from 'koa-router'
import * as FileTreeController from './Controllers/FileTreeController'

const router = new Router();

router.get('/api/tree', FileTreeController.getTree)
router.get('/api/file', FileTreeController.getFile)

export default router;