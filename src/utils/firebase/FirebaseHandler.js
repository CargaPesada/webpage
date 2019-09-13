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
	tryToRegister = async (user, callback) => {
		let jsonToSend = {
			nome: user.nome,
			cargo: 1,
			email: user.email,
			senha: user.senha,
			//rg: "38.733.798-x",
			cpf: user.cpf,
			endereco: [ { cidade: user.cidade, estado: user.estado } ],
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
     * Método para tentar realizar login.
     */
	tryToLogin = (email, password, callback) => {
		firebase.auth().signInWithEmailAndPassword(email, password).then(
			function(user) {
				callback(true);
			},
			function(error) {
				callback(false);
			}
		);
	};
}

export default FirebaseHandler;
