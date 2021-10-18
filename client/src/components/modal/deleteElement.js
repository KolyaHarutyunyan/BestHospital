import {CloseButton} from "../buttons";
import React from "react";
import {Button} from "@material-ui/core";
import {Colors, useGlobalTextStyles} from "@eachbase/utils";
import {modalsStyle} from "./styles";
import {MinLoader} from "../loader";

export const DeleteElement = ({text, info, handleDel, handleClose, loader}) => {

    const classes = modalsStyle()
    const globalText = useGlobalTextStyles();
    return (
        <div className={classes.deleteModal}>
            <div className={classes.closeButton}>
                <CloseButton handleCLic={handleClose}/>
            </div>

            <div className={classes.deleteModalWrapper}>
                <p className={globalText.modalTitle} style={{width : 400, overflow :'hidden', height : 52, textOverflow :'ellipsis'}}>{info}</p>
                <p className={globalText.modalText}>{text}</p>

                <div className={classes.buttons}>
                    <Button
                        style={{
                            textTransform: "capitalize",
                            width: "100%",
                            height: "48px",
                            background: Colors.ThemeGray,
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "600",
                            color: Colors.TextPrimary
                        }}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{
                            textTransform: "capitalize",
                            width: "100%",
                            height: "48px",
                            background: Colors.ThemeRed,
                            borderRadius: "8px",
                            marginLeft: "16px",
                            fontSize: "16px",
                            fontWeight: "600",
                            color: Colors.TextWhite
                        }}
                        onClick={handleDel}
                    >
                        {loader === true ?
                            <MinLoader margin={'0'} color={Colors.TextWhite}/>
                            :
                            'Delete'
                        }
                    </Button>
                </div>
            </div>
        </div>
    );
};