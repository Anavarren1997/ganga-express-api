import PalletsController from '../controllers/pallet.controller.js';
import multer from 'multer';

// Configura Multer para guardar el archivo subido
const upload = multer({ dest: 'src/uploads/' });

const palletRoutes = [
  { method: 'post', path: '/', controller: PalletsController.createPallet },
  {
    method: 'post',
    path: '/:palletId/gangas',
    controller: PalletsController.createGangaForPallet,
  },
  {
    method: 'post',
    path: '/:palletId/gangas/csv',
    controller: PalletsController.createGangasFromCsvForPallet,
    middlewares: [upload.single('file')],
  },
  { method: 'get', path: '/', controller: PalletsController.getAllPallets },
  {
    method: 'get',
    path: '/:palletId',
    controller: PalletsController.getPalletById,
  },
  {
    method: 'delete',
    path: '/:palletId',
    controller: PalletsController.deletePalletById,
  },
  {
    method: 'put',
    path: '/:palletId',
    controller: PalletsController.updatePalletById,
  },
];

export default palletRoutes;
