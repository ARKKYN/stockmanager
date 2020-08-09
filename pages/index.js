import {useEffect, useState} from 'react';
import {useSnackbar} from 'react-simple-snackbar';
import Head from 'components/head';
import LoginForm from 'components/loginForm';
import StockList from 'components/stockList';
import {loginApi, refreshAuthApi} from 'ajaxClient/authApis';
import getStocksApi from 'ajaxClient/getStocksApi';
import parseCookies from 'helpers/parseCookies';

import {w3cwebsocket as W3CWebSocket} from 'websocket';

export default function indexPage() {
	const [loggedIN, setLoggedIN] = useState(false);
	const [stocks, setStocks] = useState([]);

	const [openSnackbar] = useSnackbar({
		position: 'top-center',
	});

	const toggleUI = () => {
		const cookies = parseCookies();
		if (cookies && JSON.stringify(cookies).indexOf('client') > -1) {
			if (!loggedIN) {
				setLoggedIN(true);
			}
			return;
		}
		if (loggedIN) {
			setLoggedIN(false);
		}
		return;
	};

	useEffect(() => {
		toggleUI();
	}, [toggleUI]);

	const login = async (email) => {
		try {
			const result = await loginApi(email);

			if (result.status == '401') {
				openSnackbar('Invalid Credentials');
				return;
			}

			toggleUI();
			return;
		} catch (e) {
			openSnackbar('Unable to communicate with the server');
		}
	};

	const refreshToken = async () => {
		try {
			const result = await refreshAuthApi();

			if (result.status == '401') {
				openSnackbar('Session Expired');
				return;
			}

			toggleUI();
			return;
		} catch (e) {
			openSnackbar('Unable to communicate with the server');
		}
	};

	const getStocks = async () => {
		try {
			const result = await getStocksApi();
			if (result.status == '401') {
				openSnackbar('Session Expired');
				toggleUI();
				return;
			}
			const data = await result.json();
			setStocks(data.stocks);
		} catch (e) {
			openSnackbar('Unable to communicate with the server');
		}
	};

	const updateStocks = (message) => {
		const data = JSON.parse(message.data);

		if (!stocks) {
			return;
		}

		const temp = stocks.map((x) => {
			if (x._id == data.id) {
				return {...x, price: data.price, _id: data.id};
			}
			return x;
		});
		setStocks(temp);
	};
 
	const connectWS = () => {
		const client = new W3CWebSocket(
			`ws://${window.location.hostname}:5000/wssocket`
		);

		client.onopen = () => {
			console.log('WebSocket Client Connected');
		};
		client.onmessage = updateStocks;
	};

	useEffect(() => {
		var autoRefresh;
		if (loggedIN) {
			connectWS();
			getStocks();
			autoRefresh = setInterval(() => {
				refreshToken();
			}, 250000);
			return;
		}
		if (autoRefresh) {
			clearInterval(autoRefresh);
		}
	}, [loggedIN, connectWS, getStocks, refreshToken]);

	return (
		<>
			<Head title="Home" />
			<div className={`container`}>
				<h1>Stock Manager</h1>
				{!loggedIN ? (
					<LoginForm handleLogin={login} />
				) : (
					<StockList stocks={stocks} />
				)}
			</div>
		</>
	);
}
