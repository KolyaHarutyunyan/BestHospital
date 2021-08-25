import React from "react";
import {Select, FormControl,} from "@material-ui/core";
import {inputsStyle} from "./styles";
import MenuItem from "@material-ui/core/MenuItem";
import {InputMinLoader} from "./inputMiniLoader";

export const SelectInputPlaceholder = ({
                                           className,
                                           loader,
                                           name,
                                           handleSelect,
                                           style,
                                           value,
                                           list,
                                           handleChangeCountryCode,
                                           typeError,
                                           type,
                                           language,
                                           styles
                                       }) => {

    const [current, setCurrent] = React.useState('');

    const classes = inputsStyle();

    const handleChange = (event) => {
        handleSelect(event)
        setCurrent(event.target.value);
    };


    return (
        <>
            <div className={style ? style : classes.SignInInput}>
                <FormControl variant="outlined" className={className ? className : classes.inputTextField}
                             error={typeError && true}>
                    <Select
                        style={{...styles}}
                        className={classes.selectPlaceholder}
                        value={value ? value : current}
                        onChange={handleChange}
                        displayEmpty
                        name={name}
                        error={typeError}
                        endAdornment={
                            loader && <InputMinLoader/>
                        }
                    >
                        <MenuItem value="" disabled>
                            Type*
                        </MenuItem>
                        {language ?
                            language.map((option, j) => (
                                <MenuItem data-key={option.code ? option.code : j} key={j}
                                          value={type === 'id' ? option.id : option}
                                >
                                    {option}
                                </MenuItem>
                            )) :
                            list.length && list.map((option, j) => (
                                <MenuItem
                                          data-key={option.code ? option.code : j} key={j}
                                          value={type === 'id' ? option.id : option.name}
                                >
                                    {option.name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>
        </>

    )
}
