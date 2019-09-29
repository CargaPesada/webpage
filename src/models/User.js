import FirebaseHandler from '../utils/firebase/FirebaseHandler';
import EmailValidator from 'email-validator';
import PasswordValidator from 'password-validator';
import CPF from 'cpf-check';
import cep from 'cep-promise';

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

function isEmailValid(email) {
	return EmailValidator.validate(email);
}

function isPasswordValid(password) {
	let schema = new PasswordValidator();
	schema
		.is()
		.min(8) // Tamanho minimo 8
		.is()
		.max(50) // Tamanho maximo 50
		.has()
		.uppercase() // Deve conter letras maiusculas
		.has()
		.lowercase() // Deve conter letras minusculas
		.has()
		.not()
		.spaces(); // Nao pode conter espacos

	// Validate against a password string
	return schema.validate(password);
}

function isNameValid(name) {
	var regex = /^[a-zA-Z ]{2,30}$/;
	return regex.test(name);
}

function isCPFValid(cpf) {
	return CPF.validate(cpf);
}

function isGenderValid(gender) {
	return gender === 'm' || gender === 'f';
}

function isDateOfBirthValid(dat) {
	let date = new Date(dat);
	return date.getFullYear() > 1910 && date.getFullYear() < 2001;
}

function isComplementoValid(complemento) {
	var regex = /^[a-zA-Z ]{2,30}$/;
	return regex.test(complemento);
}

function isNumberValid(number) {
	var regex = /^\d+$/;
	return regex.test(number);
}

class User {
	constructor(data) {
		this.data = data;
	}

	// Valida os dados do usuario
	validateAndSaveUser = () => {
		const data = this.data;
		const sendToFirebase = this.sendUserToFirebase;
		return new Promise((resolve, reject) => {
			let errorMessages = '\n';

			console.log(data.email);
			if (!isEmailValid(this.data.email)) {
				errorMessages += '-> Email inválido\n';
			}
			if (!isPasswordValid(data.senha)) {
				errorMessages +=
					'-> Senha inválida (Tamanho mínimo 8, máximo 50, conter maiúsculas e minúsculas, sem espaço)\n';
			}
			if (!isNameValid(data.nome)) {
				errorMessages += '-> Nome inválido\n';
			}
			if (!isCPFValid(data.cpf)) {
				errorMessages += '-> CPF inválido\n';
			}
			if (!isGenderValid(data.sexo)) {
				errorMessages += '-> Gênero inválido\n';
			}
			if (!isDateOfBirthValid(data.ddn)) {
				errorMessages += '-> Data de nascimento inválida\n';
			}
			if (!isNameValid(data.nomepai)) {
				errorMessages += '-> Nome do pai inválido\n';
			}
			if (!isNameValid(data.nomemae)) {
				errorMessages += '-> Nome da mãe inválido\n';
			}
			if (!isComplementoValid(data.complemento)) {
				errorMessages += '-> Complemento inválido\n';
			}
			if (!isNumberValid(data.numero)) {
				errorMessages += '-> Número inválido\n';
			}
			// TODO validar CNH
			data.cnh = '123';

			console.log(data);
			cep(data.cep)
				.then((data) => {
					if (errorMessages !== '\n') {
						reject(errorMessages);
					} else {
						sendToFirebase().then((message) => resolve(message)).catch((message) => reject(message));
					}
				})
				.catch((data) => {
					errorMessages += '-> CEP inválido\n';
					reject(errorMessages);
				});
		});
	};

	sendUserToFirebase = () => {
		const data = this.data;
		return new Promise((resolve, reject) => {
			let httpHandler = new FirebaseHandler();
			httpHandler.tryToRegisterUser(data, (error) => {
				if (error) {
					reject(error.message);
				} else {
					console.log('Cadastrado com sucesso.');
					resolve('Cadastrado com sucesso.');
				}
			});
		});
	};
}

export { User, userProps };
