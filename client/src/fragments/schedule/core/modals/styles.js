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
        marginTop:'40px',
    },

    typesItem: {
        height: '48px',
        background: '#347AF0 0% 0% no-repeat padding-box',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px',
        marginBottom:'16px',
        cursor:'pointer',
        '& p':{
            fontSize: '16px',
            fontWeight:'600',
            color:'white',
        },
    },

    breakWrapper:{
        marginTop:'40px',
    },

    timeInputs:{
        display:'flex',
    },

    startTime:{
        marginRight:'16px',
        width: "100%",

        "& .MuiFormLabel-root": {
            fontSize: "16px",
            color: `${Colors.TextPrimary}`,
        },

        "& .MuiInput-underline.Mui-error:after": {
            borderBottomColor: `${Colors.ThemeRed}`,
        },
    },

    bigModal :{
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

    serciveModall:{
        display:'flex',
        textAlign:'center',
        flexDirection:'column',
        width:'100%',
    },

    seviceModalWrapper:{
        display:'flex',
        width:'100%',
        marginTop:'40px',
        '& div':{
            width:'100%',
        },
        '& div:first-of-type':{
            marginRight:'40px',
            '@media (max-width: 1280px)': {
                marginRight:'32px',
            }
        }
    }

}))