import { Colors, Shadow } from "@eachbase/utils";
import { makeStyles } from "@material-ui/styles";

export const imagesFileUploaderCoreStyle = makeStyles(() => ({
    fileRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 2px",
        borderBottom: `1px solid ${Colors.BackgroundBlue}`,
    },
    fileDetailsBoxStyle: {
        display: "flex",
        alignItems: "center",
    },
    imageContainer: {
        width: "60px",
        height: "73px",
        borderRadius: "4px",
        boxShadow: Shadow.changeShadow,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "24px",
        flex: "0 0 60px",
        position: "relative ",
    },
    fileSize: {
        fontSize: "10px",
        color: Colors.TextLightGray,
        textAlign: "center",
    },
    removeIcon: {
        position: "absolute",
        top: "-5px",
        right: "-5px",
        cursor: "pointer",
    },
    fileNameDetailsStyle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        height: "73px",
    },
    fileName: {
        fontSize: "12px",
        fontWeight: 600,
        color: Colors.TextSecondary,
    },
    fileNameInputBoxStyle: {
        width: "268px",
        height: "40px",
        border: `1px solid ${Colors.ThemeBlue}`,
        borderRadius: "4px",
        backgroundColor: Colors.BackgroundWhite,
        overflowX: "auto",
        fontSize: "14px",
        fontWeight: 400,
        color: Colors.TextSecondary,
    },
    fileNameInputStyle: {
        border: "none",
        outline: "none",
        width: "100%",
        height: "100%",
        padding: "10px 16px",
        backgroundColor: "inherit",
    },
    fileNameStyle: {
        width: "100%",
        height: "100%",
        padding: "10px 16px",
        backgroundColor: "inherit",
        textAlign: "left",
    },
    downloadLinkStyle: {
        width: "32px",
        height: "32px",
        justifyContent: "center",
        alignItems: "flex-start",
        "& img": { marginLeft: "0px" },
        alignSelf: "flex-end",
        marginBottom: "4px",
        "&.linkPosition": { 
            alignSelf: "center",
            marginBottom: "0px",
        }
    },
}));