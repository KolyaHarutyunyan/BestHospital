import React, { useState } from "react";
import { inputsStyle } from "./styles";
import TextField from "@material-ui/core/TextField";
import { ErrMessage } from "../messages";
import { InputMinLoader } from "./inputMiniLoader";

export const ValidationInput = ({
  multiline, style, className, autoComplete,placeholder,
  typeError, Length, disabled,
  value, type, onChange, name,
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
      <div className={style ? style : classes.SignInInput}>
        <TextField
          style={{ ...styles }}
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
              loader && <InputMinLoader />
            )
          }}
        />
        <ErrMessage text={typeError} />
      </div>
    </>
  );
};
