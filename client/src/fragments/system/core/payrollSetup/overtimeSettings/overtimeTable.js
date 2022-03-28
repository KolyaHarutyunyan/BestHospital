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
import { OvertimeSettings } from "./overtimeSettings";
import { useDispatch } from "react-redux";
import { payrollActions } from "@eachbase/store/payroll";
import { httpRequestsOnSuccessActions } from "@eachbase/store";

const headerTitles = [
   {
      title: "Name",
      sortable: true,
   },
   {
      title: "Type",
      sortable: false,
   },
   {
      title: "Threshold",
      sortable: true,
   },
   {
      title: "Multiplier",
      sortable: false,
   },
   {
      title: "Action",
      sortable: false,
   },
];

export const OvertimeTable = ({ globalOvertimeSettings }) => {
   const classes = PayrollSetupStyles();

   const dispatch = useDispatch();

   const [editModalOpenClose, setEditModalOpenClose] = useState(false);
   const [editedData, setEditedData] = useState({});
   const [deletedInfo, setDeletedInfo] = useState({});

   const [open, setOpen] = useState(false);

   const handleOpenClose = (data) => {
      setEditedData(data);
      setEditModalOpenClose((prevState) => !prevState);
   };

   const handleOpenCloseDelete = (data) => {
      setDeletedInfo(data);
      setOpen((prevState) => !prevState);
   };

   const handleDeleteItem = () => {
      dispatch(payrollActions.deleteOvertimeSettingsByIdGlobal(deletedInfo.id));
   };

   const loader = FindLoad("DELETE_OVERTIME_SETTINGS_BY_ID_GLOBAL");
   const success = FindSuccess("DELETE_OVERTIME_SETTINGS_BY_ID_GLOBAL");

   useEffect(() => {
      if (!!success.length) {
         setOpen(false);
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess(
               "DELETE_OVERTIME_SETTINGS_BY_ID_GLOBAL"
            )
         );
      }
   }, [success]);

   const notesItem = (item, index) => {
      return (
         <TableBodyComponent key={index}>
            <TableCell>
               <SlicedText size={30} type={"name"} data={item.name} />
            </TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.threshold}</TableCell>
            <TableCell>{item.multiplier}</TableCell>
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
                              type: item.type,
                              multiplier: item.multiplier,
                              threshold: item.threshold,
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
         {!!globalOvertimeSettings.length ? (
            <Notes
               restHeight="360px"
               defaultStyle={true}
               data={globalOvertimeSettings}
               pagination={false}
               items={notesItem}
               headerTitles={headerTitles}
            />
         ) : (
            <NoItemText text={"No Overtiming Settings Yet"} />
         )}
         <SimpleModal
            openDefault={editModalOpenClose}
            handleOpenClose={handleOpenClose}
            content={
               <OvertimeSettings
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
