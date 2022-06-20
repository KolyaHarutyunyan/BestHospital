import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { TableCell } from "@material-ui/core";
import {
   Card,
   DeleteElement,
   Loader,
   NoItemText,
   Notes,
   SimpleModal,
   TableBodyComponent,
} from "@eachbase/components";
import { EmploymentModal, PaycodeModal } from "./modals";
import { AuthHeader } from "@eachbase/components/headers/auth/authHeader";
import { Colors, FindLoad, FindSuccess, getLimitedVal, Images } from "@eachbase/utils";
import {
   adminActions,
   clientActions,
   httpRequestsOnSuccessActions,
   payrollActions,
} from "@eachbase/store";
import { serviceSingleStyles } from "@eachbase/fragments/client/clientSingle/core";

const headerTitles = [
   {
      title: "Name",
      sortable: false,
   },
   {
      title: "Code",
      sortable: false,
   },
   {
      title: "Type",
      sortable: false,
   },
   {
      title: "Rate",
      sortable: false,
   },
   {
      title: "Start Date",
      sortable: true,
   },
   {
      title: "End Date",
      sortable: true,
   },
   {
      title: "Status",
      sortable: false,
   },
];

export const StaffEmployment = ({ info }) => {
   const classes = serviceSingleStyles();

   const params = useParams();

   const dispatch = useDispatch();

   const payCodes = useSelector((state) => state.admins.payCodes);

   const success = FindSuccess("DELETE_CLIENT_AUTHORIZATION");
   const successDelServ = FindSuccess("DELETE_CLIENT_AUTHORIZATION_SERV");
   const loaderDel = FindLoad("DELETE_CLIENT_AUTHORIZATION_SERV");
   const loader = FindLoad("GET_PAY_CODE");

   useEffect(() => {
      dispatch(payrollActions.getPayCodeGlobal());
   }, []);

   useEffect(() => {
      if (!!success.length) {
         setToggleModal(false);
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("DELETE_CLIENT_AUTHORIZATION")
         );
      }
   }, [success]);

   useEffect(() => {
      if (!!successDelServ.length) {
         setToggleModal3(false);
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("DELETE_CLIENT_AUTHORIZATION_SERV")
         );
      }
   }, [successDelServ]);

   const [delEdit, setDelEdit] = useState(null);
   const [toggleModal, setToggleModal] = useState(false);
   const [toggleModal2, setToggleModal2] = useState(false);
   const [toggleModal3, setToggleModal3] = useState(false);
   const [authIndex, setAuthIndex] = useState(0);
   const [paycodeIndex, setPaycodeIndex] = useState(0);

   useEffect(() => {
      dispatch(adminActions.getPayCode(info[authIndex]?.id));
   }, [authIndex]);

   function deleteAuthorization() {
      dispatch(clientActions.deleteClientsAuthorization(info[authIndex].id, params.id));
      // setAuthIndex(0)
   }

   function payCodeItem(item, index) {
      return (
         <TableBodyComponent
            key={index}
            handleOpenInfo={() => {
               setPaycodeIndex(index);
               setToggleModal3((prevState) => !prevState);
            }}
         >
            <TableCell>
               <p className={classes.tableName}>
                  {getLimitedVal(item.payCodeTypeId.name, 18)}
               </p>
            </TableCell>
            <TableCell> {item.payCodeTypeId.code} </TableCell>
            <TableCell> {item.payCodeTypeId.type} </TableCell>
            <TableCell>{item.rate} </TableCell>
            <TableCell>{moment(item.startDate).format("DD/MM/YYYY")} </TableCell>
            <TableCell>
               {item.endDate === "Precent"
                  ? "Not Set"
                  : moment(item.endDate).format("DD/MM/YYYY")}{" "}
            </TableCell>
            <TableCell>{Number(item.active)} </TableCell>
         </TableBodyComponent>
      );
   }

   return (
      <div className={classes.staffGeneralWrapper}>
         <SimpleModal
            handleOpenClose={() => setToggleModal((prevState) => !prevState)}
            openDefault={toggleModal}
            content={
               delEdit ? (
                  <EmploymentModal
                     fundingId={info[authIndex]?.funderId?._id}
                     info={info[authIndex]}
                     handleClose={() => setToggleModal((prevState) => !prevState)}
                  />
               ) : (
                  <DeleteElement
                     loader={!!loaderDel.length}
                     handleClose={() => setToggleModal((prevState) => !prevState)}
                     handleDel={deleteAuthorization}
                  />
               )
            }
         />
         <SimpleModal
            handleOpenClose={() => setToggleModal2((prevState) => !prevState)}
            openDefault={toggleModal2}
            content={
               <PaycodeModal
                  employmentId={info[authIndex]?.id}
                  authId={info[authIndex]?.id}
                  handleClose={() => setToggleModal2((prevState) => !prevState)}
               />
            }
         />
         <SimpleModal
            handleOpenClose={() => setToggleModal3((prevState) => !prevState)}
            openDefault={toggleModal3}
            content={
               <PaycodeModal
                  info={payCodes && payCodes[paycodeIndex]}
                  employmentId={info[authIndex]?.id}
                  handleClose={() => setToggleModal3((prevState) => !prevState)}
               />
            }
         />
         <Card
            employment={true}
            width="234px"
            cardInfo={info}
            showHeader={true}
            hideHeaderLine={false}
            title="Employments"
            color={Colors.ThemeBlue}
            icon={Images.employment}
            auth={true}
            active={authIndex}
            click={setAuthIndex}
         />
         <div className={classes.clearBoth} />
         <div className={classes.notesWrap}>
            <AuthHeader
               type={"staff"}
               empoloyment={true}
               setDelEdit={setDelEdit}
               info={info[authIndex]}
               setToggleModal={setToggleModal}
               toggleModal={toggleModal}
            />
            <div className={classes.authorizationServices}>
               <p className={classes.authorizationServicesTitle}>Paycodes</p>
               <div className={classes.authorizationServicesRight}>
                  <img
                     src={Images.addHours}
                     alt=""
                     className={classes.iconStyle}
                     onClick={() => setToggleModal2((prevState) => !prevState)}
                  />
                  <p
                     onClick={() => setToggleModal2((prevState) => !prevState)}
                     className={classes.authorizationServicesText}
                  >
                     Add Paycode
                  </p>
               </div>
            </div>
            {!!loader.length ? (
               <Loader />
            ) : (
               <div>
                  {!!payCodes && !!payCodes.length ? (
                     <Notes
                        restHeight="560px"
                        data={payCodes}
                        items={payCodeItem}
                        headerTitles={headerTitles}
                        defaultStyle={true}
                     />
                  ) : (
                     <NoItemText text={"No Paycodes Yet"} />
                  )}
               </div>
            )}
         </div>
      </div>
   );
};
