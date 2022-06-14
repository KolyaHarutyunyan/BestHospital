import React from "react";
import { useHistory } from "react-router-dom";
import { TableBodyComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import {
   hooksForTable,
   Images,
   makeCapitalize,
   manageType,
   useGlobalStyles,
} from "@eachbase/utils";

export const FundingSourceTableBody = ({ data }) => {
   const globalClasses = useGlobalStyles();

   const history = useHistory();

   const currentAddress = data?.address?.street
      ? data?.address?.street
      : data?.address?.city
      ? data?.address?.city
      : data?.address?.country
      ? data?.address?.country
      : "";

   const funderName = hooksForTable.showDashIfEmpty(data?.name);
   const type = hooksForTable.showDashIfEmpty(manageType(data?.type));
   const address = hooksForTable.showDashIfEmpty(currentAddress);
   const email = hooksForTable.showDashIfEmpty(data.email);
   const phoneNumber = hooksForTable.showDashIfEmpty(data.phoneNumber);

   return (
      <TableBodyComponent
         handleOpenInfo={() => history.push(`/fundingSource/${data?.id}`)}
      >
         <TableCell>
            <div className={globalClasses.InfoAndImage}>
               <img src={Images.fundingSourceOutline} alt={"funding"} />
               <p>{makeCapitalize(funderName)}</p>
            </div>
         </TableCell>
         <TableCell>{type}</TableCell>
         <TableCell>{address}</TableCell>
         <TableCell>{email}</TableCell>
         <TableCell>{phoneNumber}</TableCell>
      </TableBodyComponent>
   );
};
