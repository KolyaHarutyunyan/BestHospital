import React from "react";
import { Card, AvailableHours } from "@eachbase/components";
import { serviceSingleStyles } from "./styles";
import { Colors, Images } from "@eachbase/utils";
import { getStaffGeneralInfo } from "./constants";

export const StaffAvailability = ({ onModel, availabilityData, staffGeneral }) => {
   const classes = serviceSingleStyles();

   const generalInfo = getStaffGeneralInfo(staffGeneral);

   return (
      <div className={classes.staffGeneralWrapper}>
         <Card
            width="49%"
            cardInfo={generalInfo}
            showHeader={true}
            title="General Info"
            color={Colors.BackgroundBlue}
            icon={Images.generalInfoIcon}
         />
         <AvailableHours
            onModel={onModel}
            availabilityData={availabilityData}
            marginLeft="24px"
         />
      </div>
   );
};
