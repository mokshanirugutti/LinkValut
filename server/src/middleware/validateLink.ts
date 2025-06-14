import { Request, Response, NextFunction } from 'express';
import { linkSchema } from '../zodSchemas/LinkSchem';
import { ZodError } from 'zod';

export const validateLink = (req: Request, res: Response, next: NextFunction): void => {
    try {
        linkSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const formattedErrors = error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }));
            res.status(400).json({ 
                error: 'Validation failed',
                details: formattedErrors
            });
            return;
        } 
        res.status(400).json({ error: 'Invalid request data' });
    }
}; 