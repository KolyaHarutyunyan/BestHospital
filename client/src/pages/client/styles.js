import {makeStyles} from "@material-ui/core/styles";
import {Backgrounds} from "@eachbase/utils";

export const clientsStyle = makeStyles(() => ({
    deleteModal: {
        width: '500px',
        height: "auto",
        background: Backgrounds.whiteModal,
        borderRadius: "8px",
        padding: '8px 0 40px 0',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
    }
}));
