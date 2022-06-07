import React, { useContext, useState } from "react";
import {
   DrawerContext,
   getDataForTable,
   hooksForTable,
   Images,
   useWidth,
} from "@eachbase/utils";
import { fundingSourceCommonCoreStyle } from "./styles";
import { AddButton, SimpleModal } from "@eachbase/components";
import { FundingSourceServiceAdd } from "../../modals";
import { FundingSourceSinglePTModifiers } from "../..";
import { Drawer } from "@material-ui/core";

export const ServiceTBody = ({ service, globalCredentials }) => {
   const classes = fundingSourceCommonCoreStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const { showDashIfEmpty, addSignToValueFromStart } = hooksForTable;

   function getTableData(data) {
      return showDashIfEmpty(getDataForTable(data, open, width));
   }

   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [drawerPosition, setDrawerPosition] = useState({
      top: false,
      right: false,
      bottom: false,
      right: false,
   });

   function toggleDrawer(anchor, open) {
      setDrawerPosition({ ...drawerPosition, [anchor]: open });
   }

   const serviceName = getTableData(service?.name);
   const cptCode = getTableData(service?.cptCode);
   const size = getTableData(service?.size);
   const min = getTableData(service?.min);
   const max = getTableData(service?.max);
   const chargeRate = service?.chargeRate
      ? getTableData(addSignToValueFromStart(service?.chargeRate))
      : "---";
   const credential = getTableData(service?.credentialId?.name);

   return (
      <>
         <div className={classes.tbodyContainerStyle}>
            <div className={classes.tdStyle}>{serviceName}</div>
            <div className={classes.tdStyle}>{cptCode}</div>
            <div className={classes.tdStyle}>{size}</div>
            <div className={classes.tdStyle}>{min}</div>
            <div className={classes.tdStyle}>{max}</div>
            <div className={classes.tdStyle}>{chargeRate}</div>
            <div className={classes.tdStyle}>{credential}</div>
            <div className={classes.tdStyle}>
               <div
                  className={classes.editModifierIconStyle}
                  onClick={() => setModalIsOpen(true)}
               >
                  <img src={Images.edit} alt="edit" />
               </div>
               <AddButton
                  addButtonClassName={classes.showModifiersButnStyle}
                  Icon={false}
                  text={
                     <span className={classes.modifierTextStyle}>
                        Modifiers
                        <em className={classes.modifierQtyStyle}>
                           {`(${service?.modifiers?.length})`}
                        </em>
                     </span>
                  }
                  handleClick={() => toggleDrawer("right", true)}
               />
            </div>
         </div>
         <Drawer
            anchor={"right"}
            open={drawerPosition.right}
            onClose={() => toggleDrawer("right", false)}
         >
            <FundingSourceSinglePTModifiers
               globalCredentials={globalCredentials}
               data={service?.modifiers}
               title={service?.name}
               currentService={service}
               onClose={() => toggleDrawer("right", false)}
            />
         </Drawer>
         <SimpleModal
            openDefault={modalIsOpen}
            handleOpenClose={() => setModalIsOpen((prevState) => !prevState)}
            content={
               <FundingSourceServiceAdd
                  modifiers={service?.modifiers}
                  info={service}
                  handleClose={() => setModalIsOpen(false)}
               />
            }
         />
      </>
   );
};
