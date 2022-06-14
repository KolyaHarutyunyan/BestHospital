import { authHeaderStyles } from "./styles";
import {
   ActiveInactiveStatusReverse,
   Colors,
   Images,
   makeCapitalize,
} from "@eachbase/utils";
import React from "react";
import moment from "moment";
import { SlicedText } from "../../messages";

export const AuthHeader = ({
   openModal,
   info,
   setToggleModal,
   toggleModal,
   setDelEdit,
   empoloyment,
   type,
}) => {
   const classes = authHeaderStyles();

   return (
      <div className={classes.AuthHeader}>
         <div className={classes.AuthHeaderTop}>
            <div className={classes.AuthHeaderTopLeft}>
               <p className={classes.AuthHeaderTopLeftTitle}>
                  {empoloyment ? info?.title : `# ${info?.authId}`}
               </p>
               {empoloyment ? (
                  <p className={classes.AuthHeaderTopLeftText}>
                     {info?.startDate &&
                        `${moment(info?.startDate).format("DD/MM/YYYY")} - ${
                           info?.endDate === null
                              ? "Present"
                              : moment(info?.endDate).format("DD/MM/YYYY")
                        }`}
                  </p>
               ) : (
                  <p className={classes.AuthHeaderTopLeftText}>
                     {info?.startDate &&
                        `${moment(info?.startDate).format("DD/MM/YYYY")} - ${moment(
                           info?.endDate
                        ).format("DD/MM/YYYY")}`}
                  </p>
               )}

               {type === "staff" && (
                  <div className={classes.activeInactive}>
                     <p> {info?.active ? "Active" : "Inactive"}</p>
                     <div
                        style={
                           info?.active
                              ? { background: Colors.ThemeGreen }
                              : { background: Colors.ThemeRed }
                        }
                        className={classes.circle}
                     />
                  </div>
               )}
            </div>

            <div className={classes.AuthHeaderTopRight}>
               {!empoloyment && (
                  <div className={classes.fileListStyle} onClick={openModal}>
                     <img alt="file" src={Images.authEdit} />
                  </div>
               )}
               <div
                  className={classes.fileListStyle}
                  onClick={() => {
                     setDelEdit(true);
                     setToggleModal(!toggleModal);
                  }}
               >
                  <img src={Images.edit} alt="edit" />
               </div>
               {empoloyment ? (
                  <div
                     className={classes.editTextStyle}
                     onClick={() => {
                        setDelEdit(true);
                        setToggleModal(!toggleModal);
                     }}
                  >
                     Edit
                  </div>
               ) : (
                  <div
                     className={classes.removeIconStyle}
                     onClick={() => {
                        setDelEdit(false);
                        setToggleModal(!toggleModal);
                     }}
                  >
                     <img src={Images.remove} alt="delete" />
                  </div>
               )}
            </div>
         </div>
         <div className={classes.AuthHeaderBottom}>
            <div className={classes.AuthHeaderBottomBox}>
               <p className={classes.AuthHeaderBottomBoxTitle}>
                  {" "}
                  {empoloyment ? "Supervisor:" : "Funding Source:"}{" "}
               </p>
               <p className={classes.AuthHeaderBottomBoxText}>
                  {empoloyment
                     ? makeCapitalize(info?.supervisor?.firstName)
                     : makeCapitalize(info?.funderId?.name)}
               </p>
            </div>
            <div className={classes.AuthHeaderBottomBox}>
               <p className={classes.AuthHeaderBottomBoxTitle}>
                  {empoloyment ? "Department:" : "Status:"}
               </p>
               <p
                  className={`${classes.AuthHeaderBottomBoxText} statusStyle ${info?.status}`}
               >
                  {empoloyment
                     ? info?.departmentId?.name
                     : ActiveInactiveStatusReverse(info?.status)}
               </p>
            </div>
            <div className={classes.AuthHeaderBottomBox}>
               <p className={classes.AuthHeaderBottomBoxTitle}>
                  {empoloyment ? "Employment Type:" : "Service Location:"}{" "}
               </p>
               <p className={classes.AuthHeaderBottomBoxText}>
                  <SlicedText
                     type={"address"}
                     size={25}
                     data={empoloyment ? info?.schedule : info?.location}
                  />
               </p>
            </div>
         </div>
      </div>
   );
};
