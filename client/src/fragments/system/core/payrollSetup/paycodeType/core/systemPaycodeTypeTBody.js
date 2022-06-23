import React, { Fragment, useContext, useState } from "react";
import {
   DrawerContext,
   getDataForTable,
   hooksForTable,
   Images,
   makeCapitalize,
   manageType,
   useWidth,
} from "@eachbase/utils";
import { ModalContentWrapper, SimpleModal } from "@eachbase/components";
import { PayCodeType } from "../paycodeType";
import { PayrollSetupStyles } from "../../styles";

export const SystemPaycodeTypeTBody = ({ paycodeType }) => {
   const classes = PayrollSetupStyles();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const { showDashIfEmpty } = hooksForTable;

   const [modalIsOpen, setModalIsOpen] = useState(false);

   function getTableData(data) {
      return showDashIfEmpty(getDataForTable(data, open, width));
   }

   const name = getTableData(makeCapitalize(paycodeType?.name));
   const code = getTableData(paycodeType?.code);
   const type = getTableData(manageType(paycodeType?.type));
   const overtimeApplied = paycodeType?.overtime ? "Yes" : "No";
   const ptoAccrued = paycodeType?.pto ? "Yes" : "No";

   return (
      <Fragment>
         <div className={classes.tbodyContainerStyle}>
            <div className={classes.tdStyle} style={{ maxWidth: "262px" }}>
               {name}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "144px" }}>
               {code}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "190px" }}>
               {type}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "182px" }}>
               {overtimeApplied}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "150px" }}>
               {ptoAccrued}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "128px" }}>
               <div
                  className={classes.editPaycodeTypeIconStyle}
                  onClick={() => setModalIsOpen(true)}
               >
                  <img src={Images.edit} alt="edit" />
               </div>
            </div>
         </div>
         <SimpleModal
            openDefault={modalIsOpen}
            handleOpenClose={() => setModalIsOpen((prevState) => !prevState)}
            content={
               <ModalContentWrapper
                  wrapperClassName={classes.editPaycodeTypeWrapperStyle}
                  titleContent={"Edit Paycode Type"}
                  onClose={() => setModalIsOpen(false)}
               >
                  <PayCodeType
                     maxWidth="480px"
                     editedData={paycodeType}
                     handleClose={() => setModalIsOpen(false)}
                  />
               </ModalContentWrapper>
            }
         />
      </Fragment>
   );
};
