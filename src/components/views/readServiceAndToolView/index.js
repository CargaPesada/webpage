import React from 'react'
import './style.css'
import OptionsTable from '../../forms/tables/OptionsTable';

const hardData = [
    {
        name: 'Pecas',
        objects: [{ name: 'peca1', preco: 19.5 }, { name: 'peca2', preco: 19.5 }, { name: 'peca3', preco: 19.5 }]
    },
    {
        name: "Servicos",
        objects: [{ name: 'ser1', preco: 19.5 }, { name: 'ser2', preco: 19.5 }, { name: 'ser3', preco: 19.5 }]
    },
]

export default function ReadServiceAndToolDataView(props) {
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
                            data={hardData}
                            defaultValueName="Pecas"
                        />
                    </div>
                </div>
            </div>
        </ div>
    );
}