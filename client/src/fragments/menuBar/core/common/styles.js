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
   accordArrowStyle: {
      transform: "rotate(0deg)",
      transition: "transform 0.2s linear",
      "&.rotate": { transform: "rotate(-180deg)" },
   },
   menuItemsStyle: {
      fontSize: "14px",
      fontWeight: 600,
      color: Colors.TextSecondary,
      lineHeight: "21px",
      marginLeft: "8px",
      "&.active": { color: Colors.BackgroundBlue },
   },
   sectionsListBoxStyle: {
      paddingLeft: "52px",
      paddingTop: "8px",
      height: "0px",
      overflow: "hidden",
      transition: "height 0.2s linear",
      "&.shown": { height: "200px" },
      "& > div": {
         width: "100%",
         "& > a": {
            fontSize: "14px",
            fontWeight: 600,
            color: Colors.TextSecondary,
            marginRight: "4px",
            display: "block",
            "&.active": { color: Colors.BackgroundBlue },
            "&:not(:first-of-type)": { marginTop: "16px" },
            "& > div": {
               color: "inherit",
               borderRadius: "4px",
            },
         },
      },
   },
}));
