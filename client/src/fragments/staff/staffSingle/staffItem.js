import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TableCell } from "@material-ui/core";
import { httpRequestsOnSuccessActions } from "@eachbase/store";
import {
   StaffGeneral,
   StaffHistory,
   StaffCredentials,
   StaffEmployment,
   StaffAccess,
   StaffItemHeader,
   // StaffAvailability,
   StaffTimesheet,
} from "./core";
import {
   DrawerContext,
   FindLoad,
   FindSuccess,
   Images,
   makeCapitalize,
} from "@eachbase/utils";
import {
   SimpleTabs,
   Notes,
   TableWrapperGeneralInfo,
   InactiveModal,
   TableBodyComponent,
   Loader,
   SimpleModal,
   DeleteElement,
   NoItemText,
} from "@eachbase/components";
import { useDispatch, useSelector } from "react-redux";
import { staffStyle } from "@eachbase/pages/staff/styles";
import { noteActions } from "@eachbase/store/notes";
import moment from "moment";
import { StaffService } from "./core/staffService";
import { staffHeaderTitles, staffTabsLabels } from "./core/constants";

export const StaffItem = ({
   gen,
   credentialPage,
   credentials,
   credentialsCount,
   handleGetPage,
}) => {
   const classes = staffStyle();

   const dispatch = useDispatch();

   const params = useParams();

   const credentialLoader = FindLoad("GET_CREDENTIAL");

   const { open: drawerOpen } = useContext(DrawerContext);

   const [open, setOpen] = useState(false);
   const [activeTab, setActiveTab] = useState(0);
   const [openCredModal, setOpenCredModal] = useState(false);
   const [openDelModal, setOpenDelModal] = useState(false);
   const [credModalType, setCredModalType] = useState("");
   const [globalCredentialInformation, setGlobalCredentialInformation] = useState({});
   const [noteModalData, setNoteModalData] = useState({});
   const [noteModalInfo, setNoteModalInfo] = useState({
      right: "-1000px",
      created: "",
      subject: "",
   });
   const [noteModalTypeInfo, setNoteModalTypeInfo] = useState();
   const [openModal, setOpenModal] = useState();
   const [statusType, setStatusType] = useState("");

   const staffGeneral = useSelector((state) => state.admins.adminInfoById);
   // const credentialData = useSelector((state) => state.admins.credential);
   const globalCredentials = useSelector((state) => state.system.credentials);
   const globalNotes = useSelector((state) => state.note.notes);
   const staffHistory = useSelector((state) => state.history.history);
   const availabilityData = useSelector(
      (state) => state.availabilitySchedule.availabilitySchedule
   );
   const employments = useSelector((state) => state.admins.employments);
   const staffServices = useSelector((state) => state.admins.staffServices.service);
   const staffTimesheet = useSelector((state) => state.admins.timesheet);
   const { services } = useSelector((state) => state.system.services);
   const rolesList = useSelector((state) => state.roles.rolesList?.roles);
   const accessList = useSelector((state) => state.auth.accessList);

   function handleOpenClose(status) {
      setStatusType(status);
      setOpen((prevState) => !prevState);
   }

   function openCloseCredModal(modalType, globalCredentialInfo) {
      setOpenCredModal((prevState) => !prevState);
      setCredModalType(modalType);
      setGlobalCredentialInformation(globalCredentialInfo);
   }

   function openNoteModal(data) {
      setNoteModalInfo({
         right: "38px",
         created: data?.created,
         subject: data?.subject,
         id: data?.id,
         text: data?.text,
         creatorName: data?.creatorName,
      });
   }

   function closeNoteModal() {
      setNoteModalInfo({
         right: "-1000px",
         created: "",
         subject: "",
         id: "",
      });
   }

   function notesItemHandler(item, index) {
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
               <div
                  className={classes.removeNoteBoxStyle}
                  onClick={(e) => {
                     e.stopPropagation();
                     handleOpenCloseDel({
                        id: item.id,
                        deletedName: item.subject,
                        text: item.text,
                     });
                  }}
               >
                  <img src={Images.remove} alt="delete" />
               </div>
            </TableCell>
         </TableBodyComponent>
      );
   }

   function handleOpenCloseNote(data) {
      // setNoteModalTypeInfo(data);
      setOpenModal((prevState) => !prevState);
      setNoteModalInfo({
         right: "-1000px",
         created: "",
         subject: "",
         id: "",
      });
   }

   const loaderItems = FindLoad("GET_ADMIN_BY_ID");

   const tabsContent = [
      {
         tabComponent: !!loaderItems.length ? (
            <Loader />
         ) : (
            <StaffGeneral staffGeneral={staffGeneral} />
         ),
      },
      {
         tabComponent:
            employments.length > 0 ? (
               <StaffEmployment info={employments} />
            ) : (
               <NoItemText text="No Employments Yet" />
            ),
      },
      {
         tabComponent:
            staffTimesheet.length > 0 ? (
               <StaffTimesheet info={staffTimesheet} />
            ) : (
               <NoItemText text="No Timesheets Yet" />
            ),
      },
      {
         tabComponent: !!credentialLoader.length ? (
            <Loader circleSize={50} />
         ) : (
            <StaffCredentials
               credentialData={credentials}
               page={credentialPage}
               credentialsCount={credentialsCount}
               globalCredentials={globalCredentials}
               handleGetPage={handleGetPage}
               credentialLoader={!!credentialLoader.length}
            />
         ),
      },
      {
         tabComponent: <StaffAccess rolesList={rolesList} accessList={accessList} />,
      },
      // {
      //    tabComponent: (
      //       <StaffAvailability
      //          availabilityData={availabilityData}
      //          staffGeneral={staffGeneral}
      //       />
      //    ),
      // },
      {
         tabComponent: (
            <StaffService
               services={services}
               info={staffServices}
               staffGeneral={staffGeneral}
            />
         ),
      },
      {
         tabComponent: globalNotes.length ? (
            <Notes
               model="Staff"
               closeModal={closeNoteModal}
               noteModalInfo={noteModalInfo}
               showModal={true}
               pagination={true}
               data={globalNotes}
               items={notesItemHandler}
               headerTitles={staffHeaderTitles}
            />
         ) : (
            <NoItemText text="No Notes Yet" />
         ),
      },
      {
         tabComponent: <StaffHistory data={staffHistory} />,
      },
   ];

   const handleOpenCloseDel = (data) => {
      setNoteModalData(data);
      setOpenDelModal((prevState) => !prevState);
   };

   const handleDeleteNote = () => {
      dispatch(noteActions.deleteGlobalNote(noteModalData.id, params.id, "Staff"));
   };

   const loader = FindLoad("DELETE_GLOBAL_NOTE");
   const success = FindSuccess("DELETE_GLOBAL_NOTE");

   useEffect(() => {
      if (!!success.length) {
         setOpenDelModal(false);
         closeNoteModal();
         dispatch(httpRequestsOnSuccessActions.removeSuccess("DELETE_GLOBAL_NOTE"));
      }
   }, [success]);

   return (
      <>
         <TableWrapperGeneralInfo
            selectStatus={true}
            status={staffGeneral?.status}
            id={params.id}
            handleOpen={(currentStatus) => {
               setOpen(true);
               setStatusType(currentStatus);
            }}
            path={"staff"}
            type={"GET_ADMIN_BY_ID_SUCCESS"}
            parent="Staff"
            title={staffGeneral?.firstName}
            parentLink="/staff"
            buttonsTabAddButton={true}
            openCloseInfo={open}
            handleOpenClose={handleOpenClose}
            body={
               <InactiveModal
                  statusType={statusType}
                  name={makeCapitalize(staffGeneral?.firstName)}
                  info={{
                     path: "staff",
                     type: "GET_ADMIN_BY_ID_SUCCESS",
                  }}
                  handleOpenClose={handleOpenClose}
                  handleClose={handleOpenClose}
               />
            }
         >
            <div className={`${classes.staffSingleItem} ${drawerOpen ? "narrow" : ""}`}>
               <StaffItemHeader
                  onModel="Staff"
                  availabilityData={availabilityData}
                  title={makeCapitalize(
                     `${staffGeneral?.firstName} ${staffGeneral?.lastName}`
                  )}
                  noteModalTypeInfo={noteModalTypeInfo}
                  handleOpenClose={handleOpenCloseNote}
                  openModal={openModal}
                  globalCredentialInformation={globalCredentialInformation}
                  globalCredentials={globalCredentials}
                  credModalType={credModalType}
                  openCloseCredModal={openCloseCredModal}
                  openCredModal={openCredModal}
                  info={gen}
                  activeTab={activeTab}
               />
               <SimpleTabs
                  setActiveTab={setActiveTab}
                  tabsLabels={staffTabsLabels}
                  tabsContent={tabsContent}
               />
            </div>
            <SimpleModal
               openDefault={openDelModal}
               handleOpenClose={handleOpenCloseDel}
               content={
                  <DeleteElement
                     loader={!!loader.length}
                     text="some information"
                     info={noteModalData?.deletedName}
                     handleDel={handleDeleteNote}
                     handleClose={handleOpenCloseDel}
                  />
               }
            />
         </TableWrapperGeneralInfo>
      </>
   );
};
