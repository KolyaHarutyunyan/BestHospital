import {makeStyles} from "@material-ui/core/styles";
import {Backgrounds} from "../../../../utils";

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
    }
}));
