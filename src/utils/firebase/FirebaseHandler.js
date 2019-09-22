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
			nome: user.nome,
			cargo: 1,
			email: user.email,
			senha: user.senha,
			//rg: "38.733.798-x",
			cpf: user.cpf,
			endereco: user.endereco,
			tipocnh: user.tipocnh,
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
     * Método para tentar realizar um novo registro de usuário.
     */
	tryToRegisterOffice = async (office) => {
		let jsonToSend = {
			nome: office.nome,
			cpf: office.cpf,
			telefone: office.telefone,
			endereco: office.endereco,
		};

		// Acionando promisses para o endpoint
		try {
			await axios.post(ENDPOINT_ADDRESS + '/office/register', jsonToSend).then((res) => {
				return true;
			});
		}
		catch (e) {}

		return false;
	};

	/**
	 * Método para retornar todas oficinas.
	 */
	getAllOffices = async () => {
		try {
			await axios.get(ENDPOINT_ADDRESS + '/office/all').then((res) => {

				let listOfOffices = [];

				for (let index in res.data) {
					listOfOffices.push([res[index].id, res[index].nome]);
				}

				return listOfOffices;

			})
		}
		catch (e) {}

		return [];
	}

	/**
     * Método para tentar realizar login.
     */
	tryToLogin = async (email, password, callback) => {
		await firebase.auth().signInWithEmailAndPassword(email, password).catch((err) => {
			console.log("ERRO NO FIREBASE!");
			return -1;
		});

		let cargo = -1;

		await axios.get(ENDPOINT_ADDRESS + '/users/' + email).then((res) => {

			try {
				cargo = res.data.data.cargo;
			}
			catch (e) { }

		});

		return cargo;
	}

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
