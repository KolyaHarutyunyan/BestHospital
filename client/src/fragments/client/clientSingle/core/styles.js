import {makeStyles} from "@material-ui/core/styles";
import {Colors} from "../../../../utils";

export const serviceSingleStyles = makeStyles(() => ({
    // staff general
    staffGeneralWrapper: {
        display: 'flex',
        // justifyContent: 'space-between'
    },
    tabsWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 36,
        '& li:first-child': {
            display: 'flex',
        }
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        position: 'relative',
        border: `1px solid ${Colors.BackgroundBlue}`,
        objectFit: 'cover',
        padding: 3
    },
    nameContent: {
        marginLeft: 19
    },
    name: {
        fontSize: 18,
        color: Colors.TextSecondary,
        fontWeight: 'bold',
        lineHeight: '25px',
        marginBottom: 8
    },
    tagContent: {
        display: 'flex',
        alignItems: 'center',
        '& p': {
            fontSize: 12,
            color: Colors.TextSecondary,
            fontWeight: 600,
            backgroundColor: Colors.BackgroundWater,
            padding: '0 16px',
            lineHeight: '25px',
            borderRadius: 13,
        },
        '& p:not(:last-child)': {
            marginRight: 8
        }
    }
}));