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
export function bindAsyncRoutes(router: Router, routes: RouteDefinition[]) {
  routes.forEach(({ method, path, controller, middlewares = [] }) => {
    // No es necesario mapear middlewares a sí mismos, puedes pasarlos directamente
    router[method](path, ...middlewares, asyncHandler(controller));
  });
}
