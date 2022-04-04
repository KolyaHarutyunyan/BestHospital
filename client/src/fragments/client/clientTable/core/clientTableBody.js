import React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { TableBodyComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { Images, makeCapitalize, useGlobalStyles } from "@eachbase/utils";
import { clientStyles } from "./styles";

export const ClientTableBody = ({ data, setOpen, index, setDeleteClient }) => {
   const globalClasses = useGlobalStyles();
   const history = useHistory();
   const classes = clientStyles();
   const handleOpenOfficeInfo = (id) => {
      history.push(`/client/${id}`);
   };

   return (
      <TableBodyComponent
         handleOpenInfo={() => handleOpenOfficeInfo(data.id)}
         key={index}
      >
         <TableCell>
            <div className={globalClasses.InfoAndImage}>
               <img src={Images.clients} alt={"client"} />
               <p>
                  {data?.firstName} {data?.lastName}
               </p>
            </div>
         </TableCell>
         <TableCell> {data?.code} </TableCell>
         <TableCell>{data?.gender}</TableCell>
         <TableCell>{moment(data?.birthday).format("DD/MM/YYYY")}</TableCell>
         <TableCell>{makeCapitalize(data?.status)} </TableCell>
         <TableCell>{data?.enrollment?.name}</TableCell>
         <TableCell>
            <img
               src={Images.remove}
               alt="delete"
               className={classes.iconCursor}
               onClick={(e) => {
                  e.stopPropagation();
                  setDeleteClient({ id: data.id, firstName: data.firstName });
                  setOpen(true);
               }}
            />
         </TableCell>
      </TableBodyComponent>
   );
};
