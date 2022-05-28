import React, { useContext, useEffect, useState } from "react";
import {
   AddButtonLight,
   DeleteElement,
   NoItemText,
   Notes,
   SimpleModal,
   TableBodyComponent,
} from "@eachbase/components";
import { fundingSourceSingleStyles } from "./styles";
import { TableCell } from "@material-ui/core";
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
   const [modalContentLabel, setModalContentLabel] = useState("");

   function handleModifierCreate() {
      setModalIsOpen(true);
      setModifier();
      setModalContentLabel("CREATE");
   }

   function handleModifierEdit(modifier) {
      setModalIsOpen(true);
      setModifier(modifier);
      setModalContentLabel("EDIT");
   }

   function handleModifierRemove(modifier) {
      setModalIsOpen(true);
      setModifier(modifier);
      setModalContentLabel("REMOVE");
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
               modalContentLabel === "CREATE" || modalContentLabel === "EDIT" ? (
                  <FundingSourceModifiersAdd
                     info={modifier}
                     currentService={currentService}
                     credentials={globalCredentials}
                     handleClose={() => setModalIsOpen(false)}
                  />
               ) : modalContentLabel === "REMOVE" ? (
                  <DeleteElement
                     info={modifier?.name}
                     text="Are you sure you want to change the status of this modifier?"
                     innerText={"Change"}
                     loader={!!loader.length}
                     handleDel={() =>
                        dispatch(
                           fundingSourceActions.deleteFundingModifier(
                              params.id,
                              currentService?._id,
                              [modifier?._id]
                           )
                        )
                     }
                     handleClose={() => setModalIsOpen(false)}
                  />
               ) : null
            }
         />
      </>
   );
};
