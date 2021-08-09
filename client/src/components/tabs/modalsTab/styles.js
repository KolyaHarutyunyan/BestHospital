import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "@eachbase/utils";

export const modalHeadersStyle = makeStyles(() => ({


    createFundingSourceHeaderBottom: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 40px',
        marginTop: 24,
        position: 'relative'
    },
    createFundingSourceHeaderBottomBlock: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
    },
    createFundingSourceHeaderBottomCircle: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        background: Colors.BackgroundBlue,
        color: Colors.TextWhite,
        marginBottom: 8,

    },
    modalsTabsIcons :{
        border: `1px solid ${Colors.BackgroundWhite}`,
        borderRadius : "50%",
        padding : 5
    },
    createFundingSourceHeaderBottomText: {
        fontSize: 18,
        color: Colors.TextPrimary,
        fontWeight: 600
    },
    createFundingSourceHeaderBottomLine: {
        width: '52%',
        borderTop: `1px dashed ${Colors.TextDarkGrey}`,
        position: "absolute",
        top:16,
        margin: "auto",
        left:0,
        right :0
    },
    createFundingSourceHeaderBottomPosition: {
        position:'relative',
        width:45,
        background: Colors.BackgroundPrimary,
    }
}));

