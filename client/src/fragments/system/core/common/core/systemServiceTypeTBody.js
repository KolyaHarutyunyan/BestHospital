import React, { Fragment, useState } from "react";
import { systemCoreCommonCoreStyle } from "./style";
import { Images } from "@eachbase/utils";
import { ModalContentWrapper, SimpleModal } from "@eachbase/components";
import { CreateEditServiceType } from "..";

export const SystemServiceTypeTBody = ({ serviceType }) => {
   const classes = systemCoreCommonCoreStyle();

   const [modalIsOpen, setModalIsOpen] = useState(false);

   const name = serviceType?.name;
   const displayCode = serviceType?.displayCode;
   const category = serviceType?.category;

   return (
      <Fragment>
         <div className={classes.tbodyContainerStyle}>
            <div className={classes.tdStyle} style={{ maxWidth: "490px" }}>
               {name}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "481px" }}>
               {displayCode}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "481px" }}>
               {category}
            </div>
            <div className={classes.tdStyle} style={{ maxWidth: "128px" }}>
               <div
                  className={classes.editServiceTypeIconStyle}
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
                  wrapperClassName={classes.editServiceTypeWrapperStyle}
                  titleContent={"Edit Service Type"}
                  onClose={() => setModalIsOpen(false)}
               >
                  <CreateEditServiceType
                     info={serviceType}
                     handleClose={() => setModalIsOpen(false)}
                  />
               </ModalContentWrapper>
            }
         />
      </Fragment>
   );
};
