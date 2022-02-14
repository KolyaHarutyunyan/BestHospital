import React, { useEffect, useState } from "react";
import { PayrollSetupStyles } from "../styles";
import {
   DeleteElement,
   Notes,
   SimpleModal,
   SlicedText,
   TableBodyComponent,
} from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import { FindLoad, FindSuccess, Images } from "@eachbase/utils";
import { MileageCompensation } from "./mileageCompensation";
import moment from "moment";
import { useDispatch } from "react-redux";
import { mileagesActions } from "@eachbase/store";

const headerTitles = [
   {
      title: "Mileage Compensation",
      sortable: false,
   },
   {
      title: "Start Date",
      sortable: false,
   },
   {
      title: "End Date",
      sortable: true,
   },
   {
      title: "Action",
      sortable: false,
   },
];

export const MileageTable = ({ data }) => {
   const classes = PayrollSetupStyles();

   const [editModalOpenClose, setEditModalOpenClose] = useState(false);
   const [editedData, setEditedData] = useState({});
   const [deletedInfo, setDeletedInfo] = useState({});
   const dispatch = useDispatch();
   const [open, setOpen] = useState(false);

   const handleOpenClose = (data) => {
      data && data.item && setEditedData(data.item);
      setEditModalOpenClose(!editModalOpenClose);
   };

   const handleOpenCloseDelete = (data) => {
      setDeletedInfo(data);
      setOpen(!open);
   };

   const handleDeleteItem = () => {
      dispatch(mileagesActions.deleteMileage(deletedInfo._id));
   };

   const success = FindSuccess("DELETE_MILEAGE");
   const loader = FindLoad("DELETE_MILEAGE");

   useEffect(() => {
      if (success) {
         setOpen(false);
      }
   }, [success.length]);

   const notesItem = (item, index) => {
      return (
         <TableBodyComponent key={index}>
            <TableCell>
               <SlicedText size={30} type={"name"} data={item.compensation} />
            </TableCell>
            <TableCell>{moment(item.startDate).format("YYYY-MM-DD")}</TableCell>
            <TableCell>{moment(item.endDate).format("YYYY-MM-DD")}</TableCell>
            <TableCell>
               {item.action ? (
                  item.action
               ) : (
                  <div className={classes.icons}>
                     <img
                        src={Images.edit}
                        onClick={() =>
                           handleOpenClose({
                              item,
                           })
                        }
                        alt="edit"
                     />
                     <img
                        src={Images.remove}
                        alt="delete"
                        onClick={() => handleOpenCloseDelete(item)}
                     />
                  </div>
               )}
            </TableCell>
         </TableBodyComponent>
      );
   };

   return (
      <>
         <Notes
            restHeight="360px"
            defaultStyle={true}
            data={data}
            pagination={false}
            items={notesItem}
            headerTitles={headerTitles}
         />
         <SimpleModal
            openDefault={editModalOpenClose}
            handleOpenClose={handleOpenClose}
            content={
               <MileageCompensation
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
                  info={deletedInfo?.compensation}
                  text="some information"
                  handleDel={handleDeleteItem}
                  handleClose={handleOpenCloseDelete}
               />
            }
         />
      </>
   );
};
