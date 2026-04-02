import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);



// backend/server.js
import express from 'express';
import notesRoutes from './src/routes/notesRoutes.js';
import conectDB from './src/database/db.js';
import dotenv from 'dotenv';
import rateLimiter from './src/middleware/rateLimiter.js';
import cors from 'cors';


dotenv.config();

// Create an Express application
const app = express();

app.use(cors());


// Middleware to parse JSON bodies
app.use(express.json());

app.use(rateLimiter)

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log("We just got a new request!");
  next();
})

// Routes
app.use("/v1/api/notes", notesRoutes);



// Connect to MongoDB
conectDB().then(() => {
  // Start the server
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
  });
});

