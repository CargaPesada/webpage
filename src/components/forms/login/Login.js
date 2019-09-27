import React from 'react';
import './Login.css';
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';

class Login extends React.Component {
	/**
     * Método para lidar com login.
     */
	handleLoginButton = async () => {
		if (document.getElementById('email').value !== '' && document.getElementById('password').value != '') {
			let httpHandler = new FirebaseHandler();

			// Tentando realizar autenticação...
			let cargo = await httpHandler.tryToLogin(
				document.getElementById('email').value,
				document.getElementById('password').value
			);

			// Se a autenticação deu certa...
			// Verificaremos se o usuário tem perfil administrativo
			if (cargo > 1) {
				this.props.handleUserAuthentication(true, cargo);
			} else if (cargo == 0 || cargo == 1) {
				this.props.handleUserAuthentication(false, cargo);
			} else {
				alert('Credenciais inválidas!');
			}
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
				{/* <img src="http://giphygifs.s3.amazonaws.com/media/oEHdCCXMsgoj6/giphy.gif" style={{ marginTop: "5%"}} class="img-fluid" alt="Logo"></img> */}
				<form>
					<div className="form-group">
						<img
							src="https://i.imgur.com/WSMLJBz.png"
							style={{ marginTop: '5%' }}
							class="img-fluid"
							alt="Logo"
						/>
						<h1 className="display-5" style={{ marginTop: '5%' }}>
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
