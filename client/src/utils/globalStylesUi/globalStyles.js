import {makeStyles, Switch, withStyles} from '@material-ui/core';
import {Backgrounds as Background, Colors, Shadow} from "./globalColors";

export const useGlobalStyles = makeStyles({
    previewModal: {
        position: 'fixed',
        width: 395,
        top: 360,
        height: 550,
        background: 'white',
        padding: 16,
        boxShadow: Shadow.noteModalShadow,
        transition: '.7s',
        borderRadius: 8,
        '& h1': {
            fontSize: 18,
            color: Colors.BackgroundBlue,
            fontWeight: 'bold',
            paddingBottom: 5
        },
        '& > p': {
            fontSize: 14,
            color: Colors.TextSecondary,
            lineHeight: '24px',
            padding: 16,
            backgroundColor: Colors.BackgroundWater,
            borderRadius: 8,
            height: 'calc(100% - 130px)'
        },
        '& > div' : {
            marginBottom: 20
        },
        '& > div > p' : {
            fontSize: 14,
            color: Colors.TextSecondary,
        },
        '& > span': {
            display: 'block',
            fontSize: 14,
            color: Colors.TextLightGray,
            paddingBottom: 32,
        },
    },
    dateContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    positionedButton: {
        position: 'absolute',
        right: '0',
        top: '8px',
    },
    icons: {
        cursor: 'pointer',
        display: 'flex',
        '& img:last-child': {
            marginLeft: 16
        }
    },

    tableStyle: {
        background: 'red',
        height: '100%',
        minHeight: '100vh',
        width: '100%',
        boxShadow: '0px 0px 12px #0052E01A',
        borderRadius: '8px',
        marginTop: '16px',
        marginBottom: '24px',
        '& .MuiTableContainer-root': {
            boxShadow: 'none',
        },
    },
    simpleInputFull: {
        width: '100%',
    },
    tableWrapper: {
        // height: '100%',
        // minHeight: '80vh',
        background: 'none',
        width: '100%',
        borderRadius: '8px',
        marginTop: '16px',
        marginBottom: '24px',
        '& .MuiTableContainer-root': {
            boxShadow: 'none',
            background: 'none',
            // position: 'relative',
            // overflow: 'hidden'
        },
    },
    tableContainer: {
        // display:'flex',
        // justifyContent:'space-between',
        // flexDirection:'column',
        // height:'92vh',
    },
    table: {
        '&.MuiTable-root': {
            borderCollapse: 'separate',
            borderSpacing: '0px 14px',
            padding: '5px'
        },

    },
    tableWrapperSmall: {
        height: '100%',
        width: '100%',
        boxShadow: '0px 0px 12px #0052E01A',
        borderRadius: '8px',
        marginTop: '16px',
        marginBottom: '24px',
        '& .MuiTableContainer-root': {
            boxShadow: 'none',
        },
    },


    simpleInput: {
        marginRight: '30px',
        width: '100%',
        "@media (min-width: 1919px)": {
            marginRight: "56px",
        },
    },

    InfoAndImage: {
        display: "flex",
        alignItems: "center",
        "& p": {
            fontSize: "14px",
            lineHeight: "19px",
            fontWeight: "600",
            color: Colors.TextSecondary,
        },
        "& img": {
            width: "24px",
            height: "24px",
            marginRight: "4px",
            "@media (min-width: 1920px)": {
                marginRight: "8px",
            },
        },
    },

    buttonsStyle: {
        marginTop: '14px'
    },

    disabledButton: {
        background: 'red!important'
    },

    createOfficeTableHead: {
        display: "flex",
        alignItems: "center",

        "& p": {
            fontSize: '16px',
            fontWeight: 'bold',
            color: Colors.TextSecondary,

            "@media (max-width: 1919px)": {
                marginLeft: "4px",

            },
            "@media (min-width: 1920px)": {
                marginLeft: "8px",
            },
        },
    },

    spaceBetween: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },

    centerItem: {
        display: 'flex',
        alignItems: 'center',
    },

    paginateContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: Background.headerLightBlue,
        height: '76px',
        borderRadius: '8px',
        padding: '0 16px',
        '& p': {
            fontSize: '14px',
            fontWeight: '600',
        }
    },
    noData: {
        fontSize: 18,
        color: Colors.TextLightGray,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 254,
        left: '50%',
        transform: 'translate(-50%)'
    }

});


export const useGlobalTextStyles = makeStyles({
    modalTitle: {
        fontSize: '32px',
        fontWeight: 'bold',
        lineHeight: '43px',
        color: Colors.TextSecondary,

    },
    modalText: {
        color: Colors.TextPrimary,
        fontSize: '16px',
        lineHeight: '24px',
        margin: '16px 0 40px 0',
    },

});


export const AntSwitch = withStyles((theme) => ({
    root: {
        width: 32,
        height: 16,
        padding: 0,
        display: 'flex',
        marginTop: 0,
        marginLeft: '8px',
    },
    switchBase: {
        paddingTop: '2.2px',
        padding: 3,
        color: theme.palette.common.white,
        '&$checked': {
            transform: 'translateX(14px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: Colors.ThemeBlue,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        marginTop: 0,
        boxShadow: 'none',
    },
    track: {
        border: 'none',
        borderRadius: 24 / 2,
        opacity: 1,
        backgroundColor: theme.palette.grey[400],
    },
    checked: {},

}))(Switch);
