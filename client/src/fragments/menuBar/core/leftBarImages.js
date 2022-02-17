import { Images } from "@eachbase/utils";
import React from "react";

export const LeftBarImages = ({ item, linkInfo }) => {
   return (
      <img
         src={
            item.icon === "Funding Source"
               ? linkInfo === item.path
                  ? Images.fundingSourceActive
                  : linkInfo.slice(0, 4) === item.path.slice(0, 4)
                  ? Images.fundingSourceActive
                  : linkInfo === item.create
                  ? Images.fundingSourceActive
                  : Images.fundingSourcePassive
               : item.icon === "Staff"
               ? linkInfo === item.path
                  ? Images.staffActive
                  : linkInfo.slice(0, 4) === item.path.slice(0, 4)
                  ? Images.staffActive
                  : linkInfo === item.create
                  ? Images.staffActive
                  : Images.staffPassive
               : item.icon === "Client"
               ? linkInfo === item.path
                  ? Images.clientActive
                  : linkInfo.slice(0, 4) === item.path.slice(0, 4)
                  ? Images.clientActive
                  : linkInfo === item.create
                  ? Images.clientActive
                  : Images.clientsPassive
               : item.icon === "System"
               ? linkInfo === item.path
                  ? Images.systemActive
                  : linkInfo.slice(0, 4) === item.path.slice(0, 4)
                  ? Images.systemActive
                  : linkInfo === item.create
                  ? Images.systemActive
                  : Images.systemPassive
               : item.icon === "Role Management"
               ? linkInfo === item.path
                  ? Images.roleManagementActive
                  : linkInfo.slice(0, 4) === item.path.slice(0, 4)
                  ? Images.roleManagementActive
                  : linkInfo === item.create
                  ? Images.roleManagementActive
                  : Images.roleManagementPassive
               : item.icon === "Schedule"
               ? linkInfo === item.path
                  ? Images.eventsFill
                  : linkInfo.slice(0, 4) === item.path.slice(0, 4)
                  ? Images.eventsFill
                  : linkInfo === item.create
                  ? Images.eventsFill
                  : Images.eventsPassive
               : item.icon === "Billing"
               ? linkInfo === item.path
                  ? Images.billingFill
                  : linkInfo.slice(0, 4) === item.path.slice(0, 4)
                  ? Images.billingFill
                  : linkInfo === item.create
                  ? Images.billingFill
                  : Images.billingPassive
               : ""
         }
         alt={"icons"}
         style={{
            width: "24px",
            height: "24px",
            marginRight: "8px",
         }}
      />
   );
};
