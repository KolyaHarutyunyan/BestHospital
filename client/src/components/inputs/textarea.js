import React, {useState} from "react";
import {inputsStyle} from "./styles";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {ErrMessage} from "../messages";
import {InputMinLoader} from "./inputMiniLoader";

export const Textarea = (
    {
        maxRows, multiline, style, className, autoComplete,
        typeError, Length, disabled,
        value, onChange, name,
        label, validator, sendBoolean, variant, loader, styles, ...props
    }) => {
    const classes = inputsStyle();
    const [validEmail, setValidEmail] = useState(false);

    const chechValid = (e) => {
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

    return (
        <>
                <TextareaAutosize
                    maxRows={maxRows}
                    style={{...styles}}
                    className={className ? className : classes.TextareaTextField}
                    variant={variant}
                    placeholder={label}
                    name={name}
                    value={value}
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
                <ErrMessage text={typeError}/>
        </>
    );
};
