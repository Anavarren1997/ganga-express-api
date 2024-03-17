import gangaRoutes from './ganga.routes.js';
import palletRoutes from './pallet.routes.js';
import { bindModelRoutes } from '../utils/asyncRouteBinder';
import express from 'express';

const router = express.Router();

// Bindear rutas de pallets
bindModelRoutes(router, '/pallets', palletRoutes);

// Bindear rutas de gangas
bindModelRoutes(router, '/gangas', gangaRoutes);

export default router;
