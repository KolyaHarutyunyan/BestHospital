import { makeStyles } from "@material-ui/core/styles";
import { Colors, Shadow } from "@eachbase/utils";

export const PayrollSetupStyles = makeStyles(() => ({
   wrapper: {
      display: "flex",
      alignItems: "flex-start",
   },
   tabContainer: {
      display: "inline-block",
      backgroundColor: "white",
      boxShadow: Shadow.noteModalShadow,
      lineHeight: 1,
      borderRadius: 8,
   },
   activeStepText: {
      backgroundColor: Colors.BackgroundBlue,
      borderRadius: 8,
      color: "white!important",
   },
   stepText: {
      fontSize: 14,
      color: Colors.TextSecondary,
      fontWeight: 600,
      display: "inline-block",
      verticalAlign: "middle",
      padding: "9px 24px",
      cursor: "pointer",
      margin: 2,
   },
   payrollSetupWrapper: {},
   payCodeType: {
      padding: "32px 32px 40px 32px",
      boxShadow: Shadow.noteModalShadow,
      borderRadius: 8,
      width: "100%",
      background: "white",
   },
   flexBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 24,
   },
   checkboxContainer: {
      padding: "16px",
      height: "86px",
      borderRadius: "8px",
      boxShadow: Shadow.noteModalShadow,
      fontSize: "14px",
      color: Colors.TextSecondary,
      fontWeight: 600,
      "& > p": { marginBottom: "8px" },
      "&:first-child": { marginRight: "10px" },
      "&:last-child": { marginLeft: "10px" },
   },
   editModalTitle: {
      fontSize: 32,
      color: Colors.TextSecondary,
      fontWeight: "bold",
      marginBottom: 40,
   },
   modalTitle: {
      fontSize: 18,
      color: Colors.TextSecondary,
      fontWeight: "bold",
      marginBottom: 10,
   },
   modalSubTitle: {
      fontSize: 14,
      color: Colors.TextSecondary,
      marginBottom: 30,
   },
   icons: {
      cursor: "pointer",
      display: "flex",
      "& img:last-child": {
         marginLeft: 16,
      },
   },

   // table styles
   paycodeTypeTableStyle: {
      width: "100%",
      marginTop: "34px",
      paddingBottom: "16px",
   },
   overtimeSettingTableStyle: {
      width: "100%",
      marginTop: "34px",
      paddingBottom: "16px",
   },
   mileageCompensationTableStyle: {
      width: "100%",
      marginTop: "34px",
      paddingBottom: "16px",
   },
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
   editPaycodeTypeIconStyle: {
      width: "24px",
      height: "24px",
      cursor: "pointer",
   },
   editOvertimeSettingIconStyle: {
      width: "24px",
      height: "24px",
      cursor: "pointer",
   },
   editMileageCompensationIconStyle: {
      width: "24px",
      height: "24px",
      cursor: "pointer",
   },
   editPaycodeTypeWrapperStyle: {
      "& > button": { backgroundColor: Colors.BackgroundWater },
      "& > div": {
         textAlign: "left",
         "&:first-of-type": { paddingBottom: "0" },
      },
   },
   editOvertimeSettingWrapperStyle: {
      "& > button": { backgroundColor: Colors.BackgroundWater },
      "& > div": {
         textAlign: "left",
         "&:first-of-type": { paddingBottom: "0" },
      },
   },
   editMileageCompensationWrapperStyle: {
      "& > button": { backgroundColor: Colors.BackgroundWater },
      "& > div": {
         textAlign: "left",
         "&:first-of-type": {
            maxWidth: "332px",
            paddingBottom: "0",
            "& > h2": { lineHeight: "48px" },
         },
      },
   },
   noItemContainerStyle: {
      width: "100%",
      height: "504px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
   // end
}));
