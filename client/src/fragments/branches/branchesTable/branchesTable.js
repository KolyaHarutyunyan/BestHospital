import { Paper, Table, TableContainer } from "@material-ui/core";
import { BranchesTableBody, BranchesTableHead } from "./core";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Loader, PaginationItem} from "@eachbase/components";
import {useGlobalStyles} from "@eachbase/utils";

export const BranchesTable = ({}) => {
  const globalStyle =useGlobalStyles()

  const [page, setPage] = useState(1);

  const { branchesList, httpOnLoad } = useSelector((state) => ({
    branchesList: state.branches.branchesList,
    httpOnLoad: state.httpOnLoad
  }));

  const changePage = (number) => {
    setPage(number);
  };


  return (
    <div className={globalStyle.tableWrapper}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <BranchesTableHead />
          {httpOnLoad.length ? <Loader/> :
            branchesList.length && branchesList.map((item, i) => (
          <BranchesTableBody key={i} data={item}/>
              ))}

        </Table>
        <PaginationItem page={page} handleReturn={(number) => changePage(number)} count={branchesList.length} />

      </TableContainer>
    </div>
  );
};
