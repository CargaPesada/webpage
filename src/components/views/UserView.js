import React from 'react';
import CustomCard from '../cards/CustomCard';
import './UserView.css';

class UserView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let toRender = []


        // Checando se o usuário é administrador para acessar as telas de ADMIN.
        if (!this.props.isAdmin) {

            // Nesse caso o usuário é o motorista...
            toRender.push(
                <div className="row justify-content-between" style={{marginTop: "17%", marginLeft: "10%", marginRight: "10%"}}>
                    {/* Dados do Caminhão */}
                    <CustomCard name="fa-truck"/>

                    {/* Dados do Usuário */}
                    <CustomCard name="fa-user-slash"/>

                    {/* Alerta */}
                    <CustomCard name="fa-exclamation-triangle"/>
                </div>
            );
        }
        else {

            // Nesse caso o usuário é ADMIN.
            toRender.push(
                <div className="row d-flex justify-content-center" style={{marginTop: "17%", marginLeft: "10%", marginRight: "10%"}}>

                    {/* Gerenciar Dados dos Usuários */}
                    <CustomCard name="fa-users"/>

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