import React from 'react';
import InputMask from 'react-input-mask';
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';

class DeleteTruckView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTruckID: -1,
            trucks: [],
            marca: "",
            modelo: "",
            comprimento: "",
            largura: "",
            altura: "",
            cargaMaxima: "",
            pais: ""
        }

    }

    async componentWillMount() {

        let availableTrucks = await new FirebaseHandler().getAllTrucks();

        this.setState({
            trucks: availableTrucks
        });

    }

    /**
     * Método para limpar o formulário.
     */
    clearForm = () => {
        document.getElementById('marca').value = "";
        document.getElementById('modelo').value = "";
        document.getElementById('comprimento').value = "";
        document.getElementById('largura').value = "";
        document.getElementById('altura').value = "";
        document.getElementById('cargaMaxima').value = "";
        document.getElementById('pais').value = "";
    }

    /**
     * Método para gerenciar os tipos de oficinas disponíveis para deleção.
     * 
     * Os valores deverão ser em INTEIRO e entre 0 à N elementos disponíveis!
     */
    handleTruckDropdown = (id) => {

        this.clearForm();

        try {
            this.setState(
                {
                    selectedTruckID: id,
                    marca: this.state.trucks[id].marca,
                    modelo: this.state.trucks[id].modelo,
                    comprimento: this.state.trucks[id].comprimento,
                    largura: this.state.trucks[id].largura,
                    altura: this.state.trucks[id].altura,
                    cargaMaxima: this.state.trucks[id].cargaMaxima,
                    pais: this.state.trucks[id].pais

                }
            );
        }
        catch (e) {
            alert("Erro! Foi detectado um caminhão com informação corrompida no sistema! Contacte um administrador!");
            console.log("Aviso! Foi detectado um caminhão não dentro do padrão!");
        }
    }

    /**
     * Método para deletar uma certa oficina (pelo seu ID).
     * 
     * Lembrando que o ID não será passado como parâmetro,
     * pois o ID está no State da classe.
     */
    deleteCertainTruck = async () => {

        if (this.state.selectedTruckID !== -1) {
            let res = await new FirebaseHandler().deleteCertainTruck(this.state.trucks[this.state.selectedTruckID].id);

            if (res === true) {
                alert("Veículo removido do sistema com sucesso!");
                this.props.handleCard(false); // GAMBIARRA
            }
            else {
                alert("Erro interno no servidor ao deletar um veículo!");
            }
        }
        else {
            alert("Selecione um veículo primeiramente!");
        }
    }

    /**
     * Método padrão para renderização.
     */
    render() {

        let truckItems = [];

        for (let index = 0; index < this.state.trucks.length; index++) {

            truckItems.push(
                <a class="dropdown-item" href="#" onClick={() => this.handleTruckDropdown(index)}>{this.state.trucks[index].placa}</a>
            );
        }


        let selectedTruck = this.state.selectedTruckID == -1 ? "Placa" : "Placa: " + this.state.trucks[this.state.selectedTruckID].placa

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
                                    <label>Selecione um veículo *</label>
                                    <p />
                                    <button class="btn btn-secondary dropdown-toggle" style={{ width: "100%" }} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {selectedTruck}
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {truckItems}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Marca </label>
                                    <input
                                        type="text"
                                        value={this.state.marca}
                                        id="marca"
                                        name="marca"
                                        style={{ width: "100%" }}
                                        placeholder="Marca"
                                        disabled
                                    />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Modelo </label>
                                    <input
                                        type="text"
                                        value={this.state.modelo}
                                        name="modelo"
                                        id="modelo"
                                        placeholder="Modelo"
                                        style={{ width: '100%' }}
                                        disabled
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Comprimento (m)</label>
                                    <input
                                        type="number"
                                        value={this.state.comprimento}
                                        name="comprimento"
                                        id="comprimento"
                                        placeholder="Comprimento"
                                        style={{ width: "100%" }}
                                        disabled
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Largura (m)</label>
                                    <input
                                        type="number"
                                        value={this.state.largura}
                                        name="largura"
                                        id="largura"
                                        placeholder="Largura"
                                        style={{ width: "100%" }}
                                        disabled
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Altura (m)</label>
                                    <input
                                        type="number"
                                        value={this.state.altura}
                                        name="altura"
                                        id="altura"
                                        placeholder="Altura"
                                        style={{ width: "100%" }}
                                        disabled
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Carga Máxima (kg)</label>
                                    <input
                                        type="number"
                                        value={this.state.cargaMaxima}
                                        name="cargaMaxima"
                                        id="cargaMaxima"
                                        placeholder="Carga Máxima"
                                        style={{ width: "100%" }}
                                        disabled
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Sigla do País </label>
                                    <input
                                        maxLength="2"
                                        value={this.state.pais}
                                        type="text"
                                        name="pais"
                                        id="pais"
                                        placeholder="Sigla do País"
                                        style={{ width: "100%" }}
                                        disabled
                                    />
                                </div>


                                <button
                                    type="button"
                                    className="btn btn-primary mt-5"
                                    style={{ width: '100%' }}
                                    onClick={() => this.deleteCertainTruck()}
                                >
                                    Deletar
								</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteTruckView;
