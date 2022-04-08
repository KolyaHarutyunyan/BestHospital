import { makeStyles } from "@material-ui/core/styles";
import { Colors, Shadow } from "@eachbase/utils";

export const receivableBillTableStyle = makeStyles(() => ({
   recBillTableStyle: {
      width: "100%",
      padding: "24px",
      boxShadow: Shadow.modalShadow,
      borderRadius: "0 0 8px 8px",
      "@media(max-width: 1280px)": { padding: "16px 8px" },
   },
   recBillContainerStyle: { width: "100%" },
   recBillTitleStyle: {
      fontSize: "16px",
      fontWeight: 600,
      color: Colors.TextSecondary,
      "@media(max-width: 1280px)": { paddingLeft: "6px" },
   },
   receivableBillContainerStyle: {
      width: "100%",
      marginTop: "25px",
   },
}));
