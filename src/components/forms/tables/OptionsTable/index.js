import React from 'react'
import './style.css'
import { MenuItem, Select, FormControl } from '@material-ui/core';

export default function OptionsTable(props) {
    const data = props.data;
    const [selectedOption, setSelectedOption] = React.useState(props.defaultValueName)
    const handleDropdownChange = event => {
        setSelectedOption(event.target.value)
    }

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
            </div>
        </div>
    );
}