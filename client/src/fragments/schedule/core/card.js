import React from "react";
import { scheduleStyle } from "./styles";
import moment from "moment";
import { SlicedText } from "@eachbase/components";
import { getBorderColorAndText, getCurrentText } from "./constants";

export const Card = ({ openModal, info, style }) => {
   const classes = scheduleStyle();

   const { color: borderColor, text } = getBorderColorAndText(info?.eventStatus);
   const { cardText } = getCurrentText(info?.type);

   return (
      <div className={classes.hoverClass}>
         <div
            onClick={() => openModal(info)}
            style={
               style
                  ? {
                       borderRight: `8px solid ${borderColor}`,
                       background: "#EBF2FD80 0% 0% no-repeat padding-box",
                    }
                  : { borderRight: `8px solid ${borderColor}` }
            }
            className={classes.cardItemWrapper}
         >
            <div className={classes.cardItem}>
               <p>{`${moment(info?.startTime).format("hh:mm A")} - ${moment(
                  info?.endTime
               ).format("hh:mm A")}`}</p>
               <p>
                  <SlicedText
                     size={15}
                     type={"name"}
                     data={
                        info && info.staff
                           ? `${info.staff[0].firstName} ${info.staff[0].lastName}`
                           : ""
                     }
                  />
               </p>
               <p>
                  <SlicedText
                     size={15}
                     type={"name"}
                     data={
                        info && info.client.length
                           ? `${info.client[0].firstName} ${info.client[0].lastName}`
                           : "Not set"
                     }
                  />
               </p>
               <p style={{ width: "55px " }}>{cardText}</p>
               <p style={{ width: "105px" }}>{text}</p>
            </div>
         </div>
      </div>
   );
};
