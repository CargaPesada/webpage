import React from 'react';
import InputMask from 'react-input-mask';
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';
import Truck from '../../../models/Truck';

class RegisterTruckView extends React.Component {
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
        document.getElementById('modelo').value = "";
        document.getElementById('placa').value = "";

        document.getElementById('comprimento').value = "";
        document.getElementById('largura').value = "";
        document.getElementById('altura').value = "";
        document.getElementById('cargaMaxima').value = "";
        document.getElementById('pais').value = "";


    }

    /**
     * Método para registrar um novo motorista.
     */
    registerNewTruck = async () => {

        let errorMessages = "";

        let marca = this.state.marca;
        let modelo = document.getElementById('modelo').value;
        let placa = document.getElementById('placa').value;
        let comprimento = document.getElementById('comprimento').value;
        let largura = document.getElementById('largura').value;
        let altura = document.getElementById('altura').value;
        let cargaMaxima = document.getElementById('cargaMaxima').value;
        let pais = document.getElementById('pais').value;

        // Validando o campo nome
        if (marca.length === 0) {
            errorMessages += "\n* Marca não selecionada";
        }

        // Validando o campo CPF
        if (modelo.length === 0) {
            errorMessages += "\n* Modelo não preenchido";
        }

        // Validando o campo Telefone
        if (placa.length < 7 || placa.length > 8) {
            errorMessages += "\n* Placa incorreta";
        }

        // Validando o campo Comprimento
        if (comprimento.length === 0) {
            errorMessages += "\n* Comprimento não preenchido";
        }

        // Validando o campo Largura
        if (largura.length === 0) {
            errorMessages += "\n* Largura não preenchida";
        }

        // Validando a Altura
        if (altura.length === 0) {
            errorMessages += "\n* Altura não preenchida";
        }

        // Validando a Carga Máxima
        if (cargaMaxima.length === 0) {
            errorMessages += "\n* Carga Máxima não preenchida";
        }

        // Validando a Sigla do País
        if (pais.length === 0) {
            errorMessages += "\n* Sigla do País não preenchido";
        }

        // Verificando se existe mensagens de erros a serem exibidas...
        if (errorMessages === "") {

            let newTruck = new Truck(marca, modelo, placa, comprimento, largura,
                altura, cargaMaxima, pais);

            let httpHandler = new FirebaseHandler();
            let registered = await httpHandler.tryToRegisterTruck(newTruck);

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

        let brandName = this.state.marca == "" ? "Marca do Veículo" : this.state.marca;

        let availableBrands = [];

        availableBrands.push(<input type="button" class="dropdown-item" onClick={() => this.handleBrandChange("Volkswagen")} name="marca" value="Volkswagen" />)
        availableBrands.push(<input type="button" class="dropdown-item" onClick={() => this.handleBrandChange("Scania")} name="marca" value="Scania" />);
        availableBrands.push(<input type="button" class="dropdown-item" onClick={() => this.handleBrandChange("Mercedes-Benz")} name="marca" value="Mercedes-Benz" />);
        availableBrands.push(<input type="button" class="dropdown-item" onClick={() => this.handleBrandChange("Iveco")} name="marca" value="Iveco" />);



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
                                    <label>Selecione a Marca *</label>
                                    <p />
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {brandName}
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {availableBrands}
                                    </div>
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Modelo *</label>
                                    <input
                                        type="text"
                                        name="modelo"
                                        id="modelo"
                                        placeholder="Modelo"
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Placa *</label>
                                    <input
                                        maxLength="8"
                                        type="text"
                                        name="placa"
                                        id="placa"
                                        placeholder="Placa"
                                        style={{ width: "100%" }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Comprimento (m)*</label>
                                    <input
                                        type="number"
                                        name="comprimento"
                                        id="comprimento"
                                        placeholder="Comprimento"
                                        style={{ width: "100%" }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Largura (m)*</label>
                                    <input
                                        type="number"
                                        name="largura"
                                        id="largura"
                                        placeholder="Largura"
                                        style={{ width: "100%" }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Altura (m)*</label>
                                    <input
                                        type="number"
                                        name="altura"
                                        id="altura"
                                        placeholder="Altura"
                                        style={{ width: "100%" }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Carga Máxima (kg)*</label>
                                    <input
                                        type="number"
                                        name="cargaMaxima"
                                        id="cargaMaxima"
                                        placeholder="Carga Máxima"
                                        style={{ width: "100%" }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Sigla do País *</label>
                                    <input
                                        maxLength="2"
                                        type="text"
                                        name="pais"
                                        id="pais"
                                        placeholder="Sigla do País"
                                        style={{ width: "100%" }}
                                    />
                                </div>


                                <button
                                    type="button"
                                    className="btn btn-primary mt-5"
                                    style={{ width: '100%' }}
                                    onClick={() => this.registerNewTruck()}
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

export default RegisterTruckView;
