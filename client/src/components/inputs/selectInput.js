import {InputLabel, Select, FormControl, FormHelperText} from "@material-ui/core";
import {inputsStyle} from "./styles";
import {InputMinLoader} from "./inputMiniLoader";
import React from "react";

export const SelectInput = ({errorFalse,
                                className,
                                loader,
                                name,
                                label,
                                handleSelect,
                                style,
                                value,
                                list,
                                handleChangeCountryCode,
                                typeError,
                                type,
                                disabled,
                                language,
                                styles
                            }) => {
    const classes = inputsStyle();


    const [current, setCurrent] = React.useState('');

    const handleChange = (event) => {

        handleSelect(event)
        setCurrent(event.target.value);

        const selectedIndex = event.target.options.selectedIndex;

        if (handleChangeCountryCode) {
            handleChangeCountryCode(event.target.options[selectedIndex].getAttribute('data-key'))
        }
    };

    return (
        <>
            <div style={{marginBottom:0}} className={style ? style : classes.SignInInput}>
                <FormControl variant="outlined" className={className ? className : classes.inputTextField}
                             error={typeError && true}>
                    <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
                    <Select
                        style={{...styles}}
                        className={classes.select}
                        disabled={disabled}
                        native
                        value={value ? value : current}
                        onChange={handleChange}
                        label={label}
                        defaultValue={value ? value : current}
                        name={name}
                        error={typeError}
                        inputProps={{
                            name: name,
                            id: 'outlined-age-native-simple',
                        }}
                        endAdornment={
                            loader && <InputMinLoader/>
                        }
                    >
                        <option aria-label="None" value=""/>
                        {language ?
                            language.map((option, j) => (
                                <option data-key={option.code ? option.code : j} key={j}
                                        value={type === 'id' ? option.id : option}
                                >
                                    {option}
                                </option>
                            )) :
                            list.length && list.map((option, j) => (
                                <option data-key={option.code ? option.code : j} key={j}
                                        value={type === 'id' ? option.id || option._id : option.firstName || option.name}
                                >
                                    {option.firstName || option.name}
                                </option>
                            ))
                        }
                    </Select>
                    {
                        errorFalse ? null : <FormHelperText className={classes.errorText}>{typeError && typeError}</FormHelperText>
                    }
                </FormControl>
            </div>
        </>
    )
}


//generic






















