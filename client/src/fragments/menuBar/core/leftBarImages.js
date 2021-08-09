import {Images} from "@eachbase/utils";
import React from "react";

export const LeftBarImages =({ item, linkInfo })=>{
    return(
        <img
            src={
                item.icon === "Funding Source"
                    ? linkInfo === item.path
                    ? Images.fundingSourceActive
                    : Images.fundingSourcePassive :
                    item.icon === "Staff"
                        ? linkInfo === item.path
                        ? Images.staffActive
                        : Images.staffPassive
                       : item.icon === "Client"
                            ? linkInfo === item.path
                                ? Images.clientActive
                                : Images.clientsPassive
                        : item.icon === "Role Management"
                            ? linkInfo === item.path
                                ? Images.roleManagementActive
                                : Images.roleManagementPassive
                                                    :
                                                    ''
            }
            alt={"icons"}
            style={{
                width: "24px",
                height: "24px",
                marginRight: "8px",
            }}
        />
    )
}