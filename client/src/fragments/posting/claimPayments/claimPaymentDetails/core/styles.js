import { makeStyles } from "@material-ui/core";
import { Colors } from "@eachbase/utils";

export const claimPaymentDetailsCoreStyle = makeStyles(() => ({
    claimContainerStyle: {
        width: "100%",
        marginTop: "16px",
    },
    commentTextAreaStyle: {
        "& textarea": {
            maxWidth: "406px",
            width: "100%",
            height: "160px",
        },      
    },
    voidOrCancelButnStyle: {
        width: "195px",
        "&.cancel": { backgroundColor: `${Colors.BackgroundWater} !important` },
        "&.create": { backgroundColor: `${Colors.ThemeRed} !important` },
    },
}));