// middleware/errorHandler.ts
export function errorHandler(err, req, res, next) {
    if (err.statusCode) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
