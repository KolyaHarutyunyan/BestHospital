import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
   Card,
   DeleteElement,
   NoItemText,
   Notes,
   SimpleModal,
   TableBodyComponent,
} from "@eachbase/components";
import { serviceSingleStyles } from "./styles";
import { Colors, Images } from "@eachbase/utils";
import { TableCell } from "@material-ui/core";
import {
   clientActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";

export const ClientContact = ({ data, setContactId, handleOpenClose, info }) => {
   const classes = serviceSingleStyles();
   const dispatch = useDispatch();
   const [openClose, setOpenClose] = useState(false);
   const [index, setIndex] = useState(null);
   const params = useParams();

   let openCloseModal = () => {
      setOpenClose((prevState) => !prevState);
   };

   const { httpOnSuccess, httpOnError, httpOnLoad } = useSelector((state) => ({
      httpOnSuccess: state.httpOnSuccess,
      httpOnError: state.httpOnError,
      httpOnLoad: state.httpOnLoad,
   }));

   const success =
      httpOnSuccess.length && httpOnSuccess[0].type === "DELETE_CLIENT_CONTACT";
   const errorText = httpOnError.length && httpOnError[0].error;

   useEffect(() => {
      if (success) {
         dispatch(httpRequestsOnSuccessActions.removeSuccess("DELETE_CLIENT_CONTACT"));
         dispatch(httpRequestsOnErrorsActions.removeError("GET_CLIENT_CONTACTS"));
         openCloseModal();
      }
   }, [success]);

   const generalInfo = [
      { title: "First Name", value: data?.firstName },
      { title: "Middle Name", value: data?.middleName },
      { title: "Last Name", value: data?.lastName },
      { title: "Code", value: data?.code },
   ];

   const headerTitles = [
      {
         title: "First Na...",
         sortable: true,
      },
      {
         title: "Last Name",
         sortable: true,
      },
      {
         title: "Relationship",
         sortable: false,
      },
      {
         title: "Address",
         sortable: true,
      },
      {
         title: "Phone Num...",
         sortable: false,
      },
      {
         title: "Action",
         sortable: false,
      },
   ];

   let deleteContact = () => {
      dispatch(clientActions.deleteClientContact(info[index].id, params.id));
      dispatch(httpRequestsOnErrorsActions.removeError("GET_CLIENT_CONTACTS"));
   };

   let clientContactItem = (item, index) => {
      return (
         <TableBodyComponent key={index}>
            <TableCell>
               <p className={classes.tableName}>{item?.firstName}</p>
            </TableCell>
            <TableCell> {item?.lastName} </TableCell>
            <TableCell> {item?.relationship} </TableCell>
            <TableCell> {item?.phoneNumber} </TableCell>
            <TableCell> {item?.phoneNumber} </TableCell>
            <TableCell>
               <>
                  <img
                     src={Images.edit}
                     alt="edit"
                     className={classes.iconStyle}
                     onClick={() => {
                        setContactId(index);
                        handleOpenClose();
                     }}
                  />
                  <img
                     src={Images.remove}
                     alt="delete"
                     className={classes.iconDeleteStyle}
                     onClick={() => {
                        setOpenClose(!openClose);
                        setIndex(index);
                     }}
                  />
               </>
            </TableCell>
         </TableBodyComponent>
      );
   };

   return (
      <div className={classes.staffGeneralWrapper}>
         <SimpleModal
            content={
               <DeleteElement
                  loader={httpOnLoad.length > 0}
                  handleDel={deleteContact}
                  text={"Delete Contact"}
                  info={index !== null && info[index]?.firstName}
                  handleClose={openCloseModal}
               />
            }
            openDefault={openClose}
            handleOpenClose={openCloseModal}
         />
         <Card
            width="32.5%"
            cardInfo={generalInfo}
            showHeader={true}
            title="General Info"
            color={Colors.BackgroundBlue}
            icon={Images.generalInfoIcon}
         />
         <div className={classes.clearBoth} />
         <div className={classes.notesWrap}>
            {errorText !== "Client contact with this id was not found" ? (
               <Notes
                  restHeight={"360px"}
                  data={info}
                  items={clientContactItem}
                  headerTitles={headerTitles}
                  defaultStyle={true}
               />
            ) : (
               <NoItemText text={"No Contacts Yet"} />
            )}
         </div>
      </div>
   );
};
