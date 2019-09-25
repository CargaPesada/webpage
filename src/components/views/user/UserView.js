import React from 'react';
import CustomCard from '../../cards/CustomCard';
import './UserView.css';
import InfoView from './info/InfoView';
import RegisterUserView from '../../forms/registerUser/RegisterUserView';
import RegisterOfficeView from '../../forms/registerOffice/RegisterOfficeView';
import DeleteOfficeView from '../../forms/deleteOffice/DeleteOfficeView';

class UserView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// DEBUG
			mustHideCards: false,
			mustShowDriverInfo: false,
			mustShowUserRegisterView: false,
			mustShowWorkshopRegisterView: false,
			mustShowWorkshopDeleterView: false,
			infosToShow: [['Nome', 'Teste'], ['Sobrenome', 'Higa']] // Deixar vazio
		};
	}

	/**
     * Método para esconder os cards e demonstrar a view de registro do Usuário.
     */
	handleUserRegisterCard = (mustHide) => {
		if (mustHide === true) {
			this.setState({ mustHideCards: true, mustShowUserRegisterView: true });
		} else {
			this.setState({ mustHideCards: false, mustShowUserRegisterView: false });
		}
	};

	/**
     * Método para esconder os cards e demonstrar a view de registro de Oficina.
     */
	handleWorkshopRegisterCard = (mustHide) => {
		if (mustHide === true) {
			this.setState({ mustHideCards: true, mustShowWorkshopRegisterView: true });
		} else {
			this.setState({ mustHideCards: false, mustShowWorkshopRegisterView: false });
		}
	};

	/**
     * Método para esconder os cards e demonstrar a view de deletar Oficina.
     */
	handleWorkshopDeleterCard = (mustHide) => {
		if (mustHide === true) {
			this.setState({ mustHideCards: true, mustShowWorkshopDeleterView: true });
		} else {
			this.setState({ mustHideCards: false, mustShowWorkshopDeleterView: false });
		}
	};

	/**
     * Método padrão de renderização do componente.
     */
	render() {
		let toRender = [];

		// Checando se o usuário é administrador para acessar as telas de ADMIN.
		if (!this.props.isAdmin) {
			// Nesse caso o usuário é o motorista...
			if (!this.state.mustHideCards) {
				toRender.push(
					<div
						className="row justify-content-between"
						style={{ marginTop: '17%', marginLeft: '10%', marginRight: '10%' }}
					>
						{/* <img src="https://i.imgur.com/WSMLJBz.png" class="img-fluid" alt="Logo"></img> */}
						{/* Dados do Caminhão */}
						<CustomCard name="fa-truck" description="Dados do Caminhão" />

						{/* Dados do Usuário */}
						<CustomCard
							name="fa-user-slash"
							description="Dados do Motorista"

						/>

						{/* Alerta */}
						<CustomCard name="fa-exclamation-triangle" description="Emergência" />
					</div>
				);
			} else {
				if (this.state.mustShowDriverInfo) {
					toRender.push(
						<InfoView
							description="Dados do Motorista"
							handleCard={this.handleUserRegisterCard}
							infosToShow={this.state.infosToShow}
						/>
					);
				}
			}
		} else {
			// Nesse caso o usuário é ADMIN.
			if (!this.state.mustHideCards) {
				if (this.props.cargo >= 3) {
					toRender.push(
						<div
							className="row d-flex justify-content-between"
							style={{ marginTop: '17%', marginLeft: '10%', marginRight: '10%' }}
						>
							{/* Gerenciar Dados dos Usuários */}
							<CustomCard
								name="fa-users"
								description="Registrar Usuário"
								customOnClick={() => this.handleUserRegisterCard(true)}
							/>

							{/* Registrar Oficina */}
							<CustomCard
								name="fa-warehouse"
								description="Registrar Oficina"
								customOnClick={() => this.handleWorkshopRegisterCard(true)}
							/>

							{/* Deletar Oficina */}
							<CustomCard
								name="fa-ban"
								description="Deletar Oficina"
								customOnClick={() => this.handleWorkshopDeleterCard(true)}
							/>
						</div>
					);
				}
				else {
					// Então se o cara não tem cargo >= que 3 ...
					toRender.push(
						<div
							className="row d-flex justify-content-between"
							style={{ marginTop: '17%', marginLeft: '10%', marginRight: '10%' }}
						>
							{/* Gerenciar Dados dos Usuários */}
							<CustomCard
								name="fa-users"
								description="Registrar Usuário"
								customOnClick={() => this.handleUserRegisterCard(true)}
							/>
						</div>
					);
				}
			} else {
				if (this.state.mustShowUserRegisterView) {
					toRender.push(
						<RegisterUserView description="Registrar Usuário" handleCard={this.handleUserRegisterCard} cargo={this.props.cargo} />
					);
				}
				else if (this.state.mustShowWorkshopRegisterView) {
					toRender.push(
						<RegisterOfficeView description="Registrar Oficina" handleCard={this.handleWorkshopRegisterCard} cargo={this.props.cargo} />
					);
				}
				else if (this.state.mustShowWorkshopDeleterView) {
					toRender.push(
						<DeleteOfficeView description="Deletar Oficina" handleCard={this.handleWorkshopDeleterCard} cargo={this.props.cargo}/>
					);
				}
			}
		}


		// Retornando para a tela do usuário as interfaces
		return <div>{toRender}</div>;
		
	}
}

export default UserView;
