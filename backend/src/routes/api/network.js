import os from 'os';
import { Router } from 'express';
import {
  findAll, findWithSearch, statistics,
  create, importer, update, exporter,
  deleteAll, deleteOne
} from '../../controllers/network.controller.js';

import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const router = Router();

// [GET] Routes
router.get('/', findAll);
router.get('/search', findWithSearch);
router.get('/export', exporter);
router.get('/statistics', statistics);

// [POST] Route
router.post('/', create);
router.post('/import', upload.single('networks_file'), importer);

// [PUT] Route
router.put('/:bssid', update);

// [DELETE] Routes
router.delete('/', deleteAll);
router.delete('/:bssid', deleteOne);

export default router;
