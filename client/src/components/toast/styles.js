import {makeStyles} from "@material-ui/core/styles";
import {Colors, Shadow} from "@eachbase/utils";

export const toastStyles = makeStyles(() => ({
    toastWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    toastText: {
        fontSize: 16,
        color: Colors.TextSecondary,
        lineHeight: '24px',
        paddingLeft: 16
    },
    defaultToast: {
        width: 400,
        height: 60,
        '& .Toastify__close-button': {
            alignSelf: 'center'
        },
        '& .Toastify__toast': {
            minHeight: 'unset',
            marginBottom: 0,
            boxShadow: Shadow.changeShadow
        },
        '& .Toastify__close-button--default': {
            opacity: 1,
            color: Colors.TextSecondary,
            marginRight: 4
        }
    }
}));
