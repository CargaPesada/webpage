import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as credentials from './credential';
import JOB_TITLE_IDS from '../../models/JobTitle';
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
			cargo: user.cargo,
			email: user.email,
			senha: user.senha,
			//rg: "38.733.798-x",
			cpf: user.cpf,
			endereco: user.rua,
			tipocnh: user.cnh,
			ddn: user.ddn,
			sexo: user.sexo,
			nomepai: user.nomepai,
			nomemae: user.nomemae,
			dependentes: user.dependentes,
			ocorrencias: []
		};

		// Registra o usuario no autenticador do Firebase
		firebase.auth().createUserWithEmailAndPassword(jsonToSend.email, jsonToSend.senha).then(
			async (user) => {
				// Acionando promisses para o endpoint
				await axios.post(ENDPOINT_ADDRESS + '/user/register', jsonToSend).then((res) => {
					callback();
				});
			},
			(error) => {
				callback(error);
			}
		);
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
	 * Método para retornar todas oficinas.
	 */
	getAllOffices = async () => {
		try {
			let res = await axios.get(ENDPOINT_ADDRESS + '/office/all');

			if (res != null) {
				let listOfOffices = [];

				for (let index = 0; index < res.data.data.length; index++) {
					if (res.data.data[index].id != null && res.data.data[index].nome != null) {
						listOfOffices.push([res.data.data[index].id, res.data.data[index].nome]);
					}
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
     * Método para tentar realizar login.
     */
	tryToLogin = async (email, password, callback) => {
		await firebase.auth().signInWithEmailAndPassword(email, password).catch((err) => {
			console.log('ERRO NO FIREBASE!');
			return -1;
		});

		let cargo = 'nao_autorizado';
		await axios.get(ENDPOINT_ADDRESS + '/user/' + email).then((res) => {
			try {
				console.log(res);
				cargo = res.data.data.cargo;
			} catch (e) { }
		});

		return JOB_TITLE_IDS[cargo];
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
