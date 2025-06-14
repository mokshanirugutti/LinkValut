import { Router } from 'express';
import { login, register } from '../handles/handleUsers';
import { userLoginSchema, userRegistrationSchema } from '../zodSchemas/userSchema';
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';



const router = Router();


const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        userRegistrationSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error });
        }
    }
};


const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    try {
        userLoginSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const firstError = error.errors[0];
            res.status(400).json({ error: firstError.message});
        }
    }
};




router.post('/login', validateLogin, login);
router.post('/register', validateRegistration, register);

export default router;