import React from "react";
import clsx from "clsx";
import { navBarStyles } from "./style";
import { Drawer, IconButton, List } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { GlobalLogo } from "@eachbase/components";
import { Colors, superAdminRouters } from "@eachbase/utils";
import { CustomListItem } from "./common";

export const LeftBar = ({
   handleDrawerClose,
   open,
   setLinksStyle,
   linkInfo,
}) => {
   const classes = navBarStyles();

   return (
      <div>
         <div
            className={classes.transition}
            style={
               open === false ? { marginLeft: "47px" } : { marginLeft: "203px" }
            }
         >
            <IconButton
               style={{
                  background: Colors.BackgroundBlue,
                  border: `2px solid ${Colors.TextWhite}`,
               }}
               className={classes.IconButtonStyle}
               onClick={handleDrawerClose}
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
               {superAdminRouters.map((item, i) => (
                  <CustomListItem
                     key={i}
                     linkInfo={linkInfo}
                     item={item}
                     open={open}
                     accordion={item.name === "Billing"}
                  />
               ))}
            </List>
         </Drawer>
      </div>
   );
};
