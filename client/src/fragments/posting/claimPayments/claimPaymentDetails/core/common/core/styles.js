import { makeStyles } from "@material-ui/core";
import { Colors, Shadow } from "@eachbase/utils"; 

export const claimReceivableTableStyle = makeStyles(() => ({
    claimRecTableStyle: {
        width: "100%",
        padding: "24px",
        boxShadow: Shadow.modalShadow,
        borderRadius: "0 0 8px 8px",
        "@media(max-width: 1280px)": { padding: "16px 8px" },
     },
     claimRecContainerStyle: { width: "100%" },
     claimRecTitleStyle: {
        fontSize: "16px",
        fontWeight: 600,
        color: Colors.TextSecondary,
        "@media(max-width: 1280px)": { paddingLeft: "6px" },
     },
     claimReceivableContainerStyle: {
        width: "100%",
        marginTop: "25px",
     },
}));