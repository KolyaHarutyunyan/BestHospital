import { makeStyles } from "@material-ui/core";
import { Colors } from "@eachbase/utils";

export const billTableStyle = makeStyles(() => ({
   billTableWithoutScrollStyle: {
      maxWidth: "850px",
      "&.narrow": { maxWidth: "650px" },
      minWidth: "550px",
      width: "100%",
      marginBottom: "6px",
      "& table": {
         borderSpacing: "0px 8px",
         borderCollapse: "separate",
      },
   },
   billTableWithScrollStyle: {
      maxWidth: "930px",
      "&.narrow": { maxWidth: "830px" },
      width: "100%",
      overflowX: "auto",
      "& table": {
         borderSpacing: "0px 8px",
         borderCollapse: "separate",
      },
   },
   filtersBoxStyle: { display: "flex" },
   filterDropStyle: {
      width: "220px",
      marginRight: "24px",
      "& h6:before, & li:before": { content: "unset" },
   },
   dateInputStyle: {
      width: "220px",
      marginRight: "24px",
      "& > div > div": {
         border: "1px solid #A3B2BD80",
         backgroundColor: Colors.BackgroundWhite,
      },
      "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline":
         { border: "none" },
   },
   dateRangeStyle: {
      fontSize: "14px",
      fontWeight: 600,
      color: Colors.BackgroundBlue,
      marginBottom: "8px",
   },
   filteredDatesBoxStyle: { display: "flex" },
}));
