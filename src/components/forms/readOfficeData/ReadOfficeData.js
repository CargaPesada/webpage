import React from 'react';
import InputMask from 'react-input-mask';
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';
import Office from '../../../models/Office';

class ReadOfficeData extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Método padrão para renderização.
     */
    render() {

        let toRender = []

        if (this.props.cargo >= 3) {
            toRender.push(

                <div className="form-group">
                    <label>Selecione a Oficina</label>
                    <p />
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {/* {cargoName} */}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {/* <a class="dropdown-item" onChange={this.handleChange} href="#">Nome de Teste</a> */}
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
                                    <input type="text" id="nome" name="nome" style={{ width: "100%" }} placeholder="Nome" readOnly></input>

                                </div>

                                <div className="mt-4 form-group">
                                    <label>CPF do Supervisor</label>
                                    <input
                                        type="text"
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
                                        name="cep"
                                        id="cep"
                                        placeholder="CEP"
                                        style={{ width: '40%' }}
                                        readOnly
                                    />
                                    <p />
                                    <input
                                        type="text"
                                        name="cidade"
                                        id="cidade"
                                        placeholder="Cidade"
                                        style={{ width: '40%' }}
                                        readOnly
                                    />
                                    <input
                                        type="text"
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
                                        name="rua"
                                        id="rua"
                                        placeholder="Rua / Estrada / Avenida"
                                        style={{ width: '40%' }}
                                        readOnly
                                    />
                                    <input
                                        type="text"
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
                                        name="complemento"
                                        id="complemento"
                                        placeholder="Complemento"
                                        style={{ width: '40%' }}
                                        readOnly
                                    />
                                    <p />
                                    <input
                                        type="text"
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
