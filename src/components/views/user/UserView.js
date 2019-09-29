import React from 'react';
import CustomCard from '../../cards/CustomCard';
import './UserView.css';
import InfoView from './info/InfoView';
import RegisterUserView from '../../forms/registerUser/RegisterUserView';
import RegisterOfficeView from '../../forms/registerOffice/RegisterOfficeView';
import DeleteOfficeView from '../../forms/deleteOffice/DeleteOfficeView';
import ReadOfficeData from '../../forms/readOfficeData/ReadOfficeData';
import RegisterTruckView from '../../forms/registerTruck/RegisterTruckView';

// TODO: Essa classe é ANTI-PATTERN, pois ela é uma God Class
// TALVEZ SERIA LEGAL QUEBRAR EM 2 PARTES!!!
class UserView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// DEBUG
			mustHideCards: true,
			mustShowDriverInfo: false,
			mustShowUserRegisterView: false,
			mustShowWorkshopRegisterView: false,
			mustShowWorkshopDeleterView: false,
			mustShowWorkshopDataReaderView: false,
			mustShowTruckDataView: false,
			mustShowTruckRegisterView: true,
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
	 * Método apra esconder os cards e demonstrar a view de ver Oficina.
	 */
	handleWorkshopDataReaderCard = (mustHide) => {
		if (mustHide === true) {
			this.setState({ mustHideCards: true, mustShowWorkshopDataReaderView: true });
		} else {
			this.setState({ mustHideCards: false, mustShowWorkshopDataReaderView: false });
		}
	};

	/**
	 * Método apra esconder os cards e demonstrar a view de ver dados do Caminhão.
	 */
	handleTruckDataCard = (mustHide) => {
		if (mustHide === true) {
			this.setState({ mustHideCards: true, mustShowTruckDataView: true });
		} else {
			this.setState({ mustHideCards: false, mustShowTruckDataView: false });
		}
	};

	/**
	 * Método apra esconder os cards e demonstrar a view de registrar Caminhão.
	 */
	handleTruckRegisterCard = (mustHide) => {
		if (mustHide === true) {
			this.setState({ mustHideCards: true, mustShowTruckRegisterView: true });
		} else {
			this.setState({ mustHideCards: false, mustShowTruckRegisterView: false });
		}
	};

	/**
     * Método padrão de renderização do componente.
     */
	render() {
		let toRender = [];

		// TODO: Reorganizar aqui! Ta muito bagunçado kkkk


		// Verificando se deverá mostrar os cards em forma de atalhou ou fullscreen!
		if (!this.state.mustHideCards) {

			// MOTORISTA
			if (this.props.cargo === 0) {
				toRender.push(
					<div
						className="row justify-content-between"
						style={{ marginTop: '10%', marginLeft: '10%', marginRight: '10%' }}
					>
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
			}

			// SUPERVISOR
			else if (this.props.cargo === 2) {
				toRender.push(
					<div>
						<div
							className="row d-flex justify-content-between"
							style={{ marginTop: '10%', marginLeft: '10%', marginRight: '10%' }}
						>
							{/* Gerenciar Dados dos Usuários */}
							<CustomCard
								name="fa-users"
								description="Registrar Usuário"
								customOnClick={() => this.handleUserRegisterCard(true)}
							/>
							{/* Ver Oficina */}
							<CustomCard
								name="fa-warehouse"
								description="Ver Oficina"
								customOnClick={() => this.handleWorkshopDataReaderCard(true)}
							/>


							{/* Registrar o Caminhão */}
							<CustomCard
								name="fa-truck"
								description="Registrar Caminhão"
							/>

						</div>
						<div
							className="row d-flex justify-content-between"
							style={{ marginTop: '10%', marginLeft: '10%', marginRight: '10%' }}
						>
							{/* Dados do Caminhão */}
							<CustomCard
								name="fa-truck"
								description="Dados do Caminhão"
							/>

							{/* Excluir Caminhão */}
							<CustomCard
								name="fa-ban"
								description="Excluir Caminhão"
							/>
						</div>
					</div>
				);
			}

			// GERENTE REGIONAL OU DIRETOR GLOBAL
			if (this.props.cargo >= 3) {
				toRender.push(
					<div>
						<div
							className="row d-flex justify-content-between"
							style={{ marginTop: '10%', marginLeft: '10%', marginRight: '10%' }}
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
						<div
							className="row d-flex justify-content-between"
							style={{ marginTop: '5%', marginLeft: '10%', marginRight: '10%' }}
						>
							{/* Ver Oficina */}
							<CustomCard
								name="fa-warehouse"
								description="Ver Oficina"
								customOnClick={() => this.handleWorkshopDataReaderCard(true)}
							/>

							{/* Dados do Caminhão */}
							<CustomCard
								name="fa-truck"
								description="Registrar Caminhão"
								customOnClick={() => this.handleTruckRegisterCard(true)}
							/>

							{/* Dados do Caminhão */}
							<CustomCard
								name="fa-truck"
								description="Dados do Caminhão"
							/>
						</div>
						<div
							className="row d-flex justify-content-between"
							style={{ marginTop: '5%', marginLeft: '10%', marginRight: '10%' }}
						>
							{/* Excluir Caminhão */}
							<CustomCard
								name="fa-ban"
								description="Excluir Caminhão"
							/>
						</div>
					</div>
				);
			}

		} else {

			// Verificando qual tipo de card deverá aparecer em fullscreen!
			if (this.state.mustShowDriverInfo) {
				toRender.push(
					<InfoView description="Dados do Motorista" handleCard={this.handleUserRegisterCard} infosToShow={this.state.infosToShow} />
				);
			}
			else if (this.state.mustShowUserRegisterView) {
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
					<DeleteOfficeView description="Deletar Oficina" handleCard={this.handleWorkshopDeleterCard} cargo={this.props.cargo} />
				);
			}
			else if (this.state.mustShowWorkshopDataReaderView) {
				toRender.push(
					<ReadOfficeData description="Ver Oficina" handleCard={this.handleWorkshopDataReaderCard} cargo={this.props.cargo} />
				);
			}
			else if (this.state.mustShowTruckRegisterView) {
				toRender.push(
					<RegisterTruckView description="Registrar Caminhão" handleCard={this.handleTruckRegisterCard} cargo={this.props.cargo} />
				);
			}
		}


		// Retornando para a tela do usuário as interfaces
		return <div>{toRender}</div>;

	}
}

export default UserView;
