import React from 'react';
import './Navbar.css';

class Navbar extends React.Component {
	render() {
		let toRender = [];

		// Verificando se o usuário está autenticado
		if (this.props.isAuthenticated) {
			toRender.push(
				<a className="text-light" href="#" onClick={() => this.props.handleUserAuthentication()}>
					Sair
				</a>
			);
		}

		return (
			<nav className="navbar navbar-light bg-dark">
				<a className="navbar-brand text-light" href="#">
					EstradaApp
				</a>
				{toRender}
			</nav>
		);
	}
}

export default Navbar;
