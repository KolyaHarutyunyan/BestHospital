import React from "react";
import { useHistory } from "react-router-dom";
import { TableBodyComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { Images, useGlobalStyles } from "@eachbase/utils";

export const FundingSourceTableBody = ({ data }) => {
   const globalClasses = useGlobalStyles();
   const history = useHistory();
   const handleOpenOfficeInfo = (id) => {
      history.push(`/fundingSource/${id}`);
   };

   return (
      <TableBodyComponent handleOpenInfo={() => handleOpenOfficeInfo(data.id)}>
         <TableCell>
            <div className={globalClasses.InfoAndImage}>
               <img src={Images.fundingSourceOutline} alt={"funding"} />
               <p>{data.name}</p>
            </div>
         </TableCell>
         <TableCell>{data?.type}</TableCell>
         <TableCell>
            {data.address?.street
               ? data.address?.street
               : data.address?.city
               ? data.address?.city
               : data.address?.country
               ? data.address?.country
               : null}
         </TableCell>
         <TableCell>{data.email}</TableCell>
         <TableCell>{data.phoneNumber}</TableCell>
      </TableBodyComponent>
   );
};
