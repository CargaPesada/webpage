import React from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function OptionsTableLine(props) {
    const sendNameToDelete = () => {
        props.onDeleteClick(props.object.nome);
    }

    let deleteIcon;
    if (props.onDeleteClick) {
        deleteIcon =
            <div className='delete-icon'>
                <FontAwesomeIcon
                    icon={faTrashAlt}
                    onClick={sendNameToDelete} />
            </div>;
    }

    return (
        <div
            className='OptionsTableLine' >
            <div className='name'>
                Nome: {props.object.nome}
            </div>
            <div className='price'>
                Preco: {props.object.price}
            </div>

            {deleteIcon}
        </div>
    )
}