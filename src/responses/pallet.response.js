import BaseResponse from './base.response';

export default class PalletResponse extends BaseResponse {
  /**
   * Devuelve la respuesta de un Pallet.
   * @param fields Campos a filtrar
   * @returns {any}
   */
  buildPalletResponse(fields = null) {
    return this.buildResponse(PalletResponse.getPalletResponse, fields)
      .response;
  }

  /**
   * Método que forma una respuesta de Pallet.
   * @param data Datos que van a formar la respuesta.
   * @returns {{name: *, id: *, trash: *}}
   * Respuesta final.
   */
  static getPalletResponse(data) {
    // Base Pallet Response
    const pallet = {
      id: data?.id,
      name: data?.name,
      priceWorth: data?.price_worth,
      costPrice: data?.cost_price,
      vat: data?.vat,
      shippingPrice: data?.shipping_expenses,
      totalPaid: data?.total_paid,
      moneyReturn: data?.money_return,
      deleted: data?.deleted_at,
    };

    return pallet;
  }
}
