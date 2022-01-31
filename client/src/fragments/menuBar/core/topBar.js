import React, { useEffect } from "react";
import { navBarStyles } from "./style";
import clsx from "clsx";
import { SearchAndFilter, SearchInput, Title } from "@eachbase/components";
import { UserInfo } from "./userInfo";
import { AppBar, Toolbar } from "@material-ui/core";

export const TopBar = ({ handleClick, open }) => {
   const classes = navBarStyles();
   const url = window.location.pathname;
   const menuTittle =
      // url === '/' ? 'Home' :
      url === "/fundingSource"
         ? "Funding Source"
         : url === "/createFundingSource"
         ? "Add Office"
         : url === "/branches"
         ? "Branches"
         : url === "/staff"
         ? "Staff"
         : url === "/client"
         ? "Client"
         : url === "/humanResources"
         ? "Human Resources"
         : url === "/management"
         ? "Access Management"
         : url === "/customers"
         ? "Customer"
         : url === "/factoring"
         ? "Factoring Companies"
         : "";

   return (
      <AppBar
         position="fixed"
         className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
         })}
      >
         <Toolbar className={classes.headerContent}>
            <div className={classes.Toolbar}>
               <div className={open === true ? classes.openToolbar : classes.closeToolbar}>
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
