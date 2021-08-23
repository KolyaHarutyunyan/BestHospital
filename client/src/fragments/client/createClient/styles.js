import {Colors} from "@eachbase/utils";
import {makeStyles} from "@material-ui/core/styles";


export const createClientStyle = makeStyles(() => ({

    createFoundingSource: {
        width: 543,
        background: Colors.BackgroundWhite,
        borderRadius: '8px',
        overflow: "hidden",
    },
    createFoundingSourceHeader: {
        width: "100%",
        background: Colors.BackgroundPrimary,
        padding: '8px 0 24px',
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    },
    createFoundingSourceHeaderTop: {
        width: "100%",
        display: "flex",
        justifyContent: 'flex-end',
        marginRight: '8px',
        marginBottom: '8px'
    },
    createFoundingSourceBody: {
        width: '100%',
        padding: '40px',

    },
    clientModalBlock : {
        display: "flex",
        justifyContent: "space-between"
    },
    clientModalBox : {
        width: 463
    }
}));
