import {makeStyles} from "@material-ui/core/styles";
import {Colors, Shadow} from "@eachbase/utils";

export const systemItemStyles = makeStyles(() => ({
    credentialTable: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 16
    },
    item: {
        width: '49%',
        flex: '0 0 49%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.BackgroundWater,
        height: 48,
        paddingInline: 32,
        borderRadius: 8,
        marginBottom: 8,
        '& > p ': {
            fontSize: 14,
            color: Colors.TextPrimary,
            '& span': {
                fontWeight: 600,
            }
        }
    },
    title: {
        fontSize: 18,
        color: Colors.TextSecondary,
        fontWeight: 'bold',
        marginTop: 10,
    },
    systemItemWrapper: {
        padding: 20,
        backgroundColor: 'white',
        height:' calc(100vh - 130px)',
        borderRadius: 8,
        position: 'relative'
    },
    systemHeaderStyles: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    spaceBottom: {
        marginBottom: 32
    },
    systemIcon: {
        width: 32,
        height: 32,
    },
    systemTitle: {
        fontSize: 18,
        color: Colors.TextSecondary,
        fontWeight: 'bold',
        paddingLeft: 8
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    systemInputStyles: {
        width: 181,
        marginRight: 16,
        '& .MuiOutlinedInput-root': {
            height: '36px!important'
        },
    },
    credentialInputStyle: {
        width: '100%',
        marginRight: 16,
        '& .MuiOutlinedInput-root': {
            height: '36px!important',
            color: Colors.TextPrimary,
            fontSize: 14
        },
    },
    headerSize: {
        width: '49%'
    },
    icons: {
        cursor: 'pointer',
        display: 'flex',
        '& img:last-child': {
            marginLeft: 16
        }
    },
    // Payroll Setup
    tabContainer: {
        display: 'inline-block',
        backgroundColor: 'white',
        boxShadow: Shadow.noteModalShadow,
        lineHeight: 1,
        borderRadius: 8
    },
    activeStepText: {

    },
    stepText: {
        display: 'inline-block',
        verticalAlign: 'middle',
        padding: '7px 24px',
        cursor: 'pointer'
    }

}));
