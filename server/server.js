import express from 'express';
import next from 'next';
import mongoose from "mongoose";
import connectDB from "config/database";
import seedDatabase from "utils/seeders"

const dev = process.env.NODE_ENV === 'development';
const app = next({dev});
const port = parseInt(process.env.APP_PORT);
const handle = app.getRequestHandler();

//seedDatabase();

app.prepare().then(() => {
	const server = express();

  server.use(async function databaseMiddleware(req, res, next) {
     const DB = await connectDB();
   
     req.db = DB.models;
     res.on("finish", function handleFinish() {
      DB.close();
     })
     next();
  });

  server.all('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  });
});
