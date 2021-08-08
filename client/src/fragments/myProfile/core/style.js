import {makeStyles} from "@material-ui/core/styles";
import {Shadow, Backgrounds, Colors} from "@eachbase/utils";



export const myProfileFragment = makeStyles(() => ({

    wrapper:{
        width:'379px',
        height:'auto',
        position:'absolute',
        right:'20px',
        top:'73px',
        padding:'16px',
        boxShadow:Shadow.modalShadow,
        background: Backgrounds.whiteModal,
        borderRadius: '8px',

        "@media (min-width: 1920px)": {
            width:'395px',
            padding:'24px',
            right:'40px',
        },
    },

    avatar:{
        display:'flex',
        alignItems:'center',
        flexDirection:'column',

        '& p':{
            fontSize:'18px',
            fontWeight:'bold',
            color: Colors.TextSecondary,
            marginTop:'16px',
            "@media (min-width: 1920px)": {
                marginTop:'24px'
            },
        },
    },

    userInfo:{
        background: Backgrounds.info,
        borderRadius: '8px',
        padding:'16px 16px 6px 16px',
        margin:'16px 0 16px 0',
        "@media (min-width: 1920px)": {
            marginTop:'24px'
        },
    },

    infoSections:{
        display:'flex',
        alignItems:'center',
        marginBottom:'10px',
        '& p':{
            marginLeft:'8px',
            fontSize:'14px',
            color: Colors.TextPrimary,
            lineHeight:'19px',
        },
    },

    changePasswordWrapper:{
        padding:'16px',
        boxShadow: Shadow.changeShadow,
        background: Backgrounds.whiteModal,
    },

    changePasswordContent:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        '& div':{
            display:'flex',
            alignItems:'center',
            cursor:'pointer',

            '& p':{
                fontSize:'14px',
                fontWeight: 600,
                color:Colors.ThemeBlue,
                marginLeft:'8px',
            }
        }

    },

    changePasswordTitle:{
        fontSize:'16px',
        fontWeight:'bold',
        color:Colors.TextSecondary,
    },

    changePasswordTextInfo:{
        marginTop:'17px',
        fontSize:'14px',
        lineHeight:'21px',
        color:Colors.TextLight,
    },

    signOutButton:{
        height: '36px',
        background: Backgrounds.theme,
        borderRadius: '8px',
        width:'100%',
        marginTop:'16px',

        '&:hover': {
            backgroundColor:Backgrounds.darkBlue ,
            boxShadow: Shadow.blueButton
        },
        '& p':{
            color:Colors.TextWhite,
            textTransform: 'capitalize',
            fontSize:'14px',
            fontWeight:'600',
            marginLeft:'8px',
        },
    },

    saveButton:{
        fontSize:'14px',
        fontWeight:'600',
        color:Colors.ThemeBlue,
        background:'none',
        border:'none',
        outline:'none',
        padding:'6px 0',
    },

    cancelButton:{
        fontSize:'14px',
        fontWeight:'600',
        color:Colors.TextLight,
        background:'none',
        border:'none',
        outline:'none',
        padding:'6px 0',
    },

    miniLoader:{
        marginRight:'50px'
    }

}))
