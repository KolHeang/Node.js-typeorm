// utils/exceptions.ts

export class BadRequestException extends Error {
    code: number;
    constructor(message: string = 'Bad Request') {
        super(message);
        this.name = 'BadRequestException';
        this.code = 400;
    }
}

export class NotFoundException extends Error {
    code: number;
    constructor(message: string = 'Not Found') {
        super(message);
        this.name = 'NotFoundException';
        this.code = 404;
    }
}

export class UnauthorizedException extends Error {
    code: number;
    constructor(message: string = 'Unauthorized') {
        super(message);
        this.name = 'UnauthorizedException';
        this.code = 401;
    }
}
