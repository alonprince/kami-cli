"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const FileTreeController = require("./Controllers/FileTreeController");
const router = new Router();
router.get('/api/tree', FileTreeController.getTree);
router.get('/api/file', FileTreeController.getFile);
exports.default = router;
//# sourceMappingURL=routes.js.map