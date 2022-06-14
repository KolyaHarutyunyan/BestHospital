import { ActiveInactiveStatus } from "@eachbase/utils";
import { cardStyle } from ".";

export function getTitleDisplay(givenTitle = "", givenValue = "") {
   const classes = cardStyle();

   return typeof givenTitle === "object" && typeof givenValue === "object" ? (
      <div className={classes.titleBoxStyle}>
         {givenTitle.first && givenValue.first && (
            <p className={`${classes.titleStyle} several`}>{givenTitle.first}:</p>
         )}
         {givenTitle.second && givenValue.second && (
            <p className={`${classes.titleStyle} several`}>{givenTitle.second}:</p>
         )}
      </div>
   ) : (
      <p className={classes.titleStyle}>{givenTitle}:</p>
   );
}

export function getValueDisplay(givenValue = "", givenTitle = "") {
   const classes = cardStyle();

   return typeof givenTitle === "object" && typeof givenValue === "object" ? (
      givenTitle.first === "Status" ? (
         <div className={classes.valueBoxStyle}>
            {givenValue.first && givenTitle.first && (
               <p
                  className={`${
                     classes.valueStyle
                  } several statusStyle ${ActiveInactiveStatus(givenValue.first)}`}
               >
                  {givenValue.first}
               </p>
            )}
            {givenValue.second && givenTitle.second && (
               <p className={`${classes.valueStyle} several`}>{givenValue.second}</p>
            )}
         </div>
      ) : (
         <div className={classes.valueBoxStyle}>
            {givenValue.first && givenTitle.first && (
               <p className={`${classes.valueStyle} several`}>{givenValue.first}</p>
            )}
            {givenValue.second && givenTitle.second && (
               <p className={`${classes.valueStyle} several`}>{givenValue.second}</p>
            )}
         </div>
      )
   ) : givenTitle === "Website" ? (
      <a href={givenValue} target="_blank" className={classes.linkStyle}>
         {givenValue}
      </a>
   ) : givenTitle === "Status" ? (
      <p
         className={`${classes.valueStyle} statusStyle ${ActiveInactiveStatus(
            givenValue
         )}`}
      >
         {givenValue}
      </p>
   ) : (
      <p className={classes.valueStyle}>{givenValue}</p>
   );
}
