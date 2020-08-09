import {useEffect, useState} from 'react';
import {useSnackbar} from 'react-simple-snackbar';
import Head from 'components/head';
import LoginForm from 'components/loginForm';
import StockList from 'components/stockList';
import loginApi from 'ajaxClient/authApis';
import getStocksApi from 'ajaxClient/getStocksApi';
import parseCookies from 'helpers/parseCookies';

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
		setLoggedIN(false);
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

	const getStocks = async () => {
		try {
			const result = await getStocksApi();
			if (result.status == '401') {
				openSnackbar('Session Expired');
				toggleUI();
				return;
			}
			const data = await result.json();
			setStocks(data);
		} catch (e) {
			openSnackbar('Unable to communicate with the server');
		}
	};

	useEffect(() => {
		getStocks();
	}, [loggedIN]);

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
