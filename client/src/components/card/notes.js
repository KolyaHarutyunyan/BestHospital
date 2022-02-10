import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
   TableHeadComponent,
   SearchAndFilter,
   CloseButton,
   SimpleModal,
   AddNotes,
   DeleteElement,
} from "@eachbase/components";
import { FindLoad, FindSuccess, Images, useGlobalStyles } from "@eachbase/utils";
import moment from "moment";
import { noteActions } from "@eachbase/store/notes";
import { useParams } from "react-router-dom";

export const Notes = ({
   restHeight,
   closeModal,
   noteModalInfo,
   showModal,
   data = [],
   headerTitles,
   defaultStyle,
   items,
   model,
}) => {
   const officesStyle = makeStyles(({}) => ({
      thWidth: {
         "&:last-child": {
            width: "7%",
         },
         "&:nth-last-child(2)": {
            width: "58%",
         },
      },
   }));

   const dispatch = useDispatch();
   const params = useParams();
   const classes = officesStyle();
   const globalStyle = useGlobalStyles();
   const [open, setOpen] = useState(false);
   const [openDelModal, setOpenDelModal] = useState(false);
   const [noteModalInfoEdit, setNoteModalInfoEdit] = useState();
   const [deletedData, setDeletedData] = useState("");

   const handleOpenClose = (data) => {
         setNoteModalInfoEdit(data);
      setOpen(!open);
   };
   const handleOpenCloseDel = (data) => {
      setDeletedData(data);
      setOpenDelModal(!openDelModal);
   };

   const handleDelete = () => {
      dispatch(noteActions.deleteGlobalNote(deletedData.id, params.id, model));
   };

   const loader = FindLoad("DELETE_GLOBAL_NOTE");
   const success = FindSuccess("DELETE_GLOBAL_NOTE");

   useEffect(() => {
      if (success) {
         setOpenDelModal(false);
         closeModal && closeModal();
      }
   }, [success]);

   return (
      <>
         <div className={globalStyle.tableWrapper}>
            <TableContainer
               style={{ maxHeight: `calc(100vh - ${restHeight})` }}
               className={globalStyle.tableContainer}
               component={Paper}
            >
               <Table
                  stickyHeader
                  className={globalStyle.table}
                  size="small"
                  aria-label="a dense table"
               >
                  <TableHeadComponent>
                     {headerTitles &&
                        headerTitles.map((headerItem, index) => {
                           return (
                              <TableCell
                                 key={index}
                                 className={defaultStyle ? null : classes.thWidth}
                              >
                                 <SearchAndFilter
                                    title={headerItem.title}
                                    custom={headerItem.sortable}
                                 />
                              </TableCell>
                           );
                        })}
                  </TableHeadComponent>
                  <TableBody>
                     {data.map((item, index) => {
                        return <React.Fragment key={index}>{items(item, index)}</React.Fragment>;
                     })}
                  </TableBody>
               </Table>
            </TableContainer>
         </div>
         {showModal && (
            <>
               <div className={globalStyle.previewModal} style={{ right: noteModalInfo.right }}>
                  <h2 className={globalStyle.subject}>{noteModalInfo.subject}</h2>
                  <span>{noteModalInfo.creatorName}</span>
                  <div className={globalStyle.dateContainer}>
                     <p>{moment(noteModalInfo?.created).format("DD/MM/YYYY")}</p>
                     <div>
                        <div className={globalStyle.icons}>
                           <img
                              src={Images.edit}
                              onClick={() =>
                                 handleOpenClose({
                                    modalType: "editNote",
                                    text: noteModalInfo.text,
                                    subject: noteModalInfo.subject,
                                    id: noteModalInfo.id,
                                 })
                              }
                              alt="edit"
                           />
                           <img
                              src={Images.remove}
                              alt="delete"
                              onClick={() =>
                                 handleOpenCloseDel({
                                    id: noteModalInfo.id,
                                    deletedName: noteModalInfo.subject,
                                 })
                              }
                           />
                        </div>
                     </div>
                  </div>
                  <p>{noteModalInfo.text}</p>
                  <div className={globalStyle.positionedButton}>
                     <CloseButton handleCLic={closeModal} isInModal={true} />
                  </div>
               </div>
               <SimpleModal
                  openDefault={open}
                  handleOpenClose={handleOpenClose}
                  content={
                     <AddNotes
                        closeModal={closeModal}
                        model={model}
                        noteModalTypeInfo={noteModalInfoEdit}
                        handleClose={handleOpenClose}
                     />
                  }
               />
               <SimpleModal
                  openDefault={openDelModal}
                  handleOpenClose={handleOpenCloseDel}
                  content={
                     <DeleteElement
                        loader={!!loader.length}
                        text="some information"
                        info={deletedData?.deletedName}
                        handleDel={handleDelete}
                        handleClose={handleOpenCloseDel}
                     />
                  }
               />
            </>
         )}
      </>
   );
};
