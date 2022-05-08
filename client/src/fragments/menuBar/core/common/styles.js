import { makeStyles } from "@material-ui/core";
import { Backgrounds, Colors } from "@eachbase/utils";

export const leftBarCommonStyle = makeStyles(() => ({
   linkWrapperActive: {
      borderLeft: `4px solid ${Colors.BackgroundBlue}`,
      borderRadius: "0px 8px 8px 0px",
   },
   listItem: {
      width: "200px",
      height: "36px",
      marginTop: "8px",
      marginLeft: "12px",
      "&.accordionItem": { marginTop: "0px" },
      paddingLeft: "8px",
      borderRadius: "4px",
      "&.active": {
         borderRadius: "8px",
         background: Backgrounds.lightBlue,
      },
      "&.passive": { width: "40px" },
      "& span": {
         fontSize: "14px",
         fontWeight: 600,
         color: Colors.TextSecondary,
      },
   },
}));
