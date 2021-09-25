import {authHeaderStyles } from "./styles";
import {Images} from "../../../utils";
import React from "react";


export const AuthHeader = ({info,setToggleModal, toggleModal, setDelEdit}) => {

    console.log(info,'caaard')

    const classes = authHeaderStyles()

    return (
        <div className={classes.AuthHeader}>

            <div className={classes.AuthHeaderTop}>
                <div className={classes.AuthHeaderTopLeft}>
                    <p className={classes.AuthHeaderTopLeftTitle}>#{info?.authId}</p>
                    <p className={classes.AuthHeaderTopLeftText}>{`${info?.startDate} - ${info?.endDate}`}</p>
                </div>
                <div className={classes.AuthHeaderTopRight}>
                    <>
                        <img src={Images.edit} alt="edit" className={classes.iconStyle} onClick={() => {
                            setDelEdit(true)
                            setToggleModal(!toggleModal )

                        }}/>
                        <img src={Images.remove} alt="delete" className={classes.iconDeleteStyle} onClick={() => {
                            setDelEdit(false)
                            setToggleModal(!toggleModal )

                        }}/>
                    </>
                </div>

            </div>
            <div className={classes.AuthHeaderBottom}>
                <div className={classes.AuthHeaderBottomBox}>
                    <p className={classes.AuthHeaderBottomBoxTitle}>Funding Source:</p>
                    <p className={classes.AuthHeaderBottomBoxText}>{info?.funderId?.name}</p>
                </div>
                <div className={classes.AuthHeaderBottomBox}>
                    <p className={classes.AuthHeaderBottomBoxTitle}>Status</p>
                    <p className={classes.AuthHeaderBottomBoxText}>{info?.status}</p>
                </div>
                <div className={classes.AuthHeaderBottomBox}>
                    <p className={classes.AuthHeaderBottomBoxTitle}>Service Location:</p>
                    <p className={classes.AuthHeaderBottomBoxText}>{info?.location}</p>
                </div>
            </div>
        </div>
    )
}