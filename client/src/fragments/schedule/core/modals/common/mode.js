import React from "react";
import { scheduleCommonStyle } from "./style";
import { inputsStyle } from "@eachbase/components/inputs/styles";
import {
   FormControl,
   FormControlLabel,
   Radio,
   RadioGroup,
} from "@material-ui/core";
import { makeCapitalize, makeEnum } from "@eachbase/utils";

const MODES = [
   { modeValue: "DAILY" },
   { modeValue: "WEEKLY" },
   { modeValue: "MONTHLY" },
];

export const Mode = ({ inputs, handleChange }) => {
   const classes = scheduleCommonStyle();
   const inputsClasses = inputsStyle();

   return (
      <>
         <p className={classes.recurTitle}>Mode</p>
         <div>
            <FormControl component="fieldset">
               <RadioGroup
                  onChange={handleChange}
                  row
                  aria-label="gender"
                  name="mode"
               >
                  {MODES.map((mode, index) => {
                     const isChecked = inputs.mode === makeEnum(mode.modeValue);
                     const radioClasses = {
                        root: inputsClasses.radio,
                        checked: inputsClasses.checked,
                     };

                     return (
                        <FormControlLabel
                           key={index}
                           className={inputsClasses.radioInputLabel}
                           value={makeEnum(mode.modeValue)}
                           label={makeCapitalize(mode.modeValue)}
                           control={
                              <Radio
                                 checked={isChecked}
                                 classes={radioClasses}
                              />
                           }
                        />
                     );
                  })}
               </RadioGroup>
            </FormControl>
         </div>
      </>
   );
};
