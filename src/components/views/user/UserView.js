import React from 'react';
import CustomCard from '../../cards/CustomCard';
import './UserView.css';
import InfoView from './info/InfoView';

class UserView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // DEBUG
            mustHideCards: false,
            mustShowDriverInfo: false,
            infosToShow: [["Nome", "Teste"], ["Sobrenome", "Higa"]] // Deixar vazio
        };
    }


    /**
     * Método para esconder os cards e demonstrar a view de info do Motorista.
     */
    handleDriverCard = (mustHide) => {

        if (mustHide == true) {
            this.setState({mustHideCards: true, mustShowDriverInfo: true});
        }
        else {
            this.setState({mustHideCards: false, mustShowDriverInfo: false});
        }
    }


    /**
     * Método padrão de renderização do componente.
     */
    render() {

        let toRender = []


        // Checando se o usuário é administrador para acessar as telas de ADMIN.
        if (!this.props.isAdmin) {

            // Nesse caso o usuário é o motorista...
            if (!this.state.mustHideCards) {
                toRender.push(
                    <div className="row justify-content-between" style={{marginTop: "17%", marginLeft: "10%", marginRight: "10%"}}>
                        {/* Dados do Caminhão */}
                        <CustomCard name="fa-truck" description="Dados do Caminhão" />

                        {/* Dados do Usuário */}
                        <CustomCard name="fa-user-slash" description="Dados do Motorista" customOnClick={() => this.handleDriverCard(true)}/>

                        {/* Alerta */}
                        <CustomCard name="fa-exclamation-triangle" description="Emergência"/>
                    </div>
                );
            }
            else {
                if (this.state.mustShowDriverInfo) {
                    toRender.push(
                        <InfoView description="Dados do Motorista" handleDriverCard={this.handleDriverCard} infosToShow={this.state.infosToShow}/>
                    )
                }
            }
        }
        else {

            // Nesse caso o usuário é ADMIN.
            toRender.push(
                <div className="row d-flex justify-content-center" style={{marginTop: "17%", marginLeft: "10%", marginRight: "10%"}}>

                    {/* Gerenciar Dados dos Usuários */}
                    <CustomCard name="fa-users" description="Gerenciar Usuários"/>

                </div>
            );
        }

        return(
            <div>
                {toRender}
            </div>
        );
    }

}

export default UserView;