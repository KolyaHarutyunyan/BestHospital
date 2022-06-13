import React from "react";
import { Card } from "@eachbase/components";
import { serviceSingleStyles } from "./styles";
import { Colors, Images } from "@eachbase/utils";
import { getGeneralInfo, getOtherDetails } from "./constants";

export const ClientGeneral = ({ data }) => {
   const classes = serviceSingleStyles();

   const generalInfo = getGeneralInfo(data);
   const otherDetails = getOtherDetails(data);

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
         <Card
            width="32.5%"
            cardInfo={otherDetails}
            showHeader={true}
            title="Other Details"
            color={Colors.ThemeRed}
            icon={Images.otherDetailsIcon}
         />
      </div>
   );
};
