import { makeStyles } from "@material-ui/core/styles";
import { Colors, Shadow } from "@eachbase/utils";

export const availabilityStyles = makeStyles((theme) => ({
    availableHours: {
        width: '100%',
        borderRadius: 8,
        boxShadow: Shadow.changeShadow,
        padding: 16
    },
    availableHoursHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 16
    },
    availableHoursBlock: {
        display: 'flex',
        flexWrap: "wrap"
    },
    availableHoursTitle: {
        color: Colors.TextSecondary,
        fontSize: 18,
        fontWeight: "bold"
    },
    availableHoursBox: {
        width: 238,
        boxShadow: Shadow.changeShadow,
        borderRadius: 4,
        marginBottom: 15,
       '&:not(:last-child)':{
            marginRight: 15
       }
    },
    availableHoursBoxHeader: {
        width: '100%',
        height: 40,
        borderRadius: 4,
        background: '#347AF01A',
        display: 'flex',
        alignItems: "center",
        color: Colors.BackgroundBlue,
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
        color: Colors.TextSecondary,
        fontSize: 14,
        margin: '8px 0'
    },
    AddAvailabilityScheduel : {
            width: '634px',
            padding: '40px',
            borderRadius: '8px',
            backgroundColor: 'white',
            position: 'relative',
            '@media (max-width: 1400px)': {
                width: '618px',
                padding: '32px',

        },
    },

    availableHoursDayName : {
        color: '#347AF0',
        fontSize : 16,
        fontWeight : "bold",
        marginRight : 16
    },
}));
