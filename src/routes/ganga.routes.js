import GangasController from '../controllers/ganga.controller.js';

const gangaRoutes = [
  { method: 'get', path: '/', controller: GangasController.getAllGangas },
  {
    method: 'get',
    path: '/:gangaId',
    controller: GangasController.getGangaById,
  },
  {
    method: 'delete',
    path: '/:gangaId',
    controller: GangasController.deleteGangaById,
  },
  {
    method: 'put',
    path: '/:gangaId',
    controller: GangasController.updateGangaById,
  },
];

export default gangaRoutes;
