import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import {expressMiddleware as apolloMiddleware} from '@apollo/server/express4' 

import { router } from './routes/posts';
import { router as user } from './routes/user';
import { db } from './config/db';
import { readFile } from 'node:fs/promises';
import { resolvers } from './graphql/resolvers';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

let typeDefs = await readFile("./src/graphql/schema.graphql", 'utf-8'); 

const apolloServer  =  new ApolloServer({typeDefs, resolvers}); 
await apolloServer.start();

app.use('/graphql', apolloMiddleware(apolloServer))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.use('/api/posts', router);
app.use('/api/users', user);

db.then(() => {
    app.listen(port, () => {
        console.log(`Server is running  on port ${port}`);
        console.log(`Graphql endpoint  http://localhost:${port}/graphql`)
    });
})