import React, { useState } from "react";
import {
   AddButtonLight,
   CloseButton,
   NoItemText,
   SimpleModal,
} from "@eachbase/components";
import { fundingSourceSingleStyles } from "./styles";
import { FundingSourceModifiersAdd } from "./modals";
import { ModifierTable } from "./common";

export const FundingSourceSinglePTModifiers = ({
   data = [],
   title,
   globalCredentials = [],
   currentService,
   onClose,
}) => {
   const classes = fundingSourceSingleStyles();

   const [modalIsOpen, setModalIsOpen] = useState(false);

   return (
      <>
         <div className={classes.modifierBoxStyle}>
            <CloseButton handleCLic={onClose} />
            <div className={classes.modifierTitleBoxStyle}>
               <p className={classes.modifierTitleStyle}>{`${title} Charge Table`}</p>
               <AddButtonLight
                  onAddButnLightClick={() => setModalIsOpen(true)}
                  addButnLightInnerText={"add modifier"}
               />
            </div>
            {data && data.length ? (
               <ModifierTable
                  modifiers={data}
                  currentService={currentService}
                  globalCredentials={globalCredentials}
               />
            ) : (
               <NoItemText text={"No Modifiers yet"} />
            )}
         </div>
         <SimpleModal
            openDefault={modalIsOpen}
            handleOpenClose={() => setModalIsOpen(false)}
            content={
               <FundingSourceModifiersAdd
                  currentService={currentService}
                  credentials={globalCredentials}
                  handleClose={() => setModalIsOpen(false)}
               />
            }
         />
      </>
   );
};
