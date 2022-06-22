import { makeStyles } from "@material-ui/core";

export const systemCoreCommonStyle = makeStyles(() => ({
   serviceTypeTableStyle: {
      width: "100%",
      marginTop: "16px",
      paddingBottom: "16px",
   },
   systemInputStyles: {
      maxWidth: "400px",
      width: "100%",
      "&.create": {
         maxWidth: "181px",
         width: "100%",
         marginRight: "16px",
         "& .MuiOutlinedInput-root": {
            height: "36px !important",
         },
      },
   },
}));
