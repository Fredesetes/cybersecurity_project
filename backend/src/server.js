import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
dotenv.config();

import db from './models/index.js';
db.sequelize.sync();
/* db.sequelize.sync({ force: true }).then(() => {
  console.log(" -> Altering DB because of Changes!");
}); */

// Routes
import { } from './auth/auth.js';
import networkRoutes from './routes/api/network.js';
import userRoutes from './routes/api/user.js';
import middlewares from './routes/middlewares.js';

const server = express();

var accessLogStream = fs.createWriteStream(path.join('access.log'), { flags: 'a' })

server.use(morgan(':method :url :status', { stream: accessLogStream }));
server.use(helmet());
server.use(cors({
  origin: process.env.CORS_ORIGIN
}));
server.use(express.json());

console.log("[FuryRoad - Server]");

server.get('/', (req, res) => {
  res.json({
    message: 'FuryRoad - Server',
  });
});

server.use('/api/networks', passport.authenticate('jwt', { session: false }), networkRoutes);
server.use('/api/users', userRoutes);

server.use(middlewares.notFound);
server.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
server.listen(port, () => {
  console.log(`Listening at: http://localhost:${port}/`);
});