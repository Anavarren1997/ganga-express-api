import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Handler para peticiones asíncronas. Es necesario para capturar de manera efectiva el error
 * si este ocurriese debido a peticiones asíncronas dentro del flujo del endpoint (como por ejemplo
 * llamadas a la BD)
 * @param fn
 * @returns
 */
export const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Se espera que el controlador maneje la respuesta directamente.
      await fn(req, res, next);
      // No se puede llamar a .send() aquí de manera fiable sin cambiar la forma en que Express maneja las respuestas.
    } catch (error) {
      // Si ocurre un error en el controlador, pasa el error al siguiente middleware de manejo de errores.
      next(error);
    }
  };
};

/**
 * Handler para los errores. Captura el error y lo devuelve con formato standard
 * @param err
 * @param req
 * @param res
 * @param next
 */
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Ocurrió un error inesperado en el servidor.',
  });
}
