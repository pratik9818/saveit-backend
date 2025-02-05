import express from 'express'
import userRoutes from './src/routes/routes.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express()
const port = 3001
app.use(cors({
    origin: [
        'https://saveit.tech',
        'chrome-extension://llgdeocihbfhkbnmphgfjihngblobiom'
    ], // or specify your frontend origin
    // origin: [
    //     'http://localhost:5173',
    //   ], // or specify your frontend origin
    credentials: true,
}))
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
