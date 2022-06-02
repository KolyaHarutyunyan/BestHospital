import React, { useState } from "react";
import { AddButtonLight, NoItemText, SimpleModal } from "@eachbase/components";
import { fundingSourceSingleStyles } from "./styles";
import { getLimitedVal, useWidth } from "@eachbase/utils";
import { FundingSourceModifiersAdd } from "./modals";
import { ModifierTable } from "./common";

export const FundingSourceSinglePTModifiers = ({
   data = [],
   title,
   globalCredentials = [],
   currentService,
}) => {
   const classes = fundingSourceSingleStyles();

   const width = useWidth();

   const titleDisplay = getLimitedVal(title, width < 1450 ? 9 : 20);

   const [modalIsOpen, setModalIsOpen] = useState(false);

   return (
      <>
         <div className={classes.modifierBoxStyle}>
            <div className={classes.modifierTitleBoxStyle}>
               <p className={classes.modifierTitleStyle}>
                  {`${titleDisplay} Charge Table`}
               </p>
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
