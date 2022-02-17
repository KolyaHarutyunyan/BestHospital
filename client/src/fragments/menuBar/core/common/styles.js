import { makeStyles } from "@material-ui/core";
import { Backgrounds, Colors } from "@eachbase/utils";

export const leftBarCommonStyle = makeStyles(() => ({
   linkWrapperActive: {
      borderLeft: `4px solid ${Colors.BackgroundBlue}`,
      borderRadius: "0px 8px 8px 0px",
   },
   activeListItem: {
      background: Backgrounds.lightBlue,
      marginTop: "16px",
      paddingLeft: "8px",
      marginLeft: "8px",
      height: "36px",
      width: "200px",
      borderRadius: "8px",
   },
   activeListItemFalse: {
      background: Backgrounds.lightBlue,
      marginTop: "16px",
      paddingLeft: "8px",
      marginLeft: "8px",
      height: "36px",
      width: "40px",
      borderRadius: "8px",
   },
   listItem: {
      width: "40px",
      marginTop: "16px",
      paddingLeft: "8px",
      marginLeft: "12px",
      borderRadius: "4px",
      height: "36px",
   },
   menuItemsStyle: {
      lineHeight: "21px",
      fontSize: "14px",
      color: Colors.TextSecondary,
      marginLeft: "8px",
   },
   menuActiveItemsStyle: {
      lineHeight: "21px",
      fontSize: "14px",
      color: Colors.BackgroundBlue,
      marginLeft: "8px",
   },
}));
