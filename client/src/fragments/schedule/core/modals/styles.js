import {makeStyles} from "@material-ui/core/styles";
import {Colors} from "@eachbase/utils";

export const scheduleModalsStyle = makeStyles(() => ({
    modalWrapper: {
        width: '480px',
        height: "auto",
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        borderRadius: '8px',
    },

    subTitle: {
        fontSize: '16px',
        color: Colors.TextSecondary,
    },

    typesWrapper: {
        marginTop: '40px',
    },

    typesItem: {
        height: '48px',
        background: '#347AF0 0% 0% no-repeat padding-box',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px',
        marginBottom: '16px',
        cursor: 'pointer',
        '& p': {
            fontSize: '16px',
            fontWeight: '600',
            color: 'white',
        },
    },

    breakWrapper: {
        marginTop: '40px',
    },

    timeInputs: {
        display: 'flex',
    },

    startTime: {
        marginRight: '16px',
        width: "100%",

        "& .MuiFormLabel-root": {
            fontSize: "16px",
            color: `${Colors.TextPrimary}`,
        },

        "& .MuiInput-underline.Mui-error:after": {
            borderBottomColor: `${Colors.ThemeRed}`,
        },
    },

    bigModal: {
        width: '920px',
        padding: '40px',
        borderRadius: '8px',
        backgroundColor: 'white',
        position: 'relative',
        '@media (max-width: 1400px)': {
            width: '896px',
            padding: '32px',
        },
    },


    serciveModall: {
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
        width: '100%',
    },

    signature:{
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-end',
        '& p':{
            fontSize:'14px',
            fontWeight:'600',
            color:Colors.TextSecondary,
        },
    },

    seviceModalWrapper: {
        display: 'flex',
        width: '100%',
        marginTop: '40px',
        '& div': {
            width: '100%',
        },
        '& div:first-of-type': {
            marginRight: '40px',
            '@media (max-width: 1280px)': {
                marginRight: '32px',
            },
        },
    },

    infoModalHead: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& p': {
            fontSize: '18px',
            fontWeight: 'bold',
            color: Colors.TextSecondary,
        },
        '& button': {
            border: 'none',
            outline: 'none',
            background: 'transparent',
        },
        '& button:first-of-type': {
            marginRight: '16px',
        },
    },

    modalDate: {
        fontSize: '14px',
        fontWeight: '600',
        color: Colors.TextSecondary,
        '& span': {
            marginLeft: '16px',
            marginTop: '8px',
        },
    },

    infoModalBody: {
        marginTop: '32px',
    },

    recurBody: {
        marginTop: '40px'
    },

    recurTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: Colors.TextSecondary,
    },

    smallInput: {
        width: '50px',
        height: '36px',
        border: '1px solid #347AF0',
        borderRadius: '4px',
        padding: '0 5px'
    },

    dateInputs: {
        display: 'flex',
        width: '100%',
        margin: '8px 0 24px 0',
    },

    endDate: {
        marginLeft: '16px',
        width: '100%',
    },

    dayWeekMounth: {
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        boxShadow: '0px 0px 6px #347AF03D',
        borderRadius: '4px',
        padding: '16px',
        height: 'auto',
        margin: '24px 0',
    },

    occurance: {
        height: '36px',
        background: '#EBF2FD 0% 0% no-repeat padding-box',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        marginBottom: '24px',
        '& p': {
            fontSize: '14px',
            color: Colors.TextSecondary,
        },
        '& span': {
            fontSize: '14px',
            color: Colors.TextSecondary,
            fontWeight: 'bold',
            marginLeft: '8px',
        },
    },

    days: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#4B5C68',
        marginLeft: '8px',
    },

    formGroup: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '20px',
        '& .MuiIconButton-label': {
            color: '#347AF0',
        },
        '& .MuiTypography-body1': {
            fontSize: '16px',
            fontWeight: '600',
            color: '#4B5C68',
        },
    },

    weeks: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#4B5C68',
        marginRight: '8px',
    },

}))