import React from 'react';
import InputMask from 'react-input-mask';
import { User, userProps } from '../../../models/User';
import cep from 'cep-promise';

class RegisterUserView extends React.Component {
    constructor(props) {
        super(props);

        this.state = userProps();
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Método para limpar os campos do formulário.
     */
    clearForm = () => {
        document.getElementById('formulario').reset();
    }

	/**
     * Método para registrar um novo motorista.
     */
    registerNewUser = () => {
        this.setState({cargo: 'motorista'});
        if (this.state.newUserCategory !== -1) {
            try {
                let user = new User(this.state);
                user.validateAndSaveUser().then((message) => {
                     alert(message);
                     this.clearForm();
                 }).catch((message) => {
                     alert(message);
                 });
            } catch (err) {
                alert(err)
            }
        }
    };

    handleCEPChange(evt) {
        cep(evt.target.value)
            .then((data) => {
                return data;
            })
            .then((data) => {
                this.setState({cep: data.cep});
                this.setState({cidade: data.city});
                this.setState({estado: data.state});
                this.setState({bairro: data.neighborhood});
                this.setState({rua: data.street});
            });
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    /**
     * Método padrão para renderização.
     */
    render() {
        let cargoName = "Tipo de Cargo";

        switch (this.state.newUserCategory) {
            case 0:
                cargoName = "Motorista";
                break;
            case 1:
                cargoName = "Mecânico";
                break;
            case 2:
                cargoName = "Supervisor";
                break;
            case 3:
                cargoName = "Gerente Regional";
                break;
            case 4:
                cargoName = "Diretor Global";
                break;
            default:
                cargoName = "Motorista";
        }


        let toRender = [];
        let cargosToShow = [];
        
        cargosToShow.push(<input type="button" class="dropdown-item" onClick={this.handleChange} name="cargo" value = "Motorista"/>)
        if (this.props.cargo >= 3) {
            cargosToShow.push(<input type="button" class="dropdown-item" onClick={this.handleChange} name="cargo" value = "Supervisor"/>);
        }
        if (this.props.cargo === 4) {
            cargosToShow.push(<input type="button" class="dropdown-item" onClick={this.handleChange} name="cargo" value = "Gerente Regional"/>);
        }


        if (this.state.newUserCategory === 0) {
            toRender.push(
                <div className="mt-4 form-group">
                    <label>Tipo de CNH *</label>
                    <InputMask
                        mask="99999999999"
                        type="text"
                        name="numcnh"
                        id="numcnh"
                        placeholder="Numero da CNH"
                        style={{ width: '100%' }}
                    />
                </div>
            );
        }


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
                            <form id="formulario">
                                <div className="form-group">
                                    <p>
                                        <label>Olá! Para cadastrar um novo usuário, você deverá preencher todos os campos obrigatórios (*)!</label>
                                    </p>
                                </div>
                                <div className="form-group">
                                    <label>E-Mail *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="E-Mail"
                                        style={{ width: '100%' }}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Senha *</label>
                                    <input
                                        type="password"
                                        name="senha"
                                        id="senha"
                                        placeholder="Senha"
                                        style={{ width: '100%' }}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Nome *</label>
                                    <input
                                        type="text"
                                        name="nome"
                                        id="nome"
                                        placeholder="Nome"
                                        style={{ width: '100%' }}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>CPF *</label>
                                    <InputMask
                                        mask="999.999.999-99"
                                        type="text"
                                        name="cpf"
                                        id="cpf"
                                        placeholder="CPF"
                                        style={{ width: '100%' }}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Sexo do Usuário *</label>

                                    <div className="d-flex row justify-content-between ml-1" style={{ width: '60%' }}>
                                        <label>
                                            <input
                                                type="radio"
                                                name="sexo"
                                                value="m"                                                
                                                onChange={this.handleChange}
                                            />
                                            Masculino
										</label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="sexo"      
                                                value="f"                                          
                                                onChange={this.handleChange}
                                            />
                                            Feminino
										</label>
                                    </div>
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Data de Nascimento *</label>
                                    <InputMask
                                        mask="9999-99-99"
                                        type="text"
                                        name="ddn"
                                        id="ddn"
                                        placeholder="Data de Nascimento"
                                        style={{ width: '100%' }}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Nome do Pai</label>
                                    <input
                                        type="text"
                                        name="nomepai"
                                        id="nomepai"
                                        placeholder="Nome do Pai"
                                        style={{ width: '100%' }}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Nome da Mãe *</label>
                                    <input
                                        type="text"
                                        name="nomemae"
                                        id="nomemae"
                                        placeholder="Nome da Mãe"
                                        style={{ width: '100%' }}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="mt-4 form-group">
                                    <label>Tem dependentes *</label>

                                    <div className="d-flex row justify-content-between ml-1" style={{ width: '60%' }}>
                                        <label>
                                            <input
                                                type="radio"
                                                name="dependentes"
                                                onChange={this.handleChange}
                                            />
                                            Sim
										</label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="dependentes"                                                
                                                onChange={this.handleChange}
                                            />
                                            Não
										</label>
                                    </div>
                                </div>

                                <div className="form-group mt-1">
                                    <label>Endereço de Moradia *</label>
                                    <p />
                                    <InputMask
                                        mask="99.999-999"
                                        type="text"
                                        name="cep"
                                        id="cep"
                                        placeholder="CEP"
                                        style={{ width: '40%' }}
                                        onChange={this.handleChange}                                           
                                        onBlur={this.handleCEPChange.bind(this)}
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        name="cidade"
                                        id="cidade"
                                        placeholder="Cidade"
                                        value={this.state.cidade}
                                        style={{ width: '40%' }}
                                        disabled
                                    />
                                    <input
                                        type="text"
                                        name="estado"
                                        id="estado"
                                        className="ml-3"
                                        placeholder="Estado"
                                        style={{ width: '50%' }}
                                        value={this.state.estado}
                                        disabled
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        name="rua"
                                        id="rua"
                                        placeholder="Rua"
                                        style={{ width: '40%' }}
                                        value={this.state.rua}
                                        disabled
                                    />
                                    <input
                                        type="text"
                                        name="complemento"
                                        id="complemento"
                                        className="ml-3"
                                        placeholder="Complemento"
                                        style={{ width: '50%' }}                                                
                                        onChange={this.handleChange}
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        name="numero"
                                        id="numero"
                                        placeholder="Número"
                                        style={{ width: '40%' }}                                                
                                        onChange={this.handleChange}
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        name="bairro"
                                        id="bairro"
                                        placeholder="Bairro"
                                        style={{ width: '40%' }}
                                        value={this.state.bairro}
                                        disabled
                                    />
                                </div>

                                <div className="mt-5">
                                    <h1 className="display-4 text-center">Dados sobre o cargo</h1>
                                </div>

                                <div className="mt-5 form-group">
                                    <label>Selecione o Cargo *</label>
                                    <p />
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {cargoName}
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {cargosToShow}
                                    </div>
                                </div>



                                {toRender}

                                <button
                                    type="button"
                                    className="btn btn-primary mt-5"
                                    style={{ width: '100%' }}
                                    onClick={() => this.registerNewUser()}
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

export default RegisterUserView;
