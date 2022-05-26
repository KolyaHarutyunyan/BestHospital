import React, { useContext, useState } from "react";
import {
   AddButtonLight,
   NoItemText,
   Notes,
   SimpleModal,
   TableBodyComponent,
} from "@eachbase/components";
import { fundingSourceSingleStyles } from "./styles";
import { TableCell } from "@material-ui/core";
import { DrawerContext, getLimitedVal, Images, useWidth } from "@eachbase/utils";
import { getHeaderTitlesForModifier } from "./constants";
import { FundingSourceModifiersAdd } from "./modals";

export const FundingSourceSinglePTModifiers = ({
   data,
   title,
   globalCredentials,
   currentService,
}) => {
   const classes = fundingSourceSingleStyles();

   const { open } = useContext(DrawerContext);

   const width = useWidth();

   const modifierBoxStyle = `${classes.fundingSourceSinglePTModifiersStyles} ${
      open ? "narrow" : ""
   }`;

   const headerTitles = getHeaderTitlesForModifier();
   const titleDisplay = getLimitedVal(title, width < 1450 ? 9 : 20);

   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [modifier, setModifier] = useState();

   function handleModifierCreate() {
      setModalIsOpen(true);
      setModifier();
   }

   function handleModifierEdit(modifier) {
      setModalIsOpen(true);
      setModifier(modifier);
   }

   function handleModifierRemove(modifier) {
      console.log(modifier, " mod to remove");
   }

   function modifiersItemHandler(item, index) {
      return (
         <TableBodyComponent key={index}>
            <TableCell> {item?.name} </TableCell>
            <TableCell>
               {
                  globalCredentials.find(
                     (elem) => elem?._id === item?.credentialId && elem?._id
                  )?.name
               }
            </TableCell>
            <TableCell> {item?.chargeRate} </TableCell>
            <TableCell> {item?.type} </TableCell>
            <TableCell>
               <div className={classes.modifierActionsStyle}>
                  <div onClick={() => handleModifierEdit(item)}>
                     <img src={Images.edit} alt="edit" />
                  </div>
                  <div onClick={() => handleModifierRemove(item)}>
                     <img src={Images.remove} alt="edit" />
                  </div>
               </div>
            </TableCell>
         </TableBodyComponent>
      );
   }

   return (
      <>
         <div className={modifierBoxStyle}>
            <div className={classes.modifierTitleBoxStyle}>
               <p className={classes.fundingSourceSinglePTModifiersTitleStyles}>
                  {`${titleDisplay} Charge Table`}
               </p>
               <AddButtonLight
                  onAddButnLightClick={handleModifierCreate}
                  addButnLightInnerText={"add modifier"}
               />
            </div>
            {data && data.length ? (
               <Notes
                  noItemsYet={true}
                  data={data}
                  items={modifiersItemHandler}
                  headerTitles={headerTitles}
                  defaultStyle={true}
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
                  credentials={globalCredentials}
                  handleClose={() => setModalIsOpen(false)}
                  currentService={currentService}
                  info={modifier}
               />
            }
         />
      </>
   );
};
