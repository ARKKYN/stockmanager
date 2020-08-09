import express from 'express';
import next from 'next';
import connectDB from 'server/config/database';
import seedDatabase from 'server/utils/seeders';
import cookieParser from 'cookie-parser';
import http from "http";
import { verifyJwt } from './utils/auth/jwt';
import * as WebSocket from 'ws';
import updateStocksInBackground from "server/utils/updateStocksInBackground";
import events from "events";
const EventEmitter = new events.EventEmitter();
EventEmitter.setMaxListeners(1000);

const dev = process.env.NODE_ENV === 'development';
const nextApp = next({dev});
const port = parseInt(process.env.APP_PORT);
const handle = nextApp.getRequestHandler();
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, host: "localhost", port: 5000 , path: "/wssocket" });

EventEmitter.addListener("update", x => {
	wss.emit("x", JSON.stringify(x));
});	


export {EventEmitter};
updateStocksInBackground();



nextApp.prepare().then(() => {
	try {
		seedDatabase();
	} catch (e) {
		console.log('Databse Error, While Seeding Database', e);
		return;
	}
	
	wss.on('connection', (ws) => {
		wss.on('x', (data ) => {
			ws.send(data);
		});
	});
	
	
	app.use(express.static('public'))

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

	app.use(function jwtMiddleware(req, res, next){
		if(!(req.url.indexOf("/api") == 0 && req.url != "/api/login")) {
			next();
		} else {
			if(!"client" in req.cookies) {
				console.log("no client" , req.cookies);
				return res.status(401).json({error: "Unauthorized"});
			}
			const payload = verifyJwt(req.cookies.client);
			if(!payload) {
				
				return res.status(401).json({error: "Unauthorized"});
			}
			req.user = payload;
			next();
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


