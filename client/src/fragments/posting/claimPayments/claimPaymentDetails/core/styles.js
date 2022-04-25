import { makeStyles } from "@material-ui/core";
import { Colors } from "@eachbase/utils";

export const claimPaymentDetailsCoreStyle = makeStyles(() => ({
   claimContainerStyle: {
      width: "100%",
      marginTop: "16px",
   },
   voidClaimPaymentWrapperStyle: {
      "& > div:first-of-type": { paddingBottom: "0px" },
      "& > div:last-of-type": { paddingTop: "8px" },
      "& > button": { backgroundColor: Colors.BackgroundWater },
   },
}));
