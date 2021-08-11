import {makeStyles} from "@material-ui/core/styles";

export const staffTableStyles = makeStyles(() => ({
    tableRow: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 150
    },
    firstNameStyle: {
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
}));