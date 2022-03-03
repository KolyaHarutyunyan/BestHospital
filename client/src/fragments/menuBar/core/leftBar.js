import React, { useContext } from "react";
import clsx from "clsx";
import { navBarStyles } from "./style";
import { Drawer, IconButton, List } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { GlobalLogo } from "@eachbase/components";
import { Colors, DrawerContext, superAdminRouters } from "@eachbase/utils";
import { CustomListItem } from "./common";

export const LeftBar = ({ setLinksStyle, linkInfo }) => {
   const classes = navBarStyles();

   const { open, handleDrawerOpenClose } = useContext(DrawerContext);

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
               {superAdminRouters.map((item, index) => (
                  <CustomListItem
                     key={index}
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
