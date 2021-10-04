import {authHeaderStyles} from "./styles";
import {Colors, Images} from "@eachbase/utils";
import React from "react";


export const AuthHeader = ({info, setToggleModal, toggleModal, setDelEdit, empoloyment}) => {


    const classes = authHeaderStyles()

    return (
        <div className={classes.AuthHeader}>

            <div className={classes.AuthHeaderTop}>
                <div className={classes.AuthHeaderTopLeft}>
                    <p className={classes.AuthHeaderTopLeftTitle}>{!empoloyment && '#'} {info?.authId}</p>
                    <p className={classes.AuthHeaderTopLeftText}>{info?.startDate && `${info?.startDate} - ${info?.endDate}`}</p>
                </div>
                <div className={classes.AuthHeaderTopRight} style={{display: 'flex', alignItems: 'center'}}>
                    <img src={Images.edit} alt="edit" className={classes.iconStyle} onClick={() => {
                        setDelEdit(true)
                        setToggleModal(!toggleModal)
                    }}/>
                    {empoloyment ?
                        <p style={{color: Colors.ThemeBlue, fontSize: 14, fontWeight: 'bold', marginLeft: 8}}>Edit</p> :
                        <img src={Images.remove} alt="delete" className={classes.iconDeleteStyle} onClick={() => {
                            setDelEdit(false)
                            setToggleModal(!toggleModal)

                        }}/>}
                </div>
            </div>
            <div className={classes.AuthHeaderBottom}>
                <div className={classes.AuthHeaderBottomBox}>
                    <p className={classes.AuthHeaderBottomBoxTitle}> {empoloyment ? 'Supervisor:' : 'Funding Source:'} </p>
                    <p className={classes.AuthHeaderBottomBoxText}>{info?.funderId?.name}</p>
                </div>
                <div className={classes.AuthHeaderBottomBox}>
                    <p className={classes.AuthHeaderBottomBoxTitle}>{empoloyment ? 'Department:' : 'Status'}</p>
                    <p className={classes.AuthHeaderBottomBoxText}>{info?.status}</p>
                </div>
                <div className={classes.AuthHeaderBottomBox}>
                    <p className={classes.AuthHeaderBottomBoxTitle}>{empoloyment ? "Employment Type:" : 'Service Location:'} </p>
                    <p className={classes.AuthHeaderBottomBoxText}>{info?.location}</p>
                </div>
            </div>
        </div>
    )
}