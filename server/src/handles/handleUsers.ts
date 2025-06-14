import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { generateToken } from '../config/jwt';


export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;



        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            res.status(400).json({
                error: 'User with this email or username already exists'
            });
            return

        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);



        const user = new User({
            username,
            email,
            password: hashedPassword,

        });

        await user.save();


        const token = generateToken(user._id.toString());

        res.status(201).json({
            message: 'Registration successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,


            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username });
        if (!user) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        const token = generateToken(user._id.toString());

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


