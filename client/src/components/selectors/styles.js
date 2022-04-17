import { makeStyles } from "@material-ui/core";
import { Colors } from "@eachbase/utils";

export const selectorsStyle = makeStyles(() => ({
   filterDropStyle: {
      width: "220px",
      "&.smallSize": {
         "@media(max-width: 1720px)": {
            width: "146px",
            marginRight: "16px",
         },
      },
      marginRight: "24px",
      "& h6:before, & li:before": { content: "unset" },
   },
   dateInputStyle: {
      width: "220px",
      "&.smallSize": {
         "@media(max-width: 1720px)": {
            width: "146px",
            marginRight: "16px",
            "&.first": { marginRight: "8px" },
         },
      },
      height: "60px",
      marginRight: "24px",
      "&.first": { marginRight: "16px" },
      "& > div > div": {
         border: "1px solid #A3B2BD80",
         backgroundColor: Colors.BackgroundWhite,
      },
      "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline": {
         border: "none",
      },
   },
}));
