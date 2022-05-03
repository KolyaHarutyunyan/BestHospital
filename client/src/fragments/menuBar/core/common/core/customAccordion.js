import React, { useState } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { menubarCommonCoreStyle } from "./styles";
import { ListItem, ListItemText } from "@material-ui/core";
import { LeftBarImages } from "../../leftBarImages";
import { getLimitedVal, getMenuTitle, Images } from "@eachbase/utils";

export const CustomAccordion = ({ accordionItems = [], open, item, linkInfo }) => {
   const classes = menubarCommonCoreStyle();

   const history = useHistory();

   const [isShown, setIsShown] = useState(false);

   const url = window.location.pathname;
   const menuTitle = getMenuTitle(url);

   let accordionItemIsActive = false;
   for (let i = 0; i < accordionItems.length; i++) {
      const path = accordionItems[i].path;
      const label = accordionItems[i].label;

      if (linkInfo === path || menuTitle === label) {
         accordionItemIsActive = true;
      }
   }

   const accordionClassName = accordionItemIsActive ? classes.linkWrapperActive : "";

   const accordionItemClassName = `accordionItem ${classes.listItem} ${
      accordionItemIsActive ? "active" : ""
   } ${!open ? "passive" : ""}`;

   const accordionItemTextClassName = `${classes.menuItemsStyle} ${
      accordionItemIsActive ? "active" : ""
   }`;

   const accordArrowClassName = `${classes.accordArrowStyle} ${isShown ? "rotate" : ""}`;
   const sectionsListClassName = `${classes.sectionsListBoxStyle} ${
      open && isShown ? "shown" : ""
   }`;

   function handleAccordionClick() {
      if (open) {
         setIsShown((prevState) => !prevState);
      } else {
         history.push(accordionItems[0].path);
      }
   }

   return (
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
                  const path = section.path;
                  const label = section.label;

                  const activeClassName =
                     linkInfo === path || menuTitle === label ? "active" : "";

                  return (
                     <NavLink key={index} to={path} className={activeClassName}>
                        <ListItem button>{label}</ListItem>
                     </NavLink>
                  );
               })}
            </div>
         </div>
      </div>
   );
};
