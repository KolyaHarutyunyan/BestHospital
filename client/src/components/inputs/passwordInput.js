import React, { useState } from "react";
import { inputsStyle } from "./styles";
import {
   FormControl,
   Input,
   InputAdornment,
   IconButton,
   OutlinedInput,
   InputLabel,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { ErrMessage } from "../messages";

export const PasswordInput = ({
   name,
   variant,
   handleChangePassword,
   disabled,
   value,
   placeholder,
   typeError,
   validator,
   sendBoolean,
   styles,
}) => {
   const classes = inputsStyle();
   const [validEmail, setValidEmail] = useState(false);
   const [values, setValues] = React.useState({
      amount: "",
      password: "",
      weight: "",
      weightRange: "",
      showPassword: false,
   });

   const handleChanges = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
      handleChangePassword(event);
   };

   const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
   };

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

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
      <div style={{ ...styles }}>
         {variant === "accountPassword" ? (
            <FormControl className={classes.SignInInput} variant="outlined">
               <InputLabel className={classes.inputShrink} htmlFor="outlined-adornment-password">
                  {placeholder}
               </InputLabel>
               <OutlinedInput
                  error={!!typeError}
                  disabled={disabled}
                  id="outlined-adornment-password"
                  name={name}
                  type={values.showPassword ? "text" : "password"}
                  value={value}
                  onChange={handleChanges("password")}
                  onFocus={() => setValidEmail(false)}
                  onBlur={(e) => chechValid(e)}
                  endAdornment={
                     <InputAdornment position="end">
                        <IconButton
                           disabled={disabled}
                           aria-label="toggle password visibility"
                           onClick={handleClickShowPassword}
                           onMouseDown={handleMouseDownPassword}
                        >
                           {disabled === true ? (
                              <VisibilityOff />
                           ) : values.showPassword ? (
                              <Visibility />
                           ) : (
                              <VisibilityOff />
                           )}
                        </IconButton>
                     </InputAdornment>
                  }
               />
               <ErrMessage type={"Pass"} text={typeError} />
            </FormControl>
         ) : (
            <FormControl disabled={disabled} className={classes.SignInInput}>
               <InputLabel htmlFor="outlined-adornment-password">{placeholder}</InputLabel>
               <Input
                  onBlur={(e) => chechValid(e)}
                  error={!!typeError}
                  className={classes.PasswordInput}
                  disabled={disabled}
                  id="standard-adornment-password"
                  name={name}
                  type={values.showPassword ? "text" : "password"}
                  value={value}
                  onChange={handleChanges("password")}
                  placeholder={placeholder}
                  endAdornment={
                     <InputAdornment position="end">
                        <IconButton
                           disabled={disabled}
                           aria-label="toggle password visibility"
                           onClick={handleClickShowPassword}
                           onMouseDown={handleMouseDownPassword}
                        >
                           {disabled === true ? (
                              <VisibilityOff />
                           ) : values.showPassword ? (
                              <Visibility />
                           ) : (
                              <VisibilityOff />
                           )}
                        </IconButton>
                     </InputAdornment>
                  }
               />
               <ErrMessage type={"Pass"} text={typeError} />
            </FormControl>
         )}
      </div>
   );
};
