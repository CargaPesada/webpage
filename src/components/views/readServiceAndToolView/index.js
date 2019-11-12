import React from 'react'
import './style.css'
import OptionsTable from '../../tables/OptionsTable';
import FirebaseHandler from '../../../utils/firebase/FirebaseHandler';

export default function ReadServiceAndToolDataView(props) {
    const [services, setServices] = React.useState([]);
    const [tools, setTools] = React.useState([]);

    const getData = async () => {
        const firebaseHandler = new FirebaseHandler();
        const services = await firebaseHandler.getAllServices();
        const tools = await firebaseHandler.getAllTools();
        setServices(services);
        setTools(tools);
    }
    if (!services || !tools || services.length === 0 || tools.length === 0) {
        getData();
    }

    return (
        <div
            className="ReadServiceAndToolDataView">
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
                    <div className="">
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
                        />
                    </div>
                </div>
            </div>
        </ div>
    );
}