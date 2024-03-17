import { type Response } from 'express';

export abstract class BaseHttpResponse {
    protected readonly response: Response;
    protected readonly statusCode: number;

    constructor(response: Response, statusCode: number) {
        this.response = response;
        this.statusCode = statusCode;
    }

    abstract send(): void;
}
