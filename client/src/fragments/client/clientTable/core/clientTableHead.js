import React from "react";
import { SearchAndFilter, TableHeadComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";

export const ClientTableHead = () => {

  return (
    <TableHeadComponent>
      {<>
          <TableCell>
            <SearchAndFilter title={"Full Name"}  />
          </TableCell>

          <TableCell>
            <SearchAndFilter title={"Code"}  />
          </TableCell>

          <TableCell>
            <SearchAndFilter title={"Gender"} custom={false}  />
          </TableCell>
          <TableCell>

            <SearchAndFilter title={"Date of Birth"}  />
          </TableCell>

          <TableCell>
            <SearchAndFilter title={"Status"} custom={false}/>
          </TableCell>
        <TableCell>
            <SearchAndFilter title={"Enrollment"} custom={false}/>
          </TableCell>
        <TableCell>
            <SearchAndFilter title={"Action"} custom={false}  />
          </TableCell>
        </>
      }
    </TableHeadComponent>
  );
}
