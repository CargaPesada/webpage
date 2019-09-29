import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as credentials from './credential';
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
			nome: user.data.nome,
			cargo: user.data.cargo,
			email: user.data.email,
			senha: user.data.senha,
			//rg: "38.733.798-x",
			cpf: user.data.cpf,
			endereco: user.data.endereco,
			tipocnh: user.data.tipocnh,
			ddn: user.data.ddn,
			sexo: user.data.sexo,
			nomepai: user.data.nomepai,
			nomemae: user.data.nomemae,
			dependentes: user.data.dependentes,
			ocorrencias: []
		};

		// Registra o usuario no autenticador do Firebase
		firebase.auth().createUserWithEmailAndPassword(jsonToSend.email, jsonToSend.senha).then(
			async (user) => {
				// Acionando promisses para o endpoint
				await axios.post(ENDPOINT_ADDRESS + '/users/register', jsonToSend).then((res) => {
					callback();
				});
			},
			(error) => {
				callback(error);
				console.log(error);
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
		} catch (e) {}

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
			endereco: office.endereco
		};

		// Acionando promisses para o endpoint
		try {
			let res = await axios.post(ENDPOINT_ADDRESS + '/office/register', jsonToSend).then();

			if (res != null) {
				if (res.status === 200) {
					return true;
				}
			}
		} catch (e) {}

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
						listOfOffices.push([ res.data.data[index].id, res.data.data[index].nome ]);
					}
				}

				return listOfOffices;
			}
		} catch (e) {}

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
		} catch (e) {}

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
		} catch (e) {}

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
		} catch (e) {}

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

		let cargo = -1;

		await axios.get(ENDPOINT_ADDRESS + '/users/' + email).then((res) => {
			try {
				cargo = res.data.data.cargo;
			} catch (e) {}
		});

		return cargo;
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
