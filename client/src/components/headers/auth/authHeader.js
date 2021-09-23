import {authHeaderStyles } from "./styles";
import {Images} from "../../../utils";
import React from "react";


export const AuthHeader = () => {

    const classes = authHeaderStyles()

    return (
        <div className={classes.AuthHeader}>

            <div className={classes.AuthHeaderTop}>
                <div className={classes.AuthHeaderTopLeft}>
                    <p className={classes.AuthHeaderTopLeftTitle}>#123456</p>
                    <p className={classes.AuthHeaderTopLeftText}>#123456</p>
                </div>
                <div className={classes.AuthHeaderTopRight}>
                    <>
                        <img src={Images.edit} alt="edit" className={classes.iconStyle} onClick={() => alert('1')}/>
                        <img src={Images.remove} alt="delete" className={classes.iconDeleteStyle} onClick={() => alert('2')}/>
                    </>
                </div>

            </div>
            <div className={classes.AuthHeaderBottom}>
                <div className={classes.AuthHeaderBottomBox}>
                    <p className={classes.AuthHeaderBottomBoxTitle}>Funding Source:</p>
                    <p className={classes.AuthHeaderBottomBoxText}>Funding Source:</p>
                </div>
                <div className={classes.AuthHeaderBottomBox}>
                    <p className={classes.AuthHeaderBottomBoxTitle}>Funding Source:</p>
                    <p className={classes.AuthHeaderBottomBoxText}>Funding Source:</p>
                </div>
                <div className={classes.AuthHeaderBottomBox}>
                    <p className={classes.AuthHeaderBottomBoxTitle}>Funding Source:</p>
                    <p className={classes.AuthHeaderBottomBoxText}>Funding Source:</p>
                </div>
            </div>
        </div>
    )
}