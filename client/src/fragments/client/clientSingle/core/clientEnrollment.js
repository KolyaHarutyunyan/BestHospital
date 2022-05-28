import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
   Card,
   MinLoader,
   Notes,
   SimpleModal,
   TableBodyComponent,
} from "@eachbase/components";
import { serviceSingleStyles } from "./styles";
import { Colors, FindLoad, FindSuccess, Images } from "@eachbase/utils";
import { Radio, TableCell } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { AddEnrollment } from "../../clientModals";
import {
   clientActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import { clientEnrollmentHeaderTitles, getGeneralInfo } from "./constants";

export const ClientEnrollment = ({ data, info }) => {
   const classes = serviceSingleStyles();

   const params = useParams();

   const dispatch = useDispatch();

   const [toggleModal, setToggleModal] = useState(false);
   const [indexItem, setIndex] = useState(null);

   const success = FindSuccess("DELETE_CLIENT_ENROLLMENT");
   const loader = FindLoad("EDIT_CLIENT_ENROLLMENT");

   useEffect(() => {
      if (!!success.length) {
         setToggleModal((prevState) => !prevState);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("DELETE_CLIENT_ENROLLMENT"));
      }
   }, [success]);

   function editPrimary(i) {
      setIndex(i);
      dispatch(
         clientActions.editClientEnrollment(
            { primary: true },
            params.id,
            info[i].funderId._id,
            info[i].id
         )
      );
   }

   function enrollmentsItem(item, index) {
      let startDate = moment(item?.startDate).format("DD/MM/YYYY");
      let terminationDate = !!item.terminationDate
         ? moment(item?.terminationDate).format("DD/MM/YYYY")
         : "N/A";

      return (
         <TableBodyComponent key={index}>
            <TableCell>
               {loader.length ? (
                  indexItem === index && (
                     <div className={classes.loadStyle}>
                        <MinLoader margin={"0"} color={Colors.BackgroundBlue} />
                     </div>
                  )
               ) : (
                  <Radio
                     onChange={(e) => {
                        e.stopPropagation();
                        editPrimary(index);
                     }}
                     checked={item.primary}
                     classes={{ root: classes.radio, checked: classes.checked }}
                  />
               )}
            </TableCell>
            <TableCell> {item.funderId?.name} </TableCell>
            <TableCell>
               <p className={classes.tableID}>{item?.clientId}</p>
            </TableCell>
            <TableCell> {startDate} </TableCell>
            <TableCell> {terminationDate} </TableCell>
            <TableCell>
               <div style={{ marginTop: 10 }}>
                  <img
                     src={Images.edit}
                     alt="edit"
                     className={classes.iconStyle}
                     onClick={(e) => {
                        e.stopPropagation();
                        setToggleModal((prevState) => !prevState);
                        setIndex(index);
                     }}
                  />
               </div>
            </TableCell>
         </TableBodyComponent>
      );
   }

   const generalInfo = getGeneralInfo(data);

   return (
      <div className={classes.staffGeneralWrapper}>
         <SimpleModal
            handleOpenClose={() => setToggleModal((prevState) => !prevState)}
            openDefault={toggleModal}
            content={
               <AddEnrollment
                  info={info[indexItem]}
                  handleClose={() => setToggleModal((prevState) => !prevState)}
               />
            }
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
            <Notes
               restHeight="360px"
               data={info}
               items={enrollmentsItem}
               headerTitles={clientEnrollmentHeaderTitles}
               defaultStyle={true}
            />
         </div>
      </div>
   );
};
