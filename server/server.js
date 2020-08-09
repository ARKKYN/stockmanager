import express from 'express';
import next from 'next';
import connectDB from 'server/config/database';
import seedDatabase from 'server/utils/seeders';
import cookieParser from 'cookie-parser';
import http from "http";
import socketio from "socket.io";

const dev = process.env.NODE_ENV === 'development';
const nextApp = next({dev});
const port = parseInt(process.env.APP_PORT);
const handle = nextApp.getRequestHandler();
const app = express();
const server = http.Server(app);
const io = socketio(server);



nextApp.prepare().then(() => {
	try {
		seedDatabase();
	} catch (e) {
		console.log('Databse Error, While Seeding Database', e);
		return;
	}

	app.use(cookieParser());

	app.use(async function databaseMiddleware(req, res, next) {
		try {
			const DB = await connectDB();
			req.db = DB.models;
			res.on('finish', function handleFinish() {
				DB.close();
			});
			next();
		} catch (e) {
			console.log('Databse Error, While Seeding Database', e);
			return res.status(500).json({error: 'Something went wrong'});
		}
	});

	app.all('*', (req, res) => {
		return handle(req, res);
	});

	app.listen(port, (err) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});


io.on("connect", socket => {
	socket.emit("Emit", {
		test : "message"
	});
});