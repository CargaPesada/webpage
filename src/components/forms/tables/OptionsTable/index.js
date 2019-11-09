import React from 'react'
import './style.css'
import { MenuItem, Select, FormControl } from '@material-ui/core';
import OptionsTableLine from './OptionsTableLine';

export default function OptionsTable(props) {

    const getOptionObjects = optionName => {
        const option = data.filter((option) => {
            return option.name === optionName;
        });

        return option[0].objects;
    }

    const handleDropdownChange = event => {
        setSelectedOption(event.target.value)
    }

    const data = props.data;
    const [selectedOption, setSelectedOption] = React.useState(props.defaultValueName)
    const [selectedOptionObjects, setSelectedOptionObjects] = React.useState(getOptionObjects(selectedOption))


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
                                        value={option.name} >
                                        {option.name}
                                    </MenuItem>
                                );
                            })
                        }
                    </Select>
                </FormControl>

                {
                    selectedOptionObjects.map((object) => {
                        return (
                            <OptionsTableLine
                                object={object}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}