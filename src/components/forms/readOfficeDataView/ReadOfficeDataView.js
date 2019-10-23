import React from 'react';
import InputMask from 'react-input-mask';
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';
import Office from '../../../models/Office';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

class ReadOfficeDataView extends React.Component {
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
            bairro: "",
            pais: ""

        }
    }

    async componentWillMount() {

        let availableOffices = await new FirebaseHandler().getAllOffices();

        if (this.props.cargo >= 3) {

            this.setState({
                offices: availableOffices
            });

        }
        else {
            let filteredOffices = [];

            for (let index in availableOffices) {

                // Fazendo filtro por CPF...
                // OBS: Tem que ser == e não ===, pois o CPF pode ser null
                if (availableOffices[index].cpf == this.props.cpf) {
                    filteredOffices.push(availableOffices[index]);
                }
            }

            this.setState({
                offices: filteredOffices
            });
        }

    }

    /**
     * Método para limpar os campos do formulário.
     */
    clearForm = () => {
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
     * Método para gerenciar os tipos de oficinas disponíveis para deleção.
     * 
     * Os valores deverão ser em INTEIRO e entre 0 à N elementos disponíveis!
     */
    handleOfficeDropdown = (id) => {

        this.clearForm();

        try {
            this.setState(
                {
                    selectedOfficeID: id,
                    nome: this.state.offices[id].nome,
                    cpf: this.state.offices[id].cpf,
                    telefone: this.state.offices[id].telefone,
                    cep: this.state.offices[id].endereco.CEP,
                    cidade: this.state.offices[id].endereco.cidade,
                    estado: this.state.offices[id].endereco.estado,
                    rua: this.state.offices[id].endereco.rua,
                    numero: this.state.offices[id].endereco.numero,
                    complemento: this.state.offices[id].endereco.complemento,
                    bairro: this.state.offices[id].endereco.bairro,
                    pais: this.state.offices[id].endereco.pais
                }
            );
        } catch (e) { }
    }

    /**
     * Método padrão para renderização.
     */
    render() {

        // Setando os componentes que precisam ser renderizados de acordo com o cargo
        let toRender = []

        // Carregando info de oficinas
        let officesItems = [];

        for (let index = 0; index < this.state.offices.length; index++) {

            officesItems.push(
                <a className="dropdown-item" href="#" onClick={() => this.handleOfficeDropdown(index)}>{this.state.offices[index].nome}</a>
            );
        }


        let selectedOffice = this.state.selectedOfficeID == -1 ? "Selecione uma Oficina" : "Oficina: " + this.state.offices[this.state.selectedOfficeID].nome

        toRender.push(

            <div className="form-group">
                <label>Selecione a Oficina</label>
                <p />
                <button class="btn btn-secondary dropdown-toggle" style={{ width: "100%" }} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {selectedOffice}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {officesItems}
                </div>
            </div>


        )



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

                                <div className="mt-4 form-group">
                                    <label>CPF do Supervisor</label>
                                    <input
                                        type="text"
                                        value={this.state.cpf}
                                        name="cpf"
                                        id="cpf"
                                        placeholder="CPF do Supervisor"
                                        style={{ width: '100%' }}
                                        disabled
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
                                        disabled
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
                                        disabled
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        value={this.state.cidade}
                                        name="cidade"
                                        id="cidade"
                                        placeholder="Cidade"
                                        style={{ width: '40%' }}
                                        disabled
                                    />
                                    <input
                                        type="text"
                                        value={this.state.estado}
                                        name="estado"
                                        id="estado"
                                        className="ml-3"
                                        placeholder="Estado"
                                        style={{ width: '50%' }}
                                        disabled
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        value={this.state.rua}
                                        name="rua"
                                        id="rua"
                                        placeholder="Rua / Estrada / Avenida"
                                        style={{ width: '40%' }}
                                        disabled
                                    />
                                    <input
                                        type="text"
                                        value={this.state.numero}
                                        name="numero"
                                        id="numero"
                                        className="ml-3"
                                        placeholder="Número"
                                        style={{ width: '50%' }}
                                        disabled
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        value={this.state.complemento}
                                        name="complemento"
                                        id="complemento"
                                        placeholder="Complemento"
                                        style={{ width: '40%' }}
                                        disabled
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        value={this.state.bairro}
                                        name="bairro"
                                        id="bairro"
                                        placeholder="Bairro"
                                        style={{ width: '40%' }}
                                        disabled
                                    />
                                </div>

                                <div className="form-group">
                                    <label>País</label>
                                    <input
                                        maxLength="2"
                                        value={this.state.pais}
                                        type="text"
                                        name="pais"
                                        id="pais"
                                        placeholder="País (BR, EU, AS)"
                                        style={{ width: "100%" }}
                                        disabled
                                    />
                                </div>

                                <FullCalendar
                                    defaultView="dayGridMonth"
                                    plugins={[dayGridPlugin]}
                                    events={[
                                        { title: 'event 1', date: '2019-10-01' },
                                        { title: 'event 2', date: '2019-10-02' }
                                    ]}
                                />

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReadOfficeDataView;
