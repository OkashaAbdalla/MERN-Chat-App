import express from 'express';
import connectDB from './lib/db.js';
import authRouter from './routes/auth.route.js';
import cors from "cors"
import cookieParser from 'cookie-parser';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
import messageRouter from './routes/message.route.js';




// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware - code that runs before our routes
app.use(express.json()); // Allows server to understand JSON data
 // Parses cookies attached to the client request object
app.use(cookieParser()); // Parses cookies attached to the client request object

// ✅ Updated CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://192.168.56.1:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.get('/', (req, res) => {
    res.send('API is running...');
});


app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter); // Use the message router for message routes




const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');    
}).catch((error) => {
    console.error('❌ MongoDB connection error:', error);
});

 


 // Use the authRouter for authentication routes{




app.listen(PORT, () => {
    console.log(`🚀server is running on ${PORT}` );
    connectDB();
});

//y$D0D;XgC2JQ@*5pZcxm4$8k[U&6UA,