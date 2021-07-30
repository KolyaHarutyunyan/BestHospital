import React from "react";
import { wrapperStyle } from "./styles";
import { useGlobalStyles } from "@eachbase/utils";
import { CustomBreadcrumbs, TableHeadComponent } from "@eachbase/components";
import { Paper, Table, TableCell, TableContainer } from "@material-ui/core";

export const CreateWrapper =({head, body, parentLink, parent, child }) => {
  const globalStyle =useGlobalStyles()
  const classes = wrapperStyle()
  return(
    <div>
      {parent &&
      <CustomBreadcrumbs
        parentLink={parentLink}
        parent={parent}
        child={child}
      />
      }
      <div className={globalStyle.tableWrapperSmall}>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHeadComponent>
              <TableCell>
              {head}
              </TableCell>
            </TableHeadComponent>
            <div className={classes.createOfficesBody}>
              {body}
            </div>
          </Table>
        </TableContainer>
    </div>
    </div>
  )
}