import {CloseButton, CreateChancel} from "../buttons";
import React from "react";
import {Button} from "@material-ui/core";
import {Colors, useGlobalTextStyles} from "@eachbase/utils";
import {modalsStyle} from "./styles";


export const DeleteElement = ({className, text, info, handleDel, handleClose}) => {

    const classes = modalsStyle()
    const globalText = useGlobalTextStyles();

    return (
        <div className={className.deleteModal}>
            <div className={classes.closeButton}>
                <CloseButton handleCLic={handleClose}/>
            </div>

            <div className={classes.deleteModalWrapper}>
                <p className={globalText.modalTitle}>{text}</p>
                <p className={globalText.modalText}>Are you sure? You wont delete <span
                    className={classes.deleteInfo}>{info}</span></p>


                <div className={classes.buttons}>
                    <Button
                        style={{
                            textTransform: "capitalize",
                            width: "100%",
                            height: "48px",
                            background: Colors.ThemeRed,
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "600",
                            color: Colors.TextWhite
                        }}
                        onClick={handleDel}
                    >
                        Delete
                    </Button>
                    <Button
                        style={{
                            textTransform: "capitalize",
                            width: "100%",
                            height: "48px",
                            background: Colors.ThemeGray,
                            borderRadius: "8px",
                            marginLeft: "16px",
                            fontSize: "16px",
                            fontWeight: "600",
                            color: Colors.TextPrimary
                        }}
                        onClick={handleClose}
                    >
                        Chancel
                    </Button>
                </div>
            </div>
        </div>
    );
};