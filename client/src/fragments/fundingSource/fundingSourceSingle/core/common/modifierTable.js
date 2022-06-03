import React from "react";
import { ModifierTBody, ModifierTHead } from "./core";
import { fundingSourceCommonStyle } from "./styles";

export const ModifierTable = ({ modifiers = [], currentService, globalCredentials }) => {
   const classes = fundingSourceCommonStyle();

   return (
      <div className={classes.modifierTableStyle}>
         <ModifierTHead />
         {modifiers.map((modifier, index) => (
            <ModifierTBody
               key={index}
               modifier={modifier}
               currentService={currentService}
               globalCredentials={globalCredentials}
            />
         ))}
      </div>
   );
};
