import React from 'react';
import './Login.css';
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';

class Login extends React.Component {
	/**
     * Método lidar com login.
     */
	handleLoginButton = async () => {
		if (
			document.getElementById('email').value === 'admin' &&
			document.getElementById('password').value === 'admin'
		) {
			this.props.handleUserAuthentication(true);
		} else if (document.getElementById('email').value !== '') {
			let httpHandler = new FirebaseHandler();

			httpHandler.tryToLogin(
				document.getElementById('email').value,
				document.getElementById('password').value,
				(result) => {
					if (result === true) {
						this.props.handleUserAuthentication(false);
					} else {
						alert('Credenciais inválidas!');
					}
				}
			);
		} else {
			alert('Insira os campos!');
		}
	};

	/**
     * Método padrão de renderização.
     */
	render() {
		return (
			<div className="col-sm-3 bg-light custom-border">
				<form>
					<div className="form-group">
						<h1 className="display-4" style={{ marginTop: '5%' }}>
							LOGIN
						</h1>
					</div>
					<div className="form-group">
						<input type="text" style={{ width: '100%' }} name="email" id="email" placeholder="E-Mail" />
					</div>
					<div className="form-group">
						<input
							type="text"
							style={{ width: '100%' }}
							name="password"
							id="password"
							type="password"
							placeholder="Senha"
						/>
					</div>
					<input
						className="btn btn-primary"
						style={{ width: '100%', marginBottom: '5%' }}
						type="button"
						name="login"
						id="login"
						value="Entrar"
						onClick={() => this.handleLoginButton()}
					/>
				</form>
			</div>
		);
	}
}

export default Login;
