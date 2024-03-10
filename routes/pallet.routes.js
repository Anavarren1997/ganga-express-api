import express from 'express';
import PalletsController from '../controllers/pallet.controller.js';
import multer from 'multer';

const router = express.Router();

// Configura Multer para guardar el archivo subido
const upload = multer({ dest: 'uploads/' });

router.post('/', PalletsController.createPallet);

router.post('/:palletId/gangas', PalletsController.createGangaForPallet);

router.post(
  '/:palletId/gangas/csv',
  upload.single('file'),
  PalletsController.createGangasFromCsvForPallet
);

router.get('/', PalletsController.getAllPallets);

router.get('/:palletId', PalletsController.getPalletById);

router.delete('/:palletId', PalletsController.deletePalletById);

router.put('/:palletId', PalletsController.updatePalletById);

export default router;
