import React from "react";
import {CreateWrapper} from "./createWrapper";

export const InfoWrapper =({ head, body,parentLink, parent, child, }) => {
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