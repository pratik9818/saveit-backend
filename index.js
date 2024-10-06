import express from 'express'
import userRoutes from './src/routes/routes.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { internalserverError } from './src/utils/constant.js';
const app = express()
const port = 3001
app.use(cors({
    origin: 'http://localhost:5500',
}))
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1',userRoutes)
app.use((err,req,res,next)=>{
    console.error(err);
    res.status(err.status || internalserverError).json({
        status:'error',
        message:err.message || 'internalserverError server error'
    })
})
app.listen(port , ()=>console.log(`listing at ${port}`))
