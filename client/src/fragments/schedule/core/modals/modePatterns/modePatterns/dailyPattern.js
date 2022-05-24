import React from "react";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { modePatternsStyle } from "./style";
import { inputsStyle } from "@eachbase/components/inputs/styles";

export const DailyPattern = ({
   handleChange,
   handleChangeDay,
   handleChangeConsecutive,
   inputs,
}) => {
   const classes = modePatternsStyle();
   const inputsClasses = inputsStyle();

   const datesAreNotMentioned = !inputs.startDate || !inputs.endDate;
   const countIsChecked =
      !datesAreNotMentioned && inputs.repeatCountCheckbox === "repeatCountCheckbox";
   const consecIsChecked =
      !datesAreNotMentioned && inputs.repeatConsecutive === "repeatConsecutive";

   const radioClasses = {
      root: inputsClasses.radio,
      checked: inputsClasses.checked,
   };

   return (
      <div>
         <FormControl component="fieldset">
            <RadioGroup
               onChange={handleChange}
               row
               aria-label="gender"
               name="dailyPattern"
            >
               <div className={classes.dailyBoxStyle}>
                  <FormControlLabel
                     onChange={handleChange}
                     name="repeatCountCheckbox"
                     className={inputsClasses.radioInputLabel}
                     value="repeatCountCheckbox"
                     label="Recur every"
                     control={<Radio checked={countIsChecked} classes={radioClasses} />}
                     disabled={datesAreNotMentioned}
                  />
                  <input
                     type={"number"}
                     value={inputs.repeatCount || ""}
                     disabled={datesAreNotMentioned || !countIsChecked}
                     name={"repeatCount"}
                     onChange={handleChangeDay}
                     className={classes.smallInput}
                  />
                  <span className={classes.days}>day(s)</span>
               </div>
               <FormControlLabel
                  onChange={handleChangeConsecutive}
                  name="repeatConsecutive"
                  className={inputsClasses.radioInputLabel}
                  value="repeatConsecutive"
                  label="Recur every weekday"
                  control={<Radio checked={consecIsChecked} classes={radioClasses} />}
                  disabled={datesAreNotMentioned}
               />
            </RadioGroup>
         </FormControl>
      </div>
   );
};
