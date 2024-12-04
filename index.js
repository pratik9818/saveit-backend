import express from 'express'
import userRoutes from './src/routes/routes.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { internalserverError } from './src/utils/constant.js';
const app = express()
const port = 3001
app.use(cors({
    origin: 'https://saveit.tech', // or specify your frontend origin
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
    const status = err.status || 500; // Default to 500 if no status is provided
    const message = err.message || 'Internal server error';
    res.status(status).json({
        status: status,  // HTTP status code (400, 500, etc.)
        message: message, // Error message
    });
})
app.listen(port, ()=>console.log(`listing at ${port}`))
