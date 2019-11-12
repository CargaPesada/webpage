import React from 'react'
import './style.css'

export default function OptionsTableLine(props) {
    return (
        <div className='OptionsTableLine'>
            <div className='name'>
                Nome: {props.object.nome}
            </div>
            <div className='price'>
                Preco: {props.object.price}
            </div>
        </div>
    )
}