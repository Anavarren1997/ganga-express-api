import gangaRoutes from './ganga.routes.js';
import palletRoutes from './pallet.routes.js';
import { bindAsyncRoutes } from '../utils/asyncRouteBinder';
import express from 'express';

const router = express.Router();

// Crear un nuevo router para las rutas de pallets
const palletsRouter = express.Router();
bindAsyncRoutes(palletsRouter, palletRoutes);
router.use('/pallets', palletsRouter);

// Crear un nuevo router para las rutas de gangas
const gangasRouter = express.Router();
bindAsyncRoutes(gangasRouter, gangaRoutes);
router.use('/gangas', gangasRouter);

export default router;
