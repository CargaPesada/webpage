import React from 'react';
import InputMask from 'react-input-mask';
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';
import Office from '../../../models/Office';
import JobTitle from '../../../models/JobTitle';

class ReadUserDataView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedUserID: -1,
            status: '',
            nome: '',
            cpf: '',
            users: []

        }
    }

    async componentWillMount() {
        let availableUsers = await new FirebaseHandler().getAllUsers();

        let usersList = [];

        for (let index in availableUsers) {
            usersList.push(availableUsers[index])
        }

        this.setState({
            users: usersList
        });
    }

    /**
     * Método para gerenciar os tipos de usuários disponíveis para visualização.
     * 
     * Os valores deverão ser em INTEIRO e entre 0 à N elementos disponíveis!
     */
    handleUserDropdown = (id) => {

        try {

            let statusToReadable = "Indisponível / Ocupado";

            if (this.state.users[id].status) {
                statusToReadable = "Disponível para tarefas";
            }

            this.setState(
                {
                    status: statusToReadable,
                    nome: this.state.users[id].nome,
                    cpf: this.state.users[id].cpf

                }
            );
        }
        catch (e) {
            alert("Erro! Foi detectado um usuário com informação corrompida no sistema! Contacte um administrador!");
            console.log("Aviso! Foi detectado um usuário não dentro do padrão!");
        }
    }

    /**
     * Método padrão para renderização.
     */
    render() {

        // Setando os componentes que precisam ser renderizados de acordo com o cargo
        let toRender = []

        // Carregando info de usuários
        let userItems = [];

        for (let index = 0; index < this.state.users.length; index++) {

            let statusToReadable = "Indisponível / Ocupado";

            if (this.state.users[index].status) {
                statusToReadable = "Disponível para tarefas";
            }

            userItems.push(
                <a class="dropdown-item" href="#" onClick={() => this.handleUserDropdown(index)}>{this.state.users[index].cpf + " | " + this.state.users[index].nome
                    + " | " + statusToReadable}</a>
            );
        }


        // Setando o valor default do combo box!
        let selectedUser = this.state.selectedUserID == -1 ? "Selecione um Funcionário" : "Funcionário: " + this.state.trucks[this.state.selectedUserID].cpf + " | " + this.state.users[this.state.selectedUserID].nome
            + " | " + this.state.users[this.state.selectedUserID].status;

        // Montando os componentes para renderizar na tela!
        toRender.push(

            <div className="form-group">
                <label>Selecione um Funcionário</label>
                <p />
                <button class="btn btn-secondary dropdown-toggle" type="button" style={{ width: "100%" }} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {selectedUser}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {userItems}
                </div>
            </div>

        );



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
                                    <label>Nome </label>
                                    <input
                                        type="text"
                                        value={this.state.nome}
                                        id="nome"
                                        name="nome"
                                        style={{ width: "100%" }}
                                        placeholder="Nome"
                                        disabled
                                    />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>CPF </label>
                                    <input
                                        type="text"
                                        value={this.state.cpf}
                                        name="cpf"
                                        id="cpf"
                                        placeholder="CPF"
                                        style={{ width: '100%' }}
                                        disabled
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Status</label>
                                    <input
                                        type="text"
                                        value={this.state.status}
                                        name="status"
                                        id="status"
                                        placeholder="Status"
                                        style={{ width: "100%" }}
                                        disabled
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

export default ReadUserDataView;
