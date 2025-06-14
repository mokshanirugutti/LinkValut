import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

import { connectDB } from './db/db';
import authRoute from './routes/authRoute';
import linkRoute from './routes/linkRoute';



dotenv.config();



const app = express();

const PORT = process.env.PORT || 3000;



app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoute);
app.use('/api/links', linkRoute);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});