import {makeStyles} from "@material-ui/core/styles";
import {Colors, Shadow} from "@eachbase/utils";

export const PayrollSetupStyles = makeStyles(() => ({
    payCodeTypeWrapper: {
      display: 'flex',
      alignItems: 'flex-start'
    },
    tabContainer: {
        display: 'inline-block',
        backgroundColor: 'white',
        boxShadow: Shadow.noteModalShadow,
        lineHeight: 1,
        borderRadius: 8,
    },
    activeStepText: {
        backgroundColor: Colors.BackgroundBlue,
        borderRadius: 8,
        color: 'white!important'
    },
    stepText: {
        fontSize: 14,
        color: Colors.TextSecondary,
        fontWeight: 600,
        display: 'inline-block',
        verticalAlign: 'middle',
        padding: '9px 24px',
        cursor: 'pointer',
        margin: 2,
    },
    payrollSetupWrapper: {

    },
    payCodeType: {
        padding: '32px 32px 40px 32px',
        boxShadow: Shadow.noteModalShadow,
        borderRadius: 8,
        width: '100%'
    },
    flexBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24
    },
    checkboxContainer: {
        width: 210,
        height: 86,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: Shadow.noteModalShadow,
        borderRadius: 8,
        '& p': {
            fontSize: 14,
            color: Colors.TextSecondary,
            fontWeight: 600
        }
    },
    modalTitle: {
        fontSize: 18,
        color: Colors.TextSecondary,
        fontWeight: 'bold',
        marginBottom: 10
    },
    modalSubTitle: {
        fontSize: 14,
        color: Colors.TextSecondary,
        marginBottom: 30
    },
    icons: {
        cursor: 'pointer',
        display: 'flex',
        '& img:last-child': {
            marginLeft: 16
        }
    },
}));
