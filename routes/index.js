import GangaRouter from './ganga.routes.js';
import PalletRouter from './pallet.routes.js';
import express from 'express';

const router = express.Router();

router.use('/gangas', GangaRouter);
router.use('/pallets', PalletRouter);

export default router;
