import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
   DeleteElement,
   NoItemText,
   Notes,
   SimpleModal,
   TableBodyComponent,
} from "@eachbase/components";
import { FindLoad, FindSuccess, Images } from "@eachbase/utils";
import { TableCell } from "@material-ui/core";
import { noteActions } from "@eachbase/store/notes";
import { httpRequestsOnSuccessActions } from "@eachbase/store";

const headerTitles = [
   {
      title: "Date",
      sortable: true,
   },
   {
      title: "Creator Name",
      sortable: true,
   },
   {
      title: "Subject",
      sortable: false,
   },
   {
      title: "Action",
      sortable: false,
   },
];

export const ClientNotes = ({ data }) => {
   const params = useParams();

   const dispatch = useDispatch();

   const [noteModalData, setNoteModalData] = useState({});
   const [openDelModal, setOpenDelModal] = useState(false);
   const [noteModalInfo, setNoteModalInfo] = useState({
      right: "-1000px",
      created: "",
      subject: "",
   });

   let notesItem = (item, index) => {
      return (
         <TableBodyComponent
            key={index}
            handleOpenInfo={() =>
               openNoteModal({
                  created: item?.created,
                  subject: item?.subject,
                  id: item?.id,
                  text: item?.text,
                  creatorName:
                     item && item.user && `${item.user.firstName} ${item.user.lastName}`,
               })
            }
         >
            <TableCell>{moment(item?.created).format("DD/MM/YYYY")}</TableCell>
            <TableCell>{`${item?.user?.firstName} ${item?.user?.lastName}`}</TableCell>
            <TableCell>{item?.subject}</TableCell>
            <TableCell>
               <img
                  src={Images.remove}
                  alt="delete"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                     e.stopPropagation();
                     handleOpenCloseDel({
                        id: item.id,
                        deletedName: item.subject,
                        text: item.text,
                     });
                  }}
               />
            </TableCell>
         </TableBodyComponent>
      );
   };

   const handleOpenCloseDel = (data) => {
      setNoteModalData(data);
      setOpenDelModal((prevState) => !prevState);
   };

   const openNoteModal = (data) => {
      setNoteModalInfo({
         right: "38px",
         created: data?.created,
         subject: data?.subject,
         id: data?.id,
         text: data?.text,
         creatorName: data?.creatorName,
      });
   };

   const closeNoteModal = () => {
      setNoteModalInfo({
         right: "-1000px",
         created: "",
         subject: "",
         id: "",
      });
   };

   const handleDeleteNote = () => {
      dispatch(noteActions.deleteGlobalNote(noteModalData.id, params.id, "Client"));
   };

   const deleteSuccess = FindSuccess("DELETE_GLOBAL_NOTE");
   const loader = FindLoad("DELETE_GLOBAL_NOTE");

   useEffect(() => {
      if (!!deleteSuccess.length) {
         setOpenDelModal(false);
         closeNoteModal();
         dispatch(httpRequestsOnSuccessActions.removeSuccess("DELETE_GLOBAL_NOTE"));
      }
   }, [deleteSuccess]);

   return (
      <>
         {data ? (
            <Notes
               model={"Client"}
               closeModal={closeNoteModal}
               noteModalInfo={noteModalInfo}
               showModal={true}
               pagination={true}
               data={data}
               items={notesItem}
               headerTitles={headerTitles}
            />
         ) : (
            <NoItemText text="No Notes Yet" />
         )}
         <SimpleModal
            openDefault={openDelModal}
            handleOpenClose={handleOpenCloseDel}
            content={
               <DeleteElement
                  text="some information"
                  info={noteModalData?.deletedName}
                  handleDel={handleDeleteNote}
                  handleClose={handleOpenCloseDel}
                  loader={!!loader.length}
               />
            }
         />
      </>
   );
};
