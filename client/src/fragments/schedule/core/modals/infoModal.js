import React from "react";
import { HtmlTooltip, SelectInput, Switcher } from "@eachbase/components";
import { modalsStyle } from "../../../../components/modal/styles";
import { Images } from "@eachbase/utils";
import { Items } from "../items";
import { Link } from "react-router-dom";
import { scheduleStyle } from "../styles";

export const InfoModal = ({
   info,
   handleOpenClose,
   openCloseRecur,
   cardItem,
}) => {
   const classes = scheduleStyle();
   const global = modalsStyle();

   const title = "";

   return (
      <div className={global.infoModalWrapper}>
         {/*<div className={classes.infoWrapper}>*/}
         <div className={classes.titleWrapper}>
            <p>Service Appointment</p>
            <div>
               <HtmlTooltip title={<p>{"Recur Event"}</p>} placement="top-end">
                  <button onClick={openCloseRecur}>
                     <img src={Images.recurrance} alt="icon" />
                  </button>
               </HtmlTooltip>
               <HtmlTooltip title={<p>{"Edit"}</p>} placement="top-end">
                  <button>
                     <img src={Images.edit} alt="icon" />
                  </button>
               </HtmlTooltip>
            </div>
         </div>
         <p className={classes.infoDate}>
            Sep 13, 2021 <span>09:00 AM - 11:00 AM</span>
         </p>

         <div className={classes.itemsWrap}>
            <Items text={"Client:"} subText={"Jane Smith"} />
            <Items text={"Authorized Service:"} subText={"PT (HA, HC, HN)"} />
            <Items text={"Staff Member:"} subText={"Alice Johansson"} />
            <Items text={"Staff Paycode:"} subText={"PT"} />
            <Items
               text={"Client Address:"}
               subText={"1100 East Broadway #302 Glendale, CA 91205"}
            />
            <Items text={"Place of Service:"} subText={"In Home (02)"} />
         </div>

         <div className={classes.infoFooter}>
            <p className={classes.infoFooterTitle}>Event Status</p>
            <SelectInput
               // language={null}
               name={"rendered"}
               label={"Rendered"}
               // handleSelect={handleChange}
               // value={inputs?.funding}
               list={[]}
               // typeError={error === 'funding' ? ErrorText.field : ''}
            />

            <div className={classes.switch}>
               <div>
                  <Link
                     to="*"
                     onClick={(e) => e.preventDefault()}
                     className={classes.link}
                  >
                     Signature.csv
                  </Link>
                  <img
                     className={classes.download}
                     src={Images.download}
                     alt="icon"
                  />
               </div>

               <div>
                  <p>Require Signature</p>
                  <Switcher />
               </div>
            </div>
         </div>
      </div>
   );
};
