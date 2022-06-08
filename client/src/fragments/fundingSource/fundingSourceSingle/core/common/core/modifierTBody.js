import React, { useEffect, useState } from "react";
import { CustomizedSwitch, SimpleModal } from "@eachbase/components";
import { getLimitedVal, Images, makeCapitalize } from "@eachbase/utils";
import { fundingSourceCommonCoreStyle } from "./styles";
import { hooksForTable } from "@eachbase/utils";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fundingSourceActions } from "@eachbase/store";
import { FundingSourceModifiersAdd } from "../../modals";

function getModifierData(givenData = "") {
   return hooksForTable.showDashIfEmpty(getLimitedVal(makeCapitalize(givenData)));
}

export const ModifierTBody = ({ modifier, currentService, globalCredentials = [] }) => {
   const classes = fundingSourceCommonCoreStyle();

   const params = useParams();

   const dispatch = useDispatch();

   const [modifierStatusIsActive, setModifierStatusIsActive] = useState(modifier?.status);
   const [statusWasChanged, setStatusWasChanged] = useState(false);
   const [modalIsOpen, setModalIsOpen] = useState(false);

   useEffect(() => {
      if (statusWasChanged) {
         const _modifierStatus = modifierStatusIsActive ? "active" : "inactive";
         dispatch(
            fundingSourceActions.changeFundingModifierStatus(
               params.id,
               currentService?.id,
               modifier?._id,
               _modifierStatus
            )
         );
      }
   }, [modifierStatusIsActive, statusWasChanged]);

   const modifierName = getModifierData(modifier?.name);
   const credentialName = getModifierData(
      globalCredentials.find((elem) => elem?._id === modifier?.credentialId && elem?._id)
         ?.name
   );
   const chargeRate = getModifierData(modifier?.chargeRate);
   const modifierType = getModifierData(modifier?.type);

   return (
      <>
         <div className={classes.tbodyContainerStyle}>
            <div className={classes.tdStyle}>{modifierName}</div>
            <div className={classes.tdStyle}>{credentialName}</div>
            <div className={classes.tdStyle}>{chargeRate}</div>
            <div className={classes.tdStyle}>{modifierType}</div>
            <div className={classes.tdStyle}>
               <div
                  className={classes.editModifierIconStyle}
                  onClick={() => setModalIsOpen(true)}
               >
                  <img src={Images.edit} alt="edit" />
               </div>
            </div>
            <div className={classes.tdStyle}>
               <CustomizedSwitch
                  checked={modifierStatusIsActive}
                  handleClick={() => {
                     setModifierStatusIsActive((prevState) => !prevState);
                     setStatusWasChanged(true);
                  }}
               />
            </div>
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
