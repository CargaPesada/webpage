import React from 'react';
import CustomCard from '../cards/CustomCard';

export default function ServiceAndToolOptions(props) {
    return (
        <div
            className="row d-flex justify-content-between"
            style={{ marginTop: '10%', marginLeft: '10%', marginRight: '10%', marginBottom: '10%' }}
        >
            <CustomCard
                name="fa-tools"
                description="Registrar peças ou serviços"
                customOnClick={() => this.handleTruckRegisterCard(true)}
            />
            <CustomCard
                name="fa-tools"
                description="Consultar peças ou serviços"
                customOnClick={() => this.handleTruckDataCard(true)}
            />
            <CustomCard
                name="fa-ban"
                description="Excluir peças ou serviços"
                customOnClick={() => this.handleTruckDeleterCard(true)}
            />
        </div>
    )
}