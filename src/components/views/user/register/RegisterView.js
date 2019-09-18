import React from 'react';
import InputMask from 'react-input-mask';
import FirebaseHandler from '../../../../utils/firebase/FirebaseHandler';
import User from '../../../../models/User';
import { error } from 'util';

class RegisterView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userSexRadioValue: 'masculino',
            areThereDependents: false,
            curUserCategory: 4, // 0 - Motorista; 1 - Mecânico; 2 - Supervisor; 3 - Gerente; 4 - Diretor
            newUserCategory: -1
        };
    }

	/**
     * Método para registrar um novo motorista.
     */
    registerNewUser = async () => {

        if (this.state.newUserCategory != -1) {

            let errorMessages = "";

            let email = document.getElementById('email').value;
            let senha = document.getElementById('senha').value;
            let nome = document.getElementById('nome').value;
            let cpf = document.getElementById('cpf').value;
            let tipocnh = "";
            if (document.getElementById('tipocnh') != null) {
                tipocnh = document.getElementById('tipocnh').value;
            }
            let sexo = this.state.userSexRadioValue;
            let ddn = document.getElementById('ddn').value;
            let nomepai = document.getElementById('nomepai').value;
            let nomemae = document.getElementById('nomemae').value;
            let dependentes = this.state.areThereDependents;
            let endereco = {
                cep: document.getElementById('cep').value,
                cidade: document.getElementById('cidade').value,
                estado: document.getElementById('estado').value,
                rua: document.getElementById('rua').value,
                complemento: document.getElementById('complemento').value,
                numero: document.getElementById('numero').value,
                bairro: document.getElementById('bairro').value
            };
            let nivelacesso = this.state.newUserCategory;


            // Validando o campo de e-mail
            if (email === "" || /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) == false) {
                errorMessages += "\n* E-Mail não está no padrão";
            }

            // Validando o campo de senha
            if (senha.length < 6) {
                errorMessages += "\n* Senha menor que 6 caracteres";
            }

            // Validando o campo nome
            if (nome.length === 0) {
                errorMessages += "\n* Nome não preenchido";
            }

            // Validando o campo CPF
            if (cpf.length === 0) {
                errorMessages += "\n* CPF não preenchido";
            }

            // Validando o campo CNH
            if (this.state.newUserCategory == 0) {
                if (tipocnh.length === 0) {
                    errorMessages += "\n* CNH não preenchido";
                }
                else {
                    // valida_cnh(tipocnh);
                    // <script>
                    //     function valida_cnh(tipocnh) {
                    //         var dv = substring (tipocnh, 9, 2);
                    //         var dvr = ( (2 * substring (tipocnh, 1, 1) ) + (3 * substring (tipocnh, 2, 1) ) + (4 * substring (tipocnh, 3, 1) )
                    //                   + (5 * substring (tipocnh, 4, 1) ) + (6 * substring (tipocnh, 5, 1) ) + (7 * substring (tipocnh, 6, 1) )
                    //                   + (8 * substring (tipocnh, 7, 1) ) + (9 * substring (tipocnh, 8, 1) ) )
                    //                   % (11);
                    //         if (dv == dvr)
                    //             return true;
                    //         else
                    //             return false;
                    //     }
                    // </script>
                }
            }

            // Validando o campo DDN
            if (ddn.length === 0) {
                errorMessages += "\n* DDN não preenchido";
            }

            // Validando o campo nome da mãe
            if (nomemae.length === 0) {
                errorMessages += "\n* Nome da mãe não preenchido";
            }

            // Validando os campos de endereço
            if (endereco['cep'].length < 9) { // Aceitando 2 casos: 13085-000 ou 13085000
                errorMessages += "\n* CEP inválido";
            }

            if (endereco['cidade'].length === 0) {
                errorMessages += "\n* Cidade não preenchida";
            }

            if (endereco['estado'].length === 0) {
                errorMessages += "\n* Estado não preenchido";
            }

            if (endereco['rua'].length === 0) {
                errorMessages += "\n* Rua não preenchida";
            }

            if (endereco['numero'].length === 0) {
                errorMessages += "\n* Número não preenchido";
            }

            if (endereco['bairro'].length === 0) {
                errorMessages += "\n* Bairro não preenchido";
            }

            // Verificando se existe mensagens de erros a serem exibidas...
            if (errorMessages === "") {

                let newUser = new User(email, senha, nome, cpf, tipocnh, sexo, ddn, nomepai, nomemae,
                    dependentes, endereco, nivelacesso);

                let httpHandler = new FirebaseHandler();
                await httpHandler.tryToRegister(newUser, (error) => {
                    if (!error) {
                        alert('Registrado com sucesso!');
                    } else {
                        alert(error.message);
                    }
                });
            }
            else {
                alert('Os seguintes campos estão incorretos:\n'.concat(errorMessages));
            }
        }
        else {
            alert('Selecione um cargo primeiro!');
        }
    };

	/**
     * Método para gerenciar os radios buttons de sexo da pessoa.
     */
    handleSexoDoUsuarioRadioButton = (gender) => {
        this.setState({ genderRadioValue: gender });
    };

	/**
     * Método para gerenciar os radios buttons de dependentes da pessoas.
     */
    handleDependentsRadioButton = (doesHave) => {
        this.setState({ areThereDependents: doesHave });
    };

    /**
     * Método para gerenciar os tipos de cargos disponíveis para um novo
     * usuário.
     * 
     * Os valores deverão ser em INTEIRO e entre 0 à 4!
     */
    handleCargoDropdown = (cargo) => {
        this.setState({ newUserCategory: cargo });
    }

    /**
     * Método padrão para renderização.
     */
    render() {

        let cargoName = "Tipo de Cargo";

        switch (this.state.newUserCategory) {
            case 0:
                cargoName = "Motorista";
                break;
            case 1:
                cargoName = "Mecânico";
                break;
            case 2:
                cargoName = "Supervisor";
                break;
            case 3:
                cargoName = "Gerente Regional";
                break;
            case 4:
                cargoName = "Diretor Global";
        }


        let toRender = [];
        let cargosToShow = [];

        if (this.props.cargo >= 3) {
            cargosToShow.push(<a class="dropdown-item" onClick={() => this.handleCargoDropdown(2)} href="#">Supervisor</a>);
        }

        if (this.props.cargo == 4) {
            cargosToShow.push(<a class="dropdown-item" onClick={() => this.handleCargoDropdown(4)} href="#">Diretor Global</a>);
        }


        if (this.state.newUserCategory == 0) {
            toRender.push(
                <div className="mt-4 form-group">
                    <label>Tipo de CNH *</label>
                    <InputMask
                        mask="99999999999"
                        type="text"
                        name="tipocnh"
                        id="tipocnh"
                        placeholder="Tipo da CNH"
                        style={{ width: '100%' }}
                    />
                </div>
            );
        }


        return (
            <div
                className="card bg-white"
                style={{ marginTop: '5%', marginLeft: '0%', marginRight: '0%', paddingBottom: '3vh' }}
            >
                <a href="#" className="text-dark text-right" onClick={() => this.props.handleCard(false)}>
                    <i class="fas fa-2x fa-times-circle" />
                </a>
                <div className="ml-1 row d-flex justify-content-center" style={{ width: '100%', height: '100%' }}>
                    {/* Coluna principal (a do meio) */}
                    <div className="col-sm-5">
                        <h1 className="display-4 text-center">{this.props.description}</h1>
                        <div className="mt-3 justify-content-center" style={{ width: '100%' }}>
                            <form>
                                <div className="form-group">
                                    <p>
                                        <label>Olá! Para cadastrar um novo usuário, você deverá preencher todos os campos obrigatórios (*)!</label>
                                    </p>
                                </div>
                                <div className="form-group">
                                    <label>E-Mail *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="E-Mail"
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Senha *</label>
                                    <input
                                        type="password"
                                        name="senha"
                                        id="senha"
                                        placeholder="Senha"
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Nome *</label>
                                    <input
                                        type="text"
                                        name="nome"
                                        id="nome"
                                        placeholder="Nome"
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>CPF *</label>
                                    <InputMask
                                        mask="999.999.999-99"
                                        type="text"
                                        name="cpf"
                                        id="cpf"
                                        placeholder="CPF"
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Sexo do Usuário *</label>

                                    <div className="d-flex row justify-content-between ml-1" style={{ width: '60%' }}>
                                        <label>
                                            <input
                                                type="radio"
                                                value="masculino"
                                                onClick={() => this.handleSexoDoUsuarioRadioButton('masculino')}
                                                checked={this.state.userSexRadioValue === 'masculino'}
                                            />
                                            Masculino
										</label>
                                        <label>
                                            <input
                                                type="radio"
                                                value="feminino"
                                                onClick={() => this.handleSexoDoUsuarioRadioButton('feminino')}
                                                checked={this.state.userSexRadioValue === 'feminino'}
                                            />
                                            Feminino
										</label>
                                    </div>
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Data de Nascimento *</label>
                                    <InputMask
                                        mask="99/99/9999"
                                        type="text"
                                        name="ddn"
                                        id="ddn"
                                        placeholder="Data de Nascimento"
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Nome do Pai</label>
                                    <input
                                        type="text"
                                        name="nomepai"
                                        id="nomepai"
                                        placeholder="Nome do Pai"
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Nome da Mãe *</label>
                                    <input
                                        type="text"
                                        name="nomemae"
                                        id="nomemae"
                                        placeholder="Nome da Mãe"
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Tem dependentes *</label>

                                    <div className="d-flex row justify-content-between ml-1" style={{ width: '60%' }}>
                                        <label>
                                            <input
                                                type="radio"
                                                value="sim"
                                                onClick={() => this.handleDependentsRadioButton(true)}
                                                checked={this.state.areThereDependents === true}
                                            />
                                            Sim
										</label>
                                        <label>
                                            <input
                                                type="radio"
                                                value="nao"
                                                onClick={() => this.handleDependentsRadioButton(false)}
                                                checked={this.state.areThereDependents === false}
                                            />
                                            Não
										</label>
                                    </div>
                                </div>

                                <div className="form-group mt-1">
                                    <label>Endereço de Moradia *</label>
                                    <p />
                                    <InputMask
                                        mask="99.999-999"
                                        type="text"
                                        name="cep"
                                        id="cep"
                                        placeholder="CEP"
                                        style={{ width: '40%' }}
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        name="cidade"
                                        id="cidade"
                                        placeholder="Cidade"
                                        style={{ width: '40%' }}
                                    />
                                    <input
                                        type="text"
                                        name="estado"
                                        id="estado"
                                        className="ml-3"
                                        placeholder="Estado"
                                        style={{ width: '50%' }}
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        name="rua"
                                        id="rua"
                                        placeholder="Rua / Estrada / Avenida"
                                        style={{ width: '40%' }}
                                    />
                                    <input
                                        type="text"
                                        name="complemento"
                                        id="complemento"
                                        className="ml-3"
                                        placeholder="Complemento"
                                        style={{ width: '50%' }}
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        name="numero"
                                        id="numero"
                                        placeholder="Número"
                                        style={{ width: '40%' }}
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        name="bairro"
                                        id="bairro"
                                        placeholder="Bairro"
                                        style={{ width: '40%' }}
                                    />
                                </div>

                                <div className="mt-5">
                                    <h1 className="display-4 text-center">Dados sobre o cargo</h1>
                                </div>

                                <div className="mt-5 form-group">
                                    <label>Selecione o Cargo *</label>
                                    <p />
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {cargoName}
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" onClick={() => this.handleCargoDropdown(0)} href="#">Motorista</a>
                                        {cargosToShow}
                                    </div>
                                </div>



                                {toRender}

                                <button
                                    type="button"
                                    className="btn btn-primary mt-5"
                                    style={{ width: '100%' }}
                                    onClick={() => this.registerNewUser()}
                                >
                                    Cadastrar
								</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterView;
