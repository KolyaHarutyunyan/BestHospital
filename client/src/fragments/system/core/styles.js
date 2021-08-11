import {makeStyles} from "@material-ui/core/styles";
import {Colors} from "@eachbase/utils";

export const systemItemStyles = makeStyles(() => ({
    systemItemWrapper: {
      padding: 20,
      backgroundColor : 'white'
    },
    systemHeaderStyles : {
        display: 'flex',
        justifyContent:'space-between',
        alignItems: "center"
    },
    spaceBottom: {
      marginBottom: 32
    },
    systemIcon: {
        width: 32,
        height: 32,
        margin: '2px 0'
    },
    systemTitle: {
        fontSize: 18,
        color: Colors.TextSecondary,
        fontWeight: 'bold',
        paddingLeft: 8
    }
}));
