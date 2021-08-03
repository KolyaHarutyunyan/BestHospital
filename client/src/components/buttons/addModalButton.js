import {Button} from "@material-ui/core";
import {buttonsStyle} from "./styles";

export const AddModalButton = ({text, handleClick, styles}) => {
    const classes = buttonsStyle();
    return (
        <div style={styles}>
            <Button className={classes.addModalButtonStyle} onClick={handleClick}>
                {text}
            </Button>
        </div>
    );
};
