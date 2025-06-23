import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import url from 'url';
import dotenv from 'dotenv'
import authRouter from './routers/authRouter.js';
import jobRouter from './routers/jobRouter.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDDLEWARE
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//  CONFIGURE 
app.set('view engine', 'ejs');
app.set('views', 'views');

// ROUTERS
app.use('/', authRouter);

// JOB ROUTERS
app.use('/', jobRouter);


app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})