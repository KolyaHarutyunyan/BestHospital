import React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { TableBodyComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import {
   createCodeFromName,
   Images,
   makeCapitalize,
   useGlobalStyles,
} from "@eachbase/utils";
import { clientStyles } from "./styles";
import { hooksForTable } from "@eachbase/utils";

export const ClientTableBody = ({ data, setOpen, index, setDeleteClient }) => {
   const classes = clientStyles();
   const globalClasses = useGlobalStyles();

   const history = useHistory();

   const { getFullName, showDashIfEmpty } = hooksForTable;

   const firstN = makeCapitalize(data?.firstName);
   const lastN = makeCapitalize(data?.lastName);

   const clientFullName = getFullName(firstN, lastN, showDashIfEmpty);
   const _clientCreationCode = createCodeFromName(`${firstN} ${lastN}`);
   const gender = showDashIfEmpty(data?.gender);
   const dateOfBirth = showDashIfEmpty(moment(data?.birthday).format("DD/MM/YYYY"));
   const status = showDashIfEmpty(makeCapitalize(data?.status));
   const enrollment = showDashIfEmpty(data?.enrollment?.name);

   return (
      <TableBodyComponent
         key={index}
         handleOpenInfo={() => history.push(`/client/${data?.id}`)}
      >
         <TableCell>
            <div className={globalClasses.InfoAndImage}>
               <img src={Images.clients} alt={"client"} />
               <p>{clientFullName}</p>
            </div>
         </TableCell>
         <TableCell> {_clientCreationCode} </TableCell>
         <TableCell>{gender}</TableCell>
         <TableCell>{dateOfBirth}</TableCell>
         <TableCell>{status} </TableCell>
         <TableCell>{makeCapitalize(enrollment)}</TableCell>
         <TableCell>
            <img
               src={Images.remove}
               alt="delete"
               className={classes.iconCursor}
               onClick={(e) => {
                  e.stopPropagation();
                  setDeleteClient({ id: data?.id, firstName: data?.firstName });
                  setOpen(true);
               }}
            />
         </TableCell>
      </TableBodyComponent>
   );
};
