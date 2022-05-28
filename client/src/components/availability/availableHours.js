import React from "react";
import { availabilityStyles } from "./styles";
import { AvailableHourseBox } from "../../fragments/client/clientSingle/core/availableHourseBox";
import { FindLoad } from "@eachbase/utils";
import { Loader } from "../loader";

const shortDayNames = (name) => {
   switch (name) {
      case "monday":
         return "Mon";
      case "tuesday":
         return "tue";
      case "wednesday":
         return "wed";
      case "thursday":
         return "thu";
      case "friday":
         return "fri";
      case "saturday":
         return "sat";
      case "sunday":
         return "sun";
   }
};

export const AvailableHours = ({ availabilityData, marginLeft }) => {
   const classes = availabilityStyles();

   const load = FindLoad("GET_AVAILABILITY_SCHEDULE_GLOBAL");

   return (
      <div
         className={classes.availableHours}
         style={{ marginLeft: marginLeft ? marginLeft : "0", minHeight: 503 }}
      >
         <div className={classes.availableHoursBlock}>
            {load.length ? (
               <Loader />
            ) : Array.isArray(availabilityData) === false ? (
               Object.keys(availabilityData).map((item, index) => {
                  return (
                     <React.Fragment key={index}>
                        <AvailableHourseBox
                           key={index}
                           day={shortDayNames(item)}
                           info={availabilityData && availabilityData[item]}
                        />
                     </React.Fragment>
                  );
               })
            ) : (
               <p className={classes.noItems}>No Available Hours Yet</p>
            )}
         </div>
      </div>
   );
};
