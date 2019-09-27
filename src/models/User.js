import FirebaseHandler from '../utils/firebase/FirebaseHandler';

class User {
	constructor(data) {
		this.data = data;
		this.isUserValid();
	}

	isUserValid() {
		let errorMessages = '';

		// Validando o campo de e-mail
		if (this.data.email === '' || /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.data.email) === false) {
			errorMessages += '\n* E-Mail não está no padrão';
		}

		// Validando o campo de senha
		if (this.data.senha.length < 6) {
			errorMessages += '\n* Senha menor que 6 caracteres';
		}

		// Validando o campo nome
		if (this.data.nome.length === 0) {
			errorMessages += '\n* Nome não preenchido';
		}

		// Validando o campo CPF
		if (this.data.cpf.length === 0) {
			errorMessages += '\n* CPF não preenchido';
		}

		// Validando o campo DDN
		if (this.data.ddn.length === 0) {
			errorMessages += '\n* DDN não preenchido';
		}

		// Validando o campo nome da mãe
		if (this.data.nomemae.length === 0) {
			errorMessages += '\n* Nome da mãe não preenchido';
		}

		// Validando os campos de endereço
		if (this.data.cep.length < 9) {
			// Aceitando 2 casos: 13085-000 ou 13085000
			errorMessages += '\n* CEP inválido';
		}

		if (this.data.cidade.length === 0) {
			errorMessages += '\n* Cidade não preenchida';
		}

		if (this.data.estado.length === 0) {
			errorMessages += '\n* Estado não preenchido';
		}

		if (this.data.rua.length === 0) {
			errorMessages += '\n* Rua não preenchida';
		}

		if (this.data.numero.length === 0) {
			errorMessages += '\n* Número não preenchido';
		}

		if (this.data.bairro.length === 0) {
			errorMessages += '\n* Bairro não preenchido';
		}

		// Verificando se existe mensagens de erros a serem exibidas...
		if (errorMessages) {
			throw new Error(errorMessages);
		}
	}

	async sendUserToFirebase() {
		this.isUserValid();
		let httpHandler = new FirebaseHandler();
		await httpHandler.tryToRegisterUser(this, (error) => {
			if (error) {
				throw new Error('Estamos com problemas no cadastramento, tente novamente mais tarde.');
			}
		});
	}
}

export default User;
