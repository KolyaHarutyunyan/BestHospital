import React from "react";
import { Card } from "@eachbase/components";
import { serviceSingleStyles } from "./styles";
import { Colors, Images } from "@eachbase/utils";
import { AvailableHours } from "@eachbase/components/availability";
import { getGeneralInfo } from "./constants";

export const ClientAvailabilitySchedule = ({ availabilityData, data }) => {
   const classes = serviceSingleStyles();

   const generalInfo = getGeneralInfo(data);

   return (
      <div className={classes.staffGeneralWrapper}>
         <Card
            width="32.5%"
            cardInfo={generalInfo}
            showHeader={true}
            title="General Info"
            color={Colors.BackgroundBlue}
            icon={Images.generalInfoIcon}
         />
         <div className={classes.clearBoth} />
         <AvailableHours onModel="Client" availabilityData={availabilityData} />
      </div>
   );
};
