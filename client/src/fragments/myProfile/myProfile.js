import {ChangePassword, myProfileFragment} from "./core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {Colors, Images} from "@eachbase/utils";
import React, {useState} from "react";
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {authActions} from "@eachbase/store"

export const MyProfile = ({info}) => {

    const classes = myProfileFragment()
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch (authActions.logOut ())
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.avatar}>
                <AccountCircleIcon style={{fontSize: 70, color: Colors.ThemeBlue}}/>
                <p>{info  && info.fullName}</p>
            </div>
            <div className={classes.userInfo}>
                <div className={classes.infoSections}>
                    <img src={Images.email} alt={'email'}/>
                    <p>lidiawilliams@hotmail.com</p>
                </div>
                <div className={classes.infoSections}>
                    <img src={Images.bluePhone} alt={'email'}/>
                    <p>(727) 644-7018</p>
                </div>
                <div className={classes.infoSections}>
                    <img src={Images.location} alt={'email'}/>
                    <p>1100 East Broadway #302 Glendale, CA 91205</p>
                </div>
            </div>
            <ChangePassword/>
            <Button onClick={ handleSignOut } className={classes.signOutButton}>
                <img src={Images.signOut} alt='signOut'/>
                <p>Sign Out</p>
            </Button>
        </div>
    )
}