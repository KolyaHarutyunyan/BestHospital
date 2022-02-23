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
   },
   accordArrowStyle: {
      transform: "rotate(0deg)",
      transition: "transform 0.2s linear",
      "&.rotate": { transform: "rotate(-180deg)" },
   },
   menuItemsStyle: {
      lineHeight: "21px",
      fontSize: "14px",
      color: Colors.TextSecondary,
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
      "& ol": {
         width: "100%",
         "& li": {
            fontSize: "14px",
            fontWeight: 400,
            color: Colors.TextSecondary,
            "&.active": { color: Colors.BackgroundBlue },
            "&:not(:first-of-type)": { marginTop: "16px" },
            "& a": { color: "inherit" },
         },
      },
   },
}));
