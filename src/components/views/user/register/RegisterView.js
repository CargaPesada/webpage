import React from 'react';
import FirebaseHandler from '../../../../utils/firebase/FirebaseHandler';
import User from '../../../../models/User';

class RegisterView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userSexRadioValue: "masculino",
            areThereDependents: false,
        }
    }




    /**
     * Método para registrar um novo motorista.
     */
    registerNewUser = async () => {


        let email = document.getElementById("email").value;
        let senha = document.getElementById("senha").value;
        let nome = document.getElementById("nome").value;
        let cpf = document.getElementById("cpf").value;
        let tipocnh = document.getElementById("tipocnh").value;
        let sexo = this.state.userSexRadioValue;
        let ddn = document.getElementById("ddn").value;
        let nomepai = document.getElementById("nomepai").value;
        let nomemae = document.getElementById("nomemae").value;
        let dependentes = this.state.areThereDependents;
        let endereco = {
            cidade: document.getElementById("cidade").value,
            estado: document.getElementById("estado").value

        };


        let newUser = new User(email, senha, nome, cpf, tipocnh, sexo, ddn, nomepai, nomemae, dependentes, endereco);



        let httpHandler = new FirebaseHandler();
        let result = await httpHandler.tryToRegister(newUser);

        if (result) {
            alert("Registrado com sucesso!");
        }
        else {
            alert("Erro! Impossível registrar! Tente novamente!");
        }

    }




    /**
     * Método para gerenciar os radios buttons de sexo da pessoa.
     */
    handleSexoDoUsuarioRadioButton = (gender) => {
        this.setState({ genderRadioValue: gender });
    }



    /**
     * Método para gerenciar os radios buttons de dependentes da pessoas.
     */
    handleDependentsRadioButton = (doesHave) => {

        this.setState({ areThereDependents: doesHave });

    }




    render() {

        return (
            <div className="card bg-white" style={{ marginTop: "5%", marginLeft: "0%", marginRight: "0%", paddingBottom: "3vh" }}>
                <a href="#" className="text-dark text-right" onClick={() => this.props.handleCard(false)} >
                    <i class="fas fa-2x fa-times-circle"></i>
                </a>
                <div className="ml-1 row d-flex justify-content-center" style={{ width: "100%", height: "100%" }}>

                    {/* Coluna principal (a do meio) */}
                    <div className="col-sm-5">
                        <h1 className="display-4 text-center">{this.props.description}</h1>
                        <div className="mt-3 justify-content-center" style={{ width: "100%" }}>
                            <form>
                                <div className="form-group">
                                    <label>E-Mail</label>
                                    <input type="email" name="email" id="email" placeholder="E-Mail" style={{ width: "100%" }} />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Senha</label>
                                    <input type="password" name="senha" id="senha" placeholder="Senha" style={{ width: "100%" }} />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Nome</label>
                                    <input type="text" name="nome" id="nome" placeholder="Nome" style={{ width: "100%" }} />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>CPF</label>
                                    <input type="text" name="cpf" id="cpf" placeholder="CPF" style={{ width: "100%" }} />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Tipo de CNH</label>
                                    <input type="text" name="tipocnh" id="tipocnh" placeholder="Tipo da CNH" style={{ width: "100%" }} />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Gênero do Usuário: </label>

                                    <div className="d-flex row justify-content-between ml-1" style={{ width: "60%" }}>
                                        <label>
                                            <input type="radio" value="masculino" onClick={() => this.handleSexoDoUsuarioRadioButton("masculino")} checked={this.state.userSexRadioValue == "masculino"} />
                                            Masculino
                                        </label>
                                        <label>
                                            <input type="radio" value="feminino" onClick={() => this.handleSexoDoUsuarioRadioButton("feminino")} checked={this.state.userSexRadioValue == "feminino"} />
                                            Feminino
                                        </label>

                                    </div>
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Data de Nascimento</label>
                                    <input type="text" name="ddn" id="ddn" placeholder="Data de Nascimento (AAAA-MM-DD)" style={{ width: "100%" }} />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Nome do Pai</label>
                                    <input type="text" name="nomepai" id="nomepai" placeholder="Nome do Pai" style={{ width: "100%" }} />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Nome da Mãe</label>
                                    <input type="text" name="nomemae" id="nomemae" placeholder="Nome da Mãe" style={{ width: "100%" }} />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Tem dependentes: </label>

                                    <div className="d-flex row justify-content-between ml-1" style={{ width: "60%" }}>
                                        <label>
                                            <input type="radio" value="sim" onClick={() => this.handleDependentsRadioButton(true)} checked={this.state.areThereDependents == true} />
                                            Sim
                                        </label>
                                        <label>
                                            <input type="radio" value="nao" onClick={() => this.handleDependentsRadioButton(false)} checked={this.state.areThereDependents == false} />
                                            Não
                                        </label>

                                    </div>
                                </div>

                                <div className="form-group mt-1">
                                    <label>Endereço de Moradia</label>
                                    <p></p>
                                    <input type="text" name="cidade" id="cidade" placeholder="Cidade" style={{ width: "40%" }} />
                                    <input type="text" name="estado" id="estado" className="ml-3" placeholder="Estado" style={{ width: "50%" }} />
                                </div>
                                <button type="button" className="btn btn-primary mt-5" style={{ width: "100%" }} onClick={() => this.registerNewUser()}>Cadastrar</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div >
        );
    }

}

export default RegisterView;