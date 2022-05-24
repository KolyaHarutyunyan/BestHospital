import React from "react";
import { modePatternsStyle } from "./style";

export const MonthlyPattern = ({ inputs, handleChangeMounthDay, handleChangeMounth }) => {
   const classes = modePatternsStyle();

   const datesAreNotMentioned = !inputs.startDate || !inputs.endDate;

   return (
      <div>
         <div className={classes.patternBoxStyle}>
            <span className={classes.weeks}>Recur day</span>
            <input
               type={"number"}
               value={inputs.repeatDayMonth || ""}
               name={"repeatDayMonth"}
               onChange={handleChangeMounthDay}
               className={classes.smallInput}
               disabled={datesAreNotMentioned}
            />
            <span className={classes.days}>of every</span>
            <input
               type={"number"}
               value={inputs.repeatMonth || ""}
               name={"repeatMonth"}
               onChange={handleChangeMounth}
               className={classes.smallInput}
               disabled={datesAreNotMentioned}
            />
            <span className={classes.days}>month(s)</span>
         </div>
      </div>
   );
};
