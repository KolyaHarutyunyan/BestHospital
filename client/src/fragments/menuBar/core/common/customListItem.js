import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { ListItem, ListItemText } from "@material-ui/core";
import { leftBarCommonStyle } from "./styles";
import { LeftBarImages } from "../leftBarImages";
import { getLimitedVal, Images } from "@eachbase/utils";

export const CustomListItem = ({
   linkInfo,
   item,
   open,
   accordion,
   accordionItems = [],
}) => {
   const classes = leftBarCommonStyle();
   const history = useHistory();
   const [isShown, setIsShown] = useState(false);

   const isActive =
      linkInfo === item.path || linkInfo.slice(0, 4) === item.path.slice(0, 4);

   let accordionItemIsActive = false;
   for (let i = 0; i < accordionItems.length; i++) {
      if (linkInfo === accordionItems[i].path) {
         accordionItemIsActive = true;
      }
   }

   const linkClassName = isActive ? classes.linkWrapperActive : "";
   const accordionClassName = accordionItemIsActive ? classes.linkWrapperActive : "";

   const listItemClassName = `${classes.listItem} ${isActive ? "active" : ""} ${
      !open ? "passive" : ""
   }`;
   const accordionItemClassName = `accordionItem ${classes.listItem} ${
      accordionItemIsActive ? "active" : ""
   } ${!open ? "passive" : ""}`;

   const listItemTextClassName = `${classes.menuItemsStyle} ${isActive ? "active" : ""}`;
   const accordionItemTextClassName = `${classes.menuItemsStyle} ${
      accordionItemIsActive ? "active" : ""
   }`;

   const accordArrowClassName = `${classes.accordArrowStyle} ${isShown ? "rotate" : ""}`;
   const sectionsListClassName = `${classes.sectionsListBoxStyle} ${
      open && isShown ? "shown" : ""
   }`;

   const handleAccordionClick = () =>
      open ? setIsShown((prevState) => !prevState) : history.push(accordionItems[0].path);

   return accordion ? (
      <div>
         <div
            onClick={handleAccordionClick}
            className={`${classes.accordionStyle} ${accordionClassName}`}
         >
            <ListItem className={accordionItemClassName} button>
               <LeftBarImages
                  item={item}
                  linkInfo={linkInfo}
                  accordionItemIsActive={accordionItemIsActive}
               />
               {open && (
                  <>
                     <ListItemText
                        className={accordionItemTextClassName}
                        primary={getLimitedVal(item.name, 13)}
                     />
                     <img
                        className={accordArrowClassName}
                        src={
                           accordionItemIsActive
                              ? Images.accordArrowBlue
                              : Images.accordArrowBlack
                        }
                        alt=""
                     />
                  </>
               )}
            </ListItem>
         </div>
         <div className={sectionsListClassName}>
            <div>
               {accordionItems.map((section, index) => {
                  const activeClassName = linkInfo.startsWith(section.path)
                     ? "active"
                     : "";

                  return (
                     <NavLink key={index} to={section.path} className={activeClassName}>
                        <ListItem button>{section.label}</ListItem>
                     </NavLink>
                  );
               })}
            </div>
         </div>
      </div>
   ) : (
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
