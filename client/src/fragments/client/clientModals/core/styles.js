import { makeStyles } from "@material-ui/core";
import { Colors, Shadow, Backgrounds } from "@eachbase/utils";

export const fileUploadersStyle = makeStyles(() => ({
    fileTypeInput: {
        display: 'flex',
        alignItems: 'center',
        "& > div": {
            maxWidth: "238px",
            height: "48px",
        },
    },
    uploadButton: {
        width:'192px',
        height: "48px",
        boxShadow: Shadow.blueButton,
        borderRadius: "8px",
        marginLeft:'16px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontSize: "14px",
        color: Colors.TextWhite,
        textTransform: "capitalize",
        "&.disabled": {
            backgroundColor: "#347AF080",
            cursor: "default",
        },
        "&.enable": { 
            backgroundColor: Colors.BackgroundBlue,
            cursor: "pointer", 
        },
        "&:hover": { backgroundColor: Backgrounds.blueHover },
        "& img":{ marginRight:'8px' },
        "& span": {
            fontSize: "14px",
            color: 'white'
        },
    },
    authorizationFileSubTitle: {
        fontSize: 16,
        color: Colors.TextSecondary,
        fontWeight: 600,
        padding: '20px 0',
        textTransform: 'capitalize',
        textAlign: "left",
    },
    centered: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column',
        height: 290
    },
    normal: {
        height: 290,
        overflowY: 'scroll',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        paddingBottom: 16,
        '&::-webkit-scrollbar': {
            display: 'none'
        },
    },
    fileRow: {
        display: 'flex',
        alignItems: 'flex-end',
        padding: '16px 2px',
        borderBottom: `1px solid ${Colors.BackgroundBlue}`,
    },
    imageContainer: {
        width: 60,
        height: 73,
        borderRadius: 4,
        boxShadow: Shadow.changeShadow,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 24,
        flex: '0 0 60px',
        position: 'relative'
    },
    fileName: {
        fontSize: 12,
        color: Colors.TextSecondary,
        paddingBottom: 12,
        lineHeight: 1,
        fontWeight: 600
    },
    fileInput: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%'
    },
    fileNameInput: {
        width: '100%',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: Colors.BackgroundBlue,
        },
        '& .MuiOutlinedInput-root': {
            height: 40,
            color: Colors.TextPrimary
        },
        '& .MuiInputLabel-outlined': {
            marginTop: '-3px',
            color: Colors.TextPrimary
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(14px, -2px) scale(0.75)'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: Colors.BackgroundBlue,
        },
        '& .MuiInputBase-input::placeholder': {
            fontSize: 14,
            color: Colors.TextLightGray
        }
    },
    downloadIcon: {
        width: 32,
        height: 32,
        cursor: 'pointer',
        flex: '0 0 32px',
        marginLeft: 16
    },
    fileSize: {
        fontSize: 10,
        color: Colors.TextLightGray,
        textAlign: 'center'
    },
    removeIcon: {
        position: 'absolute',
        top: -5,
        right: -5,
        cursor: 'pointer'
    },
    iconText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& p': {
            fontSize: 16,
            color: Colors.TextLightGray,
            fontWeight: 600,
            paddingTop: 10
        }
    },
    percentage: {
        marginTop: -30,
        fontSize: 10,
        color: Colors.BackgroundBlue,
        textAlign: 'center'
    },
}));