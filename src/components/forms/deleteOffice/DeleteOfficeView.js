import React from 'react';
import InputMask from 'react-input-mask';
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';
import Office from '../../../models/Office';

class DeleteOfficeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOfficeID: -1,
            selectedOfficeName: ""
        }

    }

    

    /**
     * Método para carregar todas as oficinas em uma lista.
     */
    loadAvailableOffices = async () => {
        return await new FirebaseHandler().getAllOffices();
    }

    /**
     * Método padrão para renderização.
     */
    render() {

        let offices = this.loadAvailableOffices();
        let officesItems = [];

        for (let index in offices) {
            officesItems.push(
                <a class="dropdown-item" href="#">{offices[index][1]}</a>
            );
        }


        let selectedOffice = this.state.selectedOfficeID == -1? "Selecione uma Oficina" : this.state.selectedOfficeName

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
