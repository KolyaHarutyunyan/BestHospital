import { makeStyles } from "@material-ui/core/styles";

export const modePatternsStyle = makeStyles(() => ({
   smallInput: {
      width: "50px",
      height: "36px",
      border: "1px solid #347AF0",
      borderRadius: "4px",
      padding: "0 5px",
   },
   days: {
      fontSize: "16px",
      fontWeight: "500",
      color: "#4B5C68",
      marginLeft: "8px",
      marginRight: "8px",
   },
   dailyBoxStyle: {
      display: "flex",
      alignItems: "center",
   },
   patternBoxStyle: {
      display: "flex",
      alignItems: "center",
      marginTop: "16px",
   },
   weeks: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#4B5C68",
      marginRight: "8px",
   },
   formGroup: {
      display: "flex",
      flexDirection: "row",
      marginTop: "20px",
      "& .MuiIconButton-label": {
         color: "#347AF0",
      },
      "& .MuiTypography-body1": {
         fontSize: "16px",
         fontWeight: "600",
         color: "#4B5C68",
      },
   },
}));
