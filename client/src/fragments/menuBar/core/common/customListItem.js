import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ListItem, ListItemText } from "@material-ui/core";
import { leftBarCommonStyle } from "./styles";
import { LeftBarImages } from "../leftBarImages";
import { getLimitedVal, Images } from "@eachbase/utils";

const billingSections = [
   { label: "Bills", path: "/bills" },
   { label: "Claims", path: "/claims" },
   { label: "Invoices", path: "/invoices" },
   { label: "Postings", path: "/postings" },
];

export const CustomListItem = ({ linkInfo, item, open, accordion }) => {
   const classes = leftBarCommonStyle();
   const history = useHistory();
   const [isShown, setIsShown] = useState(false);

   const isActive =
      linkInfo === item.path || linkInfo.slice(0, 4) === item.path.slice(0, 4);

   let billingIsActive = false;
   for (let i = 0; i < billingSections.length; i++) {
      if (linkInfo === billingSections[i].path) {
         billingIsActive = true;
      }
   }

   const linkClassName = isActive ? classes.linkWrapperActive : "";
   const accordionClassName = billingIsActive ? classes.linkWrapperActive : "";

   const listItemClassName = `${classes.listItem} ${isActive ? "active" : ""} ${
      !open ? "passive" : ""
   }`;
   const accordionItemClassName = `accordionItem ${classes.listItem} ${
      billingIsActive ? "active" : ""
   } ${!open ? "passive" : ""}`;

   const listItemTextClassName = `${classes.menuItemsStyle} ${
      isActive ? "active" : ""
   }`;
   const accordionItemTextClassName = `${classes.menuItemsStyle} ${
      billingIsActive ? "active" : ""
   }`;

   const handleAccordionClick = () =>
      open ? setIsShown((pS) => !pS) : history.push("/bills");

   return (
      <Fragment>
         {accordion ? (
            <div>
               <div
                  onClick={handleAccordionClick}
                  className={`${classes.accordionStyle} ${accordionClassName}`}
               >
                  <ListItem className={accordionItemClassName} button>
                     <LeftBarImages
                        item={item}
                        linkInfo={linkInfo}
                        billingIsActive={billingIsActive}
                     />
                     {open && (
                        <Fragment>
                           <ListItemText
                              className={accordionItemTextClassName}
                              primary={getLimitedVal(item.name, 13)}
                           />
                           <img src={Images.accordArrow} alt="" />
                        </Fragment>
                     )}
                  </ListItem>
               </div>
               {open && isShown && (
                  <ol>
                     {billingSections.map((section, index) => (
                        <li key={index}>
                           <Link to={section.path}>{section.label}</Link>
                        </li>
                     ))}
                  </ol>
               )}
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
         )}
      </Fragment>
   );
};
