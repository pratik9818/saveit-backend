import express from 'express'
import userRoutes from './src/routes/routes.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { internalserverError } from './src/utils/constant.js';
const app = express()
const port = 3000
app.use(cors({
    origin: 'http://localhost:5500', // or specify your frontend origin
    credentials: true,
}))
// app.options('*', (req, res) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5500');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
//     res.sendStatus(204); // Respond with 204 No Content
// });
app.use(express.json());
app.use(cookieParser())
// app.use(express.raw({ type: 'application/octet-stream'}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1',userRoutes)
app.use((err,req,res,next)=>{
    console.error(err);
    res.status(err.status || internalserverError).json({
        status:'error',
        message:err.message || 'internal server error'
    })
})
app.listen(port , ()=>console.log(`listing at ${port}`))
