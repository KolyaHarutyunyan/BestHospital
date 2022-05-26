import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   DeleteElement,
   Notes,
   SimpleModal,
   TableBodyComponent,
} from "@eachbase/components";
import { FundingSourceSinglePTModifiers } from "./fundingSourceSinglePTModifiers";
import { DrawerContext, Images } from "@eachbase/utils";
import { TableCell } from "@material-ui/core";
import { fundingSourceSingleStyles } from "./styles";
import { FundingSourceServiceAdd } from "./modals";
import { fundingSourceActions } from "@eachbase/store";
import { getHeaderTitlesForService } from "./constants";

export const FundingSourceSingleServices = ({ data }) => {
   const [toggleModal, setToggleModal] = useState(false);
   const [index, setIndex] = useState(null);
   const [delEdit, setDelEdit] = useState(null);
   const [serviceIndex, setServiceIndex] = useState(0);
   const [accept, setAccept] = useState(false);
   const [serviceModifiers, setServiceModifiers] = useState("");

   const classes = fundingSourceSingleStyles();
   const dispatch = useDispatch();
   const globalCredentials = useSelector((state) => state.system.credentials);

   const { open } = useContext(DrawerContext);

   const headerTitles = getHeaderTitlesForService();

   let onEdit = (index) => {
      setIndex(index);
      setDelEdit("edit");
      setAccept(true);
      setToggleModal(!toggleModal);
      setServiceModifiers(data[index]);
   };

   let onRow = (item, index) => {
      setServiceIndex(index);
      setServiceModifiers(item.modifiers);
   };

   let deleteService = () => {
      dispatch(
         fundingSourceActions.deleteFoundingSourceServiceById(data[serviceIndex]._id)
      );
   };

   let serviceItem = (item, index) => {
      return (
         <TableBodyComponent
            active={index === serviceIndex}
            key={index}
            handleOpenInfo={() => onRow(item, index)}
         >
            <TableCell>
               <p className={classes.tableTitle}>{item.name}</p>
            </TableCell>
            <TableCell> {item.cptCode} </TableCell>
            <TableCell> {item.size} </TableCell>
            <TableCell> {item.min} </TableCell>
            <TableCell> {item.max} </TableCell>
            <TableCell>
               <>
                  <img
                     src={Images.edit}
                     alt="edit"
                     className={classes.iconCursor}
                     onClick={() => onEdit(index)}
                  />
               </>
            </TableCell>
         </TableBodyComponent>
      );
   };

   return (
      <div className={classes.fundindService}>
         <SimpleModal
            openDefault={toggleModal}
            handleOpenClose={() => setToggleModal(!toggleModal)}
            content={
               delEdit === "del" ? (
                  <DeleteElement
                     handleDel={deleteService}
                     info={index !== null ? data[index].name : ""}
                     text={"Delete Service"}
                     handleClose={() => setToggleModal(!toggleModal)}
                  />
               ) : (
                  <FundingSourceServiceAdd
                     modifiers={serviceModifiers}
                     info={data ? data[index] : {}}
                     handleClose={() => setToggleModal(!toggleModal)}
                  />
               )
            }
         />
         <div className={`${classes.fundindServiceItems} ${open ? "narrow" : ""}`}>
            <Notes
               restHeight={"360px"}
               data={data}
               items={serviceItem}
               defaultStyle={true}
               headerTitles={headerTitles}
            />
         </div>
         <FundingSourceSinglePTModifiers
            globalCredentials={globalCredentials}
            data={data ? data[serviceIndex].modifiers : ""}
            title={data && data[serviceIndex]?.name}
            currentService={data ? data[serviceIndex] : {}}
         />
      </div>
   );
};
