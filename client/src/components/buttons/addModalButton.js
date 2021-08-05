import {Button} from "@material-ui/core";
import {buttonsStyle} from "./styles";

export const AddModalButton = ({text, handleClick, styles , btnStyles}) => {
    const classes = buttonsStyle();
    return (
        <div style={styles}>
            <Button style={btnStyles} className={classes.addModalButtonStyle} onClick={handleClick}>
                {text}
            </Button>
        </div>
    );
};
