import React from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function OptionsTableLine(props) {
    const sendNameToDelete = () => {
        props.onDeleteClick(props.object.nome);
    }

    let deleteIcon = props.onDeleteClick ?
        <div className='delete-icon'>
            <FontAwesomeIcon
                icon={faTrashAlt}
                onClick={sendNameToDelete} />
        </div> :
        null;

    let unitCol = props.object.uni ?
        <div className='uni'>
            Unidades: {props.object.uni}
        </div> :
        null;

    return (
        <div
            className='OptionsTableLine' >

            <div className='name'>
                Nome: {props.object.nome}
            </div>

            {unitCol}

            <div className='price'>
                Preco: {props.object.price}
            </div>

            {deleteIcon}

        </div>
    )
}