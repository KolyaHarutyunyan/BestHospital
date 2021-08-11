import {makeStyles} from "@material-ui/core/styles";
import {Colors} from "@eachbase/utils";

export const tabsStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'white',
    },
    tabHeader: {
        background: 'white',
        boxShadow: 'none',
        '& .MuiTabs-indicator': {
            backgroundColor: `${Colors.BackgroundMango}`,
            height: '4px',
            borderRadius: '4px',
        },
        '& .MuiTabs-flexContainer': {
            borderBottom: `4px solid ${Colors.BackgroundWater}`,
        },
    },
    tabLabel: {
        fontSize: '14px',
        textTransform: 'capitalize',
        color: Colors.TextSecondary,
        fontWeight: 'bold',
        lineHeight: '19px',
        padding: '0 24px',
        minWidth: 'unset',
        minHeight: '34px'
    },
}));