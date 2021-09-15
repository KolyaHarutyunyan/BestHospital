import {makeStyles} from "@material-ui/core/styles";
import {Shadow, Colors, Backgrounds} from "@eachbase/utils";

export const modalsStyle = makeStyles(() => ({
    datePickerStyle: {
        marginTop: 15
    },
    title: {
        fontSize: 16,
        color: Colors.TextSecondary,
        fontWeight: 600,
        paddingBottom: 16
    },
    checkboxWrapper: {
        padding: 16,
        boxShadow: `${Shadow.changeShadow}`,
        borderColor: 8,
        marginBottom: 16
    },
    modalTitleMargin: {
        marginBottom: 25
    },
    closeButton: {
        display: "flex",
        justifyContent: "flex-end",
    },

    buttons: {
        display: 'flex'
    },

    deleteModalWrapper: {
        padding: '8px 40px 0 40px',
    },

    deleteInfo: {
        color: Colors.ThemeRed,
        fontSize: '18px',
    },
    inactiveModalBody: {
        width: '480px',
        padding: '40px',
        borderRadius: '8px',
        backgroundColor: 'white',
        position: 'relative',
        '@media (max-width: 1400px)': {
            width: '464px',
            padding: '32px',
        }
    },
    positionedButton: {
        position: 'absolute',
        right: '0',
        top: '8px',
    },
    inactiveModalInfo: {
        fontSize: '16px',
        color: Colors.TextSecondary,
        lineHeight: '24px',
        padding: '16px 0 24px'
    },
    credentialInputStyle: {
        marginBottom: 10
    },
    deleteModal: {
        width: '500px',
        height: "auto",
        background: Backgrounds.whiteModal,
        borderRadius: "8px",
        padding: '8px 0 40px 0',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
    },
    AddAvailabilityScheduelBlock: {
        margin: '40px 0'
    },
    AddAvailabilityScheduelBox: {
        width: '100%',
        boxShadow: '0px 0px 6px #347AF03D',
        borderRadius: ' 8px',
        padding : '8px 16px',
        display : 'flex',

    }
}));


