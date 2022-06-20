import { Card } from "@eachbase/components";
import { Colors, Images } from "@eachbase/utils";
import {
   getStaffAddressInfo,
   getStaffGeneralInfo,
   getStaffOtherDetails,
} from "./constants";
import { serviceSingleStyles } from "./styles";

export const StaffGeneral = ({ staffGeneral }) => {
   const classes = serviceSingleStyles();

   const generalInfo = getStaffGeneralInfo(staffGeneral);
   const addressInfo = getStaffAddressInfo(staffGeneral);
   const otherDetails = getStaffOtherDetails(staffGeneral);

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
         <Card
            width="32.5%"
            cardInfo={addressInfo}
            showHeader={true}
            title="Address"
            color={Colors.BackgroundMango}
            icon={Images.address}
         />
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
