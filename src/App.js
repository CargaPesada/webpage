import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Login from './components/views/login/Login';
import UserView from './components/views/user/UserView';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isUserAuthenticated: true,
			isAdmin: true,
			cargo: 3,
			cpf: "448.892.118-38"
		};
	}

	/**
   * Método para alterar o estado se o usuário está autenticado.
   */
	handleUserAuthentication = (isAdmin, cargo, cpf) => {
		if (this.state.isUserAuthenticated) {
			this.setState({ isUserAuthenticated: false, isAdmin: false, cargo: cargo, cpf: cpf });
		} else {
			if (isAdmin) {
				this.setState({ isUserAuthenticated: true, isAdmin: true, cargo: cargo, cpf: cpf });
			} else {
				this.setState({ isUserAuthenticated: true, isAdmin: false, cargo: cargo, cpf: cpf });
			}
		}
	};

	/**
   * Método padrão para renderizar componentes.
   */
	render() {
		let toRender = [];

		// Verificando se o usuário NÃO está autenticado
		if (!this.state.isUserAuthenticated) {
			toRender.push(
				<div className="d-flex flex-row-reverse main-content">
					<div className="empty-space" />
					<Login handleUserAuthentication={this.handleUserAuthentication} />
				</div>
			);
		} else {
			toRender.push(<UserView isAdmin={this.state.isAdmin} cargo={this.state.cargo} cpf={this.state.cpf} />);
		}

		return (
			<div className="App">
				<Navbar
					isAuthenticated={this.state.isUserAuthenticated}
					handleUserAuthentication={this.handleUserAuthentication}
				/>
				{toRender}
			</div>
		);
	}
}

export default App;
