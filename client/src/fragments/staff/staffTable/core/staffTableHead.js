import React from "react";
import { SearchAndFilter, TableHeadComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";

export const StaffTableHead = ({}) => {
    return (
        <TableHeadComponent>
            {<>
                <TableCell>
                    <SearchAndFilter title={"Full Name"} />
                </TableCell>
                <TableCell>
                    <SearchAndFilter title={"Address"} />
                </TableCell>
                <TableCell>
                    <SearchAndFilter title={"Email"} />
                </TableCell>
                <TableCell>
                    <SearchAndFilter
                        custom={false}
                        type={"number"}
                        title={"Phone Number"}
                    />
                </TableCell>
            </>
            }
        </TableHeadComponent>
    );
}
