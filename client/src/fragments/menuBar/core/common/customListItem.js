import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemText } from "@material-ui/core";
import { leftBarCommonStyle } from "./styles";
import { LeftBarImages } from "../leftBarImages";
import { getLimitedVal } from "@eachbase/utils";
import { CustomAccordion } from "./core";

export const CustomListItem = ({
   linkInfo,
   item,
   open,
   accordion,
   accordionItems = [],
}) => {
   const classes = leftBarCommonStyle();

   const isActive =
      linkInfo === item.path || linkInfo.slice(0, 4) === item.path.slice(0, 4);

   const linkClassName = isActive ? classes.linkWrapperActive : "";
   const listItemClassName = `${classes.listItem} ${isActive ? "active" : ""} ${
      !open ? "passive" : ""
   }`;
   const listItemTextClassName = `${classes.menuItemsStyle} ${isActive ? "active" : ""}`;

   if (accordion) {
      return (
         <CustomAccordion
            accordionItems={accordionItems}
            open={open}
            item={item}
            linkInfo={linkInfo}
         />
      );
   }

   return (
      <Link to={item.path}>
         <div className={linkClassName}>
            <ListItem className={listItemClassName} button>
               {<LeftBarImages item={item} linkInfo={linkInfo} />}
               {open && (
                  <ListItemText
                     className={listItemTextClassName}
                     primary={getLimitedVal(item.name, 13)}
                  />
               )}
            </ListItem>
         </div>
      </Link>
   );
};
