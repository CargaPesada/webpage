import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as credentials from './credential';
import JOB_TITLE_IDS from '../../models/JobTitle';
import Tool from '../../models/Tool';
const axios = require('axios');
const ENDPOINT_ADDRESS = 'https://carga-pesada-d933f.appspot.com';

// Initialize Firebase
firebase.initializeApp(credentials);

class FirebaseHandler {
	/**
     * Método para tentar realizar um novo registro de usuário.
     */
	tryToRegisterUser = async (user, callback) => {
		let jsonToSend = {
			nome: user.nome,
			cargo: user.cargo.toLowerCase(),
			email: user.email,
			senha: user.senha,
			cpf: user.cpf,
			endereco: user.rua,
			tipocnh: user.cnh,
			ddn: user.ddn,
			sexo: user.sexo,
			nomepai: user.nomepai,
			nomemae: user.nomemae,
			dependentes: user.dependentes,
			status: false,
			ocorrencias: []
		};

		// Registra o usuario no autenticador do Firebase
		axios
			.post(ENDPOINT_ADDRESS + '/user/register', jsonToSend)
			.then((res) => {
				firebase
					.auth()
					.createUserWithEmailAndPassword(jsonToSend.email, jsonToSend.senha)
					.then(() => {
						callback();
					})
					.catch((err) => {
						callback(new Error('Erro ao enviar informações para o firebase'));
					});
			})
			.catch((err) => {
				callback(new Error('Erro ao enviar informações para o servidor'));
			});
	};

	/**
     * Método para tentar realizar um novo registro de caminhão.
     */
	tryToRegisterTruck = async (truck) => {
		let jsonToSend = {
			marca: truck.marca,
			modelo: truck.modelo,
			placa: truck.placa,

			comprimento: truck.comprimento,
			largura: truck.largura,
			altura: truck.altura,
			cargaMaxima: truck.cargaMaxima,
			pais: truck.pais
		};

		// Acionando promisses para o endpoint
		try {
			let res = await axios.post(ENDPOINT_ADDRESS + '/truck/register', jsonToSend).then();

			if (res != null) {
				if (res.status === 200) {
					return true;
				}
			}
		} catch (e) { }

		return false;
	};

	/**
     * Método para tentar realizar um novo registro de oficina.
     */
	tryToRegisterOffice = async (office) => {
		let jsonToSend = {
			nome: office.nome,
			cpf: office.cpf,
			telefone: office.telefone,
			endereco: {
				CEP: office.CEP,
				cidade: office.cidade,
				estado: office.estado,
				rua: office.rua,
				complemento: office.complemento,
				numero: office.numero,
				bairro: office.bairro,
				pais: office.pais
			}
		};

		// Acionando promisses para o endpoint
		try {
			let res = await axios.post(ENDPOINT_ADDRESS + '/office/register', jsonToSend).then();

			if (res != null) {
				if (res.status >= 200 && res.status <= 299) {
					return true;
				}
			}
		} catch (e) { }

		return false;
	};

	/**
     * Método para tentar realizar um novo registro de serviço.
     */
	tryToRegisterCalendarEvent = async (event) => {
		let jsonToSend = {
			titulo: event.titulo,
			data: event.data,
			placa_caminhao: event.placa_caminhao,
			id_oficina: event.id_oficina,
			id_usuario: event.id_usuario
		};

		// Acionando promisses para o endpoint
		try {

			let res = await axios.post(ENDPOINT_ADDRESS + '/schedule/register', jsonToSend).then();

			if (res != null) {
				if (res.status >= 200 && res.status <= 299) {
					return true;
				}
			}
		} catch (e) { }

		return false;
	};

	/**
     * Método para tentar realizar um novo registro de serviço.
     */
	tryToRegisterService = async (Service) => {
		let jsonToSend = {
			nome: Service.nome,
			preco: Service.preco
		};

		// Acionando promisses para o endpoint
		try {

			let res = await axios.post(ENDPOINT_ADDRESS + '/service/register', jsonToSend).then();

			if (res != null) {
				if (res.status >= 200 && res.status <= 299) {
					return true;
				}
			}
		} catch (e) { }

		return false;
	};

	/**
     * Método para tentar realizar um novo registro de peça.
     */
	tryToRegisterTool = async (Tool) => {
		let jsonToSend = {
			nome: Tool.nome,
			preco: Tool.price,
			uni: Tool.uni
		};

		// Acionando promisses para o endpoint
		try {
			let res = await axios.post(ENDPOINT_ADDRESS + '/piece/register', jsonToSend).then();

			if (res != null) {
				if (res.status >= 200 && res.status <= 299) {
					return true;
				}
			}
		} catch (e) { }

		return false;
	};

	/**
	 * Método para retornar todas oficinas.
	 */
	getAllOffices = async () => {
		try {
			let res = await axios.get(ENDPOINT_ADDRESS + '/office/all');

			if (res != null) {
				let listOfOffices = [];

				for (let index = 0; index < res.data.data.length; index++) {
					listOfOffices.push(res.data.data[index]);
				}

				return listOfOffices;
			}
		} catch (e) { }

		return [];
	};

	/**
	 * Método para retornar todos caminhões.
	 */
	getAllTrucks = async () => {
		try {
			let res = await axios.get(ENDPOINT_ADDRESS + '/truck/all');

			if (res != null) {
				let listOfTrucks = [];

				for (let index = 0; index < res.data.data.length; index++) {
					listOfTrucks.push(res.data.data[index]);
				}

				return listOfTrucks;
			}
		} catch (e) { }

		return [];
	};

	/**
	 * Método para retornar todas oficinas.
	 */
	getAllUsers = async () => {
		try {
			let res = await axios.get(ENDPOINT_ADDRESS + '/user/all');

			if (res != null) {
				let listOfUsers = [];

				for (let index = 0; index < res.data.data.length; index++) {
					listOfUsers.push(res.data.data[index]);
				}

				return listOfUsers;
			}
		} catch (e) { }

		return [];
	};

	/**
	 * Método para retornar todos os servicos.
	 */
	getAllServices = async () => {
		try {
			let res = await axios.get(ENDPOINT_ADDRESS + '/service/list');

			if (res != null) {
				let listOfServices = [];

				for (let index = 0; index < res.data.data.length; index++) {
					listOfServices.push(res.data.data[index]);
				}

				return listOfServices;
			}
		} catch (e) { }

		return [];
	};

	/**
	 * Método para retornar todos os servicos.
	 */
	getAllTools = async () => {
		try {
			let res = await axios.get(ENDPOINT_ADDRESS + '/piece/list');

			if (res != null) {
				let listOfTools = [];

				for (let index = 0; index < res.data.data.length; index++) {
					listOfTools.push(res.data.data[index]);
				}

				return listOfTools;
			}
		} catch (e) { }

		return [];
	};

	/**
	 * Método para atualizar o status do motorista.
	 */
	updateDriverStatus = async (cpf, newStatus) => {

		let jsonToSend = {
			cpf: cpf,
			status: newStatus
		};

		try {
			let res = await axios.put(ENDPOINT_ADDRESS + '/user/status', jsonToSend);

			if (res != null) {
				if (res.status >= 200 && res.status <= 299) {
					return true;
				}

			}
		} catch (e) { }

		return false;
	}

	/**
	 * Método para deletar uma certa oficina.
	 */
	deleteCertainOffice = async (id) => {
		try {
			let res = await axios.delete(ENDPOINT_ADDRESS + '/office/delete/' + id);

			if (res != null) {
				if (res.status === 200) {
					return true;
				}
			}
		} catch (e) { }

		return false;
	};

	/**
	 * Método para deletar um certo caminhão.
	 */
	deleteCertainTruck = async (id) => {
		try {
			let res = await axios.delete(ENDPOINT_ADDRESS + '/truck/delete/' + id);

			if (res != null) {
				if (res.status === 200) {
					return true;
				}
			}
		} catch (e) { }

		return false;
	};

	/**
	 * Método para deletar um certo evento no calendário.
	 */
	deleteCertainCalendarEvent = async (officeID, eventID) => {
		try {
			let res = await axios.delete(ENDPOINT_ADDRESS + '/schedule/delete/' + officeID + '/' + eventID);

			if (res != null) {
				if (res.status === 200) {
					return true;
				}
			}
		} catch (e) { }

		return false;
	};

	/**
	 * Método para deletar um servico
	 */
	deleteService = async (id) => {
		try {
			let res = await axios.delete(ENDPOINT_ADDRESS + '/service/delete/' + id);

			if (res != null) {
				if (res.status === 200) {
					return true;
				}
			}
		} catch (e) { }

		return false;
	};

	/**
	 * Método para deletar uma peca
	 */
	deleteTool = async (id) => {
		try {
			let res = await axios.delete(ENDPOINT_ADDRESS + '/piece/delete/' + id);

			if (res != null) {
				if (res.status === 200) {
					return true;
				}
			}
		} catch (e) { }

		return false;
	};

	/**
     * Método para tentar realizar login.
     */
	tryToLogin = async (email, password, callback) => {
		await firebase.auth().signInWithEmailAndPassword(email, password).catch((err) => {
			return -1;
		});

		let userInfo = {
			cargo: JOB_TITLE_IDS['nao_autorizado'],
			cpf: null
		}

		await axios.get(ENDPOINT_ADDRESS + '/user/' + email).then((res) => {
			try {
				console.log(res);

				userInfo = {
					cargo: JOB_TITLE_IDS[res.data.data.cargo],
					cpf: res.data.data.cpf
				}
			} catch (e) { }
		});

		return userInfo;
	};

	/**
	 * Método para checar o nível de acesso do usuário.
	 */
	// checkAccessLevel = async (email, callback) => {

	// 	await axios.get(ENDPOINT_ADDRESS + '/users/' + email).then((res) => {
	// 		return res.data.cargo;
	// 	}).catch((err) => { });

	// 	return -1;

	// }
}

export default FirebaseHandler;
