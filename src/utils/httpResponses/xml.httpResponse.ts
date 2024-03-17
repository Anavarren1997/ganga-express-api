import { BaseHttpResponse } from './base.httpResponse';
import { type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class XmlHttpResponse extends BaseHttpResponse {
  private readonly xml: string;
  private readonly filename: string;

  constructor(response: Response, xml: string, filename: string) {
    super(response, StatusCodes.OK);

    this.xml = xml;
    this.filename = filename;
  }

  send(): void {
    const { response, xml, filename } = this;

    response.setHeader('Content-Type', 'application/xml; charset=utf-8');
    response.setHeader(
      'Content-Disposition',
      `attachment; filename="${filename}"`
    );

    response.status(StatusCodes.OK).end(xml);
  }
}
