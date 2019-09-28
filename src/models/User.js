import FirebaseHandler from '../utils/firebase/FirebaseHandler';
import EmailValidator from 'email-validator';

//Retorna todas as propriedades obrigatorias do usuario
function userProps() {
	return {
		email: '',
		senha: '',
		nome: '',
		cpf: '',
		sexo: '',
		ddn: '',
		nomepai: '',
		nomemae: '',
		dependentes: '',
		cep: '',
		cidade: '',
		estado: '',
		rua: '',
		complemento: '',
		numero: '',
		bairro: '',
		cargo: '',
		numcnh: ''
	};
}

// Verifica se dois objetos possuem as mesmas chaves
function hasSameKeys(a, b) {
	return Object.keys(a).length === Object.keys(b).length && Object.keys(a).every((k) => b.hasOwnProperty(k));
}

function hasEmptyString(obj) {
	for (let [ key, value ] of Object.entries(obj)) {
		if (value === '') {
			console.log(key);
			return true;
		}
	}

	return false;
}

class User {
	constructor(data) {
		this.data = data;
		this.validateUser();
	}

	// Valida os dados do usuario
	validateUser() {
		let errorMessages = '';

		// Verifica se existem dados ausentes
		if (!hasSameKeys(this.data, userProps()) || hasEmptyString(this.data)) {
			console.log(hasSameKeys(this.data, userProps()));
			console.log(hasEmptyString(this.data));
			errorMessages += '\n-> Você deixou campos em branco\n';
		} else if (!EmailValidator.validate(this.data.email)) {
			errorMessages += '-> Email inválido\n';
		}

		if (errorMessages) {
			throw new Error(errorMessages);
		}
	}

	async sendUserToFirebase() {
		this.validateUser();
		let httpHandler = new FirebaseHandler();
		await httpHandler.tryToRegisterUser(this, (error) => {
			if (error) {
				throw new Error('Estamos com problemas no cadastramento, tente novamente mais tarde.');
			}
		});
	}
}

export { User, userProps };
