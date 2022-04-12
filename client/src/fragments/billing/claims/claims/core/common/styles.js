import { makeStyles } from "@material-ui/core";
import { Colors } from "@eachbase/utils";

export const claimTHeadTBodyStyle = makeStyles(() => ({
   theadStyle: {
      boxShadow: "0px 4px 2px #347af01a",
      backgroundColor: "#EBF2FD",
      "& > tr > th": {
         padding: "0 32px",
         "& > div": {
            maxWidth: "unset",
            width: "100%",
         },
      },
   },
   paymentRefStyle: { color: Colors.BackgroundBlue },
}));
