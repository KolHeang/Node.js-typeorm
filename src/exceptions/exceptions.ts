// utils/exceptions.ts

export class BadRequestException extends Error {
    statusCode: number;
    constructor(message: string = 'Bad Request') {
        super(message);
        this.name = 'BadRequestException';
        this.statusCode = 400;
    }
}

export class NotFoundException extends Error {
    statusCode: number;
    constructor(message: string = 'Not Found') {
        super(message);
        this.name = 'NotFoundException';
        this.statusCode = 404;
    }
}

export class UnauthorizedException extends Error {
    statusCode: number;
    constructor(message: string = 'Unauthorized') {
        super(message);
        this.name = 'UnauthorizedException';
        this.statusCode = 401;
    }
}
