export const responseController = (res, code: number, status: boolean, message: string, data: any = null ) => {
    return res.status(code).json({
        status,
        message,
        data,
    });
}