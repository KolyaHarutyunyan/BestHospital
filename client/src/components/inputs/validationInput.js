import React, {useState} from "react";
import {inputsStyle} from "./styles";
import TextField from "@material-ui/core/TextField";
import {ErrMessage} from "../messages";
import {InputMinLoader} from "./inputMiniLoader";

export const ValidationInput = ({
                                    errorFalse, errorMessageStyle,
                                    multiline, style, className, autoComplete, placeholder,
                                    typeError, Length, disabled,
                                    value, type, onChange, name,
                                    label, validator, sendBoolean, variant, loader, styles,handleBlur
                                }) => {
    const classes = inputsStyle();
    const [validEmail, setValidEmail] = useState(false);

    const chechValid = (e) => {
        handleBlur && handleBlur()
        console.log('wwwwww')
        let Value = e.target.value;
        if (Value.length >= 1) {
            if (validator) {
                if (validator.test(Value)) {
                    setValidEmail(false);
                    sendBoolean(false);
                } else {
                    setValidEmail(true);
                    sendBoolean(true);
                }
            }
        }
    };

    let maxLength = (e) => {
        if (Length) {
            return e.target.value = e.target.value.slice(0, Length)
        }
    }

    return (
        <>
            <div className={style ? style : classes.SignInInput}>
                <TextField
                    onInput={(e) => maxLength(e)}
                    style={{...styles}}
                    className={className ? className : classes.inputTextField}
                    variant={variant}
                    label={label}
                    name={name}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    InputLabelProps={{
                        shrink: type === 'date' ? true : !!value,
                    }}
                    id="standard-basic"
                    autoComplete={autoComplete}
                    error={typeError}
                    disabled={disabled}
                    maxLength={Length}
                    onChange={(ev) => onChange(ev)}
                    onFocus={() => setValidEmail(false)}
                    onBlur={(e) => chechValid(e)}
                    fullWidth
                    multiline={multiline}

                    InputProps={{
                        endAdornment: (
                            loader && <InputMinLoader/>
                        )
                    }}
                />
                {
                    errorFalse ? null : <ErrMessage style={errorMessageStyle} text={typeError}/>
                }


            </div>
        </>
    );
};
