import { authHeaderStyles } from "./styles";
import { Colors, Images, makeCapitalize } from "@eachbase/utils";
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
                           info?.endDate === "Precent"
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

            <div
               className={classes.AuthHeaderTopRight}
               style={{ display: "flex", alignItems: "center" }}
            >
               <p style={{ cursor: "pointer", marginRight: 10 }} onClick={openModal}>
                  {!empoloyment && (
                     <img
                        alt="file"
                        src={Images.authEdit}
                        style={{
                           width: 24,
                           height: 24,
                           marginTop: 7,
                           marginRight: 7,
                        }}
                     />
                  )}
               </p>
               <img
                  src={Images.edit}
                  alt="edit"
                  className={classes.iconStyle}
                  onClick={() => {
                     setDelEdit(true);
                     setToggleModal(!toggleModal);
                  }}
               />
               {empoloyment ? (
                  <p
                     style={{
                        color: Colors.ThemeBlue,
                        fontSize: 14,
                        fontWeight: "bold",
                        marginLeft: 8,
                        cursor: "pointer",
                     }}
                     onClick={() => {
                        setDelEdit(true);
                        setToggleModal(!toggleModal);
                     }}
                  >
                     Edit
                  </p>
               ) : (
                  <img
                     src={Images.remove}
                     alt="delete"
                     className={classes.iconDeleteStyle}
                     onClick={() => {
                        setDelEdit(false);
                        setToggleModal(!toggleModal);
                     }}
                  />
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
                  {empoloyment ? info?.supervisor?.firstName : info?.funderId?.name}
               </p>
            </div>
            <div className={classes.AuthHeaderBottomBox}>
               <p className={classes.AuthHeaderBottomBoxTitle}>
                  {empoloyment ? "Department:" : "Status:"}
               </p>
               <p className={classes.AuthHeaderBottomBoxText}>
                  {empoloyment ? info?.departmentId?.name : makeCapitalize(info?.status)}
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
