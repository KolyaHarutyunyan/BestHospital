import {Images} from "@eachbase/utils";
import React from "react";

export const LeftBarImages =({ item, linkInfo })=>{
    return(
        <img
            src={
                item.icon === "Funding Source"
                    ? linkInfo === item.path
                    ? Images.fundingSourceActive
                    : Images.fundingSourcePassive
                    : item.icon === "Branches"
                    ? linkInfo === item.path
                        ? Images.fundingSourceActive
                        : Images.fundingSourcePassive
                    : item.icon === "Human Resources"
                        ? linkInfo === item.path
                            ? Images.fundingSourceActive
                            : Images.fundingSourcePassive
                        : item.icon === "Role Management"
                            ? linkInfo === item.path
                                ? Images.roleManagementActive
                                : Images.roleManagementPassive
                            : item.icon === "Customers"
                                ? linkInfo === item.path
                                    ? Images.fundingSourceActive
                                    : Images.fundingSourcePassive
                                : item.icon === "Factoring Companies"
                                    ? linkInfo === item.path
                                        ? Images.fundingSourceActive
                                        : Images.fundingSourcePassive
                                    : item.icon === "Settings"
                                        ? linkInfo === item.path
                                            ? Images.fundingSourceActive
                                            : Images.fundingSourcePassive
                                        :
                                        item.icon === "MC Authorities"
                                            ? linkInfo === item.path
                                            ? Images.fundingSourceActive
                                            : Images.fundingSourcePassive
                                            :
                                            item.icon === "Carriers"
                                                ? linkInfo === item.path
                                                ? Images.fundingSourceActive
                                                : Images.fundingSourcePassive
                                                :
                                                item.icon === "Agents"
                                                    ? linkInfo === item.path
                                                    ? Images.fundingSourceActive
                                                    : Images.fundingSourcePassive
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