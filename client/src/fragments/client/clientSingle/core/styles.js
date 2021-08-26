import {makeStyles} from "@material-ui/core/styles";
import {Backgrounds, Colors} from "@eachbase/utils";

export const serviceSingleStyles = makeStyles(() => ({
        staffGeneralWrapper: {
            display: 'flex',
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
        availableHours: {
            width: '100%',
            borderRadius: 8,
            boxShadow: '0 0 6px #8A8A8A3D',
            padding: 16
        },
        availableHoursHedaer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 16
        },
        availableHoursBlock: {
            display: 'flex',
            flexWrap: "wrap"
        },
        availableHoursTitle: {
            color: '#4B5C68',
            fontSize: 18,
            fontWeight: "bold"
        },
        availableHoursBox: {
            width: 241,
            boxShadow: '0px 0px 6px #8A8A8A3D',
            borderRadius: 4,
            margin: 8
        },
        availableHoursBoxHeader: {
            width: '100%',
            height: 40,
            borderRadius: 4,
            background: '#347AF01A',
            display: 'flex',
            alignItems: "center",
            color: '#347AF0',
            fontSize: 14,
            fontWeight: "bold",
            paddingLeft: 16,
        },
        availableHoursBoxBody: {
            height: 162,
            overflow: "auto",
            padding: ' 8px 0 8px 16px'
        },
        availableHoursBoxBodyInfo: {
            color: '#4B5C68',
            fontSize: 14,
            margin: '8px 0'
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
        tableID: {
            textOverflow: 'ellipsis',
            width: 60,
            overflow: 'hidden'
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
        clientHistory: {
            marginTop: 50,
        },
    headerRight :{
        display:'flex',
    },
    inputTextField:{
           alignItems: 'flex-end',
        width:'100%',
        '& .MuiOutlinedInput-notchedOutline':{
            borderColor:Colors.BackgroundBlue,
        },
        '& .MuiOutlinedInput-root':{
            height:'48px'
        },
        '& .MuiInputLabel-outlined':{
            marginTop:'-3px',
            color :Colors.TextPrimary
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(14px, -2px) scale(0.75)'
        },
        '&:hover .MuiOutlinedInput-notchedOutline':{
            borderColor:Colors.BackgroundBlue,
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
        color :'green'
    },

    }))
;

export const editButtonStyle = {
    height: 36,
    paddingInline: 24,
}
export const inputStyle={
    marginRight: 16,
    height: 36,
    width: 164
}