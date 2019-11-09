import React from 'react'
import './style.css'

export default function OptionsTableLine(props) {
    return (
        <div className='OptionsTableLine'> {props.object.name} </div>
    )
}