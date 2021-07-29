import {makeStyles} from "@material-ui/core/styles";
import {Backgrounds,Colors} from "@eachbase/utils";

export const createStaffModalStyle = makeStyles(() => ({
    modalDimensions: {
        width: '543px',
        background: 'white',
        position: 'relative'
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
    }
}));
