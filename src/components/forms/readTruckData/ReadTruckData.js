import React from 'react';
import InputMask from 'react-input-mask';
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';
import Office from '../../../models/Office';

class ReadTruckData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOfficeID: -1,
            offices: [],
            nome: "",
            cpf: "",
            telefone: "",

            // Endereços
            cep: "",
            cidade: "",
            estado: "",
            rua: "",
            complemento: "",
            numero: "",
            bairro: ""

        }
    }

    async componentWillMount() {
        let availableOffices = await new FirebaseHandler().getAllOffices();

        this.setState({
            offices: availableOffices
        });
    }

    /**
     * Método para gerenciar os tipos de oficinas disponíveis para deleção.
     * 
     * Os valores deverão ser em INTEIRO e entre 0 à N elementos disponíveis!
     */
    handleOfficeDropdown = (id) => {
        this.setState(
            { 
                selectedOfficeID: id,
                nome: this.state.offices[id].nome,
                cpf: this.state.offices[id].cpf,
                telefone: this.state.offices[id].telefone,
                cep: this.state.offices[id].cep,
                cidade: this.state.offices[id].cidade,
                estado: this.state.offices[id].estado,
                rua: this.state.offices[id].rua,
                numero: this.state.offices[id].numero,
                complemento: this.state.offices[id].complemento,
                bairro: this.state.offices[id].bairro
            }
        );
    }

    /**
     * Método padrão para renderização.
     */
    render() {

        // Setando os componentes que precisam ser renderizados de acordo com o cargo
        let toRender = []

        if (this.props.cargo >= 3) {

            // Carregando info de oficinas
            let officesItems = [];

            for (let index = 0; index < this.state.offices.length; index++) {

                officesItems.push(
                    <a class="dropdown-item" href="#" onClick={() => this.handleOfficeDropdown(index)}>{this.state.offices[index][1]}</a>
                );
            }


            let selectedOffice = this.state.selectedOfficeID == -1 ? "Selecione uma Oficina" : this.state.offices[this.state.selectedOfficeID][1]

            toRender.push(

                <div className="form-group">
                    <label>Selecione a Oficina</label>
                    <p />
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {selectedOffice}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {officesItems}
                    </div>
                </div>


            )
        }


        // Renderizando agora!!!
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


                                {toRender}

                                <div className="form-group">
                                    <label>Marca </label>
                                    <input type="text" id="marca" name="marca" style={{ width: "100%" }} placeholder="Marca" readOnly />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Modelo </label>
                                    <input
                                        type="text"
                                        name="modelo"
                                        id="modelo"
                                        placeholder="Modelo"
                                        style={{ width: '100%' }}
                                        readOnly
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Placa </label>
                                    <input
                                        maxLength="8"
                                        type="text"
                                        name="placa"
                                        id="placa"
                                        placeholder="Placa"
                                        style={{ width: "100%" }}
                                        readOnly
                                    />
                                </div>
        
                                <div className="form-group">
                                    <label>Comprimento (m)</label>
                                    <input
                                        type="number"
                                        name="comprimento"
                                        id="comprimento"
                                        placeholder="Comprimento"
                                        style={{ width: "100%" }}
                                        readOnly
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Largura (m)</label>
                                    <input
                                        type="number"
                                        name="largura"
                                        id="largura"
                                        placeholder="Largura"
                                        style={{ width: "100%" }}
                                        readOnly
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Altura (m)</label>
                                    <input
                                        type="number"
                                        name="altura"
                                        id="altura"
                                        placeholder="Altura"
                                        style={{ width: "100%" }}
                                        readOnly
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Carga Máxima (kg)</label>
                                    <input
                                        type="number"
                                        name="cargaMaxima"
                                        id="cargaMaxima"
                                        placeholder="Carga Máxima"
                                        style={{ width: "100%" }}
                                        readOnly
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Sigla do País </label>
                                    <input
                                        maxLength="2"
                                        type="text"
                                        name="pais"
                                        id="pais"
                                        placeholder="Sigla do País"
                                        style={{ width: "100%" }}
                                        readOnly
                                    />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReadTruckData;
