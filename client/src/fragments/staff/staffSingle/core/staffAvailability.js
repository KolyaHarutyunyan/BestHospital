import React from "react";
import { Card, AvailableHours } from "@eachbase/components";
import { serviceSingleStyles } from "./styles";
import { Colors, Images } from "@eachbase/utils";

export const StaffAvailability = ({ onModel, availabilityData, staffGeneral }) => {
   const classes = serviceSingleStyles();

   const generalInfo = [
      { title: "First Name", value: staffGeneral?.firstName },
      { title: "Middle Name", value: staffGeneral?.middleName },
      { title: "Last Name", value: staffGeneral?.lastName },
      { title: "Primary Email", value: staffGeneral?.email },
      { title: "Secondary Email", value: staffGeneral?.secondaryEmail },
      { title: "Primary Phone Number", value: staffGeneral?.phone },
      { title: "Secondary Phone Number", value: staffGeneral?.secondaryPhone },
   ];

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
