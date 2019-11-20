import React from 'react';
import CustomCard from '../../cards/CustomCard';
import './UserView.css';
import InfoView from './info/InfoView';
import RegisterUserView from '../registerUser/RegisterUserView';
import RegisterOfficeView from '../registerOffice/RegisterOfficeView';
import DeleteOfficeView from '../deleteOffice/DeleteOfficeView';
import ReadOfficeDataView from '../readOfficeDataView/ReadOfficeDataView';
import RegisterTruckView from '../registerTruck/RegisterTruckView';
import ReadTruckDataView from '../readTruckDataView/ReadTruckDataView';
import DeleteTruckView from '../deleteTruckView/DeleteTruckView';
import ReadUserDataView from '../readUserDataView/ReadUserDataView';
import DriverStatusHandlerView from '../driverStatusHandlerView/DriverStatusHandlerView';
import RegisterServiceAndToolView from '../registerServiceAndTool/RegisterServiceAndToolView';
import ReadServiceAndToolDataView from '../readServiceAndToolView';
import DeleteServiceAndToolView from '../deleteServiceAndToolView';

// TODO: Essa classe é ANTI-PATTERN, pois ela é uma God Class
// TALVEZ SERIA LEGAL QUEBRAR EM 2 PARTES!!!
class UserView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// DEBUG
			mustHideCards: false,
			mustShowDriverInfo: false,
			mustShowUserRegisterView: false,
			mustShowUserDataReaderView: false,
			mustShowDriverStatusSetterView: false,
			mustShowWorkshopRegisterView: false,
			mustShowWorkshopDeleterView: false,
			mustShowWorkshopDataReaderView: false,
			mustShowTruckDataView: false,
			mustShowTruckRegisterView: false,
			mustShowTruckDeleterView: false,
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
	 * Método para esconder os cards e demonstrar a view de leitura do Usuário.
	 */
	handleUserDataReaderCard = (mustHide) => {
		if (mustHide === true) {
			this.setState({ mustHideCards: true, mustShowUserDataReaderView: true });
		} else {
			this.setState({ mustHideCards: false, mustShowUserDataReaderView: false });
		}
	};

	/**
	 * Método para esconder os cards e demonstrar a view de leitura do Usuário.
	 */
	handleDriverStatusSetterCard = (mustHide) => {
		if (mustHide === true) {
			this.setState({ mustHideCards: true, mustShowDriverStatusSetterView: true });
		} else {
			this.setState({ mustHideCards: false, mustShowDriverStatusSetterView: false });
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
     * Método para esconder os cards e demonstrar a view de deletar Caminhões.
     */
	handleTruckDeleterCard = (mustHide) => {
		if (mustHide === true) {
			this.setState({ mustHideCards: true, mustShowTruckDeleterView: true });
		} else {
			this.setState({ mustHideCards: false, mustShowTruckDeleterView: false });
		}
	}

	/**
	 * Método apra esconder os cards e demonstrar a view de ver dados dos servicos e pecas.
	 */
	handleServiceAndToolDataCard = (mustHide) => {
		if (mustHide === true) {
			this.setState({ mustHideCards: true, mustShowServiceAndToolDataView: true });
		} else {
			this.setState({ mustHideCards: false, mustShowServiceAndToolDataView: false });
		}
	};

	/**
	 * Método apra esconder os cards e demonstrar a view de registrar os servicos e pecas.
	 */
	handleServiceAndToolRegisterCard = (mustHide) => {
		if (mustHide === true) {
			this.setState({ mustHideCards: true, mustShowServiceAndToolRegisterView: true });
		} else {
			this.setState({ mustHideCards: false, mustShowServiceAndToolRegisterView: false });
		}
	};

	/**
     * Método para esconder os cards e demonstrar a view de deletar os servicos e pecas.
     */
	handleServiceAndToolDeleterCard = (mustHide) => {
		if (mustHide === true) {
			this.setState({ mustHideCards: true, mustShowServiceAndToolDeleterView: true });
		} else {
			this.setState({ mustHideCards: false, mustShowServiceAndToolDeleterView: false });
		}
	}

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

						{/* Status do Usuário */}
						<CustomCard
							name="fa-user-slash"
							description="Status do Motorista"
							customOnClick={() => this.handleDriverStatusSetterCard(true)}

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
							{/* Registrar Dados dos Usuários */}
							<CustomCard
								name="fa-users"
								description="Registrar Usuário"
								customOnClick={() => this.handleUserRegisterCard(true)}
							/>

							{/* Ver dados dos Usuários */}
							<CustomCard
								name="fa-users"
								description="Consultar Usuário"
								customOnClick={() => this.handleUserDataReaderCard(true)}
							/>

						</div>
						<div
							className="row d-flex justify-content-between"
							style={{ marginTop: '10%', marginLeft: '10%', marginRight: '10%' }}
						>
							{/* Ver Oficina */}
							<CustomCard
								name="fa-warehouse"
								description="Consultar Oficina"
								customOnClick={() => this.handleWorkshopDataReaderCard(true)}
								email={this.props.email}
							/>

						</div>
						<div
							className="row d-flex justify-content-between"
							style={{ marginTop: '10%', marginLeft: '10%', marginRight: '10%' }}
						>

							{/* Registrar o Caminhão */}
							<CustomCard
								name="fa-truck"
								description="Registrar Caminhão"
								customOnClick={() => this.handleTruckRegisterCard(true)}
							/>

							{/* Dados do Caminhão */}
							<CustomCard
								name="fa-truck"
								description="Consultar Caminhão"
								customOnClick={() => this.handleTruckDataCard(true)}
							/>

							{/* Excluir Caminhão */}
							<CustomCard
								name="fa-ban"
								description="Excluir Caminhão"
								customOnClick={() => this.handleTruckDeleterCard(true)}
							/>
						</div>
						{/* GAMBI de Espaçamento */}
						<div
							className="row d-flex justify-content-between"
							style={{ marginTop: '10%', marginLeft: '10%', marginRight: '10%' }}
						></div>
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
							{/* Registrar Dados dos Usuários */}
							<CustomCard
								name="fa-users"
								description="Registrar Usuário"
								customOnClick={() => this.handleUserRegisterCard(true)}
							/>

							{/* Ver dados dos Usuários */}
							<CustomCard
								name="fa-users"
								description="Consultar Usuário"
								customOnClick={() => this.handleUserDataReaderCard(true)}
							/>
						</div>
						<div
							className="row d-flex justify-content-between"
							style={{ marginTop: '10%', marginLeft: '10%', marginRight: '10%' }}
						>

							{/* Registrar Oficina */}
							<CustomCard
								name="fa-warehouse"
								description="Registrar Oficina"
								customOnClick={() => this.handleWorkshopRegisterCard(true)}
							/>

							{/* Ver Oficina */}
							<CustomCard
								name="fa-warehouse"
								description="Consultar Oficina"
								customOnClick={() => this.handleWorkshopDataReaderCard(true)}
								email={this.props.email}
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
							style={{ marginTop: '10%', marginLeft: '10%', marginRight: '10%' }}
						>

							{/* Registrar o Caminhão */}
							<CustomCard
								name="fa-truck"
								description="Registrar Caminhão"
								customOnClick={() => this.handleTruckRegisterCard(true)}
							/>

							{/* Dados do Caminhão */}
							<CustomCard
								name="fa-truck"
								description="Consultar Caminhão"
								customOnClick={() => this.handleTruckDataCard(true)}
							/>

							{/* Excluir Caminhão */}
							<CustomCard
								name="fa-ban"
								description="Excluir Caminhão"
								customOnClick={() => this.handleTruckDeleterCard(true)}
							/>


						</div>

						<div
							className="row d-flex justify-content-between"
							style={{ marginTop: '10%', marginLeft: '10%', marginRight: '10%', marginBottom: '10%' }}
						>
							<CustomCard
								name="fa-tools"
								description="Registrar peças ou serviços"
								customOnClick={() => this.handleServiceAndToolRegisterCard(true)}
							/>
							<CustomCard
								name="fa-tools"
								description="Consultar peças ou serviços"
								customOnClick={() => this.handleServiceAndToolDataCard(true)}
							/>
							<CustomCard
								name="fa-ban"
								description="Excluir peças ou serviços"
								customOnClick={() => this.handleServiceAndToolDeleterCard(true)}
							/>
						</div>
						)
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
			else if (this.state.mustShowDriverStatusSetterView) {
				toRender.push(
					<DriverStatusHandlerView description="Status do Motorista" handleCard={this.handleDriverStatusSetterCard} cargo={this.props.cargo} cpf={this.props.cpf} />
				);
			}
			else if (this.state.mustShowUserRegisterView) {
				toRender.push(
					<RegisterUserView description="Registrar Usuário" handleCard={this.handleUserRegisterCard} cargo={this.props.cargo} />
				);
			}
			else if (this.state.mustShowUserDataReaderView) {
				toRender.push(
					<ReadUserDataView description="Consultar Usuário" handleCard={this.handleUserDataReaderCard} cargo={this.props.cargo} />
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
					<ReadOfficeDataView description="Consultar Oficina" handleCard={this.handleWorkshopDataReaderCard} cargo={this.props.cargo} cpf={this.props.cpf} />
				);
			}
			else if (this.state.mustShowTruckRegisterView) {
				toRender.push(
					<RegisterTruckView description="Registrar Caminhão" handleCard={this.handleTruckRegisterCard} cargo={this.props.cargo} />
				);
			}
			else if (this.state.mustShowTruckDataView) {
				toRender.push(
					<ReadTruckDataView description="Consultar Caminhões" handleCard={this.handleTruckDataCard} cargo={this.props.cargo} />
				);
			}
			else if (this.state.mustShowTruckDeleterView) {
				toRender.push(
					<DeleteTruckView description="Excluir Caminhões" handleCard={this.handleTruckDataCard} cargo={this.props.cargo} />
				);
			}
			else if (this.state.mustShowServiceAndToolRegisterView) {
				toRender.push(
					<RegisterServiceAndToolView description="Registrar Serviços e Peças" handleCard={this.handleServiceAndToolRegisterCard} cargo={this.props.cargo} />
				);
			}
			else if (this.state.mustShowServiceAndToolDataView) {
				toRender.push(
					<ReadServiceAndToolDataView description="Consultar Serviços e Peças" handleCard={this.handleServiceAndToolDataCard} cargo={this.props.cargo} />
				);
			}
			else if (this.state.mustShowServiceAndToolDeleterView) {
				toRender.push(
					<DeleteServiceAndToolView description="Excluir Serviços e Peças" handleCard={this.handleServiceAndToolDeleterCard} cargo={this.props.cargo} />
				);
			}
		}


		// Retornando para a tela do usuário as interfaces
		return <div className="UserView">{toRender}</div>;

	}
}

export default UserView;
