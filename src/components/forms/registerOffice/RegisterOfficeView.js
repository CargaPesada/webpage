import React from 'react';
import InputMask from 'react-input-mask';
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';
import Office from '../../../models/Office';
import cep from 'cep-promise';

class RegisterOfficeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cidade: '',
            estado: '',
            rua: '',
            complemento: '',
            numero: '',
            bairro: '',
            pais: ''
        }
    }

    /**
     * Método para limpar os campos do formulário.
     */
    clearForm = () => {
        document.getElementById('nome').value = "";
        document.getElementById('cpf').value = "";
        document.getElementById('telefone').value = "";
        document.getElementById('cep').value = "";
        document.getElementById('cidade').value = "";
        document.getElementById('estado').value = "";
        document.getElementById('rua').value = "";
        document.getElementById('complemento').value = "";
        document.getElementById('numero').value = "";
        document.getElementById('bairro').value = "";
        document.getElementById('pais').value = "";

        //this.state.newUserCategory;
    }

    /**
     * Método para registrar um novo motorista.
     */
    registerNewOffice = async () => {

        let errorMessages = "";

        let nome = document.getElementById('nome').value;
        let cpf = document.getElementById('cpf').value;
        let telefone = document.getElementById('telefone').value;
        let cep = document.getElementById('cep').value;
        let cidade = document.getElementById('cidade').value;
        let estado = document.getElementById('estado').value;
        let rua = document.getElementById('rua').value;
        let complemento = document.getElementById('complemento').value;
        let numero = document.getElementById('numero').value;
        let bairro = document.getElementById('bairro').value;
        let pais = document.getElementById('pais').value;

        // Validando o campo nome
        if (nome.length === 0) {
            errorMessages += "\n* Nome não preenchido";
        }

        // Validando o campo CPF
        if (cpf.length === 0) {
            errorMessages += "\n* CPF não preenchido";
        }

        // Validando o campo Telefone
        if (telefone.length !== 14) {
            errorMessages += "\n* Telefone não preenchido ou com formato incorreto";
        }

        // Validando os campos de endereço
        if (cep.length < 9) { // Aceitando 2 casos: 13085-000 ou 13085000
            errorMessages += "\n* CEP inválido";
        }
        else {
            cep = cep.replace('.', ''); // Removendo o ponto 
        }

        if (cidade.length === 0) {
            errorMessages += "\n* Cidade não preenchida";
        }

        if (estado.length === 0) {
            errorMessages += "\n* Estado não preenchido";
        }

        if (rua.length === 0) {
            errorMessages += "\n* Rua não preenchida";
        }

        if (numero.length === 0) {
            errorMessages += "\n* Número não preenchido";
        }

        if (bairro.length === 0) {
            errorMessages += "\n* Bairro não preenchido";
        }

        if (pais.length < 2) {
            errorMessages += "\n* País incorreto";
        }

        // Verificando se existe mensagens de erros a serem exibidas...
        if (errorMessages === "") {

            let newOffice = new Office(nome, cpf, telefone, cep, cidade, estado,
                rua, complemento, numero, bairro, pais);

            let httpHandler = new FirebaseHandler();
            let registered = await httpHandler.tryToRegisterOffice(newOffice);

            if (registered) {
                this.clearForm();
                alert('Registrado com sucesso!');
            } else {
                alert('Erro interno no servidor, contacte um administrador!');
            }

        }
        else {
            alert('Os seguintes campos estão incorretos:\n'.concat(errorMessages));
        }

    }

    handleCEPChange(evt) {
        cep(evt.target.value)
            .then((data) => {
                return data;
            })
            .then((data) => {
                this.setState({ cep: data.cep });
                this.setState({ cidade: data.city });
                this.setState({ estado: data.state });
                this.setState({ bairro: data.neighborhood });
                this.setState({ rua: data.street });
            });
    }

    /**
     * Método padrão para renderização.
     */
    render() {

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
                                        <label>Olá! Para cadastrar uma nova oficina, você deverá preencher todos os campos obrigatórios (*)!</label>
                                    </p>
                                </div>

                                <div className="form-group">
                                    <label>Nome *</label>
                                    <input type="text" id="nome" name="nome" style={{ width: "100%" }} placeholder="Nome"></input>
                                </div>

                                <div className="mt-4 form-group">
                                    <label>CPF do Supervisor *</label>
                                    <InputMask
                                        mask="999.999.999-99"
                                        type="text"
                                        name="cpf"
                                        id="cpf"
                                        placeholder="CPF do Supervisor"
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Telefone *</label>
                                    <InputMask
                                        mask="(99) 9999-9999"
                                        type="text"
                                        name="telefone"
                                        id="telefone"
                                        placeholder="Telefone"
                                        style={{ width: "100%" }}
                                    />
                                </div>

                                <div className="form-group mt-1">
                                    <label>Endereço da Oficina *</label>
                                    <p />
                                    <InputMask
                                        mask="99.999-999"
                                        type="text"
                                        name="cep"
                                        id="cep"
                                        placeholder="CEP"
                                        style={{ width: '40%' }}
                                        onBlur={this.handleCEPChange.bind(this)}
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        name="cidade"
                                        id="cidade"
                                        placeholder="Cidade"
                                        value={this.state.cidade}
                                        style={{ width: '40%' }}
                                        disabled
                                    />
                                    <input
                                        type="text"
                                        name="estado"
                                        id="estado"
                                        className="ml-3"
                                        placeholder="Estado"
                                        style={{ width: '50%' }}
                                        value={this.state.estado}
                                        disabled
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        name="rua"
                                        id="rua"
                                        placeholder="Rua"
                                        style={{ width: '40%' }}
                                        value={this.state.rua}
                                        disabled
                                    />
                                    <input
                                        type="text"
                                        name="numero"
                                        id="numero"
                                        className="ml-3"
                                        placeholder="Número"
                                        style={{ width: '50%' }}
                                        onChange={this.handleChange}
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        name="complemento"
                                        id="complemento"
                                        placeholder="Complemento"
                                        style={{ width: '40%' }}
                                        onChange={this.handleChange}
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        name="bairro"
                                        id="bairro"
                                        placeholder="Bairro"
                                        style={{ width: '40%' }}
                                        value={this.state.bairro}
                                        disabled
                                    />
                                </div>

                                <div className="form-group">
                                    <label>País *</label>
                                    <input
                                        maxLength="2"
                                        type="text"
                                        name="pais"
                                        id="pais"
                                        placeholder="País (BR, EU, AS)"
                                        style={{ width: "100%" }}
                                    />
                                </div>


                                <button
                                    type="button"
                                    className="btn btn-primary mt-5"
                                    style={{ width: '100%' }}
                                    onClick={() => this.registerNewOffice()}
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

export default RegisterOfficeView;
