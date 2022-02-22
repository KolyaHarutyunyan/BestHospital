import { makeStyles } from "@material-ui/core";
import { Backgrounds, Colors } from "@eachbase/utils";

export const leftBarCommonStyle = makeStyles(() => ({
   linkWrapperActive: {
      borderLeft: `4px solid ${Colors.BackgroundBlue}`,
      borderRadius: "0px 8px 8px 0px",
   },
   accordionStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      marginTop: "16px",
   },
   listItem: {
      width: "200px",
      height: "36px",
      marginTop: "16px",
      marginLeft: "12px",
      "&.accordionItem": {
         marginTop: "0px",
         "& > img:last-of-type": {},
      },
      paddingLeft: "8px",
      borderRadius: "4px",
      "&.active": {
         borderRadius: "8px",
         background: Backgrounds.lightBlue,
      },
      "&.passive": { width: "40px" },
   },
   menuItemsStyle: {
      lineHeight: "21px",
      fontSize: "14px",
      color: Colors.TextSecondary,
      marginLeft: "8px",
      "&.active": { color: Colors.BackgroundBlue },
   },
}));
