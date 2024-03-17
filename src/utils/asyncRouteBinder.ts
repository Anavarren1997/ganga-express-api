import { asyncHandler } from '../middlewares/error';
import { RequestHandler, Router } from 'express';

type RouteDefinition = {
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
  controller: RequestHandler;
  middlewares?: RequestHandler[];
};

/**
 * Bindea un array de rutas convirtiéndolo en un Router de Express
 * @param router
 * @param routes
 */
function bindAsyncRoutes(router: Router, routes: RouteDefinition[]) {
  routes.forEach(({ method, path, controller, middlewares = [] }) => {
    // No es necesario mapear middlewares a sí mismos, puedes pasarlos directamente
    router[method](path, ...middlewares, asyncHandler(controller));
  });
}

/**
 * Bindea un array de rutas convirtiéndolo en un Router de Express.
 * @param router El router principal al cual se añadirán las rutas.
 * @param pathPrefix El prefijo de ruta para las rutas del modelo.
 * @param modelRoutes Las rutas a ser añadidas bajo el prefijo dado.
 */
export const bindModelRoutes = (
  router: Router,
  pathPrefix: string,
  modelRoutes: RouteDefinition[]
): void => {
  const modelRouter = Router();
  bindAsyncRoutes(modelRouter, modelRoutes);
  router.use(pathPrefix, modelRouter);
};
