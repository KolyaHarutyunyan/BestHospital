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
import { PayrollSetupStyles } from "../../styles";
import { OvertimeSettings } from "../overtimeSettings";

export const OvertimeSettingTBody = ({ overtimeSetting }) => {
   const classes = PayrollSetupStyles();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const { showDashIfEmpty } = hooksForTable;

   const [modalIsOpen, setModalIsOpen] = useState(false);

   function getTableData(data) {
      return showDashIfEmpty(getDataForTable(data, open, width));
   }

   const name = getTableData(makeCapitalize(overtimeSetting?.name));
   const type = getTableData(manageType(overtimeSetting?.type));
   const threshold = overtimeSetting?.threshold
      ? getTableData(
           `${overtimeSetting?.threshold} ${type === "Consecutive" ? "days" : "hours"}`
        )
      : "---";
   const multiplier = getTableData(overtimeSetting?.multiplier);

   return (
      <Fragment>
         <div className={classes.tbodyContainerStyle}>
            <div className={classes.tdStyle} style={{ maxWidth: "232px" }}>
               {name}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "232px" }}>
               {type}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "232px" }}>
               {threshold}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "232px" }}>
               {multiplier}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "128px" }}>
               <div
                  className={classes.editOvertimeSettingIconStyle}
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
                  wrapperClassName={classes.editOvertimeSettingWrapperStyle}
                  titleContent={"Edit Overtime Setting"}
                  onClose={() => setModalIsOpen(false)}
               >
                  <OvertimeSettings
                     maxWidth="480px"
                     editedData={overtimeSetting}
                     handleClose={() => setModalIsOpen(false)}
                  />
               </ModalContentWrapper>
            }
         />
      </Fragment>
   );
};
