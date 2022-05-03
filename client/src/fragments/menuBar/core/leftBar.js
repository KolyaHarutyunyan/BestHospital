import React, { useContext } from "react";
import clsx from "clsx";
import { navBarStyles } from "./style";
import { Drawer, IconButton, List } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { GlobalLogo } from "@eachbase/components";
import { Colors, DrawerContext, superAdminRouters } from "@eachbase/utils";
import { CustomListItem } from "./common";

const billingSections = [
   { label: "Bills", path: "/bills" },
   { label: "Claims", path: "/claims" },
   { label: "Invoices", path: "/invoices" },
];

const postingSections = [
   { label: "Claim Payments", path: "/claimPayments" },
   { label: "Invoice Payments", path: "/invoicePayments" },
];

export const LeftBar = ({ setLinksStyle, linkInfo }) => {
   const classes = navBarStyles();

   const { open, handleDrawerOpenClose } = useContext(DrawerContext);

   return (
      <div>
         <div
            className={classes.transition}
            style={open === false ? { marginLeft: "47px" } : { marginLeft: "203px" }}
         >
            <IconButton
               style={{
                  background: Colors.BackgroundBlue,
                  border: `2px solid ${Colors.TextWhite}`,
               }}
               className={classes.IconButtonStyle}
               onClick={handleDrawerOpenClose}
            >
               {open === false ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
         </div>

         <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
               [classes.drawerOpen]: open,
               [classes.drawerClose]: !open,
            })}
            classes={{
               paper: clsx({
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
               }),
            }}
         >
            <GlobalLogo />
            <List onClick={setLinksStyle} className={classes.menuItems}>
               {superAdminRouters.map((item, index) => {
                  const accordionItemList =
                     item.name === "Billing"
                        ? billingSections
                        : item.name === "Posting"
                        ? postingSections
                        : [];

                  const itemIsWithAccordion =
                     item.name === "Billing" || item.name === "Posting";

                  return (
                     <CustomListItem
                        key={index}
                        linkInfo={linkInfo}
                        item={item}
                        open={open}
                        accordion={itemIsWithAccordion}
                        accordionItems={accordionItemList}
                     />
                  );
               })}
            </List>
         </Drawer>
      </div>
   );
};
