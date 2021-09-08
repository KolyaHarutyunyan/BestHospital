import {Button} from "@material-ui/core";
import {buttonsStyle} from "./styles";
import {MinLoader} from "../loader";
import {Colors} from "../../utils";
import React from "react";

export const AddModalButton = ({text, handleClick, styles , btnStyles ,loader}) => {
    const classes = buttonsStyle();
    return (
        <div style={styles}>
            <Button style={btnStyles} className={classes.addModalButtonStyle} onClick={handleClick}>
                {loader === true ?
                    <MinLoader margin={'0'} color={Colors.TextWhite}/>
                    :
                    text
                }

            </Button>
        </div>
    );
};
