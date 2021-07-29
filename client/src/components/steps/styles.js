import { makeStyles } from "@material-ui/core/styles";
import {Backgrounds} from "../../utils";
import {Colors} from "../../utils";

export const stepStyles = makeStyles(() => ({
    stepHeader: {
        background: Backgrounds.headerLightBlue
    }
}));

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    step_label_root: {
        fontSize: '16px',
        color: `${Colors.TextSecondary}!important`,
        lineHeight: '22px!important',
        fontWeight: '600!important',
    }
}));

export const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 36,
        height: 36,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        '&::after': {
            content: `''`,
            position: 'absolute',
            left: '1px',
            top: '1px',
            width: '34px',
            height: '34px',
            backgroundColor: 'transparent',
            borderRadius: '50%',
            border: '1px solid white'
        }
    },
    active: {
        backgroundColor: '#347AF0'
    },
    completed: {
        backgroundColor: '#347AF0',
    }
});

