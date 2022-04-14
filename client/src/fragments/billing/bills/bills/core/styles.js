import { makeStyles } from "@material-ui/core";
import { Colors } from "@eachbase/utils";

export const billTableStyle = makeStyles(() => ({
   billTableWithoutScrollStyle: {
      maxWidth: "700px",
      "&.narrow": { maxWidth: "500px" },
      "@media(max-width: 1540px)": {
         maxWidth: "500px",
         "&.narrow": { maxWidth: "400px" },
      },
      width: "100%",
      marginBottom: "6px",
   },
   billTableWithScrollStyle: {
      overflow: "auto",
      flexGrow: 1,
      marginBottom: "6px",
   },
   filtersBoxStyle: { display: "flex" },
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
