import React from "react";
import { Card } from "@eachbase/components";
import { serviceSingleStyles } from "./styles";
import { Colors, Images, makeCapitalize } from "@eachbase/utils";
import { AvailableHours } from "@eachbase/components/availability";

export const ClientAvailabilitySchedule = ({ availabilityData, data }) => {
   const classes = serviceSingleStyles();

   const generalInfo = [
      { title: "First Name", value: makeCapitalize(data?.firstName) },
      { title: "Middle Name", value: makeCapitalize(data?.middleName) },
      { title: "Last Name", value: makeCapitalize(data?.lastName) },
      { title: "Code", value: data?.code },
   ].filter((item) => !!item.value);

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
