import React, {useState} from 'react';
import styles from './login.module.css';

export default function LoginForm({handleLogin}) {
	const [email, setEmail] = useState('');

	const handleChange = (e) => {
		setEmail(e.target.value);
	};

	const submitForm = (e) => {
		e.preventDefault();
		if (!email) {
			alert('Please Enter a email');
			return;
		}

		handleLogin(email);
	};

	return (
		<>
			
				<form>
					<div className="row">
						<div className="twelve columns">
							<label htmlFor="Username">Email</label>
							<input
								className="u-full-width"
								type="email"
								placeholder="Email"
								id="Email"
								value={email}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="row">
						<div className="twelve columns">
							<button
								className={`button-primary ${styles.btn}`}
								type="submit"
								onClick={submitForm}
							>
								Login
							</button>
						</div>
					</div>
				</form>
		</>
	);
}
