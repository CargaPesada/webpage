import React from 'react'
import './style.css'
import OptionsTable from '../../forms/tables/OptionsTable';

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
                            data={
                                [
                                    {
                                        name: "Pecas",
                                        objects: [Object, Object, Object]
                                    },
                                    {
                                        name: "Servicos",
                                        objects: [Object, Object, Object]
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