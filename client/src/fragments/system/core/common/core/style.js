import { makeStyles } from "@material-ui/core";
import { Colors, Shadow } from "@eachbase/utils";

export const systemCoreCommonCoreStyle = makeStyles(() => ({
   tableTheadStyle: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: Shadow.tableTheadShadow,
      backgroundColor: Colors.BackgroundWater,
      borderRadius: "8px",
      cursor: "default",
   },
   thStyle: {
      maxWidth: "242px",
      width: "100%",
      height: "51px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "32px",
      "@media(max-width: 1720px)": { paddingLeft: "16px" },
      fontSize: "14px",
      fontWeight: 600,
      color: Colors.BackgroundBlue,
   },
   tbodyContainerStyle: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "8px",
      marginTop: "8px",
      backgroundColor: Colors.BackgroundWhite,
      boxShadow: Shadow.tableTheadShadow,
      cursor: "default",
      "&:hover": { backgroundColor: Colors.BackgroundWater },
   },
   tdStyle: {
      maxWidth: "242px",
      width: "100%",
      height: "51px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "32px",
      "@media(max-width: 1720px)": { paddingLeft: "16px" },
      fontSize: "14px",
      fontWeight: 400,
      color: Colors.TextSecondary,
   },
   editServiceTypeIconStyle: {
      width: "24px",
      height: "24px",
      cursor: "pointer",
   },
   editServiceTypeWrapperStyle: {
      "& > button": { backgroundColor: Colors.BackgroundWater },
      "& > div": {
         textAlign: "left",
         "&:first-of-type": { paddingBottom: "0" },
      },
   },
}));