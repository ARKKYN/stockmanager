import React from 'react';
import SnackbarProvider from 'react-simple-snackbar';
import 'skeleton-css/css/skeleton.css';
import 'skeleton-css/css/normalize.css';
import './style.css';

export default function MyApp({Component, pageProps}) {
	return (
		<SnackbarProvider>
			<Component {...pageProps} />
		</SnackbarProvider>
	);
}
