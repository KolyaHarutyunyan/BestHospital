import React, { Fragment, useState } from "react";
import { hooksForTable, Images } from "@eachbase/utils";
import { ModalContentWrapper, SimpleModal } from "@eachbase/components";
import { PayrollSetupStyles } from "../../styles";
import { MileageCompensation } from "../mileageCompensation";

export const MileageCompansationTBody = ({ mileageCompensation }) => {
   const classes = PayrollSetupStyles();

   const { addSignToValueFromStart, handleCreatedAtDate } = hooksForTable;

   const [modalIsOpen, setModalIsOpen] = useState(false);

   const mileageCompansation = addSignToValueFromStart(mileageCompensation?.compensation);
   const startDate = handleCreatedAtDate(mileageCompensation?.startDate);
   const endDate = handleCreatedAtDate(mileageCompensation?.endDate);

   return (
      <Fragment>
         <div className={classes.tbodyContainerStyle}>
            <div className={classes.tdStyle} style={{ maxWidth: "313px" }}>
               {mileageCompansation}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "312px" }}>
               {startDate}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "311px" }}>
               {endDate}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "121px" }}>
               <div
                  className={classes.editMileageCompensationIconStyle}
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
                  wrapperClassName={classes.editMileageCompensationWrapperStyle}
                  titleContent={"Edit Mileage Compensation"}
                  onClose={() => setModalIsOpen(false)}
               >
                  <MileageCompensation
                     maxWidth="480px"
                     editedData={mileageCompensation}
                     handleClose={() => setModalIsOpen(false)}
                  />
               </ModalContentWrapper>
            }
         />
      </Fragment>
   );
};
