
import {useState} from 'react';
import {useSnackbar} from 'react-simple-snackbar';
import Head from 'components/head';
import LoginForm from 'components/loginForm';
import StockList from "components/stockList";
import loginApi from 'ajaxClient/auth';

export default function indexPage() {
	const [loggedIN, setLoggedIN] = useState(false);

	const [openSnackbar] = useSnackbar({
		position: 'top-center',
	});

	const login = async (email) => {
		try {
			const result = await loginApi(email);

			if (result.status == '401') {
				openSnackbar('Invalid Credentials');
				return;
			}
			
			setLoggedIN(true);
			return;
		} catch (e) {
			openSnackbar('Unable to communicate with the server');
		}
	};
	return (
		<>
			<Head title="Home" />
			<div className={`container`}>
				<h1>Stock Manager</h1>
				{loggedIN ? <LoginForm handleLogin={login} /> : <StockList />}
			</div>
		</>
	);
}
