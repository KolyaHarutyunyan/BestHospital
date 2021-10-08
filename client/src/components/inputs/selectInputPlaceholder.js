import React from "react";
import {Select, FormControl, FormHelperText,} from "@material-ui/core";
import {inputsStyle} from "./styles";
import MenuItem from "@material-ui/core/MenuItem";
import {InputMinLoader} from "./inputMiniLoader";
import {makeStyles} from "@material-ui/core/styles";
import {Colors} from "@eachbase/utils";

const usePlaceholderStyles = makeStyles(() => ({
    placeholder: {
        color: Colors.TextMiddleGray,
        opacity: .7
    }
}));

const Placeholder = ({children}) => {
    const classes = usePlaceholderStyles();
    return <div className={classes.placeholder}>{children}</div>;
};

export const SelectInputPlaceholder = ({
                                           className,
                                           loader,
                                           name,
                                           handleSelect,
                                           style,
                                           value,
                                           list,
                                           typeError,
                                           type,
                                           language,
                                           styles,
                                           placeholder
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
                        renderValue={
                            current !== "" ? undefined : () => <Placeholder>{placeholder}</Placeholder>
                        }
                    >
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
                    <FormHelperText className={classes.errorText}>{typeError && typeError}</FormHelperText>
                </FormControl>
            </div>
        </>

    )
}
