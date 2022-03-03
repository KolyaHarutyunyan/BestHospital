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

const headerTitles = [
   {
      title: "Service",
      sortable: true,
   },
   {
      title: "CPT Code",
      sortable: false,
   },
   {
      title: "Unit Size",
      sortable: false,
   },
   {
      title: "Min Unit",
      sortable: false,
   },
   {
      title: "Max Unit",
      sortable: false,
   },
   {
      title: "Action",
      sortable: false,
   },
];
export const FundingSourceSingleServices = ({ data }) => {
   const [toggleModal, setToggleModal] = useState(false);
   const [index, setIndex] = useState(null);
   const [delEdit, setDelEdit] = useState(null);
   const [serviceIndex, setServiceIndex] = useState(0);
   const [accept, setAccept] = useState(false);
   const [modif, setModif] = useState("");

   const classes = fundingSourceSingleStyles();
   const dispatch = useDispatch();
   const globalCredentials = useSelector((state) => state.system.credentials);

   const { open } = useContext(DrawerContext);

   let onEdit = (index) => {
      setIndex(index);
      setDelEdit("edit");
      setAccept(true);
      setToggleModal(!toggleModal);
      setModif(data[index]);
   };

   let onRow = (item, index) => {
      setServiceIndex(index);
      setModif(item.modifiers);
   };

   let deleteService = () => {
      dispatch(
         fundingSourceActions.deleteFoundingSourceServiceById(
            data[serviceIndex]._id
         )
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
                     modifiersID={modif}
                     info={data ? data[index] : {}}
                     handleClose={() => setToggleModal(!toggleModal)}
                  />
               )
            }
         />
         <div
            className={`${classes.fundindServiceItems} ${open ? "narrow" : ""}`}
         >
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
         />
      </div>
   );
};
