import { makeStyles } from "@material-ui/core";
import { Colors, Shadow } from "@eachbase/utils";

export const clientEnrollmentCommonCoreStyle = makeStyles(() => ({
   tableTheadStyle: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: Shadow.tableTheadShadow,
      backgroundColor: Colors.BackgroundWater,
      borderRadius: "8px",
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
   terminationDateTextStyle: { marginLeft: "16px" },
   editModifierIconStyle: {
      width: "24px",
      height: "24px",
      cursor: "pointer",
   },
   loadStyle: {
      display: "flex",
      alignItems: "center",
   },
   radio: {
      color: "#D263E4",
      "&$checked": { color: "#D263E4" },
   },
   checked: { color: "green" },
}));
