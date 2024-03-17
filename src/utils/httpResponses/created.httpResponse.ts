import { BaseHttpResponse } from './base.httpResponse';
import { StatusCodes } from 'http-status-codes';
import { type Response } from 'express';

export class CreatedHttpResponse<T> extends BaseHttpResponse {
  private readonly payload: T;

  constructor(response: Response, payload: T) {
    super(response, StatusCodes.CREATED);
    this.payload = payload;
  }

  send(): void {
    const { response, statusCode, payload } = this;

    response.status(statusCode).json(payload);
  }
}
