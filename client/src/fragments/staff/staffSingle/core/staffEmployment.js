import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   AddButtonLight,
   Card,
   Loader,
   NoItemText,
   SimpleModal,
} from "@eachbase/components";
import { EmploymentModal, PaycodeModal } from "./modals";
import { AuthHeader } from "@eachbase/components/headers/auth/authHeader";
import { Colors, FindLoad, Images } from "@eachbase/utils";
import { adminActions, payrollActions } from "@eachbase/store";
import { serviceSingleStyles } from "@eachbase/fragments/client/clientSingle/core";
import { PaycodeTable } from "./common";

export const StaffEmployment = ({ info }) => {
   const classes = serviceSingleStyles();

   const dispatch = useDispatch();

   const payCodes = useSelector((state) => state.admins.payCodes);

   const loader = FindLoad("GET_PAY_CODE");

   // const [delEdit, setDelEdit] = useState(null);
   const [toggleModal, setToggleModal] = useState(false);
   const [toggleModal2, setToggleModal2] = useState(false);
   const [authIndex, setAuthIndex] = useState(0);

   useEffect(() => {
      dispatch(payrollActions.getPayCodeGlobal());
   }, []);

   useEffect(() => {
      dispatch(adminActions.getPayCode(info[authIndex]?.id));
   }, [authIndex]);

   return (
      <div className={classes.staffGeneralWrapper}>
         <SimpleModal
            handleOpenClose={() => setToggleModal((prevState) => !prevState)}
            openDefault={toggleModal}
            content={
               // delEdit ? (
               <EmploymentModal
                  fundingId={info[authIndex]?.funderId?._id}
                  info={info[authIndex]}
                  handleClose={() => setToggleModal((prevState) => !prevState)}
               />
               // ) : (
               //    <DeleteElement
               //       loader={!!loaderDel.length}
               //       handleClose={() => setToggleModal((prevState) => !prevState)}
               //       handleDel={deleteAuthorization}
               //    />
               // )
            }
         />
         <SimpleModal
            handleOpenClose={() => setToggleModal2((prevState) => !prevState)}
            openDefault={toggleModal2}
            content={
               <PaycodeModal
                  employmentId={info[authIndex]?.id}
                  authId={info[authIndex]?.id}
                  handleClose={() => setToggleModal2((prevState) => !prevState)}
               />
            }
         />
         <Card
            employment={true}
            width="234px"
            cardInfo={info}
            showHeader={true}
            hideHeaderLine={false}
            title="Employments"
            color={Colors.ThemeBlue}
            icon={Images.employment}
            auth={true}
            active={authIndex}
            click={setAuthIndex}
         />
         <div className={classes.clearBoth} />
         <div className={classes.notesWrap}>
            <AuthHeader
               type={"staff"}
               empoloyment={true}
               // setDelEdit={setDelEdit}
               info={info[authIndex]}
               setToggleModal={setToggleModal}
               toggleModal={toggleModal}
            />
            <div className={classes.authorizationServices}>
               <p className={classes.authorizationServicesTitle}>Paycodes</p>
               <AddButtonLight
                  addButnLightClassName={classes.addAuthServiceButnStyle}
                  addButnLightInnerText={"Add Paycode"}
                  onAddButnLightClick={() => setToggleModal2(true)}
               />
            </div>
            {!!loader.length ? (
               <Loader circleSize={50} />
            ) : (
               <div>
                  {!!payCodes?.length ? (
                     <PaycodeTable paycodes={payCodes} />
                  ) : (
                     <NoItemText text={"No Paycodes Yet"} />
                  )}
               </div>
            )}
         </div>
      </div>
   );
};
