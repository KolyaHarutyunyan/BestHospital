import React, { Fragment, useEffect, useState } from "react";
import {
   CustomizedSwitch,
   DeleteElement,
   MinLoader,
   SimpleModal,
} from "@eachbase/components";
import {
   Colors,
   FindLoad,
   FindSuccess,
   getLimitedVal,
   Images,
   makeCapitalize,
} from "@eachbase/utils";
import { clientCommonCoreStyle } from "./styles";
import { hooksForTable } from "@eachbase/utils";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Radio } from "@material-ui/core";
import moment from "moment";
import { AddEnrollment } from "../../../..";
import { clientActions, httpRequestsOnSuccessActions } from "@eachbase/store";

function getModifierData(givenData = "") {
   return hooksForTable.showDashIfEmpty(getLimitedVal(makeCapitalize(givenData)));
}

export const ClientEnrollmentTBody = ({ enrollment }) => {
   const classes = clientCommonCoreStyle();

   const params = useParams();

   const dispatch = useDispatch();

   const changePrimaryLoader = FindLoad("EDIT_CLIENT_ENROLLMENT");
   const terminateLoader = FindLoad("TERMINATE_CLIENT_ENROLLMENT");
   const terminateSuccess = FindSuccess("TERMINATE_CLIENT_ENROLLMENT");

   useEffect(() => {
      if (!!terminateSuccess.length) {
         setModalIsOpen(false);
         setModalContent("");
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("TERMINATE_CLIENT_ENROLLMENT")
         );
      }
   }, [terminateSuccess]);

   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [modalContent, setModalContent] = useState("");

   const _dateIsTerminated = !!enrollment?.terminationDate;

   const funderName = hooksForTable.showDashIfEmpty(enrollment?.funderId?.name);
   const clientId = getModifierData(enrollment?.clientId);
   const startDate = getModifierData(moment(enrollment?.startDate).format("DD/MM/YYYY"));
   const terminationDate = !!enrollment?.terminationDate
      ? getModifierData(moment(enrollment?.terminationDate).format("DD/MM/YYYY"))
      : null;

   function resetPrimaryEnrollmentHandler(event) {
      event.stopPropagation();
      dispatch(
         clientActions.editClientEnrollment(
            { primary: true },
            params.id,
            enrollment?.funderId?._id,
            enrollment?.id
         )
      );
   }

   return (
      <Fragment>
         <div className={classes.tbodyContainerStyle}>
            <div className={classes.tdStyle} style={{ maxWidth: "120px" }}>
               {changePrimaryLoader.length ? (
                  <div className={classes.loadStyle}>
                     <MinLoader margin={"0"} color={Colors.BackgroundBlue} />
                  </div>
               ) : (
                  <Radio
                     onChange={resetPrimaryEnrollmentHandler}
                     checked={enrollment?.primary}
                     classes={{ root: classes.radio, checked: classes.checked }}
                     disabled={_dateIsTerminated}
                  />
               )}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "280px" }}>
               {funderName}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "155px" }}>
               {clientId}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "175px" }}>
               {startDate}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "207px" }}>
               <CustomizedSwitch
                  checked={_dateIsTerminated}
                  handleClick={() => {
                     setModalIsOpen(true);
                     setModalContent("TERMINATE");
                  }}
                  disabled={_dateIsTerminated}
                  bgColor={"#6FD231"}
                  checkedBgColor={"#FEB8B8"}
               />
               <p className={classes.terminationDateTextStyle}>{terminationDate}</p>
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "107px" }}>
               <div
                  className={classes.editModifierIconStyle}
                  onClick={() => {
                     setModalIsOpen(true);
                     setModalContent("EDIT");
                  }}
               >
                  <img src={Images.edit} alt="edit" />
               </div>
            </div>
         </div>
         <SimpleModal
            openDefault={modalIsOpen}
            handleOpenClose={() => setModalIsOpen(false)}
            content={
               modalContent === "EDIT" ? (
                  <AddEnrollment
                     info={enrollment}
                     handleClose={() => setModalIsOpen(false)}
                  />
               ) : modalContent === "TERMINATE" ? (
                  <DeleteElement
                     info="Terminate This Date?"
                     text={
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
                     }
                     handleDel={() =>
                        dispatch(clientActions.terminateClientEnrollment(enrollment?.id))
                     }
                     handleClose={() => setModalIsOpen(false)}
                     innerText={"Terminate"}
                     loader={!!terminateLoader.length}
                  />
               ) : null
            }
         />
      </Fragment>
   );
};
