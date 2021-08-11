import {makeStyles} from "@material-ui/core/styles";
import {Backgrounds,Colors} from "@eachbase/utils";

export const createStaffModalStyle = makeStyles(() => ({
    modalDimensions: {
        width: '543px',
        background: 'white',
        position: 'relative',
        borderRadius: 8,
        overflow: 'hidden',
        "@media (max-width: 1400px)": {
            width: '527px',
        },
    },
    positionedButton: {
        position: 'absolute',
        right: '8px',
        top: '8px'
    },
    modalTitle: {
        textAlign: 'center',
        background: Backgrounds.headerLightBlue,
        paddingTop: '32px',
        paddingBottom: '10px'
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    otherDetailsTitle: {
        fontSize: '16px',
        color: Colors.TextSecondary,
        fontWeight: '600',
        lineHeight: '22px',
        paddingBottom: '20px',
    },
    titlePadding: {
        paddingTop: '16px'
    },
    selectMargin: {
        width: "100%",
        marginRight: '16px',

        "& .MuiFormLabel-root": {
            fontSize: "16px",
            color: `${Colors.TextPrimary}`,
        },

        "& .MuiInput-underline.Mui-error:after": {
            borderBottomColor: `${Colors.ThemeRed}`,
        },
    }
}));
