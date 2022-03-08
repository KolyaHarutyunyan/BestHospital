import React, { useContext } from "react";
import { navBarStyles } from "./style";
import clsx from "clsx";
import { SearchInput, Title } from "@eachbase/components";
import { UserInfo } from "./userInfo";
import { AppBar, Toolbar } from "@material-ui/core";
import { DrawerContext, getMenuTitle } from "@eachbase/utils";

export const TopBar = () => {
   const classes = navBarStyles();

   const url = window.location.pathname;
   const menuTittle = getMenuTitle(url);

   const { open } = useContext(DrawerContext);

   return (
      <AppBar
         position="fixed"
         className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
         })}
      >
         <Toolbar className={classes.headerContent}>
            <div className={classes.Toolbar}>
               <div
                  className={
                     open === true ? classes.openToolbar : classes.closeToolbar
                  }
               >
                  <Title text={menuTittle} />
               </div>
               <div className={classes.userActionsBoxStyle}>
                  <SearchInput
                     //  searchInputValue={""}
                     //  onSearchInputChange={() => {}}
                     searchInputPlaceholder={"Search"}
                  />
                  <UserInfo />
               </div>
            </div>
         </Toolbar>
      </AppBar>
   );
};
