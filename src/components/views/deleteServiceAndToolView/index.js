import React from 'react'
import './style.css'
import OptionsTable from '../../tables/OptionsTable';
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';

export default function DeleteServiceAndToolView(props) {
    const [services, setServices] = React.useState(null);
    const [tools, setTools] = React.useState(null);
    const firebaseHandler = new FirebaseHandler();

    const onDeleteClick = (objectId) => {
        console.log(objectId + ' delete clicked');

        services.forEach(service => {
            if (service.nome === objectId) {
                firebaseHandler
                    .deleteService(objectId).then(getData);
            }
        });

        tools.forEach(tool => {
            if (tool.nome === objectId) {
                firebaseHandler
                    .deleteTool(objectId).then(getData);
            }
        });
    }

    const getData = async () => {
        const services = await firebaseHandler.getAllServices();
        const tools = await firebaseHandler.getAllTools();
        setServices(services);
        setTools(tools);
    }
    if (!services || !tools) {
        getData();
    }

    return (
        <div
            className="DeleteServiceAndToolView">
            <div
                className="text-dark text-right" >
                <button
                    id="close-button"
                    className="fas fa-2x fa-times-circle"
                    onClick={() => props.handleCard(false)} />
            </div>
            <div
                className="ml-1 row d-flex justify-content-center"
                style={{ marginBottom: '30px' }} >
                <div
                    className="col-sm-5" >
                    <h1
                        className="display-4 text-center" >
                        {props.description}
                    </h1>
                    <div>
                        <OptionsTable
                            data={
                                [
                                    {
                                        nome: 'Pecas',
                                        objects: tools
                                    },
                                    {
                                        nome: 'Servicos',
                                        objects: services
                                    },
                                ]
                            }
                            defaultValueName="Pecas"
                            onDeleteClick={onDeleteClick}
                        />
                    </div>
                </div>
            </div>
        </ div>
    );
}