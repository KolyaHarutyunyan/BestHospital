import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Notes, SimpleModal, TableBodyComponent } from "@eachbase/components";
import { FundingSourceSinglePTModifiers } from "./fundingSourceSinglePTModifiers";
import { DrawerContext, Images } from "@eachbase/utils";
import { TableCell } from "@material-ui/core";
import { fundingSourceSingleStyles } from "./styles";
import { FundingSourceServiceAdd } from "./modals";
import { getHeaderTitlesForService } from "./constants";

export const FundingSourceSingleServices = ({ data }) => {
   const classes = fundingSourceSingleStyles();

   const { open } = useContext(DrawerContext);

   const globalCredentials = useSelector((state) => state.system.credentials);

   const [toggleModal, setToggleModal] = useState(false);
   const [index, setIndex] = useState(null);
   const [serviceIndex, setServiceIndex] = useState(0);
   const [serviceModifiers, setServiceModifiers] = useState("");

   const headerTitles = getHeaderTitlesForService();

   function onEdit(index) {
      setIndex(index);
      setServiceModifiers(data[index]);
      setToggleModal((prevState) => !prevState);
   }

   function onRow(item, index) {
      setServiceIndex(index);
      setServiceModifiers(item.modifiers);
   }

   function serviceItemHandler(item, index) {
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
               <img
                  src={Images.edit}
                  alt="edit"
                  className={classes.iconCursor}
                  onClick={() => onEdit(index)}
               />
            </TableCell>
         </TableBodyComponent>
      );
   }

   return (
      <div className={classes.fundindService}>
         <SimpleModal
            openDefault={toggleModal}
            handleOpenClose={() => setToggleModal((prevState) => !prevState)}
            content={
               <FundingSourceServiceAdd
                  modifiers={serviceModifiers}
                  info={data ? data[index] : {}}
                  handleClose={() => setToggleModal((prevState) => !prevState)}
               />
            }
         />
         <div className={`${classes.fundindServiceItems} ${open ? "narrow" : ""}`}>
            <Notes
               restHeight={"360px"}
               data={data}
               items={serviceItemHandler}
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
