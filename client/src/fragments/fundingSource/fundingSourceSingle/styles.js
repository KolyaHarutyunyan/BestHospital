import {Colors} from "@eachbase/utils";
import {makeStyles} from "@material-ui/core/styles";

export const fundingSourceItemStyle = makeStyles(() => ({
    fundingSourceItemHeader: {
        backgroundColor: Colors.BackgroundWhite,
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0 0 6px #347AF033",
        height: 'calc(100vh - 186px)'
    }
}));

