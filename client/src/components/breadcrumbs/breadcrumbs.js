import React from "react";
import { useHistory } from "react-router-dom";
import { breadcrumbsStyle } from "./styles";
import { Breadcrumbs, Typography, Link } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

export const CustomBreadcrumbs = ({ parent, parentLink, child, className }) => {
   const classes = breadcrumbsStyle();
   const history = useHistory();

   const handleClick = (event) => {
      event.preventDefault();
      history.push(parentLink);
   };

   return (
      <div className={className ? className : classes.root}>
         <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link className={classes.parent} href={parentLink} onClick={handleClick}>
               {parent}
            </Link>
            <Typography className={classes.child}>{child}</Typography>
         </Breadcrumbs>
      </div>
   );
};
