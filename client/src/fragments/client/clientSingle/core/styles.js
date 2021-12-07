import {makeStyles} from "@material-ui/core/styles";
import {Backgrounds, Colors} from "@eachbase/utils";

export const serviceSingleStyles = makeStyles(() => ({
        staffGeneralWrapper: {
            display: 'flex',
        },
        searchContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& button': {
                marginLeft: 15
            }
        },
    dateInput: {
        width: '100%',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: Colors.BackgroundBlue,
        },
        '& .MuiOutlinedInput-root': {
            height: 38,
            width: 200,
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
        },
        select: {
            width: '100%',
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: Colors.BackgroundBlue,
            },
            '& .MuiOutlinedInput-root': {
                height: '36px',
                marginTop: 10,
                marginRight: 30,
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
        },

        deleteModal: {
            width: '500px',
            height: "auto",
            background: Backgrounds.whiteModal,
            borderRadius: "8px",
            padding: '8px 0 40px 0',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
        },
        clearBoth: {
            width: 24
        },
        tableName: {
            textOverflow: 'ellipsis',
            width: 100,
            overflow: 'hidden'
        },
    sircule:{
      display:'flex',
      alignItems:'center',
        '& p':{
          marginRight:'15px',
            fontSize:'14px',
        }
    },
        tableID: {
            textOverflow: 'ellipsis',
            width: 60,
            overflow: 'hidden'
        },
        loadStyle: {
            display: 'flex',
            alignItems: 'center',
        },
        iconStyle: {
            cursor: "pointer"
        },
        iconDeleteStyle: {
            cursor: "pointer",
            marginLeft: 16
        },
        notesWrap: {
            marginTop: -32,
            width: '100%'
        },
        headerRight: {
            display: 'flex',
        },
        inputTextField: {
            alignItems: 'flex-end',
            width: '100%',
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: Colors.BackgroundBlue,
            },
            '& .MuiOutlinedInput-root': {
                height: '48px'
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
        },
        radio: {
            color: '#D263E4',
            '&:hover': {
                backgroundColor: 'white'
            },
            '&$checked': {
                color: '#D263E4',
                '&:hover': {
                    backgroundColor: 'white'
                },
            }
        },
        radioInputLabel: {
            fontSize: 16,
            color: Colors.TextSecondary,
        },
        checked: {
            color: 'green'
        },
        authorizationServices: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: "center",
            padding: '24px 24px 0 '
        },
        authorizationServicesRight: {
            display: 'flex',
            alignItems: "center"
        },
        authorizationServicesTitle: {
            fontSize: 18,
            color: Colors.TextPrimary,
            fontWeight: "bold"
        },
        authorizationServicesText: {
            fontSize: 14,
            color: Colors.ThemeBlue,
            fontWeight: "bold",
            marginLeft: 8,
            cursor: 'pointer'
        },
    modifiers:{
            fontSize:'14px',
            color:'#4B5C68'
    }
    }))
;

export const editButtonStyle = {
    height: 36,
    paddingInline: 24,
}
export const inputStyle = {
    marginRight: 16,
    height: 36,
    width: 164
}