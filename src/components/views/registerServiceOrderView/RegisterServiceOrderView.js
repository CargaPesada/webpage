import React from 'react';
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';

class RegisterServiceOrderView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventos: [{ nome: "Manutenção da roda", placa: "ABC-1234", id: "aadasdas" }],
            eventoSelecionado: { titulo: "", index: -1 },

            mecanicoSelecionado: { nome: "" },

            oficinas: [],
            oficinaSelecionada: { nome: "", index: -1 },

            servicos: [],
            servicosAdicionados: [],
            servicosTableRows: [],

            pecas: [],
            pecasAdicionadas: [],
            pecasTableRows: [],

            total: 0
        };
    }

    /*
    * Método padrão do React
    * Esse método irá popular os mecânicos disponíveis inicialmente.
    */
    async componentDidMount() {

        let firebaseHandler = new FirebaseHandler();

        // Carregando os eventos das oficinas relacionadas
        let offices = await firebaseHandler.getAllOffices();
        let myOffices = [];

        for (let index in offices) {
            if (offices[index].cpf == this.props.cpf) {
                myOffices.push(offices[index]);
            }
        }


        // Carregando os serviços
        let services = await firebaseHandler.getAllServices();

        // Carregando os itens (ferramentas, materiais...)
        let pecas = await firebaseHandler.getAllTools();


        // Adicionando ao estado da View os elementos carregados
        this.setState({
            oficinas: myOffices,
            servicos: services,
            pecas: pecas
        });

    }



    /**
     * Método para limpar os campos do formulário.
     */
    clearForm = () => {
        document.getElementById('formulario').reset();
    }


    /*
    * Método para lidar com o dropdown da oficina.
    * Ao dropdown ser clicado, os eventos relacionados a essa oficina será populado.
    */
    oficinaDropdownHandler = async (e, index) => {

        e.preventDefault();

        let eventos = [];

        if (this.state.oficinas[index].agenda != null && this.state.oficinas[index].agenda.length > 0) {

            for (let i in this.state.oficinas[index].agenda) {
                eventos.push(this.state.oficinas[index].agenda[i]);
            }

        }
        else {
            alert("Não foi detectado nenhum evento")
        }

        this.setState({
            oficinaSelecionada: {
                nome: this.state.oficinas[index].nome,
                index: index
            },
            eventos: eventos
        });

    }



    /*
    * Método para lidar com o dropdown do evento.
    * Ao dropdown ser clicado, o Firebase irá verificar se não já existe uma Ordem de Serviço
    * pré-existente.
    */
    eventoDropdownHandler = async (e, index) => {

        e.preventDefault();

        this.setState({
            eventoSelecionado: {
                titulo: this.state.eventos[index].titulo,
                index: index
            },
            mecanicoSelecionado: {
                nome: this.state.eventos[index].mecanico.nome
            },
        })


    }



    /*
    * Método para lidar com o dropdown do serviço.
    * Ao dropdown ser clicado, o item selecionado será adicionado a tabela "carrinho".
    */
    servicoDropdownHandler = async (e, index, nome) => {

        e.preventDefault();

        let servicosAdicionados = this.state.servicosAdicionados;

        for (let i in servicosAdicionados) {
            if (servicosAdicionados[i].nome == nome) {
                return;
            }
        }

        // Adicionando um objeto novo
        servicosAdicionados.push(this.state.servicos[index]);

        // Adicionando uma view nova
        let servicosTableRows = this.state.servicosTableRows;
        let newIndex = parseInt(this.state.servicosTableRows.length);

        servicosTableRows.push(
            <tr>
                <td>{this.state.servicosAdicionados[newIndex].nome}</td>
                <td>{this.state.servicosAdicionados[newIndex].price}</td>
                <td><a href="#" onClick={(e) => this.cartsRowRemover(e, this.state.servicosAdicionados[newIndex].nome, 1)}><i class="fas fa-times"></i></a></td>
            </tr>
        );

        this.setState({
            servicosAdicionados: servicosAdicionados,
            servicosTableRows: servicosTableRows
        });

    }

    /*
    * Método para lidar com o dropdown da peça.
    * Ao dropdown ser clicado, o item selecionado será adicionado a tabela "carrinho".
    */
    pecaDropdownHandler = async (e, index, nome) => {

        e.preventDefault();

        let pecasAdicionadas = this.state.pecasAdicionadas;

        for (let i in pecasAdicionadas) {
            if (pecasAdicionadas[i].nome == nome) {
                return;
            }
        }

        // Adicionando um objeto novo
        pecasAdicionadas.push({
            nome: this.state.pecas[index].nome,
            uni: 1,
            price: parseFloat(this.state.pecas[index].price)
        })


        // Adicionando uma view nova
        let pecasTableRows = this.state.pecasTableRows;
        let newIndex = parseInt(this.state.pecasAdicionadas.length) - 1;

        pecasTableRows.push(
            <tr>
                <td>{this.state.pecasAdicionadas[newIndex].nome}</td>
                <td><input type="number" value={this.state.pecasAdicionadas[newIndex].uni} onChange={(e) => this.pecaUniHandler(e, this.state.pecasAdicionadas[newIndex].nome)} /></td>
                <td>{parseFloat(this.state.pecasAdicionadas[newIndex].price) * this.state.pecasAdicionadas[newIndex].uni}</td>
                <td><a href="#" onClick={(e) => this.cartsRowRemover(e, this.state.pecasAdicionadas[newIndex].nome, 2)}><i class="fas fa-times"></i></a></td>
            </tr>
        );

        this.setState({
            pecasAdicionadas: pecasAdicionadas,
            pecasTableRows: pecasTableRows
        });


    }



    /*
    * Método para lidar com a quantidade da peça.
    * Ao ser digitado algo no campo de quantia, ele atualizará o state.
    */
    pecaUniHandler = async (e, nome) => {

        let pecasAdicionadas = this.state.pecasAdicionadas;
        let pecasTableRows = this.state.pecasTableRows;


        for (let index in this.state.pecasAdicionadas) {

            if (this.state.pecasAdicionadas[index].nome == nome) {

                pecasAdicionadas[index].uni = parseInt(e.target.value);

                pecasTableRows[index] = (
                    <tr>
                        <td>{this.state.pecasAdicionadas[index].nome}</td>
                        <td><input type="number" value={this.state.pecasAdicionadas[index].uni} onChange={(e) => this.pecaUniHandler(e, this.state.pecasAdicionadas[index].nome)} /></td>
                        <td>{parseFloat(this.state.pecasAdicionadas[index].price) * this.state.pecasAdicionadas[index].uni}</td>
                        <td><a href="#" onClick={(e) => this.cartsRowRemover(e, this.state.pecasAdicionadas[index].nome, 2)}><i class="fas fa-times"></i></a></td>
                    </tr>
                );


                this.setState({
                    pecasAdicionadas: pecasAdicionadas,
                    pecasTableRows: pecasTableRows
                });

                return;
            }
        }


    }




    /*
    * Método para lidar com o botão de excluir.
    * Ao ícone (xis / x) ser clicado do item selecionado, ele será removido do state e da tela.
    */
    cartsRowRemover = async (e, name, type) => {

        e.preventDefault();

        // Se o type for igual a 1, então removeremos o X[index] do SERVIÇO
        if (type === 1) {

            for (let i in this.state.servicosAdicionados) {
                if (this.state.servicosAdicionados[i].nome == name) {

                    let servicosAdicionados = this.state.servicosAdicionados;
                    let servicosTableRows = this.state.servicosTableRows;

                    servicosAdicionados.splice(i, 1);
                    servicosTableRows.splice(i, 1);

                    this.setState({
                        servicosAdicionados: servicosAdicionados,
                        servicosTableRows: servicosTableRows
                    });

                    return;
                }
            }

        }
        // Senão removeremos a X[index] PEÇA
        else {

            for (let i in this.state.pecasAdicionadas) {
                if (this.state.pecasAdicionadas[i].nome == name) {

                    let pecasAdicionadas = this.state.pecasAdicionadas;
                    let pecasTableRows = this.state.pecasTableRows;

                    pecasAdicionadas.splice(i, 1);
                    pecasTableRows.splice(i, 1);

                    this.setState({
                        pecasAdicionadas: pecasAdicionadas,
                        pecasTableRows: pecasTableRows
                    });

                    return;
                }
            }


        }

    }



    sendServiceOrderData = async () => {

        let errorMsg = "";

        // Verificando se o dropdown da oficina foi selecionada!
        if (this.state.oficinaSelecionada.nome == "") {
            errorMsg += "* A oficina não foi selecionada!\n";
        }

        // Verificando se o dropdown do evento foi selecionado!
        if (this.state.eventoSelecionado.titulo == "") {
            errorMsg += "* A manutenção não foi selecionada!\n";
        }

        // Verificando se foi adicionado pelo menos um serviço!
        if (this.state.servicosAdicionados.length == 0) {
            errorMsg += "* Selecione pelo menos 1 serviço!\n";
        }

        // Verificando se o caso OPCIONAL de ter peças se há valores nulos / negativos!
        if (this.state.pecasAdicionadas.length > 0) {

            for (let i in this.state.pecasAdicionadas) {

                if (this.state.pecasAdicionadas[i].uni == null || this.state.pecasAdicionadas[i].uni <= 0
                    || Object.is(this.state.pecasAdicionadas[i].uni, NaN)) {

                    errorMsg += "* Há peça(s) com valor(es) nulo(s) ou negativo(s)!\n";

                }
            }

        }

        if (errorMsg == "") {

            let data = {
                OrdemDeServico: {
                    total: this.state.total,
                    servicosAdicionados: this.state.servicosAdicionados,
                    pecasAdicionadas: this.state.pecasAdicionadas
                }
            }

        }
        else {
            alert("Erro! Os seguintes campos estão incorretos:\n\n" + errorMsg);
        }

    }

    /**
     * Método padrão para renderização.
     */
    render() {

        let mecanicoName = "Selecione uma manutenção primeiramente!";
        let oficinaName = "Selecione uma Oficina";
        let eventoName = "Selecione uma Manutenção";

        // Verificando se o dropdown do mecanico tem um label "default"
        if (this.state.mecanicoSelecionado["nome"] !== "") {
            mecanicoName = this.state.mecanicoSelecionado["nome"];
        }

        // Verificando se o dropdown da oficina tem um label "default"
        if (this.state.oficinaSelecionada["nome"] !== "") {
            oficinaName = this.state.oficinaSelecionada["nome"];
        }

        // Verificando se o dropdown do evento (de manutenção) tem um label "default"
        if (this.state.eventoSelecionado["titulo"] !== "") {
            eventoName = this.state.eventoSelecionado["titulo"];
        }


        // Populando os dropdowns...
        let oficinasDisponiveis = [];
        let eventosDisponiveis = [];
        let servicosDisponiveis = [];
        let pecasDisponiveis = [];

        for (let index in this.state.oficinas) {
            oficinasDisponiveis.push(<a className="dropdown-item" href="#" name="oficinaRow"
                onClick={(e) => this.oficinaDropdownHandler(e, index)} >
                {this.state.oficinas[index].nome}
            </a>)
        }

        for (let index in this.state.eventos) {
            eventosDisponiveis.push(<a className="dropdown-item" href="#" name="oficinaRow"
                onClick={(e) => this.eventoDropdownHandler(e, index)} >
                {this.state.eventos[index].titulo}
            </a>)
        }

        for (let index in this.state.servicos) {
            servicosDisponiveis.push(<a className="dropdown-item" href="#" name="servicoRow"
                onClick={(e) => this.servicoDropdownHandler(e, index, this.state.servicos[index].nome)} >
                {this.state.servicos[index].nome}
            </a>)
        }

        for (let index in this.state.pecas) {
            pecasDisponiveis.push(<a className="dropdown-item" href="#" name="pecaRow"
                onClick={(e) => this.pecaDropdownHandler(e, index, this.state.pecas[index].nome)} >
                {this.state.pecas[index].nome + " | " + this.state.pecas[index].uni + " unidades"}
            </a>)
        }



        // Desenhando a interface...
        return (
            <div
                className="card bg-white"
            >
                <a href="#" className="text-dark text-right" onClick={() => this.props.handleCard(false)}>
                    <i className="fas fa-2x fa-times-circle" />
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
                                        {oficinasDisponiveis}
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
                                        {eventosDisponiveis}
                                    </div>
                                </div>

                                {/* Dropdown do Mecânico */}
                                <div className="mt-5 form-group">
                                    <label>Nome do Mecânico</label>
                                    <p />
                                    <label ><b>{mecanicoName}</b></label>
                                </div>




                                <h1 className="display-4 text-center mt-5">Serviços</h1>

                                {/* Dropdown do Serviço */}
                                <div className="mt-5 form-group">
                                    <label>Selecione o Serviço*</label>
                                    <p />
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Clique em um item para adicionar
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {servicosDisponiveis}
                                    </div>

                                    <table className="table mt-5">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Preço</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.servicosTableRows}
                                        </tbody>
                                    </table>
                                </div>




                                <h1 className="display-4 text-center mt-5">Peças</h1>

                                {/* Dropdown dos itens */}
                                <div className="mt-5 form-group">
                                    <label>Selecione a peça utilizada</label>
                                    <p />
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Clique em um item para adicionar
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {pecasDisponiveis}
                                    </div>

                                    <table className="table mt-5">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Quantidade</th>
                                                <th scope="col">Preço</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.pecasTableRows}
                                        </tbody>
                                    </table>
                                </div>


                                <button
                                    type="button"
                                    className="btn btn-primary mt-5"
                                    style={{ width: '100%' }}
                                    onClick={() => this.sendServiceOrderData()}
                                >
                                    Confirmar
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
