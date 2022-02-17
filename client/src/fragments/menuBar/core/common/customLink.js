import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemText } from "@material-ui/core";
import { leftBarCommonStyle } from "./styles";
import { LeftBarImages } from "../leftBarImages";

export const CustomLink = ({ linkInfo, item, open, accordion }) => {
   const classes = leftBarCommonStyle();

   const linkContentClassName =
      linkInfo === item.path
         ? classes.linkWrapperActive
         : linkInfo.slice(0, 4) === item.path.slice(0, 4)
         ? classes.linkWrapperActive
         : "";

   const listItemClassName =
      linkInfo === item.path
         ? open === false
            ? classes.activeListItemFalse
            : classes.activeListItem
         : linkInfo.slice(0, 4) === item.path.slice(0, 4)
         ? open === false
            ? classes.activeListItemFalse
            : classes.activeListItem
         : classes.listItem;

   const listItemTextClassName =
      linkInfo === item.path
         ? classes.menuActiveItemsStyle
         : linkInfo.slice(0, 4) === item.path.slice(0, 4)
         ? classes.menuActiveItemsStyle
         : classes.menuItemsStyle;

   const primaryText =
      item.name.length > 13 ? `${item.name.slice(0, 13)}...` : item.name;

   return (
      <Link to={item.path}>
         <div className={linkContentClassName}>
            <ListItem className={listItemClassName} button>
               {<LeftBarImages item={item} linkInfo={linkInfo} />}
               {open && (
                  <>
                     <ListItemText
                        className={listItemTextClassName}
                        primary={primaryText}
                     />
                     {accordion && <h1>+++</h1>}
                  </>
               )}
            </ListItem>
         </div>
      </Link>
   );
};
