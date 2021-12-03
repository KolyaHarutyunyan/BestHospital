import {ChangePassword, myProfileFragment} from "./core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {Colors, FindLoad, Images} from "@eachbase/utils";
import React from "react";
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {authActions} from "@eachbase/store"
import {MinLoader} from "@eachbase/components";

export const MyProfile = ({info}) => {
    const classes = myProfileFragment()
    const dispatch = useDispatch();
    const loader = FindLoad('LOG_OUT')

    const handleSignOut = () => {
        dispatch(authActions.logOut())
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.avatar}>
                <AccountCircleIcon style={{fontSize: 70, color: Colors.ThemeBlue}}/>
                <p>{info && `${info.firstName} ${info.lastName}`}</p>
            </div>
            <div className={classes.userInfo}>
                <div className={classes.infoSections}>
                    <img src={Images.email} alt={'icon'}/>
                    <p>{info && info.email}</p>
                </div>
                {info && info.phoneNumber &&
                <div className={classes.infoSections}>
                    <img src={Images.bluePhone} alt={'icon'}/>
                    <p>{info && '+' + info.phoneNumber}</p>
                </div>
                }
                <div className={classes.infoSections}>
                    <img src={Images.location} alt={'icon'}/>
                    <p>{info && info.address && info.address.formattedAddress}</p>
                </div>
            </div>
            <ChangePassword/>
            <Button onClick={handleSignOut} className={classes.signOutButton}>
                {!!loader.length ?
                    <MinLoader margin={'0'} color={Colors.TextWhite}/>
                    :
                    <>
                        <img src={Images.signOut} alt='signOut'/>
                        <p>Sign Out</p>
                    </>
                }
            </Button>
        </div>
    )
}