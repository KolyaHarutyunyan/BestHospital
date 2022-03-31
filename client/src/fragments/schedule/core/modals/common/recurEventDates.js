import React from "react";
import { ValidationInput } from "@eachbase/components";
import { scheduleCommonStyle } from "./style";

export const RecurEventDates = ({ inputs, handleChange }) => {
   const classes = scheduleCommonStyle();

   return (
      <>
         <p className={classes.recurTitle}>Date Range</p>
         <div className={classes.dateInputs}>
            <ValidationInput
               variant={"outlined"}
               onChange={handleChange}
               value={inputs.startDate}
               type={"date"}
               name={"startDate"}
            />
            <ValidationInput
               style={classes.endDate}
               variant={"outlined"}
               onChange={handleChange}
               value={inputs.endDate}
               type={"date"}
               name={"endDate"}
            />
         </div>
      </>
   );
};
