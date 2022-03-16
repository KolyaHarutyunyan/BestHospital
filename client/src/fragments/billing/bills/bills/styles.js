import { makeStyles } from "@material-ui/core";
import { Colors } from "@eachbase/utils";

export const billsStyle = makeStyles(() => ({
   filtersBoxStyle: { display: "flex" },
   billsTableStyle: {
      display: "flex",
      width: "100%",
      maxWidth: "1780px",
      "&.narrow": { maxWidth: "1622px" },
      marginBottom: "10px",
      "@media (max-width: 1280px)": {
         maxWidth: "1145px",
         "&.narrow": { maxWidth: "990px" },
      },
   },
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
         {
            border: "none",
         },
   },
}));
