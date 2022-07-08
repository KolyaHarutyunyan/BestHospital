import React from "react";
import { authHeaderStyles } from "./styles";
import {
   ActiveInactiveStatusReverse,
   Colors,
   Images,
   makeCapitalize,
   manageType,
} from "@eachbase/utils";
import moment from "moment";
import { SlicedText } from "../../messages";
import { getAuthStatusDisplay } from "./constants";

export const AuthHeader = ({
   openModal,
   info,
   setToggleModal,
   toggleModal,
   // setDelEdit,
   empoloyment,
   type,
}) => {
   const classes = authHeaderStyles();

   const authStatusDisplay = getAuthStatusDisplay(info);

   return (
      <div className={classes.AuthHeader}>
         <div className={classes.AuthHeaderTop}>
            <div className={classes.AuthHeaderTopLeft}>
               <p className={classes.AuthHeaderTopLeftTitle}>
                  {empoloyment ? makeCapitalize(info?.title?.name) : `# ${info?.authId}`}
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
               {type === "staff" && !empoloyment && (
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
            {!!empoloyment ? (
               <div
                  className={classes.employmentEditBoxStyle}
                  onClick={() => setToggleModal((prevState) => !prevState)}
               >
                  <img src={Images.edit} alt="edit" />
                  <span className={classes.editTextStyle}>Edit</span>
               </div>
            ) : (
               <div className={classes.AuthHeaderTopRight}>
                  <div className={classes.fileListStyle} onClick={openModal}>
                     <img alt="file" src={Images.authEdit} />
                  </div>
                  <div
                     className={classes.editIconStyle}
                     onClick={() => {
                        // setDelEdit(true);
                        setToggleModal((prevState) => !prevState);
                     }}
                  >
                     <img src={Images.edit} alt="edit" />
                  </div>
                  {/* <div
                     className={classes.removeIconStyle}
                     onClick={() => {
                        setDelEdit(false);
                        setToggleModal((prevState) => !prevState);
                     }}
                  >
                     <img src={Images.remove} alt="delete" />
                  </div> */}
               </div>
            )}
         </div>
         <div className={classes.AuthHeaderBottom}>
            <div className={classes.AuthHeaderBottomBox}>
               <p className={classes.AuthHeaderBottomBoxTitle}>
                  {" "}
                  {empoloyment ? "Supervisor:" : "Funding Source:"}{" "}
               </p>
               <p className={classes.AuthHeaderBottomBoxText}>
                  {empoloyment
                     ? info?.supervisor
                        ? makeCapitalize(info?.supervisor?.firstName)
                        : "--"
                     : makeCapitalize(info?.funderId?.name)}
               </p>
            </div>
            <div className={classes.AuthHeaderBottomBox}>
               <p className={classes.AuthHeaderBottomBoxTitle}>
                  {empoloyment ? "Department:" : "Status:"}
               </p>
               <p
                  className={`${classes.AuthHeaderBottomBoxText} ${
                     !empoloyment ? "statusStyle" : ""
                  } ${authStatusDisplay}`}
               >
                  {empoloyment
                     ? makeCapitalize(info?.departmentId?.name)
                     : ActiveInactiveStatusReverse(authStatusDisplay)}
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
                     data={empoloyment ? manageType(info?.type) : info?.location}
                  />
               </p>
            </div>
         </div>
      </div>
   );
};
