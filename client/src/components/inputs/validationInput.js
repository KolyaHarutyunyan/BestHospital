import React, { Fragment, useState } from "react";
import { inputsStyle } from "./styles";
import TextField from "@material-ui/core/TextField";
import { ErrMessage } from "../messages";
import { InputMinLoader } from "./inputMiniLoader";

export const ValidationInput = ({
   inputLabel,
   keepLabelArea,
   errorFalse,
   multiline,
   style,
   className,
   autoComplete,
   placeholder,
   typeError,
   Length,
   disabled,
   value,
   type,
   onChange,
   name,
   label,
   validator,
   sendBoolean,
   variant,
   loader,
   styles,
   handleBlur,
   size,
   errorStyle,
}) => {
   const classes = inputsStyle();
   const [validEmail, setValidEmail] = useState(false);

   const chechValid = (e) => {
      handleBlur && handleBlur();
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
         return (e.target.value = e.target.value.slice(0, Length));
      }
   };

   return (
      <Fragment>
         <div className={style ? style : classes.SignInInput}>
            <p className={`${classes.labelStyle} ${keepLabelArea ? "withoutLabel" : ""}`}>
               {inputLabel}
            </p>
            <TextField
               onInput={(e) => maxLength(e)}
               style={{ ...styles }}
               className={
                  className
                     ? className
                     : size === "small"
                     ? classes.inputTextFieldSmall
                     : classes.inputTextField
               }
               variant={variant}
               label={label}
               name={name}
               placeholder={placeholder}
               type={type}
               value={value ? value : ""}
               InputLabelProps={{
                  shrink: type === "date" ? true : !!value,
               }}
               id="standard-basic"
               autoComplete={autoComplete ? autoComplete : "Off"}
               error={!!typeError}
               onWheel={() => document.activeElement.blur()}
               disabled={disabled}
               maxLength={Length}
               onChange={(ev) => onChange(ev)}
               onFocus={() => setValidEmail(false)}
               onBlur={(e) => chechValid(e)}
               fullWidth
               multiline={multiline}
               InputProps={{
                  endAdornment: loader && <InputMinLoader />,
               }}
            />
            {errorFalse ? null : (
               <ErrMessage
                  style={errorStyle ? errorStyle : { marginBottom: "12px" }}
                  text={typeError}
               />
            )}
         </div>
      </Fragment>
   );
};
