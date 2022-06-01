import React, { useContext, useEffect, useState } from "react";
import {
   AddButtonLight,
   NoItemText,
   Notes,
   SimpleModal,
   TableBodyComponent,
} from "@eachbase/components";
import { fundingSourceSingleStyles } from "./styles";
import { Switch, TableCell } from "@material-ui/core";
import {
   DrawerContext,
   FindLoad,
   FindSuccess,
   getLimitedVal,
   Images,
   useWidth,
} from "@eachbase/utils";
import { getHeaderTitlesForModifier } from "./constants";
import { FundingSourceModifiersAdd } from "./modals";
import { useDispatch } from "react-redux";
import { fundingSourceActions, httpRequestsOnSuccessActions } from "@eachbase/store";
import { useParams } from "react-router";

export const FundingSourceSinglePTModifiers = ({
   data = [],
   title,
   globalCredentials = [],
   currentService,
}) => {
   const classes = fundingSourceSingleStyles();

   const { open } = useContext(DrawerContext);

   const params = useParams();

   const width = useWidth();

   const dispatch = useDispatch();

   const success = FindSuccess("DELETE_FUNDING_MODIFIER");
   const loader = FindLoad("DELETE_FUNDING_MODIFIER");

   useEffect(() => {
      if (!!success.length) {
         setModalIsOpen(false);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("DELETE_FUNDING_MODIFIER"));
      }
   }, [success]);

   const modifierBoxStyle = `${classes.fundingSourceSinglePTModifiersStyles} ${
      open ? "narrow" : ""
   }`;

   const headerTitles = getHeaderTitlesForModifier();
   const titleDisplay = getLimitedVal(title, width < 1450 ? 9 : 20);

   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [modifier, setModifier] = useState();
   const [modifierStatus, setModifierStatus] = useState(false);

   function handleModifierCreate() {
      setModalIsOpen(true);
      setModifier();
   }

   function handleModifierEdit(modifier) {
      setModalIsOpen(true);
      setModifier(modifier);
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
               </div>
            </TableCell>
            <TableCell>
               <div className={classes.modifierActionsStyle}>
                  <Switch
                     onClick={() => setModifierStatus((prevState) => !prevState)}
                     checked={modifierStatus}
                     name="require"
                     color="primary"
                  />
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
                  info={modifier}
                  currentService={currentService}
                  credentials={globalCredentials}
                  handleClose={() => setModalIsOpen(false)}
               />
            }
         />
      </>
   );
};

// dispatch(
//    fundingSourceActions.deleteFundingModifier(
//       params.id,
//       currentService?._id,
//       [modifier?._id]
//    )
// )
