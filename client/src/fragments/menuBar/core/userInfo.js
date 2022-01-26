import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { navBarStyles } from "./style";
import { authActions } from "@eachbase/store";
import { Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Colors, Images as images, Images } from "@eachbase/utils";
import { DeleteElement, SimpleModal } from "@eachbase/components";
import { MyProfile } from "../../myProfile";

export const UserInfo = ({}) => {
   const classes = navBarStyles();
   // const dispatch = useDispatch();
   const [open, setOpen] = useState(false);

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

   const handleOpenClose = () => {
      setOpen(!open);
   };

   const userInfo = JSON.parse(localStorage.getItem("poloUserInfo"));

   return (
      <div style={{ color: "black" }} className={classes.boxWrapper}>
         <div onClick={handleOpenClose} className={classes.userInfo}>
            <img src={images.userProfile} alt="Avatar" />
            {/*<p className={classes.userInfoText}>{userInfo && `${userInfo.firstName} ${userInfo.lastName}`}</p>*/}
         </div>

         <div className={"my-profile"}>
            <SimpleModal
               handleOpenClose={handleOpenClose}
               backdropCustom={true}
               openDefault={open}
               disableScrollLock={true}
               content={<MyProfile info={userInfo} />}
            />
         </div>
      </div>
   );
};
