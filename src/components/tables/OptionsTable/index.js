import React, { useEffect } from 'react'
import './style.css'
import { MenuItem, Select, FormControl } from '@material-ui/core';
import OptionsTableLine from './OptionsTableLine';

export default function OptionsTable(props) {

    const getOptionObjects = optionName => {
        const option = data.filter((option) => {
            return option.nome === optionName;
        });

        return option[0].objects;
    }

    const handleDropdownChange = event => {
        setSelectedOption(event.target.value);
        setSelectedOptionObjects(getOptionObjects(event.target.value));
    }

    useEffect(() => {
        let object = { target: { value: selectedOption } };
        handleDropdownChange(object);
    })

    const data = props.data;
    const [selectedOption, setSelectedOption] = React.useState(props.defaultValueName);
    const [selectedOptionObjects, setSelectedOptionObjects] = React.useState(getOptionObjects(selectedOption));
    const objects = selectedOptionObjects ?
        selectedOptionObjects.map((object) => {
            return (
                <div key={object.nome} >
                    <OptionsTableLine
                        object={object}
                        onDeleteClick={props.onDeleteClick}
                    />
                    <hr />
                </div>
            )
        }) : null;

    return (
        <div className="OptionsTable">
            <div className="header">
                <FormControl>
                    <Select
                        value={selectedOption}
                        onChange={handleDropdownChange}
                        displayEmpty >
                        {
                            data.map((option) => {
                                return (
                                    <MenuItem
                                        key={option.nome}
                                        value={option.nome} >
                                        {option.nome}
                                    </MenuItem>
                                );
                            })
                        }
                    </Select>
                </FormControl>
            </div>
            <div className="content">
                {objects}
            </div>
        </div>
    );
}