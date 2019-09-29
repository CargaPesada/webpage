import React from 'react';
import InputMask from 'react-input-mask';
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';
import Office from '../../../models/Office';

class ReadOfficeData extends React.Component {
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
                                    <label>Nome</label>
                                    <input type="text" value={this.state.nome} id="nome" name="nome" style={{ width: "100%" }} placeholder="Nome" readOnly />

                                </div>

                                <div className="mt-4 form-group">
                                    <label>CPF do Supervisor</label>
                                    <input
                                        type="text"
                                        value={this.state.cpf}
                                        name="cpf"
                                        id="cpf"
                                        placeholder="CPF do Supervisor"
                                        style={{ width: '100%' }}
                                        readOnly
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Telefone</label>
                                    <input
                                        type="text"
                                        value={this.state.telefone}
                                        name="telefone"
                                        id="telefone"
                                        placeholder="Telefone"
                                        style={{ width: "100%" }}
                                        readOnly
                                    />
                                </div>

                                <div className="form-group mt-1">
                                    <label>Endereço da Oficina</label>
                                    <p />
                                    <input
                                        type="text"
                                        value={this.state.cep}
                                        name="cep"
                                        id="cep"
                                        placeholder="CEP"
                                        style={{ width: '40%' }}
                                        readOnly
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        value={this.state.cidade}
                                        name="cidade"
                                        id="cidade"
                                        placeholder="Cidade"
                                        style={{ width: '40%' }}
                                        readOnly
                                    />
                                    <input
                                        type="text"
                                        value={this.state.estado}
                                        name="estado"
                                        id="estado"
                                        className="ml-3"
                                        placeholder="Estado"
                                        style={{ width: '50%' }}
                                        readOnly
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        value={this.state.rua}
                                        name="rua"
                                        id="rua"
                                        placeholder="Rua / Estrada / Avenida"
                                        style={{ width: '40%' }}
                                        readOnly
                                    />
                                    <input
                                        type="text"
                                        value={this.state.numero}
                                        name="numero"
                                        id="numero"
                                        className="ml-3"
                                        placeholder="Número"
                                        style={{ width: '50%' }}
                                        readOnly
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        value={this.state.complemento}
                                        name="complemento"
                                        id="complemento"
                                        placeholder="Complemento"
                                        style={{ width: '40%' }}
                                        readOnly
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        value={this.state.bairro}
                                        name="bairro"
                                        id="bairro"
                                        placeholder="Bairro"
                                        style={{ width: '40%' }}
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

export default ReadOfficeData;
