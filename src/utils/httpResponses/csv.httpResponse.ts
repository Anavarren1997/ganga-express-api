import { UTF16BOM } from '../../configs/constants.js';
import { BaseHttpResponse } from './base.httpResponse.js';
import { type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class CsvHttpResponse extends BaseHttpResponse {
  private readonly csv: string;
  private readonly filename: string;

  constructor(response: Response, csv: string, filename: string) {
    super(response, StatusCodes.OK);

    this.csv = csv;
    this.filename = filename;
  }

  send(): void {
    const { response, csv, filename } = this;

    response.setHeader('Content-Type', 'text/csv; charset=utf-8');
    response.setHeader(
      'Content-Disposition',
      `attachment; filename="${filename}"`
    );

    // BOM character in UTF-16 it's added at the beginning of the response to indicate the encoding and
    // ensure proper rendering of special characters in some applications
    // such as Microsoft Excel. It's used here to enhance compatibility.
    response.status(StatusCodes.OK).end(`${UTF16BOM}${csv}`);
  }
}
