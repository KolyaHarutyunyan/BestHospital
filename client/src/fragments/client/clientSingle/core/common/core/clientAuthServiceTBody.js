import React, { useEffect, useState } from "react";
import { DeleteElement, SimpleModal } from "@eachbase/components";
import {
   FindLoad,
   FindSuccess,
   getLimitedVal,
   Images,
   makeCapitalize,
} from "@eachbase/utils";
import { clientCommonCoreStyle } from "./styles";
import { hooksForTable } from "@eachbase/utils";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { AddAuthorizationService } from "../../../..";
import { clientActions, httpRequestsOnSuccessActions } from "@eachbase/store";

const { showDashIfEmpty } = hooksForTable;

function getAuthServiceData(givenData = "") {
   return showDashIfEmpty(getLimitedVal(makeCapitalize(givenData), 15));
}

export const ClientAuthServiceTBody = ({ authService, authId, fundingId }) => {
   const classes = clientCommonCoreStyle();

   const dispatch = useDispatch();

   const removeAuthServiceLoader = FindLoad("DELETE_CLIENT_AUTHORIZATION_SERV");
   const removeAuthServiceSuccess = FindSuccess("DELETE_CLIENT_AUTHORIZATION_SERV");

   useEffect(() => {
      if (!!removeAuthServiceSuccess.length) {
         setModalIsOpen(false);
         setModalContent("");
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("DELETE_CLIENT_AUTHORIZATION_SERV")
         );
      }
   }, [removeAuthServiceSuccess]);

   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [modalContent, setModalContent] = useState("");

   const serviceCode = getAuthServiceData(authService?.serviceId?.serviceId?.name);
   const authModifiers =
      authService?.authModifiers?.length > 1
         ? authService?.authModifiers
              ?.filter((item) => !!item)
              .map((item, index, arr) => {
                 if (index === arr.length - 1) {
                    return `${makeCapitalize(item.name)}`;
                 }
                 return `${makeCapitalize(item.name)}, `;
              })
         : makeCapitalize(authService?.authModifiers[0]?.name);
   const authModifiersDisplay = authService?.default
      ? !!authModifiers
         ? showDashIfEmpty(`default, ${authModifiers}`)
         : showDashIfEmpty("default")
      : showDashIfEmpty(authModifiers);
   const totalUnits = getAuthServiceData(authService?.total);
   const completedUnits = getAuthServiceData(authService?.completed);
   const availableUnits = getAuthServiceData(authService?.total - authService?.completed);
   const percentUtilization = authService?.completed / authService?.total;

   return (
      <>
         <div className={classes.tbodyContainerStyle}>
            <div className={classes.tdStyle}>{serviceCode} </div>
            <div className={classes.tdStyle}>{authModifiersDisplay}</div>
            <div className={classes.tdStyle}>{totalUnits}</div>
            <div className={classes.tdStyle}>{completedUnits}</div>
            <div className={classes.tdStyle}> {availableUnits}</div>
            <div className={classes.tdStyle}>
               <div className={classes.percentageBoxStyle}>
                  <p className={classes.percTextStyle}>{`${percentUtilization}%`}</p>
                  <CircularProgress variant="determinate" value={percentUtilization} />
               </div>
            </div>
            <div className={classes.tdStyle}>
               <div className={classes.actionBoxStyle}>
                  <div
                     className={classes.editAuthServiceIconStyle}
                     onClick={() => {
                        setModalIsOpen(true);
                        setModalContent("EDIT");
                     }}
                  >
                     <img src={Images.edit} alt="edit" />
                  </div>
                  {/* <div
                     className={classes.removeAuthServiceIconStyle}
                     onClick={() => {
                        setModalIsOpen(true);
                        setModalContent("REMOVE");
                     }}
                  >
                     <img src={Images.remove} alt="remove" />
                  </div> */}
               </div>
            </div>
         </div>
         <SimpleModal
            openDefault={modalIsOpen}
            handleOpenClose={() => setModalIsOpen(false)}
            content={
               modalContent === "EDIT" ? (
                  <AddAuthorizationService
                     info={authService}
                     authId={authId}
                     fundingId={fundingId}
                     handleClose={() => setModalIsOpen(false)}
                  />
               ) : modalContent === "REMOVE" ? (
                  <DeleteElement
                     info={`Delete ${serviceCode}?`}
                     handleDel={() =>
                        dispatch(
                           clientActions.deleteClientsAuthorizationServ(
                              authService?.id,
                              authId
                           )
                        )
                     }
                     handleClose={() => setModalIsOpen(false)}
                     loader={!!removeAuthServiceLoader.length}
                  />
               ) : null
            }
         />
      </>
   );
};
