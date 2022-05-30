import React, { useEffect, useState } from "react";
import { PayrollSetupStyles } from "../styles";
import {
   DeleteElement,
   NoItemText,
   Notes,
   SimpleModal,
   SlicedText,
   TableBodyComponent,
} from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { FindLoad, FindSuccess, Images } from "@eachbase/utils";
import { PayCodeType } from "./paycodeType";
import { useDispatch } from "react-redux";
import {
   httpRequestsOnSuccessActions,
   payrollActions,
   systemActions,
} from "@eachbase/store";

const headerTitles = [
   {
      title: "Name",
      sortable: true,
   },
   {
      title: "Code",
      sortable: false,
   },
   {
      title: "Type",
      sortable: true,
   },
   {
      title: "Overtiming Applied",
      sortable: false,
   },
   {
      title: "PTO Accrued",
      sortable: false,
   },
   {
      title: "Action",
      sortable: false,
   },
];

export const PayCodeTable = ({ globalPayCodes }) => {
   const classes = PayrollSetupStyles();

   const dispatch = useDispatch();

   const [editModalOpenClose, setEditModalOpenClose] = useState(false);
   const [editedData, setEditedData] = useState({});
   const [open, setOpen] = useState(false);
   const [deletedInfo, setDeletedInfo] = useState({});

   const handleOpenClose = (data) => {
      setEditedData(data);
      setEditModalOpenClose((prevState) => !prevState);
   };

   const handleOpenCloseDelete = (data) => {
      setDeletedInfo(data);
      setOpen((prevState) => !prevState);
   };

   const handleDeleteItem = () => {
      dispatch(payrollActions.deletePayCodeByIdGlobal(deletedInfo.id));
   };

   const loader = FindLoad("DELETE_PAYCODE_BY_ID_GLOBAL");
   const success = FindSuccess("DELETE_PAYCODE_BY_ID_GLOBAL");

   useEffect(() => {
      if (!!success.length) {
         setOpen(false);
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("DELETE_PAYCODE_BY_ID_GLOBAL")
         );
      }
   }, [success]);

   const notesItem = (item, index) => {
      return (
         <TableBodyComponent key={index}>
            <TableCell>
               <SlicedText size={30} type={"name"} data={item.name} />
            </TableCell>
            <TableCell>{item.code}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.overtime ? "Yes" : "No"}</TableCell>
            <TableCell>{item.pto ? "Yes" : "No"}</TableCell>
            <TableCell>
               {item.action ? (
                  item.action
               ) : (
                  <div className={classes.icons}>
                     <img
                        src={Images.edit}
                        onClick={() =>
                           handleOpenClose({
                              name: item.name,
                              code: item.code,
                              type: item.type,
                              overtime: item.overtime,
                              pto: item.pto,
                              id: item.id,
                           })
                        }
                        alt="edit"
                     />
                     <img
                        src={Images.remove}
                        alt="delete"
                        onClick={() =>
                           handleOpenCloseDelete({
                              id: item.id,
                              name: item.name,
                           })
                        }
                     />
                  </div>
               )}
            </TableCell>
         </TableBodyComponent>
      );
   };

   return (
      <>
         {!!globalPayCodes.length ? (
            <Notes
               restHeight="360px"
               defaultStyle={true}
               data={globalPayCodes}
               pagination={false}
               items={notesItem}
               headerTitles={headerTitles}
            />
         ) : (
            <NoItemText text="No Paycode Types Yet" />
         )}
         <SimpleModal
            openDefault={editModalOpenClose}
            handleOpenClose={handleOpenClose}
            content={
               <PayCodeType
                  handleOpenClose={editedData && handleOpenClose}
                  maxWidth="480px"
                  editedData={editedData}
                  handleClose={handleOpenClose}
               />
            }
         />
         <SimpleModal
            openDefault={open}
            handleOpenClose={handleOpenCloseDelete}
            content={
               <DeleteElement
                  loader={!!loader.length}
                  info={deletedInfo?.name}
                  text="some information"
                  handleDel={handleDeleteItem}
                  handleClose={handleOpenCloseDelete}
               />
            }
         />
      </>
   );
};
