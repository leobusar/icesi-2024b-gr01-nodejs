import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { router } from './routes/posts';
import { router as user } from './routes/user';
import { db } from './config/db';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.use('/api/posts', router);
app.use('/api/users', user);

db.then(() => {
    app.listen(port, () => {
        console.log(`Server is running  on port ${port}`);
    });
})