import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import { modePatternsStyle } from "./style";
import { makeCapitalize, WEEKDAYS } from "@eachbase/utils";

export const WeeklyPattern = ({
   inputs,
   handleChangeWeek,
   handleChangeWeeks,
}) => {
   const classes = modePatternsStyle();

   return (
      <div>
         <div className={classes.patternBoxStyle}>
            <span className={classes.weeks}>Recur every</span>
            <input
               type={"number"}
               value={inputs.repeatCountWeek || ""}
               name={"repeatCountWeek"}
               onChange={handleChangeWeek}
               className={classes.smallInput}
            />
            <span className={classes.days}>week(s)</span>
         </div>
         <FormGroup
            className={classes.formGroup}
            onChange={handleChangeWeeks}
            name="weeks"
         >
            {WEEKDAYS.map((weekday, index) => (
               <FormControlLabel
                  key={index}
                  value={index}
                  control={<Checkbox />}
                  name={makeCapitalize(weekday.weekdayValue)}
                  label={makeCapitalize(weekday.weekdayValue)}
               />
            ))}
         </FormGroup>
      </div>
   );
};
