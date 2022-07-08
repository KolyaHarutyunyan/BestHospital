import React, { Fragment, useEffect, useState } from "react";
import { staffSingleCoreCommonCoreStyle } from "./style";
import { DeleteElement, SimpleModal } from "@eachbase/components";
import { Colors, FindLoad, FindSuccess, Images, makeCapitalize } from "@eachbase/utils";
import { hooksForTable } from "@eachbase/utils";
import { useDispatch } from "react-redux";
import { adminActions, httpRequestsOnSuccessActions } from "@eachbase/store";
import { useParams } from "react-router";
import { CredentialModal } from "../..";
import { convertType } from "./constants";

const { showDashIfEmpty, handleCreatedAtDate } = hooksForTable;

export const StaffCredentialTBody = ({ staffCredential, globalCredentials }) => {
   const classes = staffSingleCoreCommonCoreStyle();

   const params = useParams();

   const dispatch = useDispatch();

   const deleteCredentialSuccess = FindSuccess("DELETE_CREDENTIAL_BY_ID");
   const deleteCredentialLoader = FindLoad("DELETE_CREDENTIAL_BY_ID");

   useEffect(() => {
      if (!!deleteCredentialSuccess.length) {
         setModalIsOpen(false);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("DELETE_CREDENTIAL_BY_ID"));
      }
   }, [deleteCredentialSuccess]);

   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [modalContentEnum, setModalContentEnum] = useState("");

   const name = showDashIfEmpty(makeCapitalize(staffCredential?.credentialId?.name));
   const type = convertType(staffCredential?.credentialId?.type);
   const receivedDate = showDashIfEmpty(
      handleCreatedAtDate(staffCredential?.receiveData)
   );
   const expirationDate = staffCredential?.expirationDate ? (
      handleCreatedAtDate(staffCredential?.expirationDate)
   ) : (
      <span style={{ color: Colors.TextLightGray }}>Non-Expiring</span>
   );

   return (
      <Fragment>
         <div className={classes.tbodyContainerStyle}>
            <div className={classes.tdStyle} style={{ maxWidth: "492px" }}>
               {name}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "492px" }}>
               {type}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "234px" }}>
               {receivedDate}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "234px" }}>
               {expirationDate}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "128px" }}>
               <div
                  className={classes.editStaffCredentialIconStyle}
                  onClick={() => {
                     setModalIsOpen(true);
                     setModalContentEnum("EDIT");
                  }}
               >
                  <img src={Images.edit} alt="edit" />
               </div>
               <div
                  className={classes.removeStaffCredentialIconStyle}
                  onClick={() => {
                     setModalIsOpen(true);
                     setModalContentEnum("DELETE");
                  }}
               >
                  <img src={Images.remove} alt="remove" />
               </div>
            </div>
         </div>
         <SimpleModal
            openDefault={modalIsOpen}
            handleOpenClose={() => setModalIsOpen(false)}
            content={
               modalContentEnum === "EDIT" ? (
                  <CredentialModal
                     globalCredentialInformation={{
                        id: staffCredential?._id,
                        credId: staffCredential?.credentialId?._id,
                        type: staffCredential?.credentialId?.name,
                        expirationDate: staffCredential?.expirationDate,
                     }}
                     globalCredentials={globalCredentials}
                     credModalType={"editCredential"}
                     handleClose={() => setModalIsOpen(false)}
                  />
               ) : modalContentEnum === "DELETE" ? (
                  <DeleteElement
                     info="Are you sure you want to delete this credential?"
                     handleClose={() => setModalIsOpen(false)}
                     handleDel={() =>
                        dispatch(
                           adminActions.deleteCredentialById(
                              staffCredential?._id,
                              params.id
                           )
                        )
                     }
                     loader={!!deleteCredentialLoader.length}
                  />
               ) : null
            }
         />
      </Fragment>
   );
};
