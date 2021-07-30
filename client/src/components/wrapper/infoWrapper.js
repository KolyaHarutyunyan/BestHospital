import React from "react";
import {wrapperStyle} from "./styles";
import {CreateWrapper} from "./createWrapper";

export const InfoWrapper =({ head, body,parentLink, parent, child, }) => {
   const classes = wrapperStyle()
    return (

        <div>
            <CreateWrapper
                head={head}
                body={body}
                parentLink={parentLink}
                parent={parent}
                child={child}
            />

        </div>
    )
}