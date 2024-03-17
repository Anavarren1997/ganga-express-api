// GangaResponse.js
import BaseResponse from './base.response';

export default class GangaResponse extends BaseResponse {
  /**
   * Devuelve la respuesta de una Ganga.
   * @param fields Campos a filtrar
   * @returns {any}
   */
  buildGangaResponse(fields = null) {
    return this.buildResponse(GangaResponse.getGangaResponse, fields).response;
  }

  /**
   * Método que forma una respuesta de Ganga.
   * @param data Datos que van a formar la respuesta.
   * @returns Respuesta final para una Ganga.
   */
  static getGangaResponse(data) {
    // Base Ganga Response
    const ganga = {
      id: data?.id,
      created: data?.created,
      name: data?.name,
      description: data?.description,
      realPrice: data?.real_price,
      buyPrice: data?.buy_price,
      salePrice: data?.sale_price,
      weight: data?.weight,
      sold: data?.sold,
      amazonLink: data?.amazon_link,
      deletedAt: data?.deleted_at,
    };

    return ganga;
  }
}
