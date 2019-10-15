import React from 'react';
import InputMask from 'react-input-mask';
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';
import Office from '../../../models/Office';
import JobTitle from '../../../models/JobTitle';

class DriverStatusHandlerView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: false,
            user: null


        }
    }

    async componentWillMount() {
        let availableUsers = await new FirebaseHandler().getAllUsers();

        for (let index in availableUsers) {
            if (availableUsers[index].cargo == "motorista" && availableUsers[index].cpf == this.props.cpf) {

                // let statusToReadable = "Indisponível / Ocupado";

                // if (availableUsers[id].status) {
                //     statusToReadable = "Disponível para tarefas";
                // }

                this.setState({
                    user: availableUsers[index],
                    status: availableUsers[index].status
                });

                break;
            }
        }

    }

    /**
     * Método para gerenciar os tipos de usuários disponíveis para visualização.
     * 
     * Os valores deverão ser em INTEIRO e entre 0 à N elementos disponíveis!
     */
    handleUserDropdown = (id) => {

        try {

            // let statusToReadable = "Indisponível / Ocupado";

            // if (this.state.users[id].status) {
            //     statusToReadable = "Disponível para tarefas";
            // }

            // this.setState(
            //     {
            //         status: statusToReadable,
            //         nome: this.state.users[id].nome,
            //         cpf: this.state.users[id].cpf

            //     }
            // );
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

        // Carregando opções de seleção
        let userAlternatives = [];

        // userAlternatives.push(
        //     <a class="dropdown-item" href="#" onClick={() => this.handleUserDropdown(index)}>{"Indisponível / Ocupado"}</a>
        // );

        // userAlternatives.push(
        //     <a class="dropdown-item" href="#" onClick={() => this.handleUserDropdown(index)}>{"Disponível para tarefas"}</a>
        // );


        // Setando o valor default do combo box!
        let selectedStatus = this.state.status == false ? "Indisponível / Ocupado" : "Disponível para tarefas";

        // Montando os componentes para renderizar na tela!
        toRender.push(

            <div className="form-group">
                <label>Configure o seu status atual</label>
                <p />
                <button class="btn btn-secondary dropdown-toggle" type="button" style={{width: "100%"}} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {selectedStatus}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {userAlternatives}
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

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DriverStatusHandlerView;
