import {Colors, Shadow} from "@eachbase/utils";
import {makeStyles} from "@material-ui/core/styles";


export const createClientStyle = makeStyles(() => ({
    createFoundingSource: {
        width: 543,
        background: Colors.BackgroundWhite,
        borderRadius: '8px',
        overflow: "hidden",
    },
    createFoundingSourceHeader: {
        width: "100%",
        background: Colors.BackgroundPrimary,
        padding: '8px 0 24px',
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
    },
    createFoundingSourceHeaderTop: {
        width: "100%",
        display: "flex",
        justifyContent: 'flex-end',
        marginRight: '8px',
        marginBottom: '8px'
    },
    createFoundingSourceBody: {
        width: '100%',
        padding: '40px',
    },
    clientModalBlock: {
        display: "flex",
        justifyContent: "space-between"
    },
    clientModalBox: {
        width: 463
    },
    inputInfo: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16
    },
    displayCodeBlock: {
        width: '100%',
        padding: "31px 16px",
        background: Colors.BackgroundPrimary,
        margin: "16px 0"
    },
    displayCodeBlock2: {
        width: '100%',
        padding: "24px 16px",
        margin: "16px 0",
        boxShadow: '0px 0px 6px #347AF03D'
    },
    displayCodeBlockText: {
        color: Colors.TextPrimary,
        fontSize: 14,
        fontWeight: 600,
    },
    availableModfiers: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 8,
        flexWrap: 'wrap'
    },
    availableModfier: {
        margin: "4px",
        border: '1px solid #4B5C6880',
        borderRadius: 14,
        padding: '4px 16px',
        cursor: 'pointer'
    },
    displayCode: {
        color: '#4B5C68B3'
    },
    authorizationFileWrapper: {
        width: 480,
        background: Colors.BackgroundWhite,
        borderRadius: '8px',
        padding: 40
    },
    authorizationFileHeader: {
        textAlign: 'center',
        paddingBottom: 30,
        '& h1': {
            fontSize: 32,
            color: Colors.TextSecondary,
            fontWeight: 'bold',
        },
        '& h2': {
            fontSize: 16,
            color: Colors.TextSecondary,
            fontWeight: 'regular',
            padding: '16px 0'
        },
        '& p': {
            fontSize: 16,
            color: Colors.TextSecondary,
            fontWeight: 'regular',
        },
        '& span': {
            fontSize: 16,
            color: Colors.BackgroundBlue,
            fontWeight: 'bold'
        }
    },
    starIcon: {
        color: `${Colors.ThemeRed}!important`
    },
    authorizationFileForm: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    authorizationFileSubTitle: {
        fontSize: 16,
        color: Colors.TextSecondary,
        fontWeight: 600,
        padding: '20px 0',
        textTransform: 'capitalize'
    },
    fileTypeInput: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    centered: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    fileSize: {
        fontSize: 10,
        color: Colors.TextLightGray,
        textAlign: 'center'
    },
    downloadIcon: {
        width: 32,
        height: 32,
        cursor: 'pointer',
        flex: '0 0 32px',
        marginLeft: 16
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
    percentage: {
        marginTop: -30,
        fontSize: 10,
        color: Colors.BackgroundBlue,
        textAlign: 'center'
    },
    removeIcon: {
        position: 'absolute',
        top: -5,
        right: -5,
        cursor: 'pointer'
    }
}));
