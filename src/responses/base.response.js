/**
 * Clase base para las respuestas de los endpoints.
 */
export default class BaseResponse {
  constructor(response) {
    this.response = response;
  }

  /**
   * Método que recibe un método que devuelve la respuesta de un objeto y en función de si la
   * respuesta es paginada o es solo un objeto te devuelve la respuesta final.
   * @param getResponse Método al que se le pasa un objeto y te devuelve el objeto formateado.
   * @param fields Campos que se van a filtrar y se van a dejar en la
   * respuesta.
   * @returns {null} Devuelve la respuesta final.
   */
  buildResponse(getResponse, fields = null) {
    let response = null;

    if (this.isList()) {
      const { count, pages, rows } = this.response;
      response = {
        count,
        pages,
        rows: [],
      };

      rows.forEach((data) =>
        response.rows.push(BaseResponse.filter(getResponse(data), fields))
      );
    } else if (Array.isArray(this.response)) {
      response = this.response.map((data) =>
        BaseResponse.filter(getResponse(data), fields)
      );
    } else {
      response = BaseResponse.filter(getResponse(this.response), fields);
    }

    this.response = response;

    return this;
  }

  /**
   * Comprueba si una respuesta es un listado o es un objeto simple.
   * @returns {*} Devuelve true si es un listado.
   */
  isList() {
    return this.response && 'count' in this.response && 'rows' in this.response;
  }

  /**
   * Obtiene un objeto filtrado. El nuevo objeto que devuelve solo
   * contendrá los campos dados por el array "fields".
   * @param object Objeto a modificar.
   * @param fields Campos que queremos que tenga el objeto.
   * @returns {{}} Objeto filtrado.
   */
  static filter(object, fields = null) {
    let filteredObject = {};

    if (fields && fields.length > 0) {
      // Compruebo si todos los campos del array "fields" existen en el
      // objeto que vamos a filtrar.
      fields.forEach((field) => {
        if (!Object.keys(object).includes(field)) {
          console.log(`Field key (${field}) not exists in fields array.`);
        } else {
          filteredObject[field] = object[field];
        }
      });
    } else {
      filteredObject = object;
    }

    return filteredObject;
  }
}
