import React, { Fragment, useEffect, useState } from "react";
import { staffSingleCoreCommonCoreStyle } from "./style";
import { CustomizedSwitch, DeleteElement, SimpleModal } from "@eachbase/components";
import { FindLoad, FindSuccess, makeCapitalize, manageType } from "@eachbase/utils";
import { hooksForTable } from "@eachbase/utils";
import { useDispatch } from "react-redux";
import { adminActions, httpRequestsOnSuccessActions } from "@eachbase/store";

const { showDashIfEmpty, addSignToValueFromStart, handleCreatedAtDate } = hooksForTable;

export const PaycodeTBody = ({ paycode }) => {
   const classes = staffSingleCoreCommonCoreStyle();

   const dispatch = useDispatch();

   const terminateLoader = FindLoad("TERMINATE_PAYCODE");
   const terminateSuccess = FindSuccess("TERMINATE_PAYCODE");

   useEffect(() => {
      if (!!terminateSuccess.length) {
         setModalIsOpen(false);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("TERMINATE_PAYCODE"));
      }
   }, [terminateSuccess]);

   const [modalIsOpen, setModalIsOpen] = useState(false);

   const _dateIsTerminated = !!paycode?.endDate;

   const name = showDashIfEmpty(makeCapitalize(paycode?.payCodeTypeId?.name));
   const code = showDashIfEmpty(paycode?.payCodeTypeId?.code);
   const type = showDashIfEmpty(manageType(paycode?.payCodeTypeId?.type));
   const rate = showDashIfEmpty(addSignToValueFromStart(paycode?.rate));
   const startDate = showDashIfEmpty(handleCreatedAtDate(paycode?.startDate));
   const status = paycode?.active === true ? "Active" : "Inactive";
   const terminationDate = !!paycode?.endDate
      ? showDashIfEmpty(handleCreatedAtDate(paycode?.endDate))
      : null;

   return (
      <Fragment>
         <div className={classes.tbodyContainerStyle}>
            <div className={classes.tdStyle} style={{ maxWidth: "297px" }}>
               {name}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "152px" }}>
               {code}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "176px" }}>
               {type}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "144px" }}>
               {rate}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "184px" }}>
               {startDate}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "159px" }}>
               {status}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "186px" }}>
               <CustomizedSwitch
                  checked={_dateIsTerminated}
                  handleClick={() => setModalIsOpen(true)}
                  disabled={_dateIsTerminated}
                  bgColor={"#6FD231"}
                  checkedBgColor={"#FEB8B8"}
               />
               <p className={classes.terminationDateTextStyle}>{terminationDate}</p>
            </div>
         </div>
         <SimpleModal
            openDefault={modalIsOpen}
            handleOpenClose={() => setModalIsOpen(false)}
            content={
               <DeleteElement
                  info="Inactivate This Paycode?"
                  text={
                     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
                  }
                  handleDel={() => dispatch(adminActions.terminatePaycode(paycode?.id))}
                  handleClose={() => setModalIsOpen(false)}
                  innerText={"Inactivate"}
                  loader={!!terminateLoader.length}
               />
            }
         />
      </Fragment>
   );
};
