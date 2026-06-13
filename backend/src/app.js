import express from 'express'
import corsMiddleware from "./config/cors.js";
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import rateLimitMiddleware from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

// Important pour Render / proxy
// app.set('trust proxy', 1); 
//Sinon Express peut mal identifier l’IP réelle du client.


const app = express()

app.use(morgan('dev'));
app.use(helmet())
app.use(corsMiddleware);
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(rateLimitMiddleware)

export default app