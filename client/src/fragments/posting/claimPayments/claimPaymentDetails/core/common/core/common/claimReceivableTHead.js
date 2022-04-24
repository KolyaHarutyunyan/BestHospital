import React, { useContext } from "react";
import { claimReceivableTHeadTBodyStyle } from "./styles";
import {
   DrawerContext,
   getTableHeader,
   getTextDependsOnWidth,
   useWidth,
} from "@eachbase/utils";

export const ClaimReceivableTHead = () => {
   const classes = claimReceivableTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getReceivTitle(givenTitle = "", ...rest) {
      const size = open ? 1855 : 1700;
      const limit = open ? 6 : 9;

      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   const dateOfService = getReceivTitle("Date of Service", "", false);
   const placeOfService = getReceivTitle("Place of Service", "", false);
   const cptCodeAndModif = getReceivTitle("CPT Code (Modifier)", "", false);
   const totalUnits = getReceivTitle("Total Units", "", false);
   const allowedUnits = getReceivTitle("Allowed Units", "", false);
   const totalBilled = getReceivTitle("Total Billed", "", false);
   const clientResp = getReceivTitle("Client Responsibility", "", false);

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{dateOfService}</div>
         <div className={classes.thStyle}>{placeOfService}</div>
         <div className={classes.thStyle}>{cptCodeAndModif}</div>
         <div className={classes.thStyle}>{totalUnits}</div>
         <div className={classes.thStyle}>{allowedUnits}</div>
         <div className={classes.thStyle}>{totalBilled}</div>
         <div className={classes.thStyle}>{clientResp}</div>
      </div>
   );
};

