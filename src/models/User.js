class User {
	constructor(email, senha, nome, cpf, tipocnh, sexo, ddn, nomepai, nomemae,
		dependentes, endereco, nivelacesso) {
		this.email = email;
		this.senha = senha;
		this.nome = nome;
		this.cpf = cpf;
		this.tipocnh = tipocnh;
		this.sexo = sexo;
		this.ddn = ddn;
		this.nomepai = nomepai;
		this.nomemae = nomemae;
		this.dependentes = dependentes;
		this.endereco = endereco;
		this.nivelacesso = nivelacesso;
	}
}

export default User;
