import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { navBarStyles } from "./style";
import { authActions } from "@eachbase/store";
import { Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {Colors, Images as images, Images} from "@eachbase/utils";
import {DeleteElement, SimpleModal} from "@eachbase/components";
import {MyProfile} from "../../myProfile";

export const UserInfo = ({}) => {
  const classes = navBarStyles();
  // const dispatch = useDispatch();
  const [open, setOpen] =useState(false)

  // const handleSignOut = () => {
  //   dispatch (authActions.logOut ())
  // };

  // const { admin,avatarImg } = useSelector (
  //   (state) => ({
  //     admin: state.auth.admin,
  //     avatarImg: state.profile.avatarImg,
  //   }),
  // );

  // useEffect (() => (
  //     dispatch (EditProfileActions.MyProfileInfo ())
  //   ), []
  // )

   const handleOpenClose =()=>{
       setOpen(!open)
   }
  const AdminName = JSON.parse(localStorage.getItem("userInfo"));

  // MyProfile && MyProfile.fullName ? MyProfile.fullName : '
  return (
    <div style={{ color: "black" }} className={classes.boxWrapper}>
      <div onClick={handleOpenClose} className={classes.userInfo}>
        <img src={images.userProfile} alt="Avatar"/>

        {/*<AccountCircleIcon style={{ fontSize: 50, color: Colors.ThemeBlue }} />*/}
        {/*{ avatarImg ?*/}
        {/*  <img src={ avatarImg } alt="avatar"/>*/}
        {/*  :*/}

        {/*}*/}



        <p className={ classes.userInfoText }>{AdminName  && AdminName.fullName}</p>




      </div>
      {/*<div className={ classes.logOutInfo } onClick={ () => handleSignOut () }>*/}
      {/*  /!*<img src={ Images.logOutOutline } alt={ 'logOutOutline' }/>*!/*/}
      {/*  <p className={ classes.logOut }>Log out</p>*/}
      {/*</div>*/}


<div className={'my-profile'}>
      <SimpleModal
          handleOpenClose = {handleOpenClose}
          backdropCustom={true}
          openDefault={open}
          content={
            <MyProfile
              info={ AdminName }
            />
          }
      />
</div>
    </div>
  );
};
