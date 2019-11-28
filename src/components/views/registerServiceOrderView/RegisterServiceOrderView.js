import React from 'react';
import InputMask from 'react-input-mask';
import cep from 'cep-promise';
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';

class RegisterServiceOrderView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventos: [{ nome: "Manutenção da roda", placa: "ABC-1234", id: "aadasdas" }],
            eventoSelecionado: { nome: "", index: -1 },
            mecanicos: [],
            mecanicoSelecionado: { nome: "", index: -1 },
            oficinas: [],
            oficinaSelecionada: { nome: "", index: -1 },
            pecas: [],
            servicos: [],
            total: 0
        };
    }

    /*
    * Método padrão do React
    * Esse método irá popular os mecânicos disponíveis inicialmente.
    */
    async componentDidMount() {

        let firebaseHandler = new FirebaseHandler();

        // Carregando os usuários do tipo mecânico
        let users = await firebaseHandler.getAllUsers();
        let mecanicos = [];

        for (let index in users) {
            if (users[index].cargo == "mecanico") {
                mecanicos.push(users[index]);
            }
        }


        // Carregando os eventos das oficinas relacionadas
        let offices = await firebaseHandler.getAllOffices();
        let myOffices = [];

        for (let index in offices) {
            if (offices[index].cpf == this.props.cpf) {
                myOffices.push(offices[index]);
            }
        }

        console.log(myOffices);

        this.setState({
            mecanicos: mecanicos,
            oficinas: myOffices
        });

    }

    /**
     * Método para limpar os campos do formulário.
     */
    clearForm = () => {
        document.getElementById('formulario').reset();
    }

    /*
    * Método para lidar com o dropdown do mecânico.
    */
    mecanicoDropdownHandler = async (index, nome) => {

        this.setState({
            mecanicoSelecionado: {
                nome: nome,
                index: index
            }
        });

    }

    /*
    * Método para lidar com o dropdown da oficina.
    */
    oficinaDropdownHandler = async (index, nome) => {

        this.setState({
            oficinaSelecionada: {
                nome: nome,
                index: index
            }
        });

    }


    eventoDropdownHandler = () => {



    }

    /**
     * Método padrão para renderização.
     */
    render() {

        let mecanicoName = "Selecione um Mecânico";
        let oficinaName = "Selecione uma Oficina";
        let eventoName = "Selecione um Evento";


        if (this.state.mecanicoSelecionado["nome"] !== "") {
            mecanicoName = this.state.mecanicoSelecionado["nome"];
        }

        if (this.state.oficinaSelecionada["nome"] !== "") {
            oficinaName = this.state.oficinaSelecionada["nome"];
        }

        if (this.state.eventoSelecionado["nome"] !== "") {
            eventoName = this.state.eventoSelecionado["nome"];
        }


        let mecanicos = [];
        let oficinas = [];
        let eventos = [];

        for (let index in this.state.mecanicos) {
            mecanicos.push(<input type="button" className="dropdown-item" href="#" name="mecanicoRow"
                onClick={() => this.mecanicoDropdownHandler(index, this.state.mecanicos[index].nome)} value={this.state.mecanicos[index].nome} />)
        }

        for (let index in this.state.oficinas) {
            oficinas.push(<input type="button" className="dropdown-item" href="#" name="oficinaRow"
                onClick={() => this.oficinaDropdownHandler(index, this.state.oficinas[index].nome)} value={this.state.oficinas[index].nome} />)
        }


        // eventos.push(<input type="button" className="dropdown-item" href="#" onClick={this.handleChange} name="eventoRow" value="1" />);
        // eventos.push(<input type="button" className="dropdown-item" href="#" onClick={this.handleChange} name="eventoRow" value="2" />);

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
                            <form id="formulario">
                                <div className="form-group">
                                    <p>
                                        <label>Olá! Para cadastrar uma nova ordem de serviço, você deverá preencher todos os campos obrigatórios (*)!</label>
                                    </p>
                                </div>

                                {/* Dropdown da Oficina */}
                                <div className="mt-5 form-group">
                                    <label>Selecione a Oficina*</label>
                                    <p />
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {oficinaName}
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {oficinas}
                                    </div>
                                </div>

                                {/* Dropdown da Manutenção */}
                                <div className="mt-5 form-group">
                                    <label>Selecione a Manutenção*</label>
                                    <p />
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {eventoName}
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {eventos}
                                    </div>
                                </div>

                                {/* Dropdown do Mecânico */}
                                <div className="mt-5 form-group">
                                    <label>Selecione o Mecânico*</label>
                                    <p />
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {mecanicoName}
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {mecanicos}
                                    </div>
                                </div>

                                <h1 className="display-4 text-center mt-5">Serviços</h1>


                                <h1 className="display-4 text-center mt-5">Itens</h1>

                                <button
                                    type="button"
                                    className="btn btn-primary mt-5"
                                    style={{ width: '100%' }}
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

export default RegisterServiceOrderView;