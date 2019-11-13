import React from 'react';
import InputMask from 'react-input-mask';
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';
import ServiceAndTool from '../../../models/ServiceAndTool';

class RegisterServiceAndToolView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            marca: ""
        }
    }

    /**
     * Método para limpar os campos do formulário.
     */
    clearForm = () => {
        document.getElementById('nome').value = "";
        document.getElementById('preco').value = "";
        }

    /**
     * Método para registrar um novo motorista.
     */
    registerNewServiceAndTool = async () => {

        let errorMessages = "";

        let marca = this.state.marca;
        let nome = document.getElementById('nome').value;
        let preco = document.getElementById('preco').value;

        // Validando o campo nome
        if (nome.length === 0) {
            errorMessages += "\n* Nome não selecionada";
        }

        // Validando o campo preco
        if (preco.length === 0) {
            errorMessages += "\n* Preco não preenchido";
        }

        // Verificando se existe mensagens de erros a serem exibidas...
        if (errorMessages === "") {

            let newServiceAndTool = new ServiceAndTool(nome, preco);

            let httpHandler = new FirebaseHandler();
            let registered = await httpHandler.tryToRegisterServiceAndTool(newServiceAndTool);

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

    handleBrandChange(name) {
        this.setState({
            marca: name
        })
    }


    /**
     * Método padrão para renderização.
     */
    render() {
        return (
            <div
                className="card bg-white"
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
                                        <label>Olá! Para cadastrar um novo Serviço / Peça, você deverá preencher todos os campos obrigatórios (*)!</label>
                                    </p>
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

                                <div className="form-group">
                                    <label>Preço *</label>
                                    <input
                                        maxLength="8"
                                        type="text"
                                        name="preco"
                                        id="preco"
                                        placeholder="Preço"
                                        style={{ width: "100%" }}
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-primary mt-5"
                                    style={{ width: '100%' }}
                                    onClick={() => this.registerNewServiceAndTool()}
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

export default RegisterServiceAndToolView;
