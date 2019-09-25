import React from 'react';
import InputMask from 'react-input-mask';
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';

class DeleteOfficeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOfficeID: -1,
            offices: []
        }

    }

    async componentWillMount() {

        let availableOffices = await this.loadAvailableOffices();

        this.setState({
            offices: availableOffices
        });

    }

    /**
     * Método para carregar todas as oficinas em uma lista.
     */
    loadAvailableOffices = async () => {
        return await new FirebaseHandler().getAllOffices();
    }

    /**
     * Método para gerenciar os tipos de oficinas disponíveis para deleção.
     * 
     * Os valores deverão ser em INTEIRO e entre 0 à N elementos disponíveis!
     */
    handleOfficeDropdown = (id) => {
        this.setState({ selectedOfficeID: id });
    }

    /**
     * Método para deletar uma certa oficina (pelo seu ID).
     * 
     * Lembrando que o ID não será passado como parâmetro,
     * pois o ID está no State da classe.
     */
    deleteCertainOffice = async () => {

        if (this.state.selectedOfficeID !== -1) {
            let res = await new FirebaseHandler().deleteCertainOffice(this.state.offices[this.state.selectedOfficeID][0]);

            if (res === true) {
                alert("Oficina deletada com sucesso!");
                this.props.handleCard(false); // GAMBIARRA
            }
            else {
                alert("Erro interno no servidor ao deletar uma oficina!");
            }
        }
        else {
            alert("Selecione uma oficina primeiramente!");
        }
    }

    /**
     * Método padrão para renderização.
     */
    render() {

        let officesItems = [];

        for (let index = 0; index < this.state.offices.length; index++) {

            officesItems.push(
                <a class="dropdown-item" href="#" onClick={() => this.handleOfficeDropdown(index)}>{this.state.offices[index][1]}</a>
            );
        }


        let selectedOffice = this.state.selectedOfficeID == -1 ? "Selecione uma Oficina" : this.state.offices[this.state.selectedOfficeID][1]

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
                                <div className="form-group">
                                    <label>Selecione a Oficina *</label>
                                    <p />
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {selectedOffice}
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {officesItems}
                                    </div>
                                </div>


                                <button
                                    type="button"
                                    className="btn btn-primary mt-5"
                                    style={{ width: '100%' }}
                                    onClick={() => this.deleteCertainOffice()}
                                >
                                    Deletar
								</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteOfficeView;
